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
    <div className="flex min-h-screen items-center justify-center
                    bg-[#0f0f1a] px-6 py-12">
      <div className="w-full max-w-[420px] rounded-2xl border border-yellow-400/15
                      bg-[#1a1a2e] p-10 shadow-[0_24px_64px_rgba(0,0,0,0.4)]">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="flex-1 text-lg font-black text-white tracking-tight">{process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}</span>
          <span className="rounded-full bg-yellow-400/15 px-2 py-0.5
                           text-[0.6rem] font-bold uppercase tracking-widest text-yellow-400">
            Admin
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-white mb-1">Welcome back</h1>
        <p className="text-sm text-white/40 mb-8">Sign in to your admin account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-white/60">Email</label>
            <input
              id="email" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={`admin@${(process.env.NEXT_PUBLIC_APP_NAME || "siyapaa").toLowerCase()}.com`} autoComplete="email"
              className="w-full rounded-lg border border-white/10 bg-white/[0.06]
                         px-4 py-3 text-white text-sm outline-none
                         placeholder:text-white/25
                         transition-all duration-200
                         focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1)]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-white/60">Password</label>
            <input
              id="password" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" autoComplete="current-password"
              className="w-full rounded-lg border border-white/10 bg-white/[0.06]
                         px-4 py-3 text-white text-sm outline-none
                         placeholder:text-white/25
                         transition-all duration-200
                         focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1)]"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10
                          px-4 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            className="mt-1 w-full rounded-lg bg-yellow-400 py-3 text-sm font-bold
                       text-black transition-all duration-200
                       hover:opacity-90 hover:-translate-y-px
                       disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
