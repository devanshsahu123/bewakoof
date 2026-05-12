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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = bannerSlides[current];

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white text-[12px] md:text-[14px] font-bold uppercase tracking-[0.5em] mb-6"
            >
              {slide.tag}
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-8"
            >
              {slide.headline.map((line, idx) => (
                <h2 
                  key={idx}
                  className="text-white text-[clamp(3rem,10vw,8rem)] font-serif italic leading-[1] uppercase tracking-[-0.02em]"
                >
                  {line}
                </h2>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-white/80 text-[16px] md:text-[18px] max-w-xl font-light tracking-wide mb-10"
            >
              {slide.subline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link
                href={slide.ctaHref}
                className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-primary text-[12px] font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:pr-16"
              >
                <span className="relative z-10">{slide.ctaLabel}</span>
                <HiArrowRight className="relative z-10 transition-transform group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 flex gap-4 z-20">
        <button
          onClick={prev}
          className="p-4 border border-white/20 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-sm"
        >
          <HiArrowLeft size={20} />
        </button>
        <button
          onClick={next}
          className="p-4 border border-white/20 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-sm"
        >
          <HiArrowRight size={20} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4 z-20">
        {bannerSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group py-4"
          >
            <div className={`h-[1px] transition-all duration-700 ${
              idx === current ? "w-16 bg-accent" : "w-8 bg-white/30 group-hover:bg-white/60"
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
