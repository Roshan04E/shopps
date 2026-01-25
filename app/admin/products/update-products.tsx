


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
import { Check, Loader2, PenSquare } from 'lucide-react'
import React, { useTransition } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Product } from '@/types'
import { updateProduct } from '@/lib/actions/action-products'
import { toast } from 'sonner'
import { UpdateProductSchema } from '@/util/validators'
import { z } from 'zod'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'

type ProductWithExtras = Product & {
    isTaxable?: boolean
    updatedAt?: Date
}


function UpdateProduct({ product }: { product: ProductWithExtras }) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(UpdateProductSchema),
        defaultValues: {
            ...product,
            banner: product.banner ?? '',
            rating: product.rating ?? 0,
            numReviews: product.numReviews ?? 0,
            isTaxable: product.isTaxable ?? false,
            createdAt: product.createdAt ?? new Date(),
            updatedAt: product.updatedAt ?? new Date(),
        } as z.infer<typeof UpdateProductSchema>,
    })

    const onSubmit: SubmitHandler<z.infer<typeof UpdateProductSchema>> = async (values) => {
        startTransition(async () => {
            const { success, message } = await updateProduct(values)
            if (!success) {
                toast.error(message)
                return
            }
            toast.success(message)
        })
    }

    const generateSlug = (name: string) => name.toLowerCase().split(' ').join('-')

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <PenSquare className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* NAME + SLUG */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-3 grid gap-3">
                            <label htmlFor="name" className="text-sm font-medium">
                                Product Name
                            </label>
                            <Input
                                id="name"
                                placeholder="Enter product name"
                                value={form.watch('name')}
                                onChange={(e) => form.setValue('name', e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-2 grid gap-3">
                            <label htmlFor="slug" className="text-sm font-medium">
                                Slug
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    id="slug"
                                    placeholder="product-slug"
                                    value={form.watch('slug')}
                                    onChange={(e) => form.setValue('slug', e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        form.setValue('slug', generateSlug(form.getValues('name') || ''))
                                    }
                                >
                                    Gen
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* CATEGORY, BRAND, PRICE */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="grid gap-3">
                            <label htmlFor="category" className="text-sm font-medium">
                                Category
                            </label>
                            <Input
                                id="category"
                                placeholder="e.g., Electronics"
                                value={form.watch('category')}
                                onChange={(e) => form.setValue('category', e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3">
                            <label htmlFor="brand" className="text-sm font-medium">
                                Brand
                            </label>
                            <Input
                                id="brand"
                                placeholder="e.g., Sony"
                                value={form.watch('brand')}
                                onChange={(e) => form.setValue('brand', e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3">
                            <label htmlFor="price" className="text-sm font-medium">
                                Price
                            </label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={form.watch('price')}
                                onChange={(e) => form.setValue('price', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* UNIT QTY, STOCK, BANNER */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="grid gap-3">
                            <label htmlFor="unitQty" className="text-sm font-medium">
                                Unit Quantity
                            </label>
                            <Input
                                id="unitQty"
                                type="number"
                                placeholder="1"
                                value={form.watch('unitQty')}
                                onChange={(e) => form.setValue('unitQty', Number(e.target.value))}
                            />
                        </div>

                        <div className="grid gap-3">
                            <label htmlFor="stock" className="text-sm font-medium">
                                Stock
                            </label>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="0"
                                value={form.watch('stock')}
                                onChange={(e) => form.setValue('stock', Number(e.target.value))}
                            />
                        </div>

                        <div className="grid gap-3">
                            <label htmlFor="banner" className="text-sm font-medium">
                                Banner URL
                            </label>
                            <Input
                                id="banner"
                                placeholder="https://..."
                                value={form.watch('banner') || ''}
                                onChange={(e) => form.setValue('banner', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="grid gap-3">
                        <label htmlFor="description" className="text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="w-full min-h-[140px] border border-input bg-background rounded-md p-3 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Enter product description..."
                            value={form.watch('description')}
                            onChange={(e) => form.setValue('description', e.target.value)}
                        />
                    </div>

                    {/* IMAGE URL + PREVIEW */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 grid gap-3">
                            <label htmlFor="images" className="text-sm font-medium">
                                Image URL
                            </label>
                            <Input
                                id="images"
                                placeholder="https://example.com/image.jpg"
                                value={form.watch('images')?.[0] || ''}
                                onChange={(e) => form.setValue('images', [e.target.value])}
                            />
                            <p className="text-xs text-muted-foreground">
                                Image upload functionality coming soon
                            </p>
                        </div>

                        <div className="relative border border-dashed rounded-lg flex items-center justify-center text-sm text-muted-foreground min-h-[100px]">
                            {form.watch('images')?.[0] ? (
                                <Image
                                    src={form.watch('images')[0]}
                                    alt="Preview"
                                    fill
                                    className="max-h-[100px] object-contain"
                                />
                            ) : (
                                'Image Preview'
                            )}
                        </div>
                    </div>




                    {/* FEATURED TOGGLE */}
                    <div className="flex items-center gap-4 border rounded-lg p-4">
                        <label htmlFor="isFeatured" className="text-sm font-medium flex-shrink-0">
                            Featured Product
                        </label>
                        <Switch
                            id="isFeatured"
                            checked={form.watch('isFeatured') || false}
                            onCheckedChange={(checked) => form.setValue('isFeatured', checked)}
                        />
                        <span className="text-xs text-muted-foreground">
                            Mark this product as featured
                        </span>
                    </div>
                </div>

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

export default UpdateProduct

