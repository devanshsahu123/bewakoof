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
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">

        {/* Section Header — fully centered title, "See All" to the right */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Decorative lines flanking the title */}
          <span className="hidden sm:block flex-1 h-[1.5px] bg-gradient-to-r from-transparent to-gray-300 mr-5" />

          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-[900] tracking-[0.2em] text-black uppercase leading-none">
              {title}
            </h2>
            <div className="w-10 h-[3px] bg-[#fdd835] rounded-full mt-1" />
          </div>

          <span className="hidden sm:block flex-1 h-[1.5px] bg-gradient-to-l from-transparent to-gray-300 ml-5" />
        </div>

        {/* See All link — right-aligned below the title */}
        {seeAllHref && (
          <div className="flex justify-end mb-4 -mt-4">
            <Link
              href={seeAllHref}
              className="text-[12px] font-[700] uppercase tracking-widest text-gray-500 hover:text-black border-b border-gray-400 hover:border-black transition-colors pb-0.5"
            >
              See All →
            </Link>
          </div>
        )}

        {/* Carousel — padded so arrows have room */}
        <div className="px-4">
          <ProductCarousel products={products} />
        </div>

      </div>
    </section>
  );
}
