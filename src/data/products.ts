export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage: string;
  category: string;
  material: string;
  tag?: string;
  rating: number;
  reviews: number;
  description: string;
  details: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Regal Kundan Choker",
    price: 125000,
    oldPrice: 150000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1974&auto=format&fit=crop",
    category: "necklaces",
    material: "22K Gold • Kundan",
    tag: "Selling Fast",
    rating: 5.0,
    reviews: 18,
    description: "A masterpiece of traditional Indian artistry, this Kundan choker features hand-set stones in 22K pure gold.",
    details: ["22K BIS Hallmarked Gold", "Handcrafted Kundan Work", "Adjustable Silk Thread Cord", "Authenticity Certificate Included"],
  },
  {
    id: "2",
    name: "Divine Pearl Drop Earrings",
    price: 45000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1588444839799-eb6bd77c001c?q=80&w=1974&auto=format&fit=crop",
    category: "earrings",
    material: "18K Rose Gold • Pearls",
    tag: "Limited Edition",
    rating: 4.9,
    reviews: 32,
    description: "Elegant drop earrings featuring lustrous South Sea pearls suspended from 18K rose gold settings.",
    details: ["18K BIS Hallmarked Rose Gold", "AAA Quality South Sea Pearls", "Secure Butterfly Clasp", "Gift Packaging Included"],
  },
  {
    id: "3",
    name: "Ethereal Diamond Band",
    price: 85000,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3f416?q=80&w=2070&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598560912005-59a195bb1a31?q=80&w=1974&auto=format&fit=crop",
    category: "rings",
    material: "Platinum • VVS Diamonds",
    tag: "Hallmarked",
    rating: 5.0,
    reviews: 12,
    description: "A minimalist yet profound expression of commitment, featuring conflict-free VVS diamonds in platinum.",
    details: ["950 Platinum Hallmarked", "0.5ct VVS1 Clarity Diamonds", "Comfort Fit Band", "GIA Certification Included"],
  },
  {
    id: "4",
    name: "Classic Gold Jhumkas",
    price: 72000,
    oldPrice: 85000,
    image: "https://images.unsplash.com/photo-1630030538573-049079b74205?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1974&auto=format&fit=crop",
    category: "earrings",
    material: "22K Yellow Gold",
    tag: "Traditional",
    rating: 4.8,
    reviews: 56,
    description: "Authentic temple-style jhumkas handcrafted in 22K yellow gold with intricate peacock motifs.",
    details: ["22K BIS Hallmarked Gold", "Intricate Filigree Work", "Traditional Screw Back", "Lifetime Exchange Guarantee"],
  },
  {
    id: "5",
    name: "Stellar Diamond Necklace",
    price: 350000,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop",
    category: "necklaces",
    material: "18K White Gold • Diamonds",
    tag: "Bestseller",
    rating: 5.0,
    reviews: 8,
    description: "A breathtaking statement piece featuring a cascade of brilliant-cut diamonds in 18K white gold.",
    details: ["18K White Gold", "5.2ct Total Diamond Weight", "E-F Color, VVS Clarity", "Luxury Presentation Box"],
  },
  {
    id: "6",
    name: "Golden Temple Bangle",
    price: 95000,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1974&auto=format&fit=crop",
    category: "bracelets",
    material: "22K Gold • Ruby",
    tag: "New Arrival",
    rating: 4.7,
    reviews: 15,
    description: "A thick handcrafted gold bangle with floral motifs and Burmese rubies.",
    details: ["22K BIS Hallmarked Gold", "Natural Untreated Rubies", "Openable Clasp", "Heritage Design"],
  },
];
