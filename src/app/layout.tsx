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

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Noir";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: `Premium Luxury Fashion – ${APP_NAME}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
