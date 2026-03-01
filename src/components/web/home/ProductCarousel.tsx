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

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -(el.offsetWidth * 0.75) : el.offsetWidth * 0.75,
      behavior: "smooth",
    });
  };

  const arrowBase =
    "absolute z-30 top-[40%] -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:shadow-lg transition-all duration-200";

  return (
    <div className="relative" style={{ overflow: "visible" }}>
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scrollBy("left")}
        aria-label="Previous"
        className={`${arrowBase} left-[-20px] ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ cursor: "pointer" }}
      >
        <HiChevronLeft size={20} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scrollBy("right")}
        aria-label="Next"
        className={`${arrowBase} right-[-20px] ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ cursor: "pointer" }}
      >
        <HiChevronRight size={20} />
      </button>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"] }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
