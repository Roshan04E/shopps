'use client'

import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import React, { useTransition } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { updateProduct } from '@/lib/actions/action-products'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { UpdateProductSchema } from '@/util/validators'
import z from 'zod'
import Image from 'next/image'

function UpdateProductPage({ product }: { product: z.infer<typeof UpdateProductSchema> }) {
  const [isPending, startTransition] = useTransition()

  // No manual types needed here, zodResolver handles the link
  const form = useForm<z.infer<typeof UpdateProductSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(UpdateProductSchema) as any,
    defaultValues: product,
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

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => console.log("FORM ERRORS", err))}
          className="space-y-6"
        >
          {/* NAME + SLUG */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            form.setValue('slug', generateSlug(form.getValues('name') || ''), { shouldValidate: true })
                          }
                        >
                          Gen
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="brand"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              name="unitQty"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Qty</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="stock"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="banner"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner URL</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* DESCRIPTION */}
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full min-h-[140px] border rounded-md p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGES */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-7 items-start">
            <div className="col-span-5">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={Array.isArray(field.value) ? field.value[0] || "" : ""}
                        onChange={(e) => field.onChange([e.target.value])}
                      />
                    </FormControl>
                    <FormDescription>Image upload coming soon</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 relative border border-dashed rounded-lg flex items-center justify-center text-sm text-muted-foreground min-h-[150px]">
              {form.watch("images")?.[0] ? (
                <Image
                  src={form.watch("images")![0]}
                  alt="Preview"
                  fill
                  className="object-contain p-2"
                />
              ) : (
                "Image Preview"
              )}
            </div>
          </div>

          {/* FEATURED */}
          <FormField
            name="isFeatured"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured</FormLabel>
                  <FormDescription>Appear on the home page</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isPending}
            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Update Product
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProductPage