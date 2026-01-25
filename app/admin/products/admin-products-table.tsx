// import { Product } from '@/types'
// import React from 'react'

// const AdminProductsTable = ({products}: {products: {data: Product[], totalPages: number}}) => {
//     console.log(products);


//   return (
//     <div>AdminProductsTable</div>
//   )
// }

// export default AdminProductsTable

"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { formatINR } from "@/util/helpers"
import Pagination from "@/components/pagination"
import DeleteDialogue from "@/components/shared/delete-dialogue"
import { deleteProductById } from "@/lib/actions/action-products"
import { Button, Button as Button2 } from "@/components/ui/button"
import { PenLineIcon, PenSquare } from "lucide-react"
import Link from "next/link"
import { Product } from "@/types"
import Image from "next/image"
import UpdateProduct from "./update-products"
import UpdateProductCopy from "./update-products copy"

export default function AdminProductsTable({
    products,
    page,
}: {
    products: { data: Product[]; totalPages: number }
    page: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/40 rounded-xl shadow-lg overflow-hidden"
        >
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead><span className="pl-2">Details</span></TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.data.map((product) => (
                        <TableRow key={product.id} >
                            <TableCell className="relative border-b space-x-2">
                                <Link href={`/product/${product.slug}`}>
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover p-2 rounded-2xl"
                                    />
                                </Link>
                            </TableCell>

                            <TableCell className="font-medium py-6 border-b w-10">
                                <div className="pl-2">
                                    <div className="truncate">
                                        <span className="text-orange-400 font-bold">#</span>
                                        {product.id.slice(-6)}
                                    </div>

                                    <p className="font-semibold truncate">
                                        {product.name}
                                    </p>

                                    <p className="text-xs text-muted-foreground truncate">
                                        {product.brand}
                                    </p>
                                </div>
                            </TableCell>

                            <TableCell className="py-6 border-b">
                                {product.category}
                            </TableCell>

                            <TableCell className="py-6 border-b">
                                {formatINR(Number(product.price))}
                            </TableCell>

                            <TableCell className="py-6 border-b">
                                {product.stock}
                            </TableCell>

                            <TableCell className="py-6 border-b">
                                {product.isFeatured ? (
                                    <Badge className="bg-green-100 text-green-700">
                                        Yes
                                    </Badge>
                                ) : (
                                    <Badge variant="outline">No</Badge>
                                )}
                            </TableCell>

                            <TableCell className="items-center py-6 border-b ">
                                <div className="flex gap-2 items-center justify-center">
                                    <UpdateProduct product={{
                                        ...product,
                                        price: Number(product.price),
                                        unitQty: Number(product.unitQty),
                                        stock: Number(product.stock)
                                    }} />

                                    
                                    {/* <Link href={`/admin/products/update/${product.id}`}>
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <PenLineIcon className="h-4 w-4" />
                                        </Button>
                                    </Link> */}



                                    <DeleteDialogue
                                        id={product.id}
                                        action={deleteProductById}
                                    />
                                </div>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>

            {products.totalPages > 1 && (
                <Pagination
                    page={Number(page) || 1}
                    totalPages={products.totalPages}
                />
            )}
        </motion.div>
    )
}
