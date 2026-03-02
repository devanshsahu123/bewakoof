// Mock product data for homepage sections

export interface Product {
    id: string;
    brand: string;
    name: string;
    price: number;
    mrp: number;
    rating: number;
    ratingCount?: number;
    image: string;
    tag?: string;
    href: string;
}

export interface SizeOption {
    label: string;
    stock: number; // 0 = out of stock
    stockLabel?: string; // "6 left", "7 left" etc.
}

export interface ProductHighlight {
    label: string;
    value: string;
}

export interface ProductOffer {
    icon: string;
    title: string;
    subtitle: string;
    href: string;
}

export interface ProductDetail extends Product {
    images: string[];        // multiple gallery images
    badge?: string;          // "OVERSIZED FIT"
    fabricBadge?: string;    // "Premium Dense Fabric"
    savingsPrice?: number;   // "Get it for as low as ₹X"
    sizes: SizeOption[];
    highlights: ProductHighlight[];
    description: string;
    offers: ProductOffer[];
    returnPolicy: string;
    breadcrumb: { label: string; href: string }[];
}

const DEMO_IMAGE = "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1731501911-1.jpg";

export const denimProducts: Product[] = [
    {
        id: "denim-1",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Blue Washed Super Baggy Fit Distressed Jeans",
        price: 1499,
        mrp: 3299,
        rating: 4.4,
        ratingCount: 1823,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-blue-baggy-jeans",
    },
    {
        id: "denim-2",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Grey Baggy Fit Washed Cargo Mid-Rise Jeans",
        price: 1499,
        mrp: 4099,
        rating: 4.4,
        ratingCount: 982,
        image: DEMO_IMAGE,
        tag: "BAGGY FIT",
        href: "/product/mens-grey-cargo-jeans",
    },
    {
        id: "denim-3",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Brown Super Baggy Fit Mid-Rise Jeans",
        price: 1499,
        mrp: 3399,
        rating: 4.4,
        ratingCount: 1201,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-brown-baggy-jeans",
    },
    {
        id: "denim-4",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Brown Washed Super Baggy Fit Mid-Rise Jeans",
        price: 1499,
        mrp: 3499,
        rating: 4.5,
        ratingCount: 2340,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-brown-washed-jeans",
    },
    {
        id: "denim-5",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Beige Super Baggy Fit Mid-Rise Jeans",
        price: 1499,
        mrp: 3399,
        rating: 4.5,
        ratingCount: 876,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-beige-baggy-jeans",
    },
    {
        id: "denim-6",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Black Super Baggy Fit Distressed Mid-Rise Jeans",
        price: 1499,
        mrp: 3299,
        rating: 4.3,
        ratingCount: 1455,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-black-distressed-jeans",
    },
    {
        id: "denim-7",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Indigo Super Baggy Fit Washed Mid-Rise Jeans",
        price: 1499,
        mrp: 3499,
        rating: 4.4,
        ratingCount: 743,
        image: DEMO_IMAGE,
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-indigo-baggy-jeans",
    },
];

// ── Detailed product data map keyed by slug ──────────────────────────────────

const GALLERY_IMAGES = [
    "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1731501911-1.jpg",
    "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1729235299-3.jpg",
    "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1729235304-4.jpg",
    "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1729235308-5.jpg",
    "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1729235312-6.jpg",
    "https://images.bewakoof.com/t1080/men-s-black-venom-graphic-printed-oversized-t-shirt-651229-1734587867-10.jpg"
];

const DEFAULT_SIZES: SizeOption[] = [
    { label: "S", stock: 6, stockLabel: "6 left" },
    { label: "M", stock: 10 },
    { label: "L", stock: 7, stockLabel: "7 left" },
    { label: "XL", stock: 6, stockLabel: "6 left" },
    { label: "2XL", stock: 10 },
    { label: "3XL", stock: 0 },
];

const DEFAULT_HIGHLIGHTS: ProductHighlight[] = [
    { label: "Design", value: "Graphic Print" },
    { label: "Fit", value: "Oversized Fit" },
    { label: "Neck", value: "Round Neck" },
    { label: "Occasion", value: "Casual Wear" },
    { label: "Sleeve Style", value: "Half Sleeve" },
    { label: "Wash Care", value: "Machine wash as per tag" },
];

const DEFAULT_OFFERS: ProductOffer[] = [
    {
        icon: "🏷️",
        title: "Buy 2 for ₹1199",
        subtitle: "Auto applied offer",
        href: "/offers",
    },
];

export const productDetailsMap: Record<string, ProductDetail> = {
    "mens-blue-baggy-jeans": {
        id: "denim-1",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Blue Washed Super Baggy Fit Distressed Jeans",
        price: 649,
        mrp: 1299,
        rating: 4.5,
        ratingCount: 457,
        image: GALLERY_IMAGES[0],
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-blue-baggy-jeans",
        badge: "OVERSIZED FIT",
        fabricBadge: "Premium Dense Fabric",
        savingsPrice: 600,
        images: GALLERY_IMAGES,
        sizes: DEFAULT_SIZES,
        highlights: DEFAULT_HIGHLIGHTS,
        description:
            "This oversized graphic-print tee is crafted from premium dense cotton fabric that feels soft yet structured. Featuring a bold all-over print, drop shoulders, and a boxy silhouette, it's made for those who dress loud and mean it. Pair with baggy jeans for an effortlessly cool street-style look.",
        offers: DEFAULT_OFFERS,
        returnPolicy:
            "Easy returns upto 15 days of delivery. Exchange available on select pincodes.",
        breadcrumb: [
            { label: "Home", href: "/" },
            { label: "Topwear", href: "/shop/men" },
            { label: "T-Shirts", href: "/shop/men" },
        ],
    },
    "mens-grey-cargo-jeans": {
        id: "denim-2",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Grey Baggy Fit Washed Cargo Mid-Rise Jeans",
        price: 1299,
        mrp: 4099,
        rating: 4.4,
        ratingCount: 982,
        image: GALLERY_IMAGES[0],
        tag: "BAGGY FIT",
        href: "/product/mens-grey-cargo-jeans",
        badge: "BAGGY FIT",
        fabricBadge: "Heavy Denim",
        savingsPrice: 1100,
        images: GALLERY_IMAGES,
        sizes: [
            { label: "28", stock: 5, stockLabel: "5 left" },
            { label: "30", stock: 10 },
            { label: "32", stock: 8, stockLabel: "8 left" },
            { label: "34", stock: 3, stockLabel: "3 left" },
            { label: "36", stock: 0 },
        ],
        highlights: [
            { label: "Design", value: "Solid with Cargo Pockets" },
            { label: "Fit", value: "Baggy Fit" },
            { label: "Rise", value: "Mid-Rise" },
            { label: "Occasion", value: "Casual Wear" },
            { label: "Closure", value: "Button & Zip" },
            { label: "Wash Care", value: "Machine wash cold" },
        ],
        description:
            "Elevate your street game with these washed grey cargo jeans. Featuring functional cargo pockets, a relaxed baggy silhouette, and premium washed denim, these are built to command attention. The mid-rise waist and straight-leg cut ensure max comfort all day.",
        offers: DEFAULT_OFFERS,
        returnPolicy:
            "Easy returns upto 15 days of delivery. Exchange available on select pincodes.",
        breadcrumb: [
            { label: "Home", href: "/" },
            { label: "Bottomwear", href: "/shop/men" },
            { label: "Jeans", href: "/shop/men" },
        ],
    },
    "mens-brown-baggy-jeans": {
        id: "denim-3",
        brand: `${process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}®`,
        name: "Men's Brown Super Baggy Fit Mid-Rise Jeans",
        price: 1499,
        mrp: 3399,
        rating: 4.4,
        ratingCount: 1201,
        image: GALLERY_IMAGES[0],
        tag: "SUPER BAGGY FIT",
        href: "/product/mens-brown-baggy-jeans",
        badge: "SUPER BAGGY FIT",
        fabricBadge: "Stretch Denim",
        savingsPrice: 1200,
        images: GALLERY_IMAGES,
        sizes: DEFAULT_SIZES,
        highlights: DEFAULT_HIGHLIGHTS,
        description:
            "The ultimate slouchy statement piece. These brown mid-rise jeans come in a super baggy fit that's both comfortable and stylish. The stretch denim construction ensures freedom of movement while keeping the silhouette intact.",
        offers: DEFAULT_OFFERS,
        returnPolicy:
            "Easy returns upto 15 days of delivery. Exchange available on select pincodes.",
        breadcrumb: [
            { label: "Home", href: "/" },
            { label: "Bottomwear", href: "/shop/men" },
            { label: "Jeans", href: "/shop/men" },
        ],
    },
};

