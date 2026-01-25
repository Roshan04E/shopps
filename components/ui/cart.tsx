'use client'
import React from 'react'
import { Button } from '../button'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { cart } from '@/types/index'

function Cart({ cart }: { cart?: cart }) {
    const cartItemNum = cart?.items.reduce((acc, item) => acc + item.qty, 0) ?? 0;

    return (
        <Link href={'/cart'}>
            <Button className="
                relative group gap-2
                bg-gradient-to-r from-orange-500 to-pink-500
                text-white font-semibold
                hover:shadow-lg hover:shadow-orange-300/50
                hover:scale-105
                active:scale-95
                transition-all duration-300
                px-4 py-2.5 rounded-full
            ">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/ to-pink-300 opacity-0 group-hover:opacity-100 blur-md -z-10 rounded-full transition-opacity duration-300"></div>
                
                <ShoppingBag size={18} className="group-hover:scale-110 transition-transform duration-300" />
                
                <div className='flex gap-2 items-center'>
                    <span>Cart</span>
                    {cart && cart?.items.length > 0 && (
                        <div className='
                            flex items-center justify-center
                            h-7 w-7 rounded-full
                            bg-white text-orange-600
                            font-bold text-sm
                            shadow-lg
                            ring-2 ring-white/50
                            animate-pulse
                        '>
                            <span>{cartItemNum}</span>
                        </div>
                    )}
                </div>
            </Button>
        </Link>
    )
}

export default Cart