


'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Check, Loader2, PenLineIcon, PenSquare, Plus } from 'lucide-react'
import React, { useTransition } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Product } from '@/types'
import { updateProduct } from '@/lib/actions/action-products'
import { toast } from 'sonner'
import { UpdateProductSchema } from '@/util/validators'
import { z } from 'zod'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'

function UpdateProductCopy({ product }: { product: Product }) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(UpdateProductSchema),
        defaultValues: {
            ...product,
            banner: product.banner ?? '',
        },
    })

    const onSubmit: SubmitHandler<z.infer<typeof UpdateProductSchema>> = async (values) => {
        startTransition(async () => {
            alert("Clicked")
            // const { success, message } = await updateProduct(values)
            // if (!success) {
            //     toast.error(message)
            //     return
            // }
            // toast.success(message)
        })
    }

    const generateSlug = (name: string) => name.toLowerCase().split(' ').join('-')

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <PenLineIcon className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>



                <Form {...form}>
                    <form method='POST' onSubmit={form.handleSubmit(onSubmit, (err) => console.log("FORM ERRORS", err))}>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }: { field: ControllerRenderProps<z.infer<typeof UpdateProductSchema>, 'price'> }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Product price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        disabled={isPending}
                        onClick={() => onSubmit(form.getValues())}
                        className="bg-orange-500 hover:bg-orange-600"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Update Product
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProductCopy

