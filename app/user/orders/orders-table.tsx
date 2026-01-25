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
import { order } from "@/types"
import { formatDateTime, formatINR } from "@/util/helpers"
import Link from "next/link"
import { Button } from "@/components/button"
import Pagination from "@/components/pagination"

export default function OrdersTable({ orders, page }: { orders: {data: order[], totalPages: number}, page: number }) {
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
                                <span className="text-orange-400 font-bold">#</span>{order.id.slice(-6)}
                            </TableCell>

                            <TableCell className="font-medium py-6 border-b border-orange-200/30">
                                {formatDateTime(order.createdAt).dateTime}
                            </TableCell>

                            <TableCell className="border-b py-6 border-orange-200/30">
                                {formatINR(order.totalPrice)}
                            </TableCell>

                            <TableCell className="text-center py-6 border-b border-orange-200/30">
                                {order.isPaid ? (
                                    <Badge className="bg-green-100 text-green-700 py-2 px-4">
                                        Paid
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive" className="py-2 px-4">
                                        Pending
                                    </Badge>
                                )}
                            </TableCell>

                            <TableCell className="text-center py-6 border-b border-orange-200/30">
                                {order.isDelivered ? (
                                    <Badge className="bg-green-100 text-green-700 py-2 px-4">
                                        Delivered
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="py-2 px-4">
                                        Processing
                                    </Badge>
                                )}
                            </TableCell>

                            <TableCell className="text-center py-6 border-b border-orange-200/30">
                                <Link 
                                    href={`/order/${order.id}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button>Details</Button>
                                </Link>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        {
            orders.totalPages > 1 && (<Pagination page={ Number(page) || 1} totalPages={orders.totalPages}/>)
        }
        </motion.div>
    )
}
