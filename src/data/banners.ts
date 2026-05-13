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
  bridal: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop", // Elegant necklace
  heritage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop", // Traditional jewelry
  minimal: "https://images.unsplash.com/photo-1573408302185-9127fe583ad5?q=80&w=2069&auto=format&fit=crop", // Modern rings
};

export const bannerSlides: BannerSlide[] = [
    {
        id: "slide-1",
        tag: "THE BRIDAL SAGA",
        headline: ["Timeless", "Heritage"],
        subline: "Exquisite handcrafted jewelry for your most precious moments.",
        ctaLabel: "Explore Bridal",
        ctaHref: "/shop/bridal",
        heroImage: IMAGES.bridal,
        accentColor: "#D4AF7F",
    },
    {
        id: "slide-2",
        tag: "GOLDEN ELEGANCE",
        headline: ["Pure", "Artistry"],
        subline: "22K Hallmark gold pieces that redefine luxury and tradition.",
        ctaLabel: "View Gold Collection",
        ctaHref: "/shop/gold",
        heroImage: IMAGES.heritage,
        accentColor: "#D4AF7F",
    },
    {
        id: "slide-3",
        tag: "MODERN MINIMAL",
        headline: ["Effortless", "Grace"],
        subline: "Contemporary designs for the modern Indian woman.",
        ctaLabel: "Shop Minimal",
        ctaHref: "/shop/minimal",
        heroImage: IMAGES.minimal,
        accentColor: "#D4AF7F",
    },
];
