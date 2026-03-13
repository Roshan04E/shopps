"use client";
import { Button } from "@/components/button";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="relative bg-[#2d3e2d] text-white pt-20 pb-10 overflow-hidden">
      {/* Soft sage background blobs - animation only on desktop */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#7fb069]/10 to-[#88b04b]/10 rounded-full blur-3xl md:animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#8b9c8f]/10 to-[#a8b5a0]/10 rounded-full blur-3xl md:animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#7fb069] to-[#88b04b] bg-clip-text !text-transparent">
              Ready to eat better?
            </h2>
            <p className="text-[#c4d3c0] text-lg mb-8">
              Join mGreens today and get fresh, local groceries delivered to
              your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <Button
                  variant="glass"
                  className="bg-gradient-to-r from-[#7fb069] to-[#88b04b] text-white hover:shadow-lg hover:shadow-[#7fb069]/30 w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#5f7d5a] text-[#c4d3c0] hover:bg-[#3d4e3d] w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Waitlist Card */}
          <div className="bg-[#3d4e3d]/90 backdrop-blur-sm rounded-2xl p-8 text-center border border-[#5f7d5a]/50 shadow-xl shadow-[#8b9c8f]/10">
            <span className="text-6xl mb-4 block">🥬</span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#7fb069] to-[#88b04b] bg-clip-text !text-transparent">
              Fresh Vegetables, Delivered Daily
            </h3>
            <p className="text-[#c4d3c0] text-sm mt-2">
              Supporting local farmers in Khunti since 2026
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#5f7d5a]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a8b5a0]">
          <p>© {new Date().getFullYear()} mGreens. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-[#7fb069] transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#7fb069] transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="/shipping-policy"
              className="hover:text-[#7fb069] transition-colors duration-300"
            >
              Shipping
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#7fb069] transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
