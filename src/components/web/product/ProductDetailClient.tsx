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
  HiXMark,
  HiCheck,
} from "react-icons/hi2";
import type { ProductDetail } from "@/data/products";
import ProductCarousel from "@/components/web/home/ProductCarousel";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";

function getDiscount(price: number, mrp: number) {
  return Math.round(((mrp - price) / mrp) * 100);
}

/* ── Star Rating ─────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <HiStar
          key={i}
          size={15}
          className={
            i <= Math.floor(rating)
              ? "text-yellow-400"
              : i - rating < 1
              ? "text-yellow-300 opacity-60"
              : "text-gray-200"
          }
        />
      ))}
    </div>
  );
}

/* ── Accordion ───────────────────────────────────────────── */
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
    <div className="border-t border-gray-100 last:border-b last:border-gray-100">
      <button
        className="flex items-center justify-between w-full py-4 bg-transparent border-0 text-left cursor-pointer gap-3"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 flex-1">
          <span className="text-gray-400 flex-shrink-0">{icon}</span>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">{title}</p>
            {subtitle && (
              <p className="text-xs text-gray-400 font-normal mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        <span className="text-gray-400 flex-shrink-0">
          {open ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[400px]" : "max-h-0"}`}
      >
        <div className="pb-4 text-[13.5px] text-gray-500 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Size Picker Modal ───────────────────────────────────── */
function SizePickerModal({
  sizes,
  selectedSize,
  onSelect,
  onClose,
  onConfirm,
  productName,
}: {
  sizes: ProductDetail["sizes"];
  selectedSize: string | null;
  onSelect: (s: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}) {
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      {/* Sheet */}
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: "slideUp 0.28s cubic-bezier(.22,1,.36,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[11px] font-extrabold tracking-widest text-gray-400 uppercase mb-0.5">
              Select Size
            </p>
            <p className="text-sm font-bold text-gray-900 line-clamp-1">{productName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer border-0"
            aria-label="Close"
          >
            <HiXMark size={18} />
          </button>
        </div>

        {/* Size Grid */}
        <div className="px-5 py-5">
          <div className="flex gap-2.5 flex-wrap mb-2">
            {sizes.map((sz) => (
              <button
                key={sz.label}
                disabled={sz.stock === 0}
                onClick={() => sz.stock > 0 && onSelect(sz.label)}
                aria-pressed={selectedSize === sz.label}
                aria-label={`Size ${sz.label}${sz.stock === 0 ? ", out of stock" : ""}`}
                className={`flex flex-col items-center justify-center min-w-[58px] px-3 py-2 rounded-xl border-2 text-center transition-all duration-150 gap-0.5
                  ${sz.stock === 0
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-40 line-through"
                    : selectedSize === sz.label
                    ? "border-gray-900 bg-gray-900 text-white shadow-md scale-105"
                    : "border-gray-300 bg-white hover:border-gray-900 hover:bg-gray-50"
                  }`}
              >
                <span className="text-[14px] font-bold leading-none">{sz.label}</span>
                {sz.stockLabel && sz.stock > 0 && (
                  <span
                    className={`text-[9px] font-semibold leading-none ${
                      selectedSize === sz.label ? "text-yellow-300" : "text-orange-600"
                    }`}
                  >
                    {sz.stockLabel}
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* <p className="text-xs text-gray-400 mb-1">
            Size not available?{" "}
            <button className="text-blue-600 font-semibold hover:underline">
              Notify me 🔔
            </button>
          </p> */}
        </div>

        {/* Confirm CTA */}
        <div className="px-5 pb-6">
          <button
            onClick={() => {
              if (selectedSize) onConfirm();
            }}
            disabled={!selectedSize}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-wide transition-all duration-200 border-0
              ${selectedSize
                ? "bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-[0_4px_14px_rgba(253,216,53,0.5)] cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            <HiOutlineShoppingBag size={20} strokeWidth={2.5} />
            {selectedSize ? `Add Size ${selectedSize} to Bag` : "Please select a size"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── Added-to-Bag Toast + Go-to-Cart Banner ──────────────── */
function AddedToBagBanner({ onGoToCart }: { onGoToCart: () => void }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl"
      style={{
        transform: "translateX(-50%)",
        animation: "toastIn 0.35s cubic-bezier(.22,1,.36,1)",
        minWidth: 280,
      }}
    >
      {/* Checkmark circle */}
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 flex-shrink-0">
        <HiCheck size={18} strokeWidth={3} />
      </span>
      <span className="flex-1 text-sm font-semibold">Added to your bag!</span>
      <Link
        href="/cart"
        onClick={onGoToCart}
        className="flex items-center gap-1 text-sm font-extrabold text-yellow-400 hover:text-yellow-300 whitespace-nowrap transition-colors"
      >
        Go to Bag <HiChevronRight size={15} strokeWidth={2.5} />
      </Link>

      <style>{`
        @keyframes toastIn {
          from { transform: translateX(-50%) translateY(24px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
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
  const [activeReviewTab, setActiveReviewTab] = useState<"product" | "brand">("product");

  /* Modal & cart state */
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const discount = getDiscount(product.price, product.mrp);

  /* ── Core add-to-cart logic ─────────────────────────── */
  function commitAddToCart(size: string) {
    const slug = product.href.split("/").filter(Boolean).pop() ?? product.id;
    addToCart({
      id: product.id,
      slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0],
      size,
    });
    setSelectedSize(size);
    setShowSizeModal(false);
    setAddedToCart(true);
    // No timeout — state is permanent until page reload
  }

  /* ── Button click handler ───────────────────────────── */
  function handleAddToCart() {
    // If size is already chosen → add immediately
    if (selectedSize) {
      commitAddToCart(selectedSize);
      return;
    }
    // If product has no real sizes (e.g. "Free") → add with first available
    const firstAvailable = product.sizes.find((s) => s.stock > 0);
    if (!firstAvailable) return; // all sold out
    if (product.sizes.length === 1 && firstAvailable.label.toLowerCase() === "free") {
      commitAddToCart(firstAvailable.label);
      return;
    }
    // Otherwise open the size picker modal
    setShowSizeModal(true);
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-4">

        {/* ── Breadcrumb ───────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol
            className="flex items-center gap-1.5 flex-wrap text-xs text-gray-400"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {product.breadcrumb.map((crumb, i) => (
              <li
                key={`${crumb.href}-${i}`}
                className="flex items-center gap-1.5"
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                {i > 0 && <HiChevronRight size={11} className="text-gray-300" />}
                <Link
                  href={crumb.href}
                  className="hover:text-gray-800 transition-colors duration-150"
                  itemProp="item"
                >
                  <span itemProp="name">{crumb.label}</span>
                </Link>
                <meta itemProp="position" content={String(i + 1)} />
              </li>
            ))}
            <li className="flex items-center gap-1.5">
              <HiChevronRight size={11} className="text-gray-300" />
              <span className="text-gray-600 font-medium">
                {product.name.length > 45 ? product.name.slice(0, 45) + "…" : product.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* ═══════════════════════════════════════════════════════════
            TWO-COLUMN LAYOUT
        ═══════════════════════════════════════════════════════════ */}
        <article
          itemScope
          itemType="https://schema.org/Product"
          className="flex flex-col lg:flex-row gap-6 xl:gap-10 items-start"
        >

          {/* ═══ LEFT — Sticky Image Gallery ═══════════════════ */}
          <div className="w-full lg:w-[46%] xl:w-[44%] flex-shrink-0 lg:sticky lg:top-[72px] lg:self-start">

            {/* sm+ : vertical thumbnail strip + main image side-by-side */}
            <div className="flex gap-2 sm:gap-3">

              {/* Vertical thumbnails — hidden on mobile */}
              <div className="hidden sm:flex flex-col gap-2 w-[58px] flex-shrink-0 max-h-[560px] overflow-y-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-200 bg-gray-100 border-2
                      ${i === activeImage ? "border-gray-900" : "border-transparent hover:border-gray-300"}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} – view ${i + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="58px"
                      unoptimized
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-sm text-white text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded">
                    {product.badge}
                  </span>
                )}
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 580px"
                  priority
                  unoptimized
                  itemProp="image"
                />
              </div>
            </div>

            {/* Mobile horizontal thumbnail strip — xs only */}
            <div className="flex sm:hidden gap-2 mt-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-14 h-[72px] flex-shrink-0 rounded-md overflow-hidden border-2 transition-all
                    ${i === activeImage ? "border-gray-900" : "border-transparent"}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} – view ${i + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ═══ RIGHT — ALL product info ════════════════════════ */}
          <div className="w-full lg:flex-1 min-w-0">

            {/* Brand */}
            <p className="text-[11px] font-extrabold tracking-[0.15em] text-gray-400 uppercase mb-1" itemProp="brand">
              {product.brand}
            </p>

            {/* h1 — Product name */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-3" itemProp="name">
              {product.name}
            </h1>

            <hr className="border-gray-100 mb-4" />

            {/* Price */}
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="priceCurrency" content="INR" />
              <meta itemProp="price" content={String(product.price)} />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <span className="text-[26px] font-black text-gray-900 leading-none">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[15px] text-gray-400 line-through font-normal">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-extrabold text-green-700">{discount}% OFF</span>
              </div>
              <p className="text-[11.5px] text-gray-400 mb-4">inclusive of all taxes</p>
            </div>

            {/* Rating */}
            <div
              className="flex items-center gap-2 mb-4"
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
              <meta itemProp="ratingValue" content={String(product.rating)} />
              {product.ratingCount && <meta itemProp="reviewCount" content={String(product.ratingCount)} />}
              <StarRating rating={product.rating} />
              <span className="text-sm font-bold text-gray-900">{product.rating}</span>
              {product.ratingCount && (
                <span className="text-xs text-gray-400">| {product.ratingCount.toLocaleString("en-IN")} Ratings</span>
              )}
            </div>

            {/* Savings chip */}
            {product.savingsPrice && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300 rounded-full px-3 py-1.5 text-xs font-semibold text-yellow-800">
                  <HiInformationCircle size={14} />
                  Get it for as low as&nbsp;<strong>₹{product.savingsPrice}</strong>
                </span>
              </div>
            )}

            {/* Fabric badge */}
            {product.fabricBadge && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-[11.5px] font-semibold text-gray-600">
                  ✦ {product.fabricBadge}
                </span>
              </div>
            )}

            <hr className="border-gray-100 mb-4" />

            {/* Size Selector */}
            <section aria-label="Size selection" className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-900">Select Size</h2>
                <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline">
                  Size guide <HiChevronRight size={13} />
                </button>
              </div>
              <div className="flex gap-2 flex-wrap mb-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz.label}
                    disabled={sz.stock === 0}
                    onClick={() => sz.stock > 0 && setSelectedSize(sz.label)}
                    aria-pressed={selectedSize === sz.label}
                    aria-label={`Size ${sz.label}${sz.stock === 0 ? ", out of stock" : ""}`}
                    className={`flex flex-col items-center justify-center min-w-[52px] px-2 py-1.5 rounded-md border text-center transition-all duration-150 gap-0.5
                      ${sz.stock === 0
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50 line-through"
                        : selectedSize === sz.label
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white hover:border-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-[13px] font-bold leading-none">{sz.label}</span>
                    {sz.stockLabel && sz.stock > 0 && (
                      <span className={`text-[9px] font-medium leading-none ${selectedSize === sz.label ? "text-yellow-300" : "text-orange-600"}`}>
                        {sz.stockLabel}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                Size not available?{" "}
                <button className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5">
                  {/* Notify me <span className="text-blue-400">🔔</span> */}
                </button>
              </p>
            </section>

            {/* ── Add to Bag + Wishlist (only when NOT yet added) ── */}
            {!addedToCart && (
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-extrabold tracking-wide uppercase rounded-lg border-0 cursor-pointer transition-all duration-200 bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-[0_4px_14px_rgba(253,216,53,0.45)] hover:shadow-[0_8px_24px_rgba(253,216,53,0.55)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <HiOutlineShoppingBag size={20} strokeWidth={2.5} /> ADD TO BAG
                </button>
                <button
                  className={`flex items-center justify-center w-[52px] h-[52px] rounded-lg border cursor-pointer transition-all duration-150 flex-shrink-0
                    ${wishlisted ? "border-red-300 bg-red-50" : "border-gray-300 bg-white hover:border-red-300 hover:bg-red-50"}`}
                  onClick={() => setWishlisted((v) => !v)}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {wishlisted
                    ? <HiHeart size={22} className="text-red-500" />
                    : <HiOutlineHeart size={22} className="text-gray-500" />
                  }
                </button>
              </div>
            )}

            {/* ════════════════════════════════════════════════
                PREMIUM "ADDED TO BAG" CONFIRMATION CARD
                Appears permanently after item is added
            ════════════════════════════════════════════════ */}
            {addedToCart && (
              <div
                className="relative overflow-hidden rounded-2xl mb-6"
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2027 100%)",
                  animation: "bagCardIn 0.45s cubic-bezier(.22,1,.36,1)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06) inset",
                }}
              >
                {/* Glowing accent orb */}
                <div
                  style={{
                    position: "absolute", top: -30, right: -30,
                    width: 120, height: 120,
                    background: "radial-gradient(circle, rgba(74,222,128,0.35) 0%, transparent 70%)",
                    borderRadius: "50%", pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute", bottom: -20, left: 60,
                    width: 80, height: 80,
                    background: "radial-gradient(circle, rgba(250,204,21,0.18) 0%, transparent 70%)",
                    borderRadius: "50%", pointerEvents: "none",
                  }}
                />

                <div className="relative z-10 p-4">
                  {/* Top row — checkmark + label + product thumb */}
                  <div className="flex items-center gap-3 mb-4">
                    {/* Animated check badge */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        boxShadow: "0 0 16px rgba(34,197,94,0.55)",
                        animation: "popIn 0.4s cubic-bezier(.34,1.56,.64,1) 0.15s both",
                      }}
                    >
                      <HiCheck size={22} strokeWidth={3} className="text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-extrabold tracking-[0.18em] text-green-400 uppercase mb-0.5">
                        ✦ Added to Bag
                      </p>
                      <p className="text-white font-bold text-sm leading-tight line-clamp-1">
                        {product.name}
                      </p>
                    </div>

                    {/* Product thumbnail */}
                    <div
                      className="flex-shrink-0 w-14 h-[72px] rounded-xl overflow-hidden"
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={56}
                        height={72}
                        className="object-cover object-top w-full h-full"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Size + Price pill row */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}
                    >
                      <span className="text-yellow-400">◆</span> Size: {selectedSize}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}
                    >
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded-full"
                      style={{ background: "rgba(34,197,94,0.18)", color: "#86efac" }}
                    >
                      {getDiscount(product.price, product.mrp)}% OFF
                    </span>
                  </div>

                  {/* GO TO BAG CTA */}
                  <Link
                    href="/cart"
                    className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-extrabold uppercase tracking-widest transition-all duration-200 group no-underline"
                    style={{
                      background: "linear-gradient(90deg, #facc15 0%, #fbbf24 100%)",
                      color: "#0f172a",
                      boxShadow: "0 4px 20px rgba(250,204,21,0.4), 0 0 0 1px rgba(250,204,21,0.2) inset",
                    }}
                  >
                    <HiOutlineShoppingBag
                      size={18}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    Go to Bag
                    <HiChevronRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}

            {/* Wishlist button — shown below the card when addedToCart */}
            {addedToCart && (
              <button
                onClick={() => setWishlisted((v) => !v)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all duration-150 mb-5
                  ${wishlisted
                    ? "border-red-300 bg-red-50 text-red-500 hover:bg-red-100"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                  }`}
              >
                {wishlisted
                  ? <HiHeart size={18} className="text-red-500" />
                  : <HiOutlineHeart size={18} />
                }
                {wishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            )}

            <style>{`
              @keyframes bagCardIn {
                from { opacity: 0; transform: translateY(14px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes popIn {
                from { transform: scale(0); opacity: 0; }
                to   { transform: scale(1); opacity: 1; }
              }
            `}</style>

            {/* Offers */}
            {/* <section aria-label="Available offers" className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Save extra with these offers</h2>
              <div className="flex flex-col gap-2">
                {product.offers.map((offer, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 border-[1.5px] border-dashed border-gray-200 rounded-xl bg-gray-50 hover:border-yellow-400 hover:bg-yellow-50 transition-colors duration-150">
                    <span className="text-2xl leading-none mt-0.5">{offer.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{offer.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{offer.subtitle}</p>
                    </div>
                    <Link href={offer.href} className="text-xs font-bold text-green-700 flex items-center gap-0.5 whitespace-nowrap self-end hover:underline">
                      View all <HiChevronRight size={12} strokeWidth={2.5} />
                    </Link>
                  </div>
                ))}
              </div>
            </section> */}

            <hr className="border-gray-100 mb-6" />

            {/* ── KEY HIGHLIGHTS ─────────────────────────────── */}
            <section aria-label="Key highlights" className="mb-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">Key Highlights</h2>
              <div className="h-[3px] w-8 bg-yellow-400 rounded-full mb-4" />
              <dl className="grid grid-cols-2 border border-gray-100 rounded-xl overflow-hidden">
                {product.highlights.map((h, i) => (
                  <div
                    key={h.label}
                    className={`px-4 py-3.5 bg-white border-b border-gray-100
                      ${i % 2 === 0 ? "border-r border-gray-100" : ""}`}
                  >
                    <dt className="text-xs text-gray-400 font-medium mb-0.5">{h.label}</dt>
                    <dd className="text-sm text-gray-900 font-bold">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* ── ACCORDIONS ───────────────────────────────────── */}
            <div className="mb-6">
              <AccordionItem
                icon={<span style={{ fontSize: 18 }}>☰</span>}
                title="Product Description"
                subtitle="Manufacture, Care and Fit"
              >
                <p itemProp="description">{product.description}</p>
              </AccordionItem>
              <AccordionItem
                icon={<HiArrowPath size={18} />}
                title="15 Days Returns & Exchange"
                subtitle="Know about return & exchange policy"
              >
                <p>{product.returnPolicy}</p>
              </AccordionItem>
            </div>

            {/* ── TRUST BADGES ─────────────────────────────────── */}
            <div className="flex items-center justify-around flex-wrap gap-4 py-5 border-t border-b border-gray-100">
              {[
                { icon: "🏅", label: "100% Genuine Product" },
                { icon: "🛒", label: "100% Secure Payment" },
                { icon: "📦", label: "Easy Returns & Refunds" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-3xl">{b.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500 leading-tight max-w-[80px]">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </article>

        {/* ══════════════════════════════════════════════════════════
            FULL-WIDTH BELOW — Reviews + Related Products
        ══════════════════════════════════════════════════════════ */}
        <div className="mt-10 border-t border-gray-100 pt-8">

          {/* Reviews */}
          <section className="mb-12 max-w-4xl" aria-label="Product reviews">
            <h2 className="text-lg font-extrabold text-gray-900 mb-1">Customer Reviews</h2>
            <div className="h-[3px] w-10 bg-yellow-400 rounded-full mb-5" />
            <div className="flex border border-gray-200 rounded-xl overflow-hidden mb-1">
              {(["product", "brand"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveReviewTab(tab)}
                  className={`flex-1 py-3 text-sm font-semibold cursor-pointer border-0 transition-all duration-150
                    ${activeReviewTab === tab ? "bg-gray-900 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
                  aria-selected={activeReviewTab === tab}
                  role="tab"
                >
                  {tab === "product" ? "Product Reviews" : "Brand Reviews"}
                </button>
              ))}
            </div>
            <div className="py-10 text-center text-gray-400 text-sm" role="tabpanel">
              {activeReviewTab === "product"
                ? "No product reviews yet. Be the first to review this product!"
                : "No brand reviews yet."}
            </div>
          </section>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-10" aria-label="Related products">
            <div className="flex items-center gap-4 mb-2">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200 hidden sm:block" />
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider shrink-0">You May Also Like</h2>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 to-gray-200 hidden sm:block" />
            </div>
            <div className="flex justify-center mb-5">
              <div className="h-[3px] w-10 bg-yellow-400 rounded-full" />
            </div>
            <ProductCarousel products={relatedProducts} />
          </section>
        )}

      </div>

      {/* ── Size Picker Modal (portal-like, fixed overlay) ── */}
      {showSizeModal && (
        <SizePickerModal
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
          onClose={() => setShowSizeModal(false)}
          onConfirm={() => selectedSize && commitAddToCart(selectedSize)}
          productName={product.name}
        />
      )}

      {/* Floating toast removed — premium card handles confirmation */}
    </div>
  );
}
