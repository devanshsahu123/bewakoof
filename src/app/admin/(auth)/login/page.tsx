"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.login(email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Left branding panel (md+) ── */}
      <div
        className="hidden md:flex flex-col justify-center items-start px-14 py-16 flex-[0_0_46%] relative overflow-hidden"
        style={{ background: "linear-gradient(140deg,#fdd835 0%,#ff9800 55%,#ff5200 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/20 pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-5xl font-black uppercase tracking-tight text-gray-900 leading-none mb-2">
            {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
            <sup className="text-[0.4em] align-super font-bold ml-1">®</sup>
          </h1>
          <p className="text-sm font-semibold text-black/60 mb-10 tracking-wide">
            Admin Control Panel
          </p>

          <ul className="flex flex-col gap-3">
            {[
              "Manage orders & inventory",
              "Track users & activity",
              "Configure coupons & offers",
              "Monitor revenue in real-time",
            ].map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/55 backdrop-blur-sm text-sm font-semibold text-gray-900"
              >
                <span className="w-2 h-2 rounded-full bg-gray-900 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right login form ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-10 shadow-lg">
          {/* Logo inside card */}
          <div className="flex items-center gap-2 mb-7">
            <span className="text-base font-black uppercase tracking-tight text-gray-900">
              {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-gray-900 uppercase tracking-widest">
              Admin
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-gray-400 mb-8">Sign in to your admin account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`admin@${(
                  process.env.NEXT_PUBLIC_APP_NAME || "siyapaa"
                ).toLowerCase()}.com`}
                autoComplete="email"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 placeholder-gray-400 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-gray-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 placeholder-gray-400 transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-lg transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
