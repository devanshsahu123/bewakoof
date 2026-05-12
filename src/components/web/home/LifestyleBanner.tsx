"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LifestyleBanner() {
  return (
    <section className="relative w-full h-[70vh] min-h-[600px] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
        alt="Lifestyle"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-accent text-[12px] font-bold uppercase tracking-[0.6em] mb-6"
          >
            Philosophy
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            viewport={{ once: true }}
            className="text-white text-4xl md:text-6xl font-serif italic mb-8 leading-tight"
          >
            "Fashion is temporary. <br /> <span className="not-italic font-normal">Authenticity</span> is eternal."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/about"
              className="inline-flex items-center gap-4 text-white text-[12px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors"
            >
              Our Story
              <div className="w-12 h-[1px] bg-white group-hover:w-16 transition-all" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
