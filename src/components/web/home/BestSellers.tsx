"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Silk Shirt",
    price: 189.00,
    oldPrice: 245.00,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1603252109303-2751441dd15e?q=80&w=1974&auto=format&fit=crop",
    tag: "Selling Fast",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: "Tailored Wool Trousers",
    price: 320.00,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop",
    tag: "Limited Edition",
    rating: 5.0,
    reviews: 42,
  },
  {
    id: 3,
    name: "Minimalist Leather Tote",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1584917033904-4938203c1e83?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
    tag: "Restocked",
    rating: 4.8,
    reviews: 215,
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    price: 210.00,
    oldPrice: 280.00,
    image: "https://images.unsplash.com/photo-1574180563860-269e8bb43ec4?q=80&w=1974&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1610664921890-ebad0a086411?q=80&w=1974&auto=format&fit=crop",
    tag: "Trending",
    rating: 4.9,
    reviews: 89,
  },
];

export default function BestSellers() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4">
            Most Coveted
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif">
            Seasonal <span className="italic">Masterpieces</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-6">
        <Link href={`/product/${product.id}`}>
          <Image
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Scarcity Badge */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-accent">
          <Heart size={18} strokeWidth={1.5} />
        </button>

        {/* Quick Add (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/80 backdrop-blur-md">
           <button className="w-full flex items-center justify-center gap-2 py-3 text-[11px] font-bold uppercase tracking-widest bg-primary text-white hover:bg-accent transition-colors">
             <ShoppingBag size={14} />
             Quick Add
           </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-[12px] font-bold uppercase tracking-widest text-primary/70">
            Atelier Noir
          </h4>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Star size={10} fill="currentColor" className="text-accent" />
            <span>{product.rating}</span>
            <span className="ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <Link href={`/product/${product.id}`} className="text-lg font-serif hover:text-accent transition-colors">
          {product.name}
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="text-[16px] font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-[14px] text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
