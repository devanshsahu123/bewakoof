"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

export default function ProductCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const check = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -(el.offsetWidth * 0.75) : el.offsetWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    /* Outer wrapper — overflow visible so arrows aren't clipped */
    <div className="relative" style={{ overflow: "visible" }}>

      {/* ── Left Arrow ── */}
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Previous"
        style={{ cursor: "pointer" }}
        className={`
          absolute left-[-18px] top-[38%] -translate-y-1/2 z-30
          w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md
          flex items-center justify-center text-gray-700
          hover:bg-gray-50 hover:text-black hover:shadow-lg
          transition-all duration-200
          ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <HiChevronLeft size={20} />
      </button>

      {/* ── Right Arrow ── */}
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Next"
        style={{ cursor: "pointer" }}
        className={`
          absolute right-[-18px] top-[38%] -translate-y-1/2 z-30
          w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md
          flex items-center justify-center text-gray-700
          hover:bg-gray-50 hover:text-black hover:shadow-lg
          transition-all duration-200
          ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <HiChevronRight size={20} />
      </button>

      {/* ── Scroll Track ── */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "none",
          // @ts-expect-error: IE-only property
          msOverflowStyle: "none",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
