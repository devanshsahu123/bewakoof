import { denimProducts, type Product } from "./products";

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

const DEMO_IMG = "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1731501911-1.jpg";

export const homeSections: HomeSectionConfig[] = [
  {
    id: "shop-by-category",
    type: "CATEGORY_GRID",
    title: "Shop by Category",
    categories: [
      { id: "c1", label: "Oversized T-Shirts", image: DEMO_IMG, href: "/shop/men/oversized-t-shirts" },
      { id: "c2", label: "Classic T-Shirts", image: DEMO_IMG, href: "/shop/men/t-shirts" },
      { id: "c3", label: "Cargo Pants", image: DEMO_IMG, href: "/shop/men/cargo-pants" },
      { id: "c4", label: "Joggers", image: DEMO_IMG, href: "/shop/men/joggers" },
      { id: "c5", label: "Shorts", image: DEMO_IMG, href: "/shop/men/shorts" },
      { id: "c6", label: "Boxers", image: DEMO_IMG, href: "/shop/men/boxers" },
    ],
    bgColor: "#ffffff",
  },
  {
    id: "denim-verse-carousel",
    type: "PRODUCT_CAROUSEL",
    title: "Denim Verse",
    products: denimProducts,
    bgColor: "#fdf9ec",
    seeAllHref: "/shop/men?category=jeans",
  },
  {
    id: "trending-merch",
    type: "PROMO_GRID",
    title: "The Official Merch Store",
    categories: [
      { id: "m1", label: "Disney", image: DEMO_IMG, href: "/shop/disney" },
      { id: "m2", label: "Marvel", image: DEMO_IMG, href: "/shop/marvel" },
      { id: "m3", label: "DC Comics", image: DEMO_IMG, href: "/shop/dc" },
      { id: "m4", label: "Anime", image: DEMO_IMG, href: "/shop/anime" },
    ],
    bgColor: "#ffffff",
  }
];
