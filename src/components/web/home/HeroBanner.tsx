"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import { bannerSlides } from "@/data/banners";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % bannerSlides.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = bannerSlides[current];

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-primary">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.heroImage}
              alt={slide.headline.join(" ")}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Elegant Radial Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-white text-[11px] md:text-[13px] font-bold uppercase tracking-[0.6em] mb-8"
            >
              {slide.tag}
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mb-10"
            >
              {slide.headline.map((line, idx) => (
                <h2 
                  key={idx}
                  className="text-white text-[clamp(2.5rem,8vw,7rem)] font-serif italic leading-[1] uppercase tracking-[-0.01em]"
                >
                  {line}
                </h2>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-white/90 text-[14px] md:text-[16px] max-w-xl font-light tracking-[0.1em] mb-12 uppercase leading-relaxed"
            >
              {slide.subline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <Link
                href={slide.ctaHref}
                className="group relative inline-flex items-center gap-4 px-14 py-5 bg-white text-primary text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:pr-20"
              >
                <span className="relative z-10">{slide.ctaLabel}</span>
                <HiArrowRight className="relative z-10 transition-transform group-hover:translate-x-3 text-accent" />
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Elegant Controls */}
      <div className="absolute bottom-16 right-16 flex gap-6 z-20">
        <button
          onClick={prev}
          className="p-5 border border-white/10 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-md rounded-full"
        >
          <HiArrowLeft size={20} />
        </button>
        <button
          onClick={next}
          className="p-5 border border-white/10 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-md rounded-full"
        >
          <HiArrowRight size={20} />
        </button>
      </div>

      {/* Progress Bars */}
      <div className="absolute bottom-16 left-16 flex items-center gap-6 z-20">
        {bannerSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group py-4"
          >
            <div className="h-[2px] w-12 bg-white/20 relative overflow-hidden">
               {idx === current && (
                 <motion.div 
                   layoutId="activeBar"
                   className="absolute inset-0 bg-accent"
                   initial={false}
                 />
               )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
