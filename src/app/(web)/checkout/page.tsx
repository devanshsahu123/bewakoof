import type { Metadata } from "next";
import CheckoutClient from "@/components/web/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Siyapaa",
  description: "Enter your delivery address and complete your order securely.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
