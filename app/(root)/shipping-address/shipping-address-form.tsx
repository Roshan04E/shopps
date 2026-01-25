'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { shippingAddressSchema } from '@/util/validators'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import { updateUserAddress } from '@/lib/actions/action-users'
import { toast } from 'sonner'

type Props = {
  address?: z.infer<typeof shippingAddressSchema>
}

const ShippingAddressForm = ({ address }: Props) => {

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: address?.fullName || '',
      phone: address?.phone || '',
      streetAddress: address?.streetAddress || '',
      city: address?.city || 'Khunti',
      postalCode: address?.postalCode || '835210',
      country: address?.country || 'India',
    },
  })

  const onSubmit: SubmitHandler<
    z.infer<typeof shippingAddressSchema>
  > = async (values) => {
    startTransition(async () => {
      const { success, message } = await updateUserAddress(values)

      if (!success) {
        toast.error(message)
        return
      }

      toast.success('Address updated successfully!')
      router.push('/payment-method')
    })
  }

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-6 text-slate-800">
      <main className="py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">
          Delivery address
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName'> }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'phone'> }) => (
                <FormItem>
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={!!address?.phone} 
                      placeholder="10 digit phone number" 
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'streetAddress'> }) => (
                <FormItem>
                  <FormLabel>Address to your door step</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="House no, street, area" 
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'city'> }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City" 
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'postalCode'> }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Postal code" 
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'country'> }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Country" 
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-auto flex items-center gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>{isPending ? 'Processing...' : 'Continue'}</span>
            </Button>
          </form>
        </Form>
      </main>
    </div>
  )
}

export default ShippingAddressForm