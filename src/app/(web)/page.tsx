"use client";

import HeroBanner from "@/components/web/home/HeroBanner";
import FeaturedCategories from "@/components/web/home/FeaturedCategories";
import BestSellers from "@/components/web/home/BestSellers";
import BridalCollection from "@/components/web/home/BridalCollection";
import SocialProof from "@/components/web/home/SocialProof";
import LifestyleBanner from "@/components/web/home/LifestyleBanner";
import Newsletter from "@/components/web/home/Newsletter";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Gem } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-secondary">
      {/* 1. Fullscreen Jewelry Hero */}
      <HeroBanner />

      {/* 2. Trust Bar */}
      <section className="bg-white py-12 border-b border-warm/20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "BIS Hallmarked", sub: "100% Certified Purity" },
            { icon: Truck, title: "Secure Shipping", sub: "Insured Global Delivery" },
            { icon: RotateCcw, title: "15 Day Returns", sub: "Hassle-Free Exchange" },
            { icon: Gem, title: "Lifetime Exchange", sub: "On All Jewelry Items" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <item.icon size={24} strokeWidth={1} className="text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1">{item.title}</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Jewelry Collections Grid */}
      <FeaturedCategories />

      {/* 4. Best Sellers / Most Coveted */}
      <BestSellers />

      {/* 5. Bridal Storytelling */}
      <BridalCollection />

      {/* 6. Social Proof / Influencer Gallery */}
      <SocialProof />

      {/* 7. Editorial Philosophy Banner */}
      <LifestyleBanner />

      {/* 8. Newsletter & Membership */}
      <Newsletter />
    </main>
  );
}
