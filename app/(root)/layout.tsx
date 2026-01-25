import Header from "@/components/shared/header/header";
import { mainNav } from "@/components/shared/header/navlinks";
import { getMyCart } from "@/lib/actions/action-cart";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = await getMyCart();

  return (
    <div className="min-h-screen">
      <Header navLinks={mainNav} cart={cart} />
      {children}
    </div>
  );
}