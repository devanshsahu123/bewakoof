import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <section className="container" style={{ padding: "5rem 1.5rem" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>
        Contact Us
      </h1>
      <p style={{ color: "var(--color-text-secondary)", maxWidth: 640, lineHeight: 1.8 }}>
        Have a question, feedback, or want to collaborate? Reach us at{" "}
        <a href={`mailto:support@${(process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa").toLowerCase()}.com`} style={{ color: "var(--color-primary)", fontWeight: 600 }}>
          support@{(process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa").toLowerCase()}.com
        </a>
      </p>
    </section>
  );
}
