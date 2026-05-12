import { menShopSections } from "./menProducts";
import { homeSections } from "./homeSections";

export const shopDataMap: Record<string, any> = {
  "men": {
    title: "Men's Collection",
    description: "Explore the latest trends in men's fashion, from oversized tees to premium denims.",
    sections: menShopSections
  },
  "women": {
    title: "Women's Collection",
    description: "Discover the best of women's fashion – from chic dresses to comfortable loungewear.",
    sections: homeSections // Fallback for demo
  },
  "mobile-covers": {
    title: "Mobile Covers",
    description: "Tough, stylish, and quirky covers for your favorite smartphones.",
    sections: homeSections
  },
  "dummy": {
    title: "Dummy Shop Page",
    description: "This is a demonstration of how easy it is to create a new dynamic shop page with custom sections.",
    sections: [
      {
        id: "dummy-cat",
        type: "CATEGORY_GRID",
        title: "Featured Collections",
        categories: [
          { id: "d1", label: "New Arrivals", image: "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1731501911-1.jpg", href: "#" },
          { id: "d2", label: "Best of 2024", image: "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1731501911-1.jpg", href: "#" },
          { id: "d3", label: "Clearance Sale", image: "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1731501911-1.jpg", href: "#" },
        ],
        bgColor: "#f0f0f0"
      },
      {
        id: "dummy-products",
        type: "PRODUCT_CAROUSEL",
        title: "Trending Items",
        products: menShopSections[1].products,
        bgColor: "#ffffff"
      }
    ]
  }
};
