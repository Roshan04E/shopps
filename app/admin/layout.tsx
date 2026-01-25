import { auth } from "@/auth";
import Header from "@/components/shared/header/header";
import { adminNav} from "@/components/shared/header/navlinks";
import { getMyCart } from "@/lib/actions/action-cart";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: {
    template: "%s | Shopps",
    default: "Admin"
  },
  description: "The admin's dashboard",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // await requireAdmin()
  const session = await auth();
  
  if (session?.user.role !== 'admin') {
    redirect('/unauthorized')
  }

  const cart = await getMyCart();
  return (
    <>
    <Header navLinks={adminNav} cart={cart}><>Search...</></Header>
    <div className="pt-18 min-h-screen w-full">
    {children}
    </div>
    </>
  );
}
