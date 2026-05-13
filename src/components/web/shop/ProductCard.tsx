"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ShieldCheck, Star } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-warm/10 mb-6">
        <Link href={`/product/${product.id}`}>
          <Image
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-[1s] group-hover:scale-105"
          />
        </Link>
        
        {/* Luxury Gold Shimmer Overlay */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? "opacity-30" : "opacity-0"} shimmer-gold`} />

        {/* Status Badge */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/95 backdrop-blur-md text-primary text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm border border-warm/20">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white">
          <Heart size={14} strokeWidth={1.5} />
        </button>

        {/* Quick Add CTA */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-white/95 backdrop-blur-md">
           <button className="w-full flex items-center justify-center gap-2.5 py-3.5 text-[9px] font-bold uppercase tracking-[0.3em] bg-primary text-white hover:bg-accent transition-colors duration-500">
             <ShoppingBag size={13} />
             Add to Bag
           </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent">
            {product.material}
          </span>
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <ShieldCheck size={11} className="text-accent" />
            <span className="uppercase tracking-widest font-semibold">BIS</span>
          </div>
        </div>
        
        <Link href={`/product/${product.id}`} className="text-lg font-serif hover:text-accent transition-colors duration-500 truncate block">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-bold text-primary">
              ₹{(product.price).toLocaleString('en-IN')}
            </span>
            {product.oldPrice && (
              <span className="text-[13px] text-gray-400 line-through">
                ₹{(product.oldPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
             <Star size={9} fill="#D4AF7F" className="text-accent" />
             <span className="text-[9px] font-bold">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
