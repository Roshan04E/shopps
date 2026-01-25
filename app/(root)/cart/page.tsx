import Header from '@/components/shared/header/header'
import React from 'react'
import CartTable from './cart-table'
import { getMyCart } from '@/lib/actions/action-cart'

async function Cart() {
    const cart  = await getMyCart();
    return (
        <>
            {/* <Header cart={cart} /> */}
            <div className="min-h-screen bg-orange-50/30 font-sans text-slate-800 selection:bg-orange-200">
                <CartTable cart={cart}/>
            </div>
        </>
    )
}

export default Cart