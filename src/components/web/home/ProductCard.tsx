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
    <div className="group relative flex flex-col w-[160px] sm:w-[200px] md:w-[220px] lg:w-[240px] shrink-0">

      {/* ── Image Block ── */}
      <Link
        href={product.href}
        className="relative block w-full overflow-hidden rounded-xl bg-gray-100"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 240px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized
        />

        {/* Top-left: Tag badge */}
        {product.tag && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-black/75 text-white text-[8px] sm:text-[9px] font-[800] uppercase tracking-widest px-1.5 py-0.5 rounded-sm leading-tight backdrop-blur-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Top-right: Discount badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-[#fdd835] text-black text-[9px] sm:text-[10px] font-[900] px-1.5 py-0.5 rounded-sm leading-tight shadow-sm">
            {discount}% OFF
          </span>
        </div>

        {/* Bottom: dark gradient + rating */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/65 to-transparent z-10 rounded-b-xl" />
        <div className="absolute bottom-2 left-2.5 z-20 flex items-center gap-1">
          <HiStar size={12} className="text-[#fdd835] shrink-0" />
          <span className="text-white text-[11px] font-[700]">{product.rating}</span>
          {product.ratingCount && (
            <span className="text-white/60 text-[10px] hidden sm:inline">
              ({product.ratingCount >= 1000
                ? `${(product.ratingCount / 1000).toFixed(1)}k`
                : product.ratingCount})
            </span>
          )}
        </div>
      </Link>

      {/* ── Wishlist Button ── */}
      <button
        type="button"
        onClick={() => setWishlisted((p) => !p)}
        aria-label="Toggle Wishlist"
        style={{ bottom: "calc(25% + 6px)", cursor: "pointer" }}
        className="absolute right-2 z-20 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110"
      >
        {wishlisted
          ? <HiHeart size={14} className="text-red-500" />
          : <HiOutlineHeart size={14} className="text-gray-500" />
        }
      </button>

      {/* ── Info ── */}
      <div className="pt-2.5 px-0.5 flex flex-col gap-0.5">
        {/* Brand */}
        <p className="text-[11px] sm:text-[12px] font-[700] text-gray-900 leading-none">
          {product.brand}
        </p>

        {/* Name — fixed 2-line height so all cards align */}
        <p className="text-[11px] sm:text-[12px] text-gray-500 leading-snug line-clamp-2"
           style={{ minHeight: "32px" }}>
          {product.name}
        </p>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[13px] sm:text-[14px] font-[900] text-black">₹{product.price}</span>
          <span className="text-[10px] sm:text-[11px] text-gray-400 line-through">₹{product.mrp}</span>
          <span className="text-[10px] sm:text-[11px] font-[700] text-[#1a9c3e]">{discount}% off</span>
        </div>
      </div>
    </div>
  );
}
