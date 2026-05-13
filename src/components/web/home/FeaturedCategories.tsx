"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: 1,
    title: "Signature Necklaces",
    subtitle: "Heritage Collection",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop",
    href: "/shop/necklaces",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Celestial Rings",
    subtitle: "Modern Minimal",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3f416?q=80&w=2070&auto=format&fit=crop",
    href: "/shop/rings",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Ethereal Earrings",
    subtitle: "Evening Glow",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop",
    href: "/shop/earrings",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Bridal Couture",
    subtitle: "The Wedding Edit",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    href: "/shop/bridal",
    span: "col-span-2 row-span-1",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-32 px-6 md:px-12 bg-secondary">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6">
              Curated Masterpieces
            </h3>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              An Ode to <br /> <span className="italic">Timeless Beauty</span>
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="text-[11px] font-bold uppercase tracking-[0.3em] border-b border-primary/20 pb-3 hover:text-accent hover:border-accent transition-all"
          >
            Explore All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[1200px] md:h-[900px]">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.href}
              className={`group relative overflow-hidden bg-warm/20 ${cat.span}`}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <span className="text-white/80 text-[9px] uppercase tracking-[0.4em] mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  {cat.subtitle}
                </span>
                <h4 className="text-white text-3xl font-serif italic tracking-wide group-hover:text-accent transition-colors duration-500">
                  {cat.title}
                </h4>
                <div className="w-0 group-hover:w-16 h-[1px] bg-accent mt-4 transition-all duration-700" />
              </div>
              
              {/* Inner Accent Frame */}
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/0 group-hover:border-white/10 transition-all duration-1000 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
