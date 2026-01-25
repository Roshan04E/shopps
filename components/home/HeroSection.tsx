'use client'

import { ArrowRight, Clock, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { getISTHour } from "@/lib/actions/server-helping-actions";
import { motion } from "framer-motion";
import Link from "next/link";


export default function HeroSection() {
  const [slot, setSlot] = useState("Loading…");
  const [isPending, startTransition] = useTransition()

  useEffect(() => {

    startTransition(async () => {
      const hour = await getISTHour();
      console.log(hour)
      if (hour < 5) setSlot("Today 6–8 PM");
      else if (hour < 7) setSlot("Today 6–8 PM");
      else if (hour < 17) setSlot("Today 6–8 PM");
      else if (hour < 19) setSlot("Tomorrow 6–8 AM");
      else setSlot("Tomorrow 5–7 AM");
    })
  }, []);


  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 right-0 -z-10 w-150 h-150 bg-gradient-to-br from-orange-300 to-pink-400 rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/4 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-150 h-150 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-full blur-3xl opacity-25 -translate-x-1/4 translate-y-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div className="space-y-8 animate-in slide-in-from-left duration-700">
          {/* Status badge with gradient */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-orange-200/50 rounded-full px-4 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <span className="flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-lg shadow-green-400/50"></span>
            <span className="text-xs font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text !text-transparent uppercase tracking-wide">Serving Local 2026, Khunti</span>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
            Fresh <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text !text-transparent">Groceries</span>,<br />
            Delivered at <span className="relative whitespace-nowrap bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text !text-transparent">
              Your Doorsteps
              {/* Animated gradient underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-orange-400 -z-10 animate-pulse" viewBox="0 0 100 10" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path d="M0 5 Q 50 10 100 5" stroke="url(#underlineGradient)" strokeWidth="8" fill="none" />
              </svg>
            </span>.
          </h1>

          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            Support local farmers and enjoy the freshest produce delivered straight to your doorstep within the same city. No hidden fees.
          </p>

          {/* CTA Buttons with gradients */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-500rounded-full blur-lg opacity-40 group-hover:opacity-75 transition duration-300 animate-pulse"></div>
              <Link href={'#menu'}>
                <Button
                  variant="glass"
                  className="
                  relative h-14 px-8 text-lg font-semibold w-full sm:w-auto
                  bg-gradient-to-r from-orange-500 to-pink-400
                  text-white
                  hover:shadow-2xl hover:shadow-orange-300/50
                  hover:scale-105
                  active:scale-95
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
                >
                  Order Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <Link href={'/product/family-box-001'}>
            <Button
              variant="outline"
              className="
                h-14 px-8 text-lg border-2 w-full sm:w-auto
                border-orange-300
                text-orange-600 font-semibold
                hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50
                hover:border-orange-400
                hover:scale-105
                active:scale-95
                transition-all duration-300
              "
            >
              View Weekly Box
            </Button>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative animate-in slide-in-from-right duration-1000 delay-200">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/5 md:aspect-square group">
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-linear-to-br from-orange-400 to-pink-200 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>

            <Image
              src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000&auto=format&fit=crop"
              alt="Healthy food"
              fill
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 rounded-3xl"
            />

            {/* Freshness card with gradient */}
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow hover:scale-110 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-full text-white shadow-lg">
                <Leaf size={24} />
              </div>
              <div>
                <p className="text-xs bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text !text-transparent font-bold uppercase tracking-wide">Freshness</p>
                <p className="font-bold text-slate-800">100% Organic</p>
              </div>
            </div>

            {/* Delivery card with gradient
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-110 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2 rounded-full text-white shadow-lg">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent! font-bold uppercase tracking-wide">Next Delivery Slot</p>
                <span className="font-bold text-2xl text-slate-800">{slot}</span>
              </div>
            </div> */}

            <motion.div
              className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >


              <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2 rounded-full text-white shadow-lg">
                <Clock size={24} />
              </div>

              <div>
                <p className="text-xs bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text !text-transparent font-bold uppercase tracking-wide">
                  Next Delivery Slot
                </p>
                <span className="font-bold text-2xl text-slate-800">{slot}</span>
              </div>
            </motion.div>


          </div>
        </div>

      </div>
    </section>
  );
}