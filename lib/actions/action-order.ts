'use server'

import { auth } from '@/auth'
import prisma from '../prisma'
import { getMyCart } from './action-cart'
import { getUserById } from './action-users'
import { cart, cartItem, order, user } from '@/types'
import { insertOrderSchema } from '@/util/validators'
import { toPlain } from '@/util/helpers'
import { Prisma as Prisma2} from '../generated/prisma/client'
import { revalidatePath } from 'next/cache'

export async function createOrder() {
  try {
    const session = await auth()
    if (!session) throw new Error('Session not found')

    const cart: cart = await getMyCart()
    if (!cart || cart.items.length === 0) {
      return { success: false, redirectTo: '/cart' }
    }

    const userId = session.user?.id
    if (!userId) throw new Error('User not found')

    const user: user = await getUserById(userId)

    if (!user.address?.length) {
      return { success: false, redirectTo: '/shipping-address' }
    }

    if (!user.paymentMethod) {
      return { success: false, redirectTo: '/payment-method' }
    }

    const orderData = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address[0], // ✅ single address
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    })

    const orderId = await prisma.$transaction(async tx => {
      const order = await tx.order.create({ data: orderData })

      for (const item of cart.items as cartItem[]) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            image: item.image,
            qty: item.qty,
            price: item.price,
          },
        })
      }

      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      })

      revalidatePath(`/order/${order.id}`)
      return order.id
    })


    return {
      success: true,
      redirectTo: `/order/${orderId}`,
    }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Order creation failed' }
  }
}



export async function getOrderById(id: string) {
  const order=  await prisma.order.findFirst({
    where: {
      id: id
    },
    include: {
      orderItems: true,
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  }) // order
  return order;
}





// Get users orders

export async function getMyOrders({limit = 8, page = 1}: {limit?: number, page: number}) {
  const session = await auth();
  if (!session) throw new Error("User is not authorised");

  const data = await prisma.order.findMany({
    where: {
      userId: session.user?.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: limit,
    skip: (page - 1) * limit
  }); // data


  // console.log(data);
  

  const dataCount = await prisma.order.count({
    where: {
      userId: session.user?.id
    }
  }); // dataCount

  return toPlain({
    data: data,
    totalPages: Number(Math.ceil(dataCount / limit)),
  });

}; // getMyOrders




// get sales data and order summary

type salesDateType = {
  month: string,
  totalSales: number
}

export async function getOrderSummary() {
  const ordersCount = await prisma.order.count()
  const productsCount = await prisma.products.count()
  const usersCount = await prisma.user.count()

  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true }
  })

  const salesDataRow =
    await prisma.$queryRaw<
      { month: string; totalSales: Prisma2.Decimal }[]
    >`
    SELECT 
      to_char("createdAt", 'MM/YY') as "month",
      sum("totalPrice") as "totalSales"
    FROM "Order"
    GROUP BY to_char("createdAt", 'MM/YY')
  `

  const salesData = salesDataRow.map((e) => ({
    month: e.month,
    totalSales: Number(e.totalSales)
  }))

  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
    include: {
      user: { select: { name: true } }
    }
  })

  return toPlain({
    ordersCount,
    usersCount,
    productsCount,
    totalSales: totalSales._sum.totalPrice ?? 0,
    salesData,
    latestSales
  })
}



// get all orders
export async function getAllOrders({limit = 8, page = 1}: {limit?: number, page: number}) {
  const data = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: (page - 1) * limit,
    include: {
      user: {
        select: {
          name: true,
          phone: true,
          email: true
        }
      }
    }
  }) //data

  const dataCount = await prisma.order.count()
  const totalPages = Number(Math.ceil(dataCount / limit))

  // console.log(data);
  

  return toPlain({
    data,
    totalPages
  })
}


// delete order by id 
export async function deleteOrderById(id: string) {
  try {
    await prisma.order.delete({
      where: {
        id: id
      }
    }) // delete

    revalidatePath('/admin/orders')

    return {
      success: true,
      message: `Order id #${id.slice(-6)} successfully deleted`
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error while deleting the order"
    }
    
    
  }
}


// update order payment status

export async function updateOrderToPaid(id: string) {
  try {

    const order = await prisma.order.findUnique({ where: { id } })
    if (!order || order.isPaid) {
      return { success: false, message: "Order already paid" }
    }

    await prisma.order.update({
      where: { id },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    revalidatePath(`/admin/orders`);
    revalidatePath(`/order/${id}`);

    return {
      success: true,
      message: `Order #${id.slice(-6)} marked as paid`
    }

  } catch (error) {
    console.log(error)
    return { success: false, message: "Error updating order" }
  }
}



// update order delivery status

export async function updateOrderToDelivered(id: string) {
  try {

    const order = await prisma.order.findUnique({ where: { id } })
    if (!order || order.isDelivered) {
      return { success: false, message: "Order already delivered" }
    }

    await prisma.order.update({
      where: { id },
      data: {
        isDelivered: true,
        deliveredAt: new Date()
      }
    })

    revalidatePath(`/admin/orders`);
    revalidatePath(`/order/${id}`);

    return {
      success: true,
      message: `Order #${id.slice(-6)} delivered`
    }

  } catch (error) {
    console.log(error)
    return { success: false, message: "Error updating order" }
  }
}
