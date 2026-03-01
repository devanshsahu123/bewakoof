import ProductSection from "@/components/web/home/ProductSection";
import { denimProducts } from "@/data/products";

export default function HomePage() {
  return (
    <>
      {/* Denim Verse Section */}
      <ProductSection
        title="Denim Verse"
        products={denimProducts}
        seeAllHref="/shop/men?category=jeans"
        bgColor="#fdf9ec"
      />
    </>
  );
}
