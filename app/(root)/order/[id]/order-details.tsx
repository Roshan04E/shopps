'use client'

import { order } from '@/types'
import Image from 'next/image'
import { CheckCircle, IndianRupee, Settings, Truck } from 'lucide-react'
import { formatDateTime, formatINR, formatPaymentMethod } from '@/util/helpers'
import { Button } from '@/components/button'
import Link from 'next/link'
import { BiLogoWhatsapp } from "react-icons/bi";
import { Button as Button2 } from '@/components/ui/button'
import MarkAsPaid from './mark-as-paid'
import MarkAsDelivered from './mark-as-delivered'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-slate-600">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}


function OrderDetails({ order, isAdmin }: { order: order, isAdmin: boolean }) {
  const { dateOnly, timeOnly } = formatDateTime(order.createdAt)
  const message = `Hi, I am ${order.user.name} and I need help with Order Id #${order.id.slice(-6)}\n`
  const url = `https://wa.me/916200020159?text=${encodeURIComponent(message)}`



  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Card */}
      <div className="bg-white/50 backdrop-blur rounded-3xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Order <span className="text-orange-500">#{order.id.slice(-6)}</span>
          </h1>
          <p className="text-sm text-slate-500">Placed on <strong>{dateOnly}</strong> at <strong>{timeOnly}</strong></p>
        </div>

        <div className="flex gap-3">
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium
            ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            Payment: <strong>{order.isPaid ? 'Done' : 'Pending'}</strong>
          </span>

          <span className={`px-4 py-1.5 rounded-full text-sm font-medium
            ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            Order: <strong>{order.isDelivered ? 'Delivered' : 'Processing'}</strong>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 bg-white/50 rounded-3xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Items ({order.orderItems.length})
          </h2>

          {order.orderItems.map(item => (
            <div
              key={item.productId}
              className="flex gap-4 items-center border-b last:border-none pb-5"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-medium text-slate-800">{item.name}</p>
                <p className="text-sm text-slate-500">
                  Qty {item.qty} × {formatINR(item.price)}
                </p>
              </div>

              <div className="font-semibold text-slate-900">
                {formatINR(item.qty * item.price)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white/50 rounded-3xl shadow-sm p-6 space-y-6 h-fit">
          <h2 className="text-lg font-semibold text-slate-900">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <Row label="Items" value={`${formatINR(order.itemsPrice)}`} />
            <Row label="Shipping" value={`${formatINR(order.shippingPrice)}`} />
            <Row label="Tax" value={`${formatINR(order.taxPrice)}`} />
            <div className="border-t pt-3 flex justify-between font-bold text-slate-900">
              <span>Total</span>
              <span>{formatINR(order.totalPrice)}</span>
            </div>
          </div>



          {/* Shipping */}
          <div className="pt-4 border-t space-y-2 text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Truck size={16} className="text-orange-500" />
              Shipping Address
            </div>
            <p className="text-slate-600 leading-relaxed">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.streetAddress}<br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}<br />
              +91 {order.shippingAddress.phone}
            </p>
          </div>

          {/* Payment */}
          <div className="pt-4 border-t space-y-2 text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <IndianRupee size={16} className="text-orange-500" />
              Payment Method
            </div>
            <p className="text-slate-600 leading-relaxed">
              {formatPaymentMethod(order.paymentMethod)}<br />
            </p>
          </div>

          {/* User */}
          <div className="pt-4 border-t flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle size={16} className="text-green-500" />
            {order.user.name} ({order.user.email}) <br />
          </div>
          <Button variant='green' >
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex gap-2 items-center  justify-center">
                <span>Chat on WhatsApp</span><BiLogoWhatsapp className='h-6 w-6' />
              </div>
            </Link>
          </Button>

          {isAdmin && (!order.isDelivered || !order.isPaid) && (
            
            <div className='pt-4 border-t space-y-4 text-sm'>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Settings size={16} className="text-orange-500" />
              {/* ADMIN */}
              Admin Section
            </div>
            <div className="flex gap-2">
              {/* Cash on delivery update  */}
              {!order.isPaid && order.paymentMethod === 'CashOnDelivery' && <div className="">
                <MarkAsPaid id={order.id}/>
              </div>}

              {/* Delivery */}
              {!order.isDelivered && <div className="">
                <MarkAsDelivered  id={order.id}/>
              </div>}
              </div>
            </div>
          )}



        </div>
      </div>
    </div>
  )
}

export default OrderDetails

