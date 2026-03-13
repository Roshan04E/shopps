"use client";
import Cart from "@/components/ui/cart";
import { cart, Nav } from "@/types";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function MobileMenu({
  navLinks,
  cart,
  userButton,
}: {
  navLinks: Nav[];
  cart: cart;
  userButton: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const cartItemNum = cart?.items.reduce((acc, item) => acc + item.qty, 0) ?? 0;

  return (
    <>
      {/* Hamburger button with sage green */}
      <button
        className="
          md:hidden ml-auto relative
          w-10 h-10 rounded-lg
          flex items-center justify-center
          bg-gradient-to-br from-[#7fb069] to-[#88b04b]
          text-white
          hover:shadow-lg hover:shadow-[#7fb069]/30
          active:scale-95
          transition-all duration-300
        "
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}

        {/* Cart badge with sage green */}
        {cartItemNum > 0 && !open && (
          <span
            className="
            absolute -top-1 -right-1
            bg-gradient-to-br from-[#7fb069] to-[#88b04b]
            text-white text-xs font-bold
            w-5 h-5 rounded-full
            flex items-center justify-center
            shadow-md shadow-[#7fb069]/40
            ring-2 ring-white
          "
          >
            {cartItemNum}
          </span>
        )}
      </button>

      {/* Mobile menu dropdown */}
      {open && (
        <div
          className="
          md:hidden fixed top-[73px] left-0 right-0 z-50
          bg-white/95 backdrop-blur-lg
          border-t border-[#8b9c8f]/30
          shadow-2xl shadow-[#8b9c8f]/10
          flex flex-col gap-6 p-8 items-center justify-center
          animate-in slide-in-from-top duration-300
        "
        >
          {/* Subtle sage gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f4ee]/50 via-[#e8ede6]/30 to-[#d4e0d1]/40 -z-10"></div>

          {/* Navigation links with sage hover */}
          {navLinks.map((item) => (
            <a
              key={item.menu}
              href={`#${item.link.toLowerCase().replace(" ", "-")}`}
              onClick={() => setOpen(false)}
              className="
                text-lg font-semibold text-[#5a6b5a]
                hover:bg-gradient-to-r hover:from-[#7fb069] hover:to-[#88b04b]
                hover:bg-clip-text hover:!text-transparent
                transition-all duration-300
                py-2 px-4 rounded-lg
              "
            >
              {item.menu}
            </a>
          ))}

          {/* Divider with sage gradient */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#8b9c8f]/50 to-transparent my-2"></div>

          {/* User button with sage border */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7fb069] to-[#88b04b] rounded-full opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative border-2 border-transparent rounded-full bg-white">
              {userButton}
            </div>
          </div>

          {/* Cart component */}
          <Cart cart={cart} />
        </div>
      )}
    </>
  );
}
