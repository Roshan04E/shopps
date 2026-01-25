'use client'

import { z } from "zod"
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { insertProductSchema } from "@/util/validators"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createNewProduct } from "@/lib/actions/action-products"
import { toast } from "sonner"
import { useTransition } from "react"
import { Loader2, Plus } from "lucide-react"
import { insertProductDefaultValues } from "@/util/constants"
import { useRouter } from "next/navigation"


export default function ProductForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof insertProductSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(insertProductSchema) as any,
    defaultValues: insertProductDefaultValues
  })

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message } = await createNewProduct(values);

      if (!success) {
        toast.error(message)
        return
      }
      toast.success(message)
      router.replace('/admin/products')
    })
  }

  // HELPERS
  const generateSlug = (name: string) => {
    return name.toLowerCase().split(' ').join('-')
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* NAME + SLUG */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <div className="md:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'> }) => (
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
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'> }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input placeholder="auto-slug" {...field} />
                        <Button
                          type="button"
                          onClick={() => form.setValue(
                            'slug',
                            generateSlug(form.getValues('name') || '')
                          )}
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

            <FormField name="category" control={form.control}
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'category'> }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField name="brand" control={form.control}
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'> }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField name="price" control={form.control}
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'price'> }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <FormField name="unitQty" control={form.control}
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'unitQty'> }) => (
                <FormItem>
                  <FormLabel>Unit Qty</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField name="stock" control={form.control}
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'stock'> }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField name="banner" control={form.control}
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'banner'> }) => (
                <FormItem>
                  <FormLabel>Banner URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field} />
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
                    className="w-full min-h-[140px] border rounded-md p-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGE + PREVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="md:col-span-2">
              <FormField
                name="images"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://..."
                        onChange={(e) =>
                          field.onChange([e.target.value])
                        }
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      upload later
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* PREVIEW */}
            <div className="border rounded-lg flex items-center justify-center text-muted-foreground">
              Preview
            </div>

          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center border-t pt-4">

            <FormField
              name="isFeatured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel>Featured</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="bg-orange-500 hover:bg-orange-600">
              {isPending ? <Loader2 className="animate-spin"/> : <Plus />}
              Create Product
            </Button>

          </div>

        </form>
      </Form>
    </div>

  )
}
