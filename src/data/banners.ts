// Banner slide data for the home page hero section

export interface BannerSlide {
    id: string;
    tag: string;
    headline: string[];           // split into lines for styled rendering
    subline?: string;
    ctaLabel: string;
    ctaHref: string;
    categories: { label: string; href: string }[];
    bgFrom: string;               // tailwind gradient start color (hex)
    bgTo: string;                 // tailwind gradient end color (hex)
    accentColor: string;          // for category text highlight
    heroImage: string;
    thumbImages: string[];        // 3 small product thumbnails on right
}

// Using demo images — swap with real CDN URLs per slide in production
const DEMO = "https://images.bewakoof.com/uploads/grid/app/HC-desktop-1440x400-BewakoofVault-Capsule-offculture-1771589480.jpg";

export const bannerSlides: BannerSlide[] = [
    {
        id: "slide-1",
        tag: "NEW COLLECTION",
        headline: ["low·key", "BOLD", "EDIT"],
        subline: "Statement pieces for the quietly confident.",
        ctaLabel: "Shop Now",
        ctaHref: "/shop/men",
        categories: [
            { label: "SHIRTS", href: "/shop/men/shirts" },
            { label: "JEANS", href: "/shop/men/jeans" },
            { label: "T-SHIRTS", href: "/shop/men/tshirts" },
        ],
        bgFrom: "#0f0f0f",
        bgTo: "#1c1c1e",
        accentColor: "#4ade80",
        heroImage: DEMO,
        thumbImages: [DEMO, DEMO, DEMO],
    },
    {
        id: "slide-2",
        tag: "WOMEN'S EDIT",
        headline: ["FRESH", "SUMMER", "DROPS"],
        subline: "Breezy styles made to move with you.",
        ctaLabel: "Explore",
        ctaHref: "/shop/women",
        categories: [
            { label: "TOPS", href: "/shop/women/tops" },
            { label: "DRESSES", href: "/shop/women/dresses" },
            { label: "CO-ORDS", href: "/shop/women/coords" },
        ],
        bgFrom: "#1a0a2e",
        bgTo: "#2d1b69",
        accentColor: "#fdd835",
        heroImage: DEMO,
        thumbImages: [DEMO, DEMO, DEMO],
    },
    {
        id: "slide-3",
        tag: "DENIM VERSE",
        headline: ["THE ONLY", "JEANS YOU", "NEED"],
        subline: "Super baggy, mid-rise, washed — pick your fit.",
        ctaLabel: "Shop Jeans",
        ctaHref: "/shop/men/jeans",
        categories: [
            { label: "BAGGY FIT", href: "/shop/men/jeans/baggy" },
            { label: "SLIM FIT", href: "/shop/men/jeans/slim" },
            { label: "CARGO", href: "/shop/men/jeans/cargo" },
        ],
        bgFrom: "#0c1a2e",
        bgTo: "#162a42",
        accentColor: "#60a5fa",
        heroImage: DEMO,
        thumbImages: [DEMO, DEMO, DEMO],
    },
];
