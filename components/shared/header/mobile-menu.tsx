// mobile-menu.tsx
'use client'

import Cart from "@/components/ui/cart"
import { cart, Nav } from "@/types"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function MobileMenu({ navLinks, cart, userButton }: { navLinks: Nav[], cart: cart, userButton: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const cartItemNum = cart?.items.reduce((acc, item) => acc + item.qty, 0) ?? 0;

  return (
    <>
      {/* Hamburger button with gradient effects */}
      <button 
        className="
          md:hidden ml-auto relative
          w-10 h-10 rounded-lg
          flex items-center justify-center
          bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500
          text-white
          hover:shadow-lg hover:shadow-orange-300/50
          hover:scale-110
          active:scale-95
          transition-all duration-300
        " 
        onClick={() => setOpen(!open)}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 opacity-0 hover:opacity-100 blur-md -z-10 rounded-lg transition-opacity duration-300"></div>
        
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        
        {/* Cart badge with gradient */}
        {cartItemNum > 0 && !open && (
          <span className="
            absolute -top-1 -right-1
            bg-gradient-to-br from-red-500 to-pink-600
            text-white text-xs font-bold
            w-5 h-5 rounded-full
            flex items-center justify-center
            shadow-lg shadow-red-400/50
            animate-pulse
            ring-2 ring-white
          ">
            {cartItemNum}
          </span>
        )}
      </button>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="
          md:hidden fixed top-[73px] left-0 right-0 z-50
          bg-white/95 backdrop-blur-lg
          border-t border-orange-100/50
          shadow-2xl shadow-orange-100/30
          flex flex-col gap-6 p-8 items-center justify-center
          animate-in slide-in-from-top duration-300
        ">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-pink-50/30 to-purple-50/40 -z-10"></div>
          
          {/* Navigation links with gradient hover */}
          {navLinks.map(item => (
            <a 
              key={item.menu} 
              href={`#${item.link.toLowerCase().replace(" ", "-")}`} 
              onClick={() => setOpen(false)}
              className="
                text-lg font-semibold text-slate-700
                hover:bg-gradient-to-r hover:from-orange-600 hover:via-pink-600 hover:to-purple-600
                hover:bg-clip-text hover:!text-transparent
                transition-all duration-300
                py-2 px-4 rounded-lg
                hover:scale-110
              "
            >
              {item.menu}
            </a>
          ))}
          
          {/* Divider with gradient */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent my-2"></div>
          
          {/* User button with gradient border */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
            <div className="relative border-2 border-transparent rounded-full bg-white">
              {userButton}
            </div>
          </div>
          
          {/* Cart component */}
          <Cart cart={cart} />
        </div>
      )}
    </>
  )
}