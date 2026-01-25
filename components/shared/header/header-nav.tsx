'use client'
import { cn } from '@/lib/utils'
import { Nav } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function HeaderNav({ navlinks, className }: { navlinks: Array<Nav>, className?: React.HTMLAttributes<HTMLElement> }) {
  const pathName = usePathname();

  return (
    <div className="hidden md:flex gap-2">
      {navlinks.map(item => {
        const isActive = pathName?.includes(item.link);

        return (
          <Link key={item.menu} href={`${item.link.toLowerCase().replace(" ", "-")}`}>
            <span
              className={cn(
                'relative py-2 px-4 rounded-full transition-all duration-300 font-medium group',
                isActive
                  ? 'text-orange-500 font-bold'
                  : 'text-slate-700 hover:text-orange-500',
                className
              )}
            >
              {/* Active underline */}
              <span
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-500',
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                )}
                style={{ transformOrigin: 'left' }}
              ></span>

              {item.menu}
            </span>
          </Link>

        );
      })}
    </div>
  )
}

export default HeaderNav