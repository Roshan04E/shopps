'use client'

import { cart, Product } from '@/types'
import { Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react'
import { addToCart, removeItemFromCart } from '@/lib/actions/action-cart'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Button } from '@/components/button'
import { Button as Button2 } from '@/components/ui/button'

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center justify-center w-4 h-4">
      {children}
    </span>
  )
}

function AddToCart({
  varient,
  product,
  cart,
}: {
  varient?: string
  product?: Product
  cart: cart
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const existItem = cart?.items?.find(i => i.productId === product?.id)
  const [qty, setQty] = useState(existItem?.qty ?? 0)

  const add = () => {
    if (!product) return
    setQty(p => p + 1)
    startTransition(async () => {
      const { success } = await addToCart({
        cartItem: {
          productId: product.id,
          name: product.name,
          slug: product.slug,
          image: product.images[0],
          price: product.price,
          unitQty: product.unitQty,
          qty: 1,
        },
      })
      if (!success) setQty(p => p - 1)
      router.refresh()
    })
  }

  const remove = () => {
    if (qty <= 0) return
    setQty(p => p - 1)
    startTransition(async () => {
      const { success } = await removeItemFromCart(product!.id)
      if (!success) setQty(p => p + 1)
      router.refresh()
    })
  }

  /* ---------- SMALL ---------- */
  if (varient === 'small') {
    return (
      <button
        onClick={add}
        disabled={isPending}
        className="
          relative group
          w-10 h-10 rounded-full
          bg-gradient-to-br from-orange-400 to-pink-500
          text-white
          hover:shadow-lg hover:shadow-orange-300/50
          hover:scale-110
          active:scale-95
          transition-all duration-300
          flex items-center justify-center
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 blur-md -z-10 transition-opacity duration-300"></div>
        
        <IconBox>
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : qty > 0 ? (
            <Plus className="w-4 h-4" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
        </IconBox>
      </button>
    )
  }

  /* ---------- COUNTER ---------- */
  return (
    <div className="inline-flex items-center">
      {qty === 0 ? (
        <Button
          onClick={add}
          disabled={isPending}
          className="
            relative group
            py-3 px-6
            bg-gradient-to-r from-orange-500 to-pink-500
            text-white font-semibold
            rounded-full
            hover:shadow-lg hover:shadow-orange-300/50
            hover:scale-105
            active:scale-95
            transition-all duration-300
            flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-md -z-10 transition-opacity duration-300"></div>
          
          <ShoppingBag className="w-4 h-4" />
          {isPending ? 'Adding...' : 'Add to cart'}
        </Button>
      ) : (
        <div className="
          relative group
          bg-gradient-to-r from-orange-500 to-pink-500
          flex items-center justify-center
          text-white
          rounded-full
          shadow-lg shadow-orange-300/30
          hover:shadow-xl hover:shadow-orange-300/50
          transition-all duration-300
        ">
          {/* Animated glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-lg -z-10 transition-opacity duration-300"></div>
          
          <Button2
            onClick={remove}
            variant='ghost'
            disabled={isPending}
            className="
              w-10 h-10
              flex items-center justify-center
              hover:bg-white/20
              active:scale-90
              transition-all duration-200
              rounded-l-full
              text-white
            "
          >
            <IconBox>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
            </IconBox>
          </Button2>

          <div className="
            w-12 px-2
            text-center text-base font-bold
            select-none
          ">
            {qty}
          </div>

          <Button2
            variant='ghost'
            onClick={add}
            disabled={isPending}
            className="
              w-10 h-10
              flex items-center justify-center
              hover:bg-white/20
              active:scale-90
              transition-all duration-200
              rounded-r-full
              text-white
            "
          >
            <IconBox>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </IconBox>
          </Button2>
        </div>
      )}
    </div>
  )
}

export default AddToCart