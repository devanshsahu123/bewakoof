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
    <div className="group relative flex flex-col shrink-0" style={{ width: "clamp(130px, 45vw, 232px)" }}>

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
          <span className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm text-white font-[800] uppercase tracking-widest rounded-sm leading-tight"
            style={{ fontSize: "clamp(6px, 1.8vw, 8px)", padding: "clamp(1px,0.5vw,2px) clamp(4px,1vw,8px)" }}>
            {product.tag}
          </span>
        )}

        {/* Top-right: Discount % */}
        {/* <span className="absolute top-2 right-2 z-10 bg-[#fdd835] text-black font-[900] rounded-sm leading-tight"
          style={{ fontSize: "clamp(7px, 2.2vw, 10px)", padding: "clamp(2px,0.6vw,4px) clamp(3px,1.2vw,6px)" }}>
          {discount}%<br />OFF
        </span> */}

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none rounded-b-lg" />

        {/* Rating chip — bottom-left */}
        {/* <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1">
          <HiStar className="text-[#fdd835]" style={{ width: "clamp(9px, 2.5vw, 12px)", height: "clamp(9px, 2.5vw, 12px)" }} />
          <span className="text-white font-[700] leading-none" style={{ fontSize: "clamp(9px, 2.5vw, 11px)" }}>
            {product.rating}
          </span>
          {product.ratingCount && (
            <span className="text-white/70 leading-none" style={{ fontSize: "clamp(8px, 2vw, 10px)" }}>
              ({product.ratingCount >= 1000
                ? `${(product.ratingCount / 1000).toFixed(1)}k`
                : product.ratingCount})
            </span>
          )}
        </div> */}

      </div>

      {/* ── Info Block ── */}
      <div className="flex flex-col gap-1 pt-2 px-0.5">
        {/* Brand */}
        <p className="font-[700] text-black leading-none tracking-wide" style={{ fontSize: "clamp(9px, 2.5vw, 11px)" }}>
          {product.brand}
        </p>

        {/* Product name */}
        <p className="text-gray-500 leading-[1.3] line-clamp-2 overflow-hidden" style={{ fontSize: "clamp(9px, 2.5vw, 11px)", height: "clamp(24px, 6.5vw, 30px)" }}>
          {product.name}
        </p>

        {/* Price row + Wishlist */}
        <div className="flex items-center justify-between mt-[1px]">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-[900] text-black leading-none" style={{ fontSize: "clamp(11px, 3.2vw, 14px)" }}>₹{product.price}</span>
            <span className="text-gray-400 line-through leading-none" style={{ fontSize: "clamp(9px, 2.3vw, 11px)" }}>₹{product.mrp}</span>
            <span className="font-[700] text-green-700 leading-none" style={{ fontSize: "clamp(8px, 2.2vw, 10px)" }}>{discount}% off</span>
          </div>

          <button
            type="button"
            onClick={() => setWishlisted((p) => !p)}
            aria-label="Wishlist"
            className="flex items-center justify-center transition-transform hover:scale-110"
            style={{ cursor: "pointer", padding: "2px" }}
          >
            {wishlisted
              ? <HiHeart className="text-red-500" style={{ width: "clamp(14px, 4vw, 18px)", height: "clamp(14px, 4vw, 18px)" }} />
              : <HiOutlineHeart className="text-gray-400 hover:text-gray-600" style={{ width: "clamp(14px, 4vw, 18px)", height: "clamp(14px, 4vw, 18px)" }} />}
          </button>
        </div>
      </div>
    </div>
  );
}
