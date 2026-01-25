import { formatINR } from "@/util/helpers"
import Link from "next/link"
import { cart } from "@/types"
import { Button } from "@/components/button"
import TableRowContainer from "./table-row"

export default async function CartPage({ cart }: { cart: cart }) {
    const items = cart?.items ?? []
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
    const shipping = cart?.shippingPrice ?? 0

    return (
        <div className="min-h-screen bg-orange-50/30 text-slate-800 pb-28 md:pb-0">
            <main className="container mx-auto px-4 pt-28 pb-16">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

                {/* GRID FOR DESKTOP */}
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    {/* ITEMS */}
                    <div className="md:col-span-2 space-y-4 md:space-y-6">
                        {items.length === 0 && (
                            <div className="bg-white/20 rounded-xl p-10 text-center shadow-sm">
                                <p className="text-slate-500 mb-4">Your cart is empty</p>
                                <Link href="/">
                                    <Button>Continue shopping</Button>
                                </Link>
                            </div>
                        )}

                        {items.map(item => (
                            <TableRowContainer key={item.productId} item={item} />
                        ))}
                    </div>

                    {/* DESKTOP SUMMARY */}
                    {items.length !== 0 && (<aside className="hidden md:block md:col-span-1">
                        <div className="sticky top-32 bg-white/60 rounded-2xl p-6 shadow-sm">
                            <h2 className="font-bold mb-4">Order Summary</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatINR(subtotal)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <span>{formatINR(shipping)}</span>
                                </div>

                                {subtotal > 99 && (
                                    <div className="flex items-center gap-2 text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-orange-500 to-pink-500 text-xs">
                                        Free delivery unlocked
                                    </div>
                                )}
                            </div>

                            <Link href="/shipping-address">
                                <Button className="w-full mt-6 h-12">Checkout</Button>
                            </Link>
                        </div>
                    </aside>)}
                </div>
            </main>

            {/* MOBILE STICKY CHECKOUT */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <div>
                        <p className="text-xs text-slate-500">Sub Total</p>
                        <p className="font-bold">{formatINR(subtotal)}</p>
                    </div>

                    <Link href="/shipping-address">
                        <Button className="h-11 px-6 ">Checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
