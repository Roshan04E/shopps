import Header from "@/components/shared/header/header";
import { userNav } from "@/components/shared/header/navlinks";
import { getMyCart } from "@/lib/actions/action-cart";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    template: "%s | Shopps",
    default: "User"
  },
  description: "The user's dashboard",
};

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cart = await getMyCart();
  return (
    <>
    <Header navLinks={userNav} cart={cart}/>
    <div className="pt-18"></div>
    {children}
    </>
  );
}
