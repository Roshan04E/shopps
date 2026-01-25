'use client'

import { Button } from '@/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateUserProfile } from '@/lib/actions/action-users';
import { shippingAddressSchema, userProfileUpdateSchema } from '@/util/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react'
import { useEffect, useTransition } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

function UserProfileForm({userPhone}: {userPhone: string}) {
    const { data: session, update } = useSession();
    
    const form = useForm<z.infer<typeof userProfileUpdateSchema>>({
        resolver: zodResolver(userProfileUpdateSchema),
        defaultValues: {
            name: session?.user?.name ?? '',
            email: session?.user?.email ?? '',
            phone: userPhone ?? ''
        }
    }) // form

    const [isPending, startTransition] = useTransition()


    useEffect(() => {
        if (session?.user) {
            form.reset({
            name: session.user.name ?? '',
            email: session.user.email ?? '',
            phone: userPhone ?? ''
            })
        }
        }, [session, form, userPhone])


    const onSubmit = async (values: z.infer<typeof userProfileUpdateSchema>) => {
       startTransition(async () => {
         const { success, message} = await updateUserProfile(values);

        if (!success) {
            toast.error(message);
        }

        const newSession = {
            ...session,
            user: {
                ...session?.user,
                name: values.name,
                phone: values.phone
            }
        } // new session

        await update(newSession);

        toast.success(message);
       })
    }


    return (
        <Form {...form}>
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof userProfileUpdateSchema>, 'name'> }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof userProfileUpdateSchema>, 'email'> }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input disabled placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof userProfileUpdateSchema>, 'phone'> }) => (
                            <FormItem>
                                <FormLabel>Phone No.</FormLabel>

                                <FormControl>
                                    <Input placeholder="Phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="">

                    <Button
                        type="submit"
                        className="w-auto flex items-center gap-2"
                    >
                        {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ArrowRight className="w-4 h-4" />
                        )}
                        <span>Update</span>
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default UserProfileForm