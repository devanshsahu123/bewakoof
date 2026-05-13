"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BridalCollection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1620311394625-f7166e4a2c04?q=80&w=2070&auto=format&fit=crop"
        alt="Bridal Collection"
        fill
        className="object-cover object-[center_30%]"
      />
      {/* Elegant Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="text-accent text-[12px] font-bold uppercase tracking-[0.6em] mb-8">
              The Wedding Edit 2026
            </h3>
            <h2 className="text-white text-5xl md:text-8xl font-serif italic mb-10 leading-[1.1] tracking-tight">
              A Love Affair <br /> <span className="not-italic font-normal">With Heritage</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-light mb-14 max-w-xl leading-relaxed tracking-wide">
              Every piece tells a story of tradition, elegance, and the eternal bond of love. 
              Handcrafted for the modern Indian bride.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                href="/shop/bridal"
                className="inline-flex items-center justify-center px-12 py-5 bg-accent text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-primary transition-all duration-500"
              >
                Explore Bridal
              </Link>
              <Link 
                href="/collections"
                className="inline-flex items-center justify-center px-12 py-5 border border-white/30 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
              >
                View Lookbook
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Circular floating element for luxury feel */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-40 top-40 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
    </section>
  );
}
