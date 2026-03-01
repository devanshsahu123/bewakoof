"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineHeart, HiHeart, HiStar } from "react-icons/hi2";
import type { Product } from "@/data/products";

function getDiscount(price: number, mrp: number) {
  return Math.round(((mrp - price) / mrp) * 100);
}

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = getDiscount(product.price, product.mrp);

  return (
    <div className="group relative flex flex-col w-[calc(50vw-44px)] sm:w-[190px] md:w-[210px] lg:w-[232px] shrink-0">

      {/* ── Image Wrapper ── */}
      <div className="relative w-full overflow-hidden rounded-lg bg-gray-100" style={{ aspectRatio: "3/4" }}>
        <Link href={product.href} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) calc(50vw - 44px), (max-width: 768px) 190px, (max-width: 1024px) 210px, 232px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            unoptimized
          />
        </Link>

        {/* Top-left: Category tag */}
        {product.tag && (
          <span className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm text-white text-[8px] font-[800] uppercase tracking-widest px-2 py-0.5 rounded-sm leading-tight">
            {product.tag}
          </span>
        )}

        {/* Top-right: Discount % */}
        <span className="absolute top-2 right-2 z-10 bg-[#fdd835] text-black text-[10px] font-[900] px-1.5 py-0.5 rounded-sm leading-tight">
          {discount}%<br />OFF
        </span>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none rounded-b-lg" />

        {/* Rating chip — bottom-left */}
        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1">
          <HiStar size={11} className="text-[#fdd835]" />
          <span className="text-white text-[11px] font-[700] leading-none">{product.rating}</span>
          {product.ratingCount && (
            <span className="text-white/60 text-[9px] leading-none hidden sm:inline">
              ({product.ratingCount >= 1000
                ? `${(product.ratingCount / 1000).toFixed(1)}k`
                : product.ratingCount})
            </span>
          )}
        </div>

        {/* Wishlist — bottom-right, inside the image */}
        <button
          type="button"
          onClick={() => setWishlisted((p) => !p)}
          aria-label="Wishlist"
          className="absolute bottom-2 right-2 z-20 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center transition-transform hover:scale-110"
          style={{ cursor: "pointer" }}
        >
          {wishlisted
            ? <HiHeart size={14} className="text-red-500" />
            : <HiOutlineHeart size={14} className="text-gray-500" />}
        </button>
      </div>

      {/* ── Info Block ── */}
      <div className="flex flex-col gap-1 pt-2 px-0.5">
        {/* Brand */}
        <p className="text-[11px] font-[700] text-black leading-none tracking-wide">
          {product.brand}
        </p>

        {/* Product name — locked 2-line height for consistent card alignment */}
        <p className="text-[11px] text-gray-500 leading-[1.4] line-clamp-2 h-[30px] overflow-hidden">
          {product.name}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
          <span className="text-[13px] font-[900] text-black">₹{product.price}</span>
          <span className="text-[11px] text-gray-400 line-through">₹{product.mrp}</span>
          <span className="text-[10px] font-[700] text-green-700">{discount}% off</span>
        </div>
      </div>
    </div>
  );
}
