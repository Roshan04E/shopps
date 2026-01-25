


'use client'

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, cart } from "@/types";
import SmallProductCard from "@/components/ui/small-product-cart";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";




function MenuPage({
    cart,
    products,
    initialSearch = ''
}: {
    cart: cart;
    products: Product[];
    initialSearch?: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(initialSearch);
    const [isPending, startTransition] = useTransition();

    const handleSearch = (value: string) => {
        setSearch(value);

        const params = new URLSearchParams(searchParams?.toString() || '');
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        params.delete('page'); // Reset to page 1 on new search

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Our Items</h2>

            <div className="w-full flex justify-center mb-8">
    <div className="w-full max-w-4xl">
        <div className="">
            {/* <Search 
                size={20} 
                strokeWidth={2.5}
                className="absolute left-5 top-1/2 -translate-y-1/2
                         text-gray-400 pointer-events-none z-10"
            /> */}
            
            <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => handleSearch(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
    className="w-full h-14 text-base border-2 border-gray-200 
               rounded-xl focus:outline-none focus:border-orange-500 
               focus:ring-2 focus:ring-orange-100 transition-all
               placeholder:text-gray-400 bg-white shadow-sm
               hover:border-gray-300 pl-4"
/>

            {isPending && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-orange-500 
                                  border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>

        {isPending && (
            <p className="mt-3 text-sm text-gray-500 text-center animate-pulse">
                Searching products...
            </p>
        )}
    </div>
</div>


            {products.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                    No products found{search && ` for "${search}"`}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <SmallProductCard key={product.id} product={product} cart={cart} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuPage;