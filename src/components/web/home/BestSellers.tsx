"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, ShieldCheck } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Regal Kundan Choker",
    price: 125000,
    oldPrice: 150000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1974&auto=format&fit=crop",
    tag: "Selling Fast",
    material: "22K Gold • Kundan",
    rating: 5.0,
    reviews: 18,
  },
  {
    id: 2,
    name: "Divine Pearl Drop Earrings",
    price: 45000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1588444839799-eb6bd77c001c?q=80&w=1974&auto=format&fit=crop",
    tag: "Limited Edition",
    material: "18K Rose Gold • Pearls",
    rating: 4.9,
    reviews: 32,
  },
  {
    id: 3,
    name: "Ethereal Diamond Band",
    price: 85000,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3f416?q=80&w=2070&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598560912005-59a195bb1a31?q=80&w=1974&auto=format&fit=crop",
    tag: "Hallmarked",
    material: "Platinum • VVS Diamonds",
    rating: 5.0,
    reviews: 12,
  },
  {
    id: 4,
    name: "Classic Gold Jhumkas",
    price: 72000,
    oldPrice: 85000,
    image: "https://images.unsplash.com/photo-1630030538573-049079b74205?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1974&auto=format&fit=crop",
    tag: "Traditional",
    material: "22K Yellow Gold",
    rating: 4.8,
    reviews: 56,
  },
];

export default function BestSellers() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6">
            Most Coveted
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif">
            The Golden <span className="italic">Selection</span>
          </h2>
          <div className="w-24 h-[1px] bg-warm mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-8">
        <Link href={`/product/${product.id}`}>
          <Image
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-[1s] group-hover:scale-105"
          />
        </Link>
        
        {/* Luxury Gold Shimmer Overlay on Hover */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? "opacity-30" : "opacity-0"} shimmer-gold`} />

        {/* Status Badge */}
        {product.tag && (
          <div className="absolute top-5 left-5 z-10">
            <span className="bg-white/90 backdrop-blur-md text-primary text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button className="absolute top-5 right-5 z-10 p-3 bg-white/80 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white">
          <Heart size={16} strokeWidth={1.5} />
        </button>

        {/* Quick Add CTA */}
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-white/90 backdrop-blur-md">
           <button className="w-full flex items-center justify-center gap-3 py-4 text-[10px] font-bold uppercase tracking-[0.3em] bg-primary text-white hover:bg-accent transition-colors duration-500">
             <ShoppingBag size={14} />
             Add to Bag
           </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {product.material}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <ShieldCheck size={12} className="text-accent" />
            <span className="uppercase tracking-widest font-semibold">Certified</span>
          </div>
        </div>
        
        <Link href={`/product/${product.id}`} className="text-xl font-serif hover:text-accent transition-colors duration-500">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-4">
            <span className="text-[17px] font-bold text-primary">
              ₹{(product.price).toLocaleString('en-IN')}
            </span>
            {product.oldPrice && (
              <span className="text-[14px] text-gray-400 line-through">
                ₹{(product.oldPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
             <Star size={10} fill="#D4AF7F" className="text-accent" />
             <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
