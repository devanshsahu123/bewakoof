"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingBag,
  HiStar,
  HiChevronDown,
  HiChevronUp,
  HiChevronRight,
  HiInformationCircle,
  HiArrowPath,
  HiShieldCheck,
  HiTruck,
} from "react-icons/hi2";
import type { ProductDetail } from "@/data/products";
import s from "./product.module.css";
import ProductCarousel from "@/components/web/home/ProductCarousel";
import type { Product } from "@/data/products";

function getDiscount(price: number, mrp: number) {
  return Math.round(((mrp - price) / mrp) * 100);
}

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<HiStar key={i} className={s.starFilled} size={15} />);
    } else if (i - rating < 1) {
      stars.push(<HiStar key={i} className={s.starHalf} size={15} />);
    } else {
      stars.push(<HiStar key={i} className={s.starEmpty} size={15} />);
    }
  }
  return <div className={s.stars}>{stars}</div>;
}

function AccordionItem({
  icon,
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={s.accordionItem}>
      <button className={s.accordionBtn} onClick={() => setOpen((o) => !o)}>
        <div className="flex items-center gap-3 flex-1">
          <span className="text-gray-500 flex-shrink-0">{icon}</span>
          <div className="text-left">
            <p className="text-[14px] font-[700] text-[#111]">{title}</p>
            {subtitle && (
              <p className="text-[12px] text-gray-400 font-[400]">{subtitle}</p>
            )}
          </div>
        </div>
        <span className="text-gray-400 flex-shrink-0">
          {open ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
        </span>
      </button>
      <div className={`${s.accordionContent} ${open ? s.open : ""}`}>
        <div className={s.accordionInner}>{children}</div>
      </div>
    </div>
  );
}

interface ProductDetailClientProps {
  product: ProductDetail;
  relatedProducts?: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts = [],
}: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [pincode, setPincode] = useState("");
  const [activeReviewTab, setActiveReviewTab] = useState<"product" | "brand">(
    "product"
  );

  const discount = getDiscount(product.price, product.mrp);

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-4">

        {/* ── Breadcrumb ── */}
        <nav className={`${s.breadcrumb} mb-5`} aria-label="Breadcrumb">
          {product.breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <HiChevronRight size={12} className={s.breadcrumbSep} />}
              <Link href={crumb.href} className={s.breadcrumbLink}>
                {crumb.label}
              </Link>
            </span>
          ))}
          <HiChevronRight size={12} className={s.breadcrumbSep} />
          <span className={s.breadcrumbCurrent}>
            {product.name.length > 45
              ? product.name.slice(0, 45) + "…"
              : product.name}
          </span>
        </nav>

        {/* ── Main Grid: Gallery + Info ── */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

          {/* ═══════════════ LEFT — Gallery ═══════════════ */}
          <div className="flex flex-row gap-3 lg:w-[52%] xl:w-[50%] flex-shrink-0">

            {/* Thumbnail strip */}
            <div className={s.thumbnailStrip}>
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`${s.thumbnail} ${i === activeImage ? s.active : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="72px"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className={`${s.mainImageWrapper} flex-1`}>
              {product.badge && (
                <span className={s.badgeOverlay}>{product.badge}</span>
              )}
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className={s.mainImage}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 580px"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* ═══════════════ RIGHT — Product Info ═══════════════ */}
          <div className={`${s.rightPanel} flex-1`}>

            {/* Brand + Name */}
            <p className="text-[13px] font-[800] tracking-widest text-[#111] uppercase mb-1">
              {product.brand}
            </p>
            <h1 className="text-[16px] text-gray-500 font-[400] leading-[1.5] mb-3">
              {product.name}
            </h1>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-4" />

            {/* Price Row */}
            <div className="flex items-baseline gap-3 flex-wrap mb-1">
              <span className="text-[26px] font-[900] text-[#111] leading-none">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[15px] text-gray-400 line-through font-[400]">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
              <span className="text-[14px] font-[800] text-[#2e7d32]">
                {discount}% OFF
              </span>
            </div>
            <p className="text-[11.5px] text-gray-400 mb-3">
              inclusive of all taxes
            </p>

            {/* Rating */}
            <div className={`${s.ratingRow} mb-4`}>
              <StarRating rating={product.rating} />
              <span className="text-[13px] font-[700] text-[#111]">
                {product.rating}
              </span>
              {product.ratingCount && (
                <span className="text-[13px] text-gray-400">
                  |&nbsp;&nbsp;
                  {product.ratingCount.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Savings chip */}
            {product.savingsPrice && (
              <div className="flex items-center gap-2 mb-3">
                <span className={s.savingsChip}>
                  <HiInformationCircle size={14} />
                  Get it for as low as&nbsp;
                  <strong>₹{product.savingsPrice}</strong>
                </span>
              </div>
            )}

            {/* Fabric badge */}
            {product.fabricBadge && (
              <div className="mb-4">
                <span className={s.fabricPill}>✦ {product.fabricBadge}</span>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-4" />

            {/* Size Selector */}
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[15px] font-[700] text-[#111]">Select Size</p>
              <button className="text-[13px] font-[600] text-blue-600 flex items-center gap-1 hover:underline">
                Size guide <HiChevronRight size={14} />
              </button>
            </div>

            <div className={`${s.sizeGrid} mb-2`}>
              {product.sizes.map((sz) => (
                <button
                  key={sz.label}
                  disabled={sz.stock === 0}
                  onClick={() => sz.stock > 0 && setSelectedSize(sz.label)}
                  className={`${s.sizeBtn} ${
                    selectedSize === sz.label ? s.sizeBtnSelected : ""
                  } ${sz.stock === 0 ? s.sizeBtnDisabled : ""}`}
                >
                  <span className={s.sizeBtnLabel}>{sz.label}</span>
                  {sz.stockLabel && sz.stock > 0 && (
                    <span className={s.sizeBtnStock}>{sz.stockLabel}</span>
                  )}
                </button>
              ))}
            </div>

            <p className="text-[12px] text-gray-400 mb-4 flex items-center gap-1.5">
              Size not available?{" "}
              <button className="text-blue-600 font-[600] flex items-center gap-1 hover:underline">
                Notify me <span className="text-blue-400">🔔</span>
              </button>
            </p>

            {/* Add to Bag + Wishlist */}
            <div className="flex items-center gap-3 mb-6">
              <button className={s.addToBagBtn}>
                <HiOutlineShoppingBag size={20} strokeWidth={2.5} />
                ADD TO BAG
              </button>
              <button
                className={`${s.wishlistBtn} ${wishlisted ? s.wishlisted : ""}`}
                onClick={() => setWishlisted((v) => !v)}
                aria-label="Wishlist"
              >
                {wishlisted ? (
                  <HiHeart size={22} className="text-red-500" />
                ) : (
                  <HiOutlineHeart size={22} className="text-gray-500" />
                )}
              </button>
            </div>

            {/* Offers */}
            <div className="mb-5">
              <p className="text-[14px] font-[700] text-[#111] mb-3">
                Save extra with these offers
              </p>
              <div className="flex flex-col gap-2">
                {product.offers.map((offer, i) => (
                  <div key={i} className={s.offerCard}>
                    <span className="text-2xl leading-none mt-0.5">
                      {offer.icon}
                    </span>
                    <div className="flex-1">
                      <p className="text-[14px] font-[700] text-[#111]">
                        {offer.title}
                      </p>
                      <p className="text-[12px] text-gray-400">
                        {offer.subtitle}
                      </p>
                    </div>
                    <Link
                      href={offer.href}
                      className="text-[12px] font-[700] text-green-700 flex items-center gap-0.5 whitespace-nowrap self-end"
                    >
                      View all items{" "}
                      <HiChevronRight size={13} strokeWidth={2.5} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Pincode checker */}
            <div className="mb-5">
              <p className="text-[14px] font-[700] text-[#111] mb-3">
                Check for Delivery Details
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter Pincode"
                  className={s.pincodeInput}
                />
                <button className={s.pincodeCheckBtn}>Check</button>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────────── KEY HIGHLIGHTS ───────────────────── */}
        <div className="mt-10 max-w-[900px]">
          <h2 className="text-[18px] font-[800] text-[#111] mb-1">
            Key Highlights
          </h2>
          <div className="h-[3px] w-10 bg-[#fdd835] rounded-full mb-4" />

          <div className={s.highlightsGrid}>
            {product.highlights.map((h) => (
              <div key={h.label} className={s.highlightItem}>
                <p className={s.highlightLabel}>{h.label}</p>
                <p className={s.highlightValue}>{h.value}</p>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className="mt-2">
            <AccordionItem
              icon={<span style={{ fontSize: 18 }}>☰</span>}
              title="Product Description"
              subtitle="Manufacture, Care and Fit"
            >
              <p>{product.description}</p>
            </AccordionItem>

            <AccordionItem
              icon={<HiArrowPath size={18} />}
              title="15 Days Returns & Exchange"
              subtitle="Know about return & exchange policy"
              defaultOpen={false}
            >
              <p>{product.returnPolicy}</p>
            </AccordionItem>
          </div>

          {/* Trust badges */}
          <div className={s.trustBadges}>
            <div className={s.trustBadge}>
              <span className={s.trustIcon}>🏅</span>
              <span className={s.trustLabel}>100% Genuine Product</span>
            </div>
            <div className={s.trustBadge}>
              <span className={s.trustIcon}>🛒</span>
              <span className={s.trustLabel}>100% Secure Payment</span>
            </div>
            <div className={s.trustBadge}>
              <span className={s.trustIcon}>📦</span>
              <span className={s.trustLabel}>Easy Returns & Instant Refunds</span>
            </div>
          </div>
        </div>

        {/* ───────────────────── REVIEWS ───────────────────── */}
        <div className="mt-10 max-w-[900px]">
          <div className={s.reviewsTabs}>
            <button
              className={`${s.reviewsTab} ${
                activeReviewTab === "product" ? s.active : ""
              }`}
              onClick={() => setActiveReviewTab("product")}
            >
              Product Reviews
            </button>
            <button
              className={`${s.reviewsTab} ${
                activeReviewTab === "brand" ? s.active : ""
              }`}
              onClick={() => setActiveReviewTab("brand")}
            >
              Brand Reviews
            </button>
          </div>
          <div className={s.reviewsPlaceholder}>
            {activeReviewTab === "product"
              ? "No product reviews yet. Be the first to review this product!"
              : "No brand reviews yet."}
          </div>
        </div>

        {/* ───────────────────── RELATED PRODUCTS ───────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200 hidden sm:block" />
              <h2 className="text-[20px] font-[900] text-[#111] uppercase tracking-wider shrink-0">
                You May Also Like
              </h2>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 to-gray-200 hidden sm:block" />
            </div>
            <div className="flex justify-center mb-5">
              <div className="h-[3px] w-10 bg-[#fdd835] rounded-full" />
            </div>
            <ProductCarousel products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
