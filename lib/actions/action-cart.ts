'use server';

import { auth } from "@/auth";
import { cartItem } from "@/types";
import { cookies } from "next/headers";
import prisma from "../prisma";
import { cartItemSchema, insertCartSchema } from "@/util/validators";
import { roundNumberToTwoDecimalPlaces, toPlain } from "@/util/helpers";
import { revalidatePath } from "next/cache";
import { Prisma } from "../generated/prisma/client";


// calculating the price
const calcPrice = (items: cartItem[]) => {
    const itemsPrice = roundNumberToTwoDecimalPlaces(
        items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    )
    const shippingPrice = roundNumberToTwoDecimalPlaces(
        itemsPrice > 99 ? 0 : 13
    ) // TODO : LATER calculate the shipping price as per the distane 
    const taxPrice = roundNumberToTwoDecimalPlaces(0 * itemsPrice) // TODO: if item is taxable than add tax price
    const totalPrice = roundNumberToTwoDecimalPlaces(
        itemsPrice + taxPrice + shippingPrice
    )

    return {
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }
}


export async function clearCartCookie() {
  (await cookies()).delete("sessionCartId")
}



export async function addToCart({ cartItem }: { cartItem: cartItem }) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value
    if (!sessionCartId) throw new Error("No session cart Id")

    const session = await auth()
    const userId = session?.user?.id as string | undefined

    const cart = await getMyCart()

    const item = cartItemSchema.parse(cartItem)

    const product = await prisma.products.findFirst({
      where: { id: item.productId }
    })
    if (!product) throw new Error("Product not found")

    // ================= CREATE CART =================
    if (!cart) {
      if (product.stock < item.qty) throw new Error("Not enough stock")

      const newCart = insertCartSchema.parse({
        userId,
        sessionCartId,
        items: [item],
        ...calcPrice([item])
      })

      await prisma.cart.upsert({
        where: { sessionCartId },
        update: {
          items: newCart.items,
          ...calcPrice(newCart.items)
        },
        create: newCart
      })

      revalidatePath(`/product/${product.slug}`)

      return {
        success: true,
        message: "Item added to cart successfully"
      }
    }

    // ================= UPDATE CART =================
    const existItem = (cart.items as cartItem[])
      .find(i => i.productId === item.productId)

    if (existItem) {
      if (product.stock < existItem.qty + 1) {
        throw new Error("Not enough stock")
      }
      existItem.qty += 1
    } else {
      if (product.stock < 1) throw new Error("Not enough stock")
      cart.items.push(item)
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as cartItem[])
      }
    })

    revalidatePath(`/product/${product.slug}`)

    return {
      success: true,
      message: `${product.name} ${existItem ? "updated in" : "added to"} cart`
    }

  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Error while adding to cart"
    }
  }
}



export async function getMyCart() {
    // get session cart id
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('No session cart Id');

    // get user and session
    const session = await auth();
    const userId = session?.user?.id ? session.user.id as string : undefined;

    // pull cart 
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
    })

    if (!cart) return undefined;

    return toPlain({
        ...cart,
        items: cart.items as cartItem[],
        itemsPrice: Number(cart.itemsPrice),
        shippingPrice: Number(cart.shippingPrice),
        taxPrice: Number(cart.taxPrice),
        totalPrice: Number(cart.totalPrice),
    })

}



// Remove items from cart

export async function removeItemFromCart(productId: string) {
    try {
        let message;
        // check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error("Cart session not found");

        // get the product
        const product = await prisma.products.findFirst({
            where: {
                id: productId
            }
        });
        if (!product) throw new Error("Product not found.");

        // get user cart
        const cart = await getMyCart();

        // if cart not found throw error
        if (!cart) throw new Error("Cart not found.");

        // check if item exist
        const exist = (cart.items as cartItem[]).find(currItem => currItem.productId === productId);
        if (!exist) throw new Error("Item doesn't exist.");


        if (exist.qty === 1) {
            // remove from cart
            cart.items = (cart.items as cartItem[]).filter(
                curr => curr.productId !== productId
            );
            message = `${product.name} removed from the cart`
        } else {
            // decrease the item quantity by 1
            exist.qty -= 1;
            message = `${product.name}'s quantity decreased to ${exist.qty} in cart`

        }

        // update the database
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: cart.items as Prisma.CartUpdateitemsInput[],
                ...calcPrice(cart.items as cartItem[])
            }

        });

        // revalidate path
        revalidatePath(`/product/${product.slug}`);


        return {
            success: true,
            message: message
        }

    } catch {
        return {
            success: false,
            message: "Error removing the item from cart"
        }
    }
}


//  merge cart on login

export async function mergeCartOnLogin() {
    console.log("[+] got the cart merger");
    
    

    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    const session = await auth()
    const userId = session?.user?.id as string

    if (!sessionCartId || !userId) return

    const sessionCart = await prisma.cart.findFirst({
        where: { sessionCartId }
    })

    const userCart = await prisma.cart.findFirst({
        where: { userId }
    })

    if (!sessionCart || !sessionCart.items) return

    const sessionItems = sessionCart.items as cartItem[]

    // user already has cart
    if (userCart && userCart.items) {

        const merged = [...(userCart.items as cartItem[])]

        sessionItems.forEach(item => {
            const exist = merged.find(i => i.productId === item.productId)

            if (exist) {
                exist.qty += item.qty
            } else {
                merged.push(item)
            }
        })

        await prisma.cart.update({
            where: { id: userCart.id },
            data: {
                items: merged,
                ...calcPrice(merged)
            }
        })

        await prisma.cart.delete({
            where: { id: sessionCart.id }
        })

    } else {

        // move guest cart to user
        await prisma.cart.update({
            where: { id: sessionCart.id },
            data: { userId }
        })
    }
}
