'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { Check, Loader2 } from 'lucide-react'

import { Button } from '@/components/button'
import { createOrder } from '@/lib/actions/action-order'

const PlaceOrderForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await createOrder()
    if (res.redirectTo) redirect(res.redirectTo)
  }

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button
        type="submit"
        disabled={pending}
        className="w-full h-12 text-lg mt-4 flex items-center justify-center gap-2"
      >
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}
        Place Order
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  )
}

export default PlaceOrderForm
