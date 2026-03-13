// Header.tsx (SERVER)
import Cart from "@/components/ui/cart";
import Link from "next/link";
import UserButton from "./user-button";
import MobileMenu from "./mobile-menu";
import { cart, Nav } from "@/types";
import HeaderNav from "./header-nav";
import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  style: "normal",
});

export default function Header({
  cart,
  navLinks,
  children,
}: {
  cart: cart;
  navLinks: Array<Nav>;
  children?: React.ReactNode;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-orange-100/50 shadow-lg shadow-orange-100/20">
      {/* Subtle gradient overlay */}
      {/*<div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-pink-50/30 -z-10"></div>*/}

      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-28 h-10">
            <Image
              src="/logo-transparent.png"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <HeaderNav navlinks={navLinks} />
        {children}

        {/* Action buttons with enhanced styling */}
        <div className="hidden md:flex gap-3 items-center">
          <UserButton />
          <Cart cart={cart} />
        </div>

        <MobileMenu
          userButton={<UserButton mobile={true} />}
          cart={cart}
          navLinks={navLinks}
        />
      </div>
    </nav>
  );
}
