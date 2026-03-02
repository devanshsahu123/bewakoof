import type { Metadata } from "next";
import CartClient from "@/components/web/cart/CartClient";

export const metadata: Metadata = {
  title: "My Shopping Bag | Siyapaa",
  description:
    "Review your selected items, apply coupon codes, and proceed to checkout securely.",
};

export default function CartPage() {
  return <CartClient />;
}
