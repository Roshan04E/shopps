import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/action-cart'
import { getUserById } from '@/lib/actions/action-users'
import { cart } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'
import ShippingAddressForm from './shipping-address-form'
import type { user } from '@/types'
import CheckoutSteps from '@/components/checkout-steps'

const ShippingAddress = async () => {
  const cart: cart = await getMyCart()

  if (!cart || cart.items.length === 0) redirect('/cart')

  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error('No user Id')

  const user: user = await getUserById(userId)


  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header cart={cart} /> */}

      {/* MAIN CONTENT */}
      <div className="pt-20 px-3 bg-orange-50/30 flex-1">
        <CheckoutSteps currentStep={2} />
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 gap-6">
            <ShippingAddressForm address={{
              fullName: user.address?.[0]?.fullName || '',
              streetAddress: user.address?.[0]?.streetAddress || '',
              city: user.address?.[0]?.city || '',
              postalCode: user.address?.[0]?.postalCode || '',
              country: user.address?.[0]?.country || '',
              phone: user.phone,
              lat: user.address?.[0]?.lat,
              lng: user.address?.[0]?.lng,
            }} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShippingAddress
