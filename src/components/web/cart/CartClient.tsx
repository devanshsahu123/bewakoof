"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineShoppingBag,
  HiOutlineTrash,
  HiOutlineTag,
  HiMinus,
  HiPlus,
  HiChevronRight,
  HiChevronDown,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineArrowPath,
  HiXMark,
  HiCheck,
  HiOutlineGift,
  HiOutlineTicket,
  HiOutlineHeart,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { useCart } from "@/hooks/useCart";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const FREE_SHIPPING_THRESHOLD = 599;

function getDiscount(price: number, mrp: number) {
  return Math.round(((mrp - price) / mrp) * 100);
}

/* ─────────────────────────────────────────────
   Sub‑components
───────────────────────────────────────────── */

/** Shipping progress bar */
function ShippingProgress({ total }: { total: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - total;
  const pct = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const done = total >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl px-4 py-3.5 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <HiOutlineTruck
            size={17}
            className={done ? "text-emerald-600" : "text-gray-400"}
          />
          <span className="text-[12.5px] font-semibold text-gray-700">
            {done ? (
              <span className="text-emerald-700 font-bold">
                🎉 You unlocked FREE delivery!
              </span>
            ) : (
              <>
                Add{" "}
                <strong className="text-emerald-700">
                  ₹{remaining.toLocaleString("en-IN")}
                </strong>{" "}
                more for free delivery
              </>
            )}
          </span>
        </div>
        <span className="text-[11px] text-gray-400 font-medium">
          ₹{FREE_SHIPPING_THRESHOLD}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: done
              ? "linear-gradient(90deg,#10b981,#059669)"
              : "linear-gradient(90deg,#fbbf24,#f59e0b)",
          }}
        />
      </div>
    </div>
  );
}

/** Single cart item card */
function CartItemCard({
  item,
  onRemove,
  onQtyChange,
}: {
  item: import("@/hooks/useCart").CartItem;
  onRemove: (id: string, size: string) => void;
  onQtyChange: (id: string, size: string, qty: number) => void;
}) {
  const discount = getDiscount(item.price, item.mrp);
  const savings = item.mrp - item.price;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-full shadow">
          {discount}% OFF
        </div>
      )}

      <div className="flex gap-0 sm:gap-4">
        {/* Product image */}
        <Link
          href={`/product/${item.slug}`}
          className="relative flex-shrink-0 w-[110px] sm:w-[130px] aspect-[3/4] bg-gray-50 overflow-hidden rounded-l-2xl sm:rounded-xl"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            sizes="130px"
            unoptimized
          />
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col gap-2">
          {/* Brand + name */}
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.18em] text-gray-400 uppercase mb-0.5">
              {item.brand}
            </p>
            <Link
              href={`/product/${item.slug}`}
              className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-yellow-600 transition-colors"
            >
              {item.name}
            </Link>
          </div>

          {/* Size pill */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              <span className="text-[9px] text-gray-400 font-normal uppercase tracking-widest">
                Size
              </span>
              {item.size}
            </span>
          </div>

          {/* Price row */}
          <div className="flex items-center gap-2 flex-wrap mt-auto">
            <span className="text-base sm:text-lg font-black text-gray-900 leading-none">
              ₹{item.price.toLocaleString("en-IN")}
            </span>
            {item.mrp > item.price && (
              <span className="text-xs text-gray-400 line-through font-normal">
                ₹{item.mrp.toLocaleString("en-IN")}
              </span>
            )}
            {savings > 0 && (
              <span className="text-[11px] font-bold text-green-600">
                Save ₹{savings.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Qty + Remove row */}
          <div className="flex items-center justify-between gap-2 mt-1">
            {/* Quantity stepper */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  onQtyChange(item.id, item.size, Math.max(1, item.quantity - 1))
                }
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <HiMinus size={14} strokeWidth={2.5} />
              </button>
              <span className="min-w-[24px] text-center text-sm font-bold text-gray-900 select-none">
                {item.quantity}
              </span>
              <button
                onClick={() => onQtyChange(item.id, item.size, item.quantity + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <HiPlus size={14} strokeWidth={2.5} />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                aria-label="Move to wishlist"
                className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
              >
                <HiOutlineHeart size={15} />
              </button>
              <button
                onClick={() => onRemove(item.id, item.size)}
                aria-label="Remove item"
                className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
              >
                <HiOutlineTrash size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery tag */}
      <div className="px-3 sm:px-4 py-2 border-t border-gray-50 flex items-center gap-2">
        <HiOutlineTruck size={13} className="text-emerald-500 flex-shrink-0" />
        <span className="text-[11px] text-emerald-700 font-semibold">
          Delivery in 3–5 business days
        </span>
      </div>
    </div>
  );
}

/** Coupon/discount row */
function CouponField({
  applied,
  onApply,
  onRemove,
}: {
  applied: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
}) {
  const [code, setCode] = useState("");

  if (applied) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
            <HiCheck size={14} className="text-green-600" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold text-green-800">Coupon applied!</p>
            <p className="text-[11px] text-green-600 font-semibold uppercase tracking-widest">
              {applied}
            </p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
        >
          <HiXMark size={14} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <HiOutlineTicket
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none transition-colors font-medium placeholder:font-normal"
        />
      </div>
      <button
        onClick={() => {
          if (code.trim()) onApply(code.trim());
        }}
        disabled={!code.trim()}
        className="px-4 py-2.5 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Apply
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Offers Panel (collapsible, manual input)
───────────────────────────────────────────── */
const OFFERS = [
  {
    code: "FIRST10",
    desc: "10% off on your first order",
    icon: "🎁",
    save: "Save 10%",
  },
  {
    code: "STYLE20",
    desc: "Flat ₹100 off on orders above ₹999",
    icon: "🏷️",
    save: "Save ₹100",
  },
  {
    code: "FREESHIP",
    desc: "Free delivery on all orders",
    icon: "🚚",
    save: "Free Ship",
  },
];

function OffersPanel({
  onApply,
  onRemove,
  appliedCoupon,
}: {
  onApply: (code: string) => void;
  onRemove: () => void;
  appliedCoupon: string | null;
}) {
  const [expanded, setExpanded] = useState(false);

  // When a coupon is applied + collapsed → hide all rows (shown in pinned strip)
  // When a coupon is applied + expanded → show all OTHER offers (not the applied one — already pinned)
  // When no coupon + collapsed → show only 1st row
  const visibleOffers = expanded
    ? OFFERS.filter((o) => o.code !== appliedCoupon) // exclude applied (already shown in pinned strip)
    : appliedCoupon
    ? []                      // applied+collapsed → hide all rows
    : OFFERS.slice(0, 1);     // no coupon → show 1st offer

  // How many extra offers beyond the first (for the toggle label)
  const extraCount = OFFERS.length - 1;

  const appliedOffer = OFFERS.find((o) => o.code === appliedCoupon);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-50">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <HiOutlineGift size={15} className="text-yellow-500" strokeWidth={2} />
          Available Offers
          <span className="bg-yellow-100 text-yellow-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
            {OFFERS.length}
          </span>
        </h3>
      </div>

      {/* ── Applied coupon strip — pinned, always visible ──
           Shows even when panel is collapsed */}
      {appliedCoupon && appliedOffer && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border-b border-green-100">
          {/* Green check icon */}
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
            <HiCheck size={17} className="text-green-600" strokeWidth={2.5} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold text-green-800 leading-tight">
              {appliedOffer.desc}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-mono font-extrabold text-green-700 tracking-[0.16em] border border-dashed border-green-400 px-1.5 py-0.5 rounded">
                {appliedCoupon}
              </span>
              <span className="text-[10px] font-bold text-green-600">
                {appliedOffer.save}
              </span>
            </div>
          </div>

          {/* Remove button */}
          <button
            onClick={onRemove}
            aria-label="Remove coupon"
            className="flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 bg-red-50 hover:bg-red-100 rounded-lg px-2.5 py-1.5 transition-all whitespace-nowrap"
          >
            <HiXMark size={12} strokeWidth={2.5} />
            Remove
          </button>
        </div>
      )}


      {/* ── Offer rows — tap a row to apply ── */}
      {visibleOffers.length > 0 && (
        <div className="divide-y divide-gray-50">
          {visibleOffers.map((offer) => (
            <button
              key={offer.code}
              onClick={() => onApply(offer.code)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-yellow-50 transition-colors cursor-pointer border-0 bg-transparent"
              aria-label={`Apply offer ${offer.code}`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-yellow-50">
                {offer.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold text-gray-800 leading-tight">
                  {offer.desc}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-mono font-extrabold text-gray-500 tracking-[0.18em] border border-dashed border-gray-300 px-1.5 py-0.5 rounded">
                    {offer.code}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {offer.save}
                  </span>
                </div>
              </div>

              {/* Tap hint */}
              <span className="text-[11px] font-semibold text-yellow-600 whitespace-nowrap flex items-center gap-0.5">
                Tap to apply
                <HiChevronRight size={12} strokeWidth={2.5} />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── Expand / Collapse toggle ── */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-semibold text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 transition-all border-t border-gray-50"
      >
        {expanded ? (
          <>
            <HiChevronDown
              size={14}
              className="rotate-180 transition-transform duration-200"
              strokeWidth={2.5}
            />
            Hide offers
          </>
        ) : (
          <>
            <HiChevronDown
              size={14}
              className="transition-transform duration-200"
              strokeWidth={2.5}
            />
            {appliedCoupon
              ? `View ${extraCount} more offer${extraCount !== 1 ? "s" : ""}`
              : `View ${extraCount} more offer${extraCount !== 1 ? "s" : ""}`}
          </>
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Empty cart state
───────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Decorative bag illustration */}
      <div
        className="relative w-36 h-36 rounded-full flex items-center justify-center mb-6"
        style={{
          background:
            "radial-gradient(circle at 38% 40%, #fef08a 0%, #fde047 55%, #facc15 100%)",
          boxShadow:
            "0 12px 40px rgba(250,204,21,0.4), 0 0 0 8px rgba(250,204,21,0.1)",
        }}
      >
        <HiOutlineShoppingBag
          size={64}
          className="text-gray-900"
          strokeWidth={1.3}
        />
        {/* Sparkle dots */}
        <span className="absolute top-4 right-6 w-2.5 h-2.5 rounded-full bg-white/70 animate-ping" />
        <span className="absolute bottom-6 left-5 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2">
        Your bag is empty!
      </h2>
      <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">
        Looks like you haven&apos;t added anything yet. Explore our latest
        collections and find something you&apos;ll love.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold uppercase tracking-wide text-sm transition-all duration-200 text-gray-900 hover:-translate-y-0.5 hover:shadow-xl"
        style={{
          background: "linear-gradient(90deg,#fbbf24 0%,#facc15 100%)",
          boxShadow: "0 6px 20px rgba(250,204,21,0.5)",
        }}
      >
        <HiOutlineShoppingBag size={18} strokeWidth={2.5} />
        Start Shopping
        <HiChevronRight size={16} strokeWidth={2.5} />
      </Link>

      {/* Or categories */}
      <div className="mt-10 flex flex-wrap gap-2 justify-center">
        {["Men", "Women", "Mobile Covers"].map((cat) => (
          <Link
            key={cat}
            href={`/shop/${cat.toLowerCase().replace(" ", "-")}`}
            className="text-xs font-semibold text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-800 px-4 py-2 rounded-full transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main CartClient Component
───────────────────────────────────────────── */
export default function CartClient() {
  const router = useRouter();
  const { cart, removeFromCart } = useCart();
  const [items, setItems] = useState<import("@/hooks/useCart").CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);

  // Sync local items from useCart on first render and cart changes
  // We maintain local state so qty updates are instant
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncedItems =
    items.length === 0 && cart.length > 0
      ? cart
      : items.length > 0
      ? items
      : cart;

  // We track cart in local state for immediate qty updates
  const [localCart, setLocalCart] =
    useState<import("@/hooks/useCart").CartItem[]>(cart);

  // Sync from hook whenever hook cart changes (e.g. new item added)
  const cartFromHook = cart;

  /* ── handle qty change ── */
  const handleQtyChange = useCallback(
    (id: string, size: string, qty: number) => {
      setLocalCart((prev) =>
        prev.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: qty }
            : item
        )
      );
    },
    []
  );

  /* ── merged view: use localCart if populated, else cart from hook ── */
  const displayCart =
    localCart.length > 0
      ? localCart
      : cartFromHook;

  // When hook cart updates (new items), merge in
  const mergedCart = cartFromHook.map((hookItem) => {
    const local = localCart.find(
      (l) => l.id === hookItem.id && l.size === hookItem.size
    );
    return local ?? hookItem;
  });

  /* ── handle remove ── */
  function handleRemove(id: string, size: string) {
    removeFromCart(id, size);
    setLocalCart((prev) =>
      prev.filter((i) => !(i.id === id && i.size === size))
    );
  }

  /* ── totals ── */
  const subTotal = mergedCart.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );
  const mrpTotal = mergedCart.reduce((s, i) => s + i.mrp * i.quantity, 0);
  const totalDiscount = mrpTotal - subTotal;
  const couponDiscount = coupon ? Math.round(subTotal * 0.1) : 0;
  const shippingCharge =
    subTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 79;
  const grandTotal = subTotal - couponDiscount + shippingCharge;
  const totalItems = mergedCart.reduce((s, i) => s + i.quantity, 0);

  /* ── empty state ── */
  if (mergedCart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Hero breadcrumb strip ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <HiChevronRight size={12} />
          <span className="text-gray-700 font-semibold">
            Shopping Bag ({totalItems} item{totalItems !== 1 ? "s" : ""})
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-6 lg:py-10">
        {/* ── Page heading ── */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            My Shopping Bag
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your bag
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 items-start">

          {/* ══════════════ LEFT — Cart items ══════════════ */}
          <div className="space-y-3">
            {/* Shipping progress */}
            <ShippingProgress total={subTotal} />

            {/* Items */}
            {mergedCart.map((item) => (
              <CartItemCard
                key={`${item.id}-${item.size}`}
                item={item}
                onRemove={handleRemove}
                onQtyChange={handleQtyChange}
              />
            ))}

            {/* Offers strip — collapsible */}
            <OffersPanel
              onApply={(code) => setCoupon(code)}
              onRemove={() => setCoupon(null)}
              appliedCoupon={coupon}
            />

            {/* Trust badges (mobile — visible below items) */}
            <div className="flex items-center justify-around flex-wrap gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 lg:hidden">
              {[
                {
                  icon: <HiOutlineShieldCheck size={20} className="text-emerald-600" />,
                  label: "100% Genuine",
                },
                {
                  icon: <HiOutlineLockClosed size={20} className="text-blue-600" />,
                  label: "Secure Payment",
                },
                {
                  icon: <HiOutlineArrowPath size={20} className="text-purple-600" />,
                  label: "Easy Returns",
                },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  {b.icon}
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════ RIGHT — Order Summary ══════════════ */}
          <div className="lg:sticky lg:top-[84px] space-y-4">

            {/* ── Coupon ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HiOutlineTag
                  size={15}
                  className="text-yellow-500"
                  strokeWidth={2.5}
                />
                Apply Coupon
              </h3>
              <CouponField
                applied={coupon}
                onApply={(c) => setCoupon(c)}
                onRemove={() => setCoupon(null)}
              />
            </div>

            {/* ── Price breakdown ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-extrabold text-gray-900 pb-3 border-b border-gray-100 mb-4">
                Price Details
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Price ({totalItems} item{totalItems !== 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold text-gray-800">
                    ₹{mrpTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span className="font-bold">
                    − ₹{totalDiscount.toLocaleString("en-IN")}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span className="flex items-center gap-1">
                      Coupon (
                      <span className="font-mono font-bold text-[11px]">
                        {coupon}
                      </span>
                      )
                    </span>
                    <span className="font-bold">
                      − ₹{couponDiscount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Charge</span>
                  <span
                    className={
                      shippingCharge === 0
                        ? "font-bold text-green-700"
                        : "font-semibold text-gray-800"
                    }
                  >
                    {shippingCharge === 0
                      ? "FREE"
                      : `₹${shippingCharge}`}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-gray-100 my-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-gray-900 text-base">
                  Total Amount
                </span>
                <span className="font-black text-xl text-gray-900">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Savings pill */}
              {totalDiscount + couponDiscount > 0 && (
                <div className="bg-green-50 rounded-xl px-3 py-2 text-center mt-3">
                  <p className="text-[12.5px] font-bold text-green-800">
                    🎉 You&apos;re saving{" "}
                    <strong>
                      ₹
                      {(totalDiscount + couponDiscount).toLocaleString(
                        "en-IN"
                      )}
                    </strong>{" "}
                    on this order!
                  </p>
                </div>
              )}

              {/* Checkout CTA */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-5 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-gray-900 cursor-pointer border-0"
                style={{
                  background: "linear-gradient(90deg,#facc15 0%,#fbbf24 100%)",
                  boxShadow:
                    "0 6px 24px rgba(250,204,21,0.5), 0 0 0 1px rgba(250,204,21,0.2) inset",
                }}
              >
                <HiOutlineLockClosed size={17} strokeWidth={2.5} />
                Proceed to Checkout
                <HiChevronRight size={16} strokeWidth={2.5} />
              </button>

              {/* Secure badge */}
              <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1">
                <HiOutlineShieldCheck
                  size={13}
                  className="text-gray-400"
                  strokeWidth={2}
                />
                100% Secure &amp; Encrypted Checkout
              </p>
            </div>

            {/* ── Trust badges (desktop) ── */}
            <div className="hidden lg:flex items-center justify-around flex-wrap gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4">
              {[
                {
                  icon: (
                    <HiOutlineShieldCheck
                      size={22}
                      className="text-emerald-600"
                      strokeWidth={1.8}
                    />
                  ),
                  label: "100% Genuine",
                },
                {
                  icon: (
                    <HiOutlineLockClosed
                      size={22}
                      className="text-blue-600"
                      strokeWidth={1.8}
                    />
                  ),
                  label: "Secure Payment",
                },
                {
                  icon: (
                    <HiOutlineArrowPath
                      size={22}
                      className="text-purple-600"
                      strokeWidth={1.8}
                    />
                  ),
                  label: "Easy Returns",
                },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  {b.icon}
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Continue shopping ── */}
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors py-2"
            >
              <HiChevronRight
                size={14}
                className="rotate-180"
                strokeWidth={2.5}
              />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
