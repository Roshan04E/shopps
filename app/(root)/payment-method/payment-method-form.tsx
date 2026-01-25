"use client"


import { Button } from '@/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { updateUserPaymentMethod } from '@/lib/actions/action-users';
import { formatPaymentMethod } from '@/util/helpers';
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS, paymentMethodSchema } from '@/util/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const PaymentMethodForm = ({ preferredPaymentMethod }: { preferredPaymentMethod: string | null }) => {

    const router = useRouter();
    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD
        }

    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
        startTransition(async () => {
            const { success, message } = await updateUserPaymentMethod(values);
            if (!success) {
                toast.error(message);
                
                return;
            }

            router.push('/place-order')
        });
    }


    return (

        <div className="w-150 mx-auto min-h-screen text-slate-800">

            <main className="container mx-auto px-6 pt-32 pb-20">
                <h1 className="text-3xl font-bold mb-12">Payment Method</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} method='post' className='space-y-8'>
                        <div className="">
                            <FormField
                                control={form.control}
                                name='type'
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof paymentMethodSchema>, 'type'> }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} value={field.value}>
                                                {PAYMENT_METHODS.map((paymentMethod) => (
                                                    <FormItem key={paymentMethod} className='flex gap-y-1'>
                                                        <RadioGroupItem
                                                            value={paymentMethod}
                                                            checked={field.value === paymentMethod}
                                                        />
                                                        <FormLabel>
                                                            {formatPaymentMethod(paymentMethod)}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className='space-x-2'>
                            {isPending ? (<Loader2 className="w-4 h-4 animate-spin" />) : (<span><ArrowRight className="w-4 h-4" /></span>)} <span>Continue</span>
                        </Button>
                    </form>
                </Form>

            </main>
        </div>
    )
}

export default PaymentMethodForm