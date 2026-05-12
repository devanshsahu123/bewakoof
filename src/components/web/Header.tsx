"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/store/authStore";

const NAV_LINKS = [
  { label: "Collection", href: "/shop" },
  { label: "New Arrivals", href: "/new" },
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
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
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-accent ${
                  isScrolled || !isHome ? "text-primary" : "text-white"
                }`}
              >
                {link.label}
              </Link>
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
            <Link href="/" className="group">
              <h1 className={`text-2xl md:text-3xl font-serif tracking-[0.3em] uppercase transition-all ${
                isScrolled || !isHome ? "text-primary" : "text-white"
              }`}>
                Noir
              </h1>
              <div className={`h-[1px] w-0 group-hover:w-full transition-all duration-500 bg-accent mx-auto mt-1`} />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} strokeWidth={1} className="text-primary" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-serif uppercase tracking-widest text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-12 text-center">
               <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">© 2026 Noir Atelier</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
