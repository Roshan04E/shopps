import clsx from 'clsx'
import { User, MapPin, CreditCard, ShoppingCart } from 'lucide-react'

const steps = [
  { label: 'User Login', icon: <User size={18} /> },
  { label: 'Delivery Address', icon: <MapPin size={18} /> },
  { label: 'Payment Method', icon: <CreditCard size={18} /> },
  { label: 'Place Order', icon: <ShoppingCart size={18} /> },
]

export default function CheckoutSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="max-w-350 mx-auto py-6 px-4 w-full flex flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
      {steps.map((step, index) => {
        const active = index + 1 === currentStep
        const completed = index + 1 < currentStep

        return (
          <div key={step.label} className="flex items-center flex-1">
            {/* STEP */}
            <div
              className={clsx(
                'flex items-center justify-center w-10 sm:w-36 h-10 rounded-full text-sm font-medium',
                active && 'bg-slate-100 text-slate-900',
                completed && 'text-slate-400',
                !active && !completed && 'text-slate-400'
              )}
            >
              <span className="sm:hidden">{step.icon}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>

            {/* CONNECTOR */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-px bg-slate-200 mx-2" />
            )}
          </div>

        )
      })}
    </div>
  )
}
