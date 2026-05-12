"use client";

import HeroBanner from "@/components/web/home/HeroBanner";
import FeaturedCategories from "@/components/web/home/FeaturedCategories";
import BestSellers from "@/components/web/home/BestSellers";
import SocialProof from "@/components/web/home/SocialProof";
import LifestyleBanner from "@/components/web/home/LifestyleBanner";
import Newsletter from "@/components/web/home/Newsletter";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* 1. Fullscreen Hero Section */}
      <HeroBanner />

      {/* 2. Featured Collections Grid */}
      <FeaturedCategories />

      {/* 3. Best Sellers / Seasonal Carousel */}
      <BestSellers />

      {/* 4. Lifestyle Brand Statement */}
      <LifestyleBanner />

      {/* 5. Trust & Social Proof */}
      <SocialProof />

      {/* 6. Limited Collection / FOMO Trigger (Inline Example) */}
      <section className="bg-primary py-24 px-6 text-center text-white overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h3 className="text-accent text-[10px] font-bold uppercase tracking-[0.6em] mb-6">Exclusive Drop</h3>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-8">The Midnight Capsule</h2>
          <p className="text-gray-400 max-w-lg mx-auto font-light mb-12 tracking-wide uppercase text-[12px]">
            Limited to 500 Pieces Globally. <br />
            Next Drop in: 02d : 14h : 55m : 04s
          </p>
          <button className="px-12 py-5 border border-white hover:bg-white hover:text-primary transition-all text-[11px] font-bold uppercase tracking-widest">
            Notify Me
          </button>
        </motion.div>
        
        {/* Background Text Decor */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
           <span className="text-[20vw] font-serif uppercase italic leading-none whitespace-nowrap">Limited Edition</span>
        </div>
      </section>

      {/* 7. Newsletter Subscription */}
      <Newsletter />
    </main>
  );
}
