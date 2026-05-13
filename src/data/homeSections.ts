import { PRODUCTS, type Product } from "./products";

export type SectionType = "PRODUCT_CAROUSEL" | "CATEGORY_GRID" | "PROMO_GRID";

export interface CategoryItem {
  id: string;
  label: string;
  image: string;
  href: string;
}

export interface HomeSectionConfig {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  products?: Product[];
  categories?: CategoryItem[];
  bgColor?: string;
  seeAllHref?: string;
}

export const homeSections: HomeSectionConfig[] = [
  {
    id: "jewelry-categories",
    type: "CATEGORY_GRID",
    title: "Signature Collections",
    categories: [
      { id: "c1", label: "Necklaces", image: PRODUCTS[0].image, href: "/shop/necklaces" },
      { id: "c2", label: "Rings", image: PRODUCTS[2].image, href: "/shop/rings" },
      { id: "c3", label: "Earrings", image: PRODUCTS[1].image, href: "/shop/earrings" },
      { id: "c4", label: "Bracelets", image: PRODUCTS[5].image, href: "/shop/bracelets" },
    ],
    bgColor: "#FAF7F2",
  },
  {
    id: "best-sellers-carousel",
    type: "PRODUCT_CAROUSEL",
    title: "The Golden Selection",
    products: PRODUCTS,
    bgColor: "#ffffff",
    seeAllHref: "/shop",
  }
];
