import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: 800, color: "var(--color-primary)" }}>
        404
      </h1>
      <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)" }}>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 2rem",
          background: "var(--color-primary)",
          color: "#fff",
          borderRadius: "var(--radius-full)",
          fontWeight: 600,
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
