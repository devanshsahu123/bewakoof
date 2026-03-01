import HeroBanner from "@/components/web/home/HeroBanner";
import ProductSection from "@/components/web/home/ProductSection";
import { denimProducts } from "@/data/products";

export default function HomePage() {
  return (
    <>
      {/* Auto-scroll Hero Banner */}
      <HeroBanner />

      {/* Denim Verse Product Section */}
      <ProductSection
        title="Denim Verse"
        products={denimProducts}
        seeAllHref="/shop/men?category=jeans"
        bgColor="#fdf9ec"
      />
    </>
  );
}
