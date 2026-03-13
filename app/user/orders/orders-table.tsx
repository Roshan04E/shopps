"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { order } from "@/types";
import { formatDateTime, formatINR } from "@/util/helpers";
import Link from "next/link";
import { Button } from "@/components/button";
import Pagination from "@/components/pagination";

export default function OrdersTable({
  orders,
  page,
}: {
  orders: { data: order[]; totalPages: number };
  page: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg shadow-[#8b9c8f]/10 overflow-hidden border border-[#8b9c8f]/20"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-[#f0f4ee] to-[#e8ede6] border-b border-[#8b9c8f]/30">
            <TableHead className="text-[#2d3e2d] font-semibold">
              Order ID
            </TableHead>
            <TableHead className="text-[#2d3e2d] font-semibold">Date</TableHead>
            <TableHead className="text-[#2d3e2d] font-semibold">
              Total
            </TableHead>
            <TableHead className="text-center text-[#2d3e2d] font-semibold">
              Payment
            </TableHead>
            <TableHead className="text-center text-[#2d3e2d] font-semibold">
              Delivery
            </TableHead>
            <TableHead className="text-center text-[#2d3e2d] font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.data.map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-[#f0f4ee]/50 transition-colors duration-200"
            >
              {/* Order ID */}
              <TableCell className="font-medium py-6 border-b border-[#8b9c8f]/20">
                <span className="text-[#7fb069] font-bold">#</span>
                <span className="text-[#5a6b5a]">{order.id.slice(-6)}</span>
              </TableCell>

              {/* Date */}
              <TableCell className="font-medium py-6 border-b border-[#8b9c8f]/20 text-[#5a6b5a]">
                {formatDateTime(order.createdAt).dateTime}
              </TableCell>

              {/* Total */}
              <TableCell className="border-b py-6 border-[#8b9c8f]/20 font-semibold text-[#7fb069]">
                {formatINR(order.totalPrice)}
              </TableCell>

              {/* Payment Status */}
              <TableCell className="text-center py-6 border-b border-[#8b9c8f]/20">
                {order.isPaid ? (
                  <Badge className="bg-gradient-to-r from-[#7fb069] to-[#88b04b] text-white border-0 py-2 px-4 shadow-sm">
                    Paid
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="py-2 px-4 shadow-sm">
                    Pending
                  </Badge>
                )}
              </TableCell>

              {/* Delivery Status */}
              <TableCell className="text-center py-6 border-b border-[#8b9c8f]/20">
                {order.isDelivered ? (
                  <Badge className="bg-gradient-to-r from-[#7fb069] to-[#88b04b] text-white border-0 py-2 px-4 shadow-sm">
                    Delivered
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="py-2 px-4 border-[#8b9c8f]/50 text-[#5f7d5a] shadow-sm"
                  >
                    Processing
                  </Badge>
                )}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-center py-6 border-b border-[#8b9c8f]/20">
                <Link
                  href={`/order/${order.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {orders.totalPages > 1 && (
        <div className="bg-gradient-to-r from-[#f0f4ee] to-[#e8ede6] border-t border-[#8b9c8f]/20">
          <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
        </div>
      )}
    </motion.div>
  );
}
