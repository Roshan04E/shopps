import { getMyOrders } from "@/lib/actions/action-order"
import OrdersTable from "./orders-table"
import { order } from "@/types"
import Link from "next/link"
import { Button } from "@/components/button"
import { auth } from "@/auth"

async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const { page } = await searchParams
  const orders = await getMyOrders({ page: Number(page) || 1, limit: 6 })
  // console.log(orders);



  return (
    <div className="min-h-screen bg-orange-50/30 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-slate-900 text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-orange-500 to-pink-500">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white/20 rounded-xl p-10 text-center shadow-sm">
            <p className="text-slate-500 mb-4">There is no order to show</p>
            <Link href="/">
              <Button>Continue shopping</Button>
            </Link>
          </div>
        ) : (
          <OrdersTable orders={orders} page={Number(page)} />
        )}

      </div>
    </div>
  )
}

export default OrderPage
