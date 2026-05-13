"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Gallery", href: "/shop" },
  { icon: ShoppingBag, label: "Bag", href: "/cart" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: User, label: "Profile", href: "/auth" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-warm/20 z-[150] px-6 py-4 pb-8">
      <div className="flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex flex-col items-center gap-1.5 relative"
            >
              <div className={`p-2 rounded-full transition-all duration-500 ${
                isActive ? "bg-accent/10 text-accent" : "text-gray-400"
              }`}>
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-widest ${
                isActive ? "text-accent" : "text-gray-400"
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="mobileActive"
                  className="absolute -top-1 w-1 h-1 bg-accent rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
