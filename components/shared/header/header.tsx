// Header.tsx (SERVER)
import Cart from "@/components/ui/cart"
import Link from "next/link"
import UserButton from "./user-button"
import MobileMenu from "./mobile-menu"
import { cart, Nav } from "@/types"
import HeaderNav from "./header-nav"
import React from "react"

export default function Header({cart, navLinks, children}: {cart: cart, navLinks: Array<Nav>, children?:React.ReactNode}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-orange-100/50 shadow-lg shadow-orange-100/20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-pink-50/30 -z-10"></div>
      
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with gradient */}
        <Link href="/" className="flex gap-2 items-center group">
          <div className="relative">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg text-white font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              S
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text !text-transparent">
            Shopps
          </span>
        </Link>

        <HeaderNav navlinks={navLinks}/>
        {children}

        {/* Action buttons with enhanced styling */}
        <div className="hidden md:flex gap-3 items-center">
          <UserButton />
          <Cart cart={cart}/>
        </div>

        <MobileMenu userButton={<UserButton mobile={true} />} cart={cart} navLinks={navLinks} />
      </div>
    </nav>
  )
}