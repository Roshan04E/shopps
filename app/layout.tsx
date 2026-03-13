import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Shopps",
    default: "Shopps",
  },
  description: "Shopps – fresh vegetables delivered daily from local farms.",
  icons: {
    icon: [
      {
        url: "/icon-light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        suppressHydrationWarning
        className={`antialiased ${inter.variable} font-sans text-slate-800 selection:bg-orange-200`}
      >
        <NextTopLoader color="#ff7a00" height={3} showSpinner={false} />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
