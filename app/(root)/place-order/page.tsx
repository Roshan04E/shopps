import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/action-cart'
import { getUserById } from '@/lib/actions/action-users'
import { cart, shippingAddress, user } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/button'
import Header from '@/components/shared/header/header'
import PlaceOrderForm from './place-order-form'
import { formatINR } from '@/util/helpers'
import CheckoutSteps from '@/components/checkout-steps'

const PlaceOrder = async () => {
  const cart: cart = await getMyCart()
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error('User not found')

  const user: user = await getUserById(userId)

  if (!cart || cart.items.length === 0) redirect('/cart')
  if (!user.address) redirect('/shipping-address')
  if (!user.paymentMethod) redirect('/payment-method')

  const address = user.address[0] as shippingAddress

  return (
    <div className=' bg-orange-50/30'>
    {/* <Header cart={cart}/> */}
    <div className="pt-20 container mx-auto px-6 py-20">
        <CheckoutSteps currentStep={4} />
      <h1 className="text-3xl font-bold mb-10">Confirm & Place Order</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping */}
          <Card className='bg-white/60'>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              <p className="font-medium text-slate-800">{address.fullName}</p>
              <p>
                {address.streetAddress}, {address.city},{' '}
                {address.postalCode}, {address.country}
              </p>
              <p>+91 {address.phone}</p>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className='bg-white/60'>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              {user.paymentMethod}
            </CardContent>
          </Card>

          {/* Items */}
          <Card className='bg-white/60'>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.items.map(item => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.qty} × {formatINR(item.price)}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {(formatINR(item.qty * item.price))}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div>
          <Card className="sticky top-28 bg-white/60">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{formatINR(cart.itemsPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatINR(cart.shippingPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatINR(cart.taxPrice)}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatINR(cart.totalPrice)}</span>
              </div>

              
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PlaceOrder
