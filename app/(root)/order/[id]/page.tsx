import Header from '@/components/shared/header/header'
import { getOrderById } from '@/lib/actions/action-order'
import { getMyCart } from '@/lib/actions/action-cart'
import { order, shippingAddress } from '@/types'
import { notFound } from 'next/navigation'
import OrderDetails from './order-details'
import { auth } from '@/auth'

async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getOrderById(id)
  const cart = await getMyCart()
  
  const session = await auth(); 
  
  

  if (!data) notFound()

  const normalizedOrder: order = {
    ...data,
    itemsPrice: Number(data.itemsPrice),
    shippingPrice: Number(data.shippingPrice),
    taxPrice: Number(data.taxPrice),
    totalPrice: Number(data.totalPrice),
    shippingAddress: data.shippingAddress as shippingAddress,
    orderItems: data.orderItems.map(i => ({
      productId: i.productId,
      slug: i.slug,
      image: i.image,
      name: i.name,
      qty: i.qty,
      unitQty: Number(i.unitQty),
      price: Number(i.price),
    })),
    user: {
      name: data.user.name ?? 'Guest',
      email: data.user.email,
    },
  }

  return (
    <div className="min-h-screen bg-orange-50/40">
      {/* <Header cart={cart} /> */}

      <main className="pt-28 pb-16 px-4">
        <OrderDetails order={normalizedOrder} isAdmin={session?.user.role === 'admin' || false}/>
      </main>
    </div>
  )
}

export default OrderPage
