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

  const arrowBase = "absolute z-30 top-[40%] -translate-y-1/2 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:shadow-lg transition-all duration-200";

  return (
    <div className="relative" style={{ overflow: "visible" }}>
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scrollBy("left")}
        aria-label="Previous"
        className={`${arrowBase} ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ cursor: "pointer", width: "clamp(28px, 6vw, 40px)", height: "clamp(28px, 6vw, 40px)", left: "clamp(-15px, -3vw, -20px)" }}
      >
        <HiChevronLeft style={{ width: "clamp(16px, 4vw, 24px)", height: "clamp(16px, 4vw, 24px)" }} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scrollBy("right")}
        aria-label="Next"
        className={`${arrowBase} ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ cursor: "pointer", width: "clamp(28px, 6vw, 40px)", height: "clamp(28px, 6vw, 40px)", right: "clamp(-15px, -3vw, -20px)" }}
      >
        <HiChevronRight style={{ width: "clamp(16px, 4vw, 24px)", height: "clamp(16px, 4vw, 24px)" }} />
      </button>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth pb-1"
        style={{ gap: "clamp(8px, 2vw, 16px)", scrollbarWidth: "none", msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"] }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
