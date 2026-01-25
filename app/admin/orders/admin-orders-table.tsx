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
import { PaginatedOrders } from "@/types"
import { formatDateTime, formatINR } from "@/util/helpers"
import Link from "next/link"
import { Button } from "@/components/button"
import Pagination from "@/components/pagination"
import DeleteDialogue from "@/components/shared/delete-dialogue"
import { deleteOrderById } from "@/lib/actions/action-order"
import { PenSquare, ScanBarcode } from "lucide-react"
import { Button as Button2 } from "@/components/ui/button"

export default function AdminOrdersTable({
    orders,
    page,
}: {
    orders: PaginatedOrders
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
                        <TableHead>Order ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-center">Payment</TableHead>
                        <TableHead className="text-center">Delivery</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.data.map((order) => (
                        <TableRow key={order.id}>

                            <TableCell className="font-medium py-6 border-b border-orange-200/30">
                                <span className="text-orange-400 font-bold">#</span>
                                {order.id.slice(-6)}
                            </TableCell>

                            <TableCell className="py-6 border-b border-orange-200/30">
                                <p className="font-semibold">{order.user.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {order.user.email}
                                </p>
                            </TableCell>

                            <TableCell className="py-6 border-b border-orange-200/30">
                                {formatDateTime(new Date(order.createdAt)).dateTime}
                            </TableCell>

                            <TableCell className="py-6 border-b border-orange-200/30">
                                {formatINR(Number(order.totalPrice))}
                            </TableCell>

                            <TableCell className="text-center py-6 border-b border-orange-200/30">
                                {order.isPaid ? (
                                    <Badge className="bg-green-100 text-green-700 px-4 py-2">
                                        Paid
                                    </Badge>
                                ) : (
                                    <>
                                        <Badge variant="destructive" className="px-4 py-2 bg-red-400">
                                            Pending
                                        </Badge>
                                    </>
                                )}
                            </TableCell>

                            <TableCell className="text-center py-6 border-b border-orange-200/30">
                                {order.isDelivered ? (
                                    <Badge className="bg-green-100 text-green-700 px-4 py-2">
                                        Delivered
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="px-4 py-2">
                                        Processing
                                    </Badge>
                                )}
                            </TableCell>

                            <TableCell className="space-x-2 text-center py-6 border-b border-orange-200/30">
                                <Link
                                    href={`/order/${order.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button2 variant="outline" className="w-8 h-8 bg-transparent rounded-full"><PenSquare /></Button2>
                                </Link>
                                <DeleteDialogue id={order.id} action={deleteOrderById} />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>

            {orders.totalPages > 1 && (
                <Pagination
                    page={Number(page) || 1}
                    totalPages={orders.totalPages}
                />
            )}
        </motion.div>
    )
}
