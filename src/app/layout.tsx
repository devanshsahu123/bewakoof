import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/store/authStore";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "SIYAPAA";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: `Luxury Indian Jewelry – ${APP_NAME}`,
};

import Header from "@/components/web/Header";
import Footer from "@/components/web/Footer";
import MobileNav from "@/components/web/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}
