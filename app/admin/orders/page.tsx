import React from 'react'
import AdminOrdersTable from './admin-orders-table'
import { Link } from 'lucide-react'
import { Button } from '@/components/button'
import { getAllOrders } from '@/lib/actions/action-order'
import {order} from '@/types'

const AdminOrdersPage = async ({searchParams}: {searchParams: Promise<{page: string}>}) => {
    const {page}: {page: string} = await searchParams;

    const orders = await getAllOrders({page: Number(page) || 1, limit: 10});
  return (
   <div className="min-h-screen bg-orange-50/30 px-4 py-10">
      <div className="max-w-5xl mx-auto">
      
        <h1 className="text-3xl font-bold mb-6 text-slate-900">
          Order Details
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white/20 rounded-xl p-10 text-center shadow-sm">
            <p className="text-slate-500 mb-4">There is no order to show</p>
            <Link href="/admin/overview">
              <Button>Go to overview</Button>
            </Link>
          </div>
        ) : (
          <AdminOrdersTable orders={orders} page={Number(page)} />
        )}

      </div>
    </div>
  )
}

export default AdminOrdersPage