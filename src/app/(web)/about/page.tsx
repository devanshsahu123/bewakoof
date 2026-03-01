import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <section className="container" style={{ padding: "5rem 1.5rem" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>
        About {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
      </h1>
      <p style={{ color: "var(--color-text-secondary)", maxWidth: 640, lineHeight: 1.8 }}>
        Founded in 2012, {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"} is India&apos;s leading fashion brand for the young
        and bold. We believe fashion should be fun, expressive, and accessible to
        everyone—without burning a hole in your pocket.
      </p>
    </section>
  );
}
