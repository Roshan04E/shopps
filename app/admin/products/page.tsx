

import React from 'react'
import AdminProductsTable from './admin-products-table';
import { Product } from '@/types';
import { getAllProducts } from '@/lib/actions/action-products';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AdminProductsPage = async ({ searchParams }: { searchParams: Promise<{ page: number, query: string, category: string }> }) => {
    const { page, query, category } = await searchParams;
    const Products = await getAllProducts({ page, limit: 8, query, category })

    return (
        <div className="min-h-screen bg-orange-50/30 px-4 py-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between pb-6 px-4">
                    <h1 className="text-3xl font-bold  text-slate-900">
                        Products Details
                    </h1>
                    <Button
                        asChild
                        className='w-8 h-8 rounded-full'
                    >
                        <Link href="/admin/products/new">
                               <Plus />
                        </Link>
                    </Button>

                </div>

                {Products.data.length === 0 ? (
                    <div className="bg-white/20 rounded-xl p-10 text-center shadow-sm">
                        <p className="text-slate-500 mb-4">There is no product to show</p>
                        <Link href="/admin/overview">
                            <Button className='rounded-full bg-gray-800'>Go to overview</Button>
                        </Link>
                    </div>
                ) : (
                    <AdminProductsTable products={Products} page={page} />
                )}

            </div>
        </div>
    )
}

export default AdminProductsPage