import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center min-h-screen w-full mx-auto">
      {children}
    </div>
  );
}