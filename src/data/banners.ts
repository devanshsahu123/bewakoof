export interface BannerSlide {
    id: string;
    tag: string;
    headline: string[];           
    subline: string;
    ctaLabel: string;
    ctaHref: string;
    heroImage: string;
    accentColor: string;
}

const IMAGES = {
  luxury1: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
  luxury2: "https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=2071&auto=format&fit=crop",
  luxury3: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
};

export const bannerSlides: BannerSlide[] = [
    {
        id: "slide-1",
        tag: "Summer 2026",
        headline: ["Aesthetic", "Simplicity"],
        subline: "Elevated essentials for the modern silhouette.",
        ctaLabel: "Explore Collection",
        ctaHref: "/shop",
        heroImage: IMAGES.luxury1,
        accentColor: "#C8A97E",
    },
    {
        id: "slide-2",
        tag: "Editorial",
        headline: ["Timeless", "Luxury"],
        subline: "Crafted with precision, designed for eternity.",
        ctaLabel: "Shop New Arrivals",
        ctaHref: "/new",
        heroImage: IMAGES.luxury2,
        accentColor: "#C8A97E",
    },
    {
        id: "slide-3",
        tag: "Limited Release",
        headline: ["Bold", "Noir"],
        subline: "The definitive collection of dark luxury.",
        ctaLabel: "View Limited",
        ctaHref: "/limited",
        heroImage: IMAGES.luxury3,
        accentColor: "#C8A97E",
    },
];
