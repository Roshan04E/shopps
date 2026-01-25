'use client'

import Image from "next/image"
import { cartItem } from "@/types"
import { formatINR } from "@/util/helpers"
import { addToCart, removeItemFromCart } from "@/lib/actions/action-cart"
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

export default function TableRowContainer({ item }: { item: cartItem }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const add = () =>
    startTransition(async () => {
      await addToCart({ cartItem: { ...item, qty: 1 } })
      router.refresh()
    })

  const remove = () =>
    startTransition(async () => {
      await removeItemFromCart(item.productId)
      router.refresh()
    })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -120) remove()
      }}
      className="bg-white/30 rounded-xl p-4 shadow-sm flex gap-4"
    >
      <div className="relative w-24 h-24 rounded-md overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-slate-500">{formatINR(item.price)}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={remove}>
              <Minus />
            </Button>

            <span className="px-2">{item.qty}</span>

            <Button size="icon" variant="ghost" onClick={add}>
              <Plus />
            </Button>
          </div>

          <span className="font-bold">
            {formatINR(item.price * item.qty)}
          </span>
        </div>
      </div>

      {/* swipe hint */}
      <div className="flex gap-1">
      <ArrowLeftToLineIcon className="text-red-400 opacity-40"/>
      <Trash2 className="text-red-400 opacity-40" />
      </div>
    </motion.div>
  )
}
