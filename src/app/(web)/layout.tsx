import type { Metadata } from "next";
import Header from "@/components/web/Header";
import Footer from "@/components/web/Footer";

export const metadata: Metadata = {
  title: "Bewakoof – India's Coolest Fashion Brand",
  description: "Shop the latest in quirky, affordable fashion for men and women at Bewakoof.",
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
