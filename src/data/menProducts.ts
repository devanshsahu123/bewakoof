import { denimProducts, type Product } from "./products";

const DEMO_IMG = "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1731501911-1.jpg";

export const menTshirts: Product[] = [
  { id: "mt1", brand: "Siyapaa®", name: "Men's Black Graphic Printed T-Shirt", price: 499, mrp: 999, rating: 4.5, ratingCount: 120, image: DEMO_IMG, href: "/product/mt1" },
  { id: "mt2", brand: "Siyapaa®", name: "Men's White Oversized T-Shirt", price: 699, mrp: 1299, rating: 4.7, ratingCount: 85, image: DEMO_IMG, href: "/product/mt2" },
  { id: "mt3", brand: "Siyapaa®", name: "Men's Blue Solid Cotton T-Shirt", price: 399, mrp: 799, rating: 4.3, ratingCount: 210, image: DEMO_IMG, href: "/product/mt3" },
  { id: "mt4", brand: "Siyapaa®", name: "Men's Maroon Printed T-Shirt", price: 549, mrp: 1099, rating: 4.6, ratingCount: 150, image: DEMO_IMG, href: "/product/mt4" },
];

export const menJoggers: Product[] = [
  { id: "mj1", brand: "Siyapaa®", name: "Men's Black Cargo Joggers", price: 999, mrp: 1999, rating: 4.4, ratingCount: 95, image: DEMO_IMG, href: "/product/mj1" },
  { id: "mj2", brand: "Siyapaa®", name: "Men's Grey Slim Fit Joggers", price: 899, mrp: 1799, rating: 4.2, ratingCount: 60, image: DEMO_IMG, href: "/product/mj2" },
  { id: "mj3", brand: "Siyapaa®", name: "Men's Olive Green Cargo Pants", price: 1199, mrp: 2499, rating: 4.5, ratingCount: 110, image: DEMO_IMG, href: "/product/mj3" },
];

export const menShopSections = [
  {
    id: "men-categories",
    type: "CATEGORY_GRID" as const,
    title: "Men's Categories",
    categories: [
      { id: "mc1", label: "T-Shirts", image: DEMO_IMG, href: "/shop/men/t-shirts" },
      { id: "mc2", label: "Jeans", image: DEMO_IMG, href: "/shop/men/jeans" },
      { id: "mc3", label: "Joggers", image: DEMO_IMG, href: "/shop/men/joggers" },
      { id: "mc4", label: "Shirts", image: DEMO_IMG, href: "/shop/men/shirts" },
      { id: "mc5", label: "Shorts", image: DEMO_IMG, href: "/shop/men/shorts" },
      { id: "mc6", label: "Hoodies", image: DEMO_IMG, href: "/shop/men/hoodies" },
    ],
  },
  {
    id: "men-best-sellers",
    type: "PRODUCT_CAROUSEL" as const,
    title: "Best Sellers for Men",
    products: [...menTshirts, ...denimProducts.slice(0, 2)],
    bgColor: "#f7f7f7",
  },
  {
    id: "men-denim-verse",
    type: "PRODUCT_CAROUSEL" as const,
    title: "Men's Denim Verse",
    products: denimProducts,
    bgColor: "#ffffff",
  },
  {
    id: "men-bottom-wear",
    type: "PRODUCT_CAROUSEL" as const,
    title: "Men's Bottom Wear",
    products: menJoggers,
    bgColor: "#fdf9ec",
  }
];
