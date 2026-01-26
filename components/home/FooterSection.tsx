"use client";

import { Button } from "@/components/button";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="relative bg-slate-900 text-white pt-20 pb-10 overflow-hidden">
      {/* background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Ready to eat better?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Join Shopps today and get fresh, local groceries.
            </p>

            <div className="flex gap-4">
              <Link href="/about">
                <Button
                  variant="glass"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                >
                  Get Started
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Waitlist */}
          <div className="bg-slate-800/90 rounded-2xl p-8 text-center border border-slate-700">
            <span className="text-6xl mb-4 block">🥑</span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Join the waitlist for 2026
            </h3>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Shopps Inc.</p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-orange-400">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-orange-400">
              Terms
            </Link>
            <Link href="/shipping-policy" className="hover:text-orange-400">
              Shipping
            </Link>
            <Link href="/contact" className="hover:text-orange-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
