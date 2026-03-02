import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productDetailsMap, denimProducts } from "@/data/products";
import ProductDetailClient from "@/components/web/product/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const product = productDetailsMap[slug];

  if (!product) {
    return { title: "Product Not Found" };
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa";

  return {
    title: `${product.name} | ${appName}`,
    description: `Buy ${product.name} at ₹${product.price} (${discount}% off MRP ₹${product.mrp}). ${product.fabricBadge ?? ""} | Free shipping available. Shop now at ${appName}.`,
    openGraph: {
      title: `${product.name} | ${appName}`,
      description: `₹${product.price} – ${discount}% OFF. ${product.description?.slice(0, 120)}…`,
      images: [{ url: product.image, width: 800, height: 600 }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productDetailsMap[slug];

  if (!product) {
    notFound();
  }

  // Related products: all denim products except the current one
  const related = denimProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
