"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/store/authStore";

const NAV_LINKS = [
  { 
    label: "Jewelry", 
    href: "/shop",
    submenu: [
      { label: "Necklaces", href: "/shop/necklaces" },
      { label: "Earrings", href: "/shop/earrings" },
      { label: "Rings", href: "/shop/rings" },
      { label: "Bracelets", href: "/shop/bracelets" },
    ]
  },
  { label: "Bridal", href: "/shop/bridal" },
  { label: "Gold", href: "/shop/gold" },
  { label: "Silver", href: "/shop/silver" },
  { label: "Collections", href: "/collections" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md border-b border-warm/30 py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:text-accent flex items-center gap-1.5 ${
                    isScrolled || !isHome ? "text-primary" : "text-white"
                  }`}
                >
                  {link.label}
                  {link.submenu && <ChevronDown size={12} className="opacity-50" />}
                </Link>
                
                {link.submenu && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white shadow-2xl border border-warm/20 p-6 min-w-[200px]">
                      {link.submenu.map((sub) => (
                        <Link 
                          key={sub.label}
                          href={sub.href}
                          className="block text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent py-2.5 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Left: Mobile Menu Trigger */}
          <div className="lg:hidden flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={isScrolled || !isHome ? "text-primary" : "text-white"}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-none text-center">
            <Link href="/" className="group flex flex-col items-center">
              <h1 className={`text-2xl md:text-4xl font-serif tracking-[0.4em] uppercase transition-all ${
                isScrolled || !isHome ? "text-primary" : "text-white"
              }`}>
                Siyapaa
              </h1>
              <span className={`text-[8px] uppercase tracking-[0.5em] transition-all -mt-1 ${
                isScrolled || !isHome ? "text-accent" : "text-white/60"
              }`}>
                Luxury Jewelry
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className={`flex items-center justify-end gap-6 flex-1 ${
            isScrolled || !isHome ? "text-primary" : "text-white"
          }`}>
            <button className="hidden md:block hover:text-accent transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link href="/wishlist" className="hidden md:block hover:text-accent transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/profile" className="hover:text-accent transition-colors flex items-center gap-2">
              <User size={20} strokeWidth={1.5} />
              {isAuthenticated && (
                <span className="hidden xl:block text-[10px] font-bold uppercase tracking-widest">
                  {user?.name?.split(" ")[0]}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative group">
              <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:text-accent transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[200] bg-secondary flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-warm/20">
              <h2 className="font-serif text-xl tracking-widest uppercase">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} strokeWidth={1.5} className="text-primary" />
              </button>
            </div>
            
            <nav className="flex flex-col p-8 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif uppercase tracking-widest text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="mt-auto p-12 text-center border-t border-warm/20">
               <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">© 2026 Siyapaa Jewelers</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
