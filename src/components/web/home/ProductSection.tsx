import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
import type { Product } from "@/data/products";

interface ProductSectionProps {
  title: string;
  products: Product[];
  seeAllHref?: string;
  bgColor?: string;
}

export default function ProductSection({
  title,
  products,
  seeAllHref,
  bgColor = "#ffffff",
}: ProductSectionProps) {
  return (
    <section className="w-full py-10 md:py-14" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">

        {/* ── Section Header ── */}
        <div className="flex items-center justify-center gap-4 mb-2">
          {/* Left decorative line */}
          <span className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />

          {/* Title */}
          <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-[900] tracking-[0.2em] text-black uppercase shrink-0 text-center leading-none">
            {title}
          </h2>

          {/* Right decorative line */}
          <span className="hidden sm:block flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
        </div>

        {/* Yellow accent bar */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-[3px] bg-[#fdd835] rounded-full" />
        </div>

        {/* See All */}
        {seeAllHref && (
          <div className="flex justify-end mb-4">
            <Link
              href={seeAllHref}
              className="text-[12px] font-[700] uppercase tracking-widest text-gray-500 hover:text-black border-b border-gray-400 hover:border-black transition-colors pb-0.5"
            >
              See All →
            </Link>
          </div>
        )}

        {/* Carousel — px-5 gives room for the ±20px arrow buttons */}
        <div className="px-5">
          <ProductCarousel products={products} />
        </div>

      </div>
    </section>
  );
}
