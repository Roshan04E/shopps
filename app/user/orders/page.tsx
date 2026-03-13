import { getMyOrders } from "@/lib/actions/action-order";
import OrdersTable from "./orders-table";
import { order } from "@/types";
import Link from "next/link";
import { Button } from "@/components/button";
import { auth } from "@/auth";

async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const orders = await getMyOrders({ page: Number(page) || 1, limit: 6 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9f7] to-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#7fb069] via-[#88b04b] to-[#7fb069] bg-clip-text text-transparent">
          My Orders
        </h1>

        {/* Empty State or Orders Table */}
        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-10 text-center shadow-lg shadow-[#8b9c8f]/10 border border-[#8b9c8f]/20">
            <div className="mb-6">
              <span className="text-6xl">🛒</span>
            </div>
            <p className="text-[#5a6b5a] text-lg mb-6">
              There are no orders to show
            </p>
            <Link href="/">
              <Button className="hover:scale-105 transition-transform duration-200">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <OrdersTable orders={orders} page={Number(page)} />
        )}
      </div>
    </div>
  );
}

export default OrderPage;
