"use client";
import React from "react";
import { Button } from "../button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cart } from "@/types/index";

function Cart({ cart }: { cart?: cart }) {
  const cartItemNum = cart?.items.reduce((acc, item) => acc + item.qty, 0) ?? 0;

  return (
    <Link href={"/cart"}>
      <Button
        className="
                relative group gap-2
                bg-gradient-to-r from-[#7fb069] to-[#88b04b]
                text-white font-semibold
                hover:shadow-lg hover:shadow-[#7fb069]/30
                hover:scale-105
                active:scale-95
                transition-all duration-300
                px-4 py-2.5 rounded-full
            "
      >
        {/* Soft glow effect - hidden on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7fb069] to-[#88b04b] opacity-0 group-hover:opacity-100 blur-md -z-10 rounded-full transition-opacity duration-300 hidden md:block"></div>

        <ShoppingBag
          size={18}
          className="md:group-hover:scale-110 transition-transform duration-300"
        />

        <div className="flex gap-2 items-center">
          <span>Cart</span>
          {cart && cart?.items.length > 0 && (
            <div
              className="
                            flex items-center justify-center
                            h-7 w-7 rounded-full
                            bg-white text-[#7fb069]
                            font-bold text-sm
                            shadow-lg
                            ring-2 ring-white/50
                        "
            >
              <span>{cartItemNum}</span>
            </div>
          )}
        </div>
      </Button>
    </Link>
  );
}

export default Cart;
