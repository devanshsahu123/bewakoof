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
    <section className="w-full py-[clamp(2rem,5vw,4rem)]" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-[1440px] px-2 sm:px-4 lg:px-6">

        {/* ── Section Header ── */}
        <div className="flex items-center justify-center gap-4 mb-2">
          {/* Left decorative line */}
          <span className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />

          {/* Title */}
          <h2 className="font-[900] text-black uppercase shrink-0 text-center leading-none"
              style={{ fontSize: "clamp(18px, 4vw, 28px)", letterSpacing: "clamp(0.1em, 0.4vw, 0.2em)" }}>
            {title}
          </h2>

          {/* Right decorative line */}
          <span className="hidden sm:block flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
        </div>

        {/* Yellow accent bar */}
        <div className="flex justify-center mb-[clamp(16px,3vw,24px)]">
          <div className="bg-[#fdd835] rounded-full" style={{ width: "clamp(32px, 5vw, 48px)", height: "3px" }} />
        </div>

        {/* See All */}
        {seeAllHref && (
          <div className="flex justify-end mb-[clamp(8px,2vw,16px)]">
            <Link
              href={seeAllHref}
              className="font-[700] uppercase text-gray-500 hover:text-black border-b border-gray-400 hover:border-black transition-colors pb-0.5"
              style={{ fontSize: "clamp(10px, 1.5vw, 13px)", letterSpacing: "0.1em" }}
            >
              See All →
            </Link>
          </div>
        )}

        {/* Carousel */}
        <div className="w-full relative">
          <ProductCarousel products={products} />
        </div>

      </div>
    </section>
  );
}
