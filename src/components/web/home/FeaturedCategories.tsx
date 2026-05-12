"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: 1,
    title: "The Atelier",
    subtitle: "New Season Men",
    image: "https://images.unsplash.com/photo-1516250442037-37562e14a09c?q=80&w=1974&auto=format&fit=crop",
    href: "/shop/men",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Ethereal",
    subtitle: "Womenswear",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    href: "/shop/women",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Objects",
    subtitle: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    href: "/shop/accessories",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Urban",
    subtitle: "Streetwear",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop",
    href: "/shop/streetwear",
    span: "col-span-2 row-span-1",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4">
              Curated Selection
            </h3>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              A Symphony of <br /> <span className="italic">Style & Substance</span>
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="text-[12px] font-bold uppercase tracking-[0.2em] border-b border-primary pb-2 hover:text-accent hover:border-accent transition-all"
          >
            View All Collections
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[1000px] md:h-[800px]">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.href}
              className={`group relative overflow-hidden bg-secondary ${cat.span}`}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-white/70 text-[10px] uppercase tracking-[0.3em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {cat.subtitle}
                </span>
                <h4 className="text-white text-3xl font-serif italic tracking-wide group-hover:text-accent transition-colors">
                  {cat.title}
                </h4>
              </div>
              
              {/* Corner accent border on hover */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
