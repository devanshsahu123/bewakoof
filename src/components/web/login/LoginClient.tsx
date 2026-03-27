"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/authStore";
import {
  HiChevronRight,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiArrowLeft,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

/* ── Brand gradient ──────────────────────────────── */
const HERO_BG = "linear-gradient(135deg, #ff5200 0%, #ff8c42 45%, #ffd700 100%)";
const PANEL_BG = "linear-gradient(160deg, #0f0f1a 0%, #12102b 55%, #1a1035 100%)";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

type Step = "login" | "forgot" | "reset" | "reset-success";

/* ─── Helpers ───────────────────────────────────── */
async function apiPost(path: string, body: Record<string, string>) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: Record<string, unknown> = {};
  try { data = await res.json(); } catch { /* no body */ }
  return { ok: res.ok, status: res.status, data };
}

/* ─── InputRow ──────────────────────────────────── */
function InputRow({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  suffix,
  autoComplete,
  hint,
}: {
  label?: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  suffix?: React.ReactNode;
  autoComplete?: string;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && (
        <p className="text-[11px] font-[800] text-gray-500 uppercase tracking-[0.13em] mb-2">
          {label}
        </p>
      )}
      <div
        className="flex items-center rounded-xl border transition-all duration-200"
        style={{
          background: focused ? "#fff" : "#f7f7f7",
          borderColor: focused ? "#ff5200" : "#e5e7eb",
          boxShadow: focused ? "0 0 0 3px rgba(255,82,0,0.1)" : "none",
        }}
      >
        <span className="flex items-center pl-4 text-gray-400 shrink-0">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="flex-1 bg-transparent px-3 py-3.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none font-[500] min-w-0"
        />
        {suffix && <span className="flex items-center pr-3 shrink-0">{suffix}</span>}
      </div>
      {hint && <p className="text-[11px] text-gray-400 font-[500] mt-1.5">{hint}</p>}
    </div>
  );
}

/* ─── PrimaryBtn ─────────────────────────────────── */
function PrimaryBtn({ label, loading }: { label: string; loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[13px] font-[900] uppercase tracking-[0.14em] text-black transition-all duration-200 disabled:opacity-60 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      style={{
        background: HERO_BG,
        boxShadow: loading ? "none" : "0 6px 22px rgba(255,140,66,0.45), 0 0 0 1px rgba(255,215,0,0.3) inset",
      }}
    >
      {loading ? (
        <>
          <span
            className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black/70"
            style={{ animation: "spin .7s linear infinite" }}
          />
          Please wait…
        </>
      ) : (
        <>
          {label}
          <HiChevronRight size={16} strokeWidth={2.5} />
        </>
      )}
    </button>
  );
}

/* ─── ErrorBox ──────────────────────────────────── */
function ErrorBox({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-[13px] font-[600] text-red-700 bg-red-50 border border-red-200">
      {msg}
    </div>
  );
}

/* ─── SuccessBox ──────────────────────────────────── */
function SuccessBox({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-[13px] font-[600] text-green-700 bg-green-50 border border-green-200 flex items-center gap-2">
      <HiOutlineCheckCircle size={16} />
      {msg}
    </div>
  );
}

/* ─── Left brand panel ──────────────────────────── */
function LeftPanel() {
  return (
    <div
      className="relative overflow-hidden flex flex-col w-full py-8 px-6 lg:w-[46%] lg:min-h-full lg:py-0 lg:px-0"
      style={{ background: PANEL_BG }}
    >
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,82,0,0.22) 0%, transparent 70%)", animation: "floatA 10s ease-in-out infinite" }} />
      <div className="absolute bottom-10 -right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,215,0,0.13) 0%, transparent 70%)", animation: "floatB 13s ease-in-out infinite" }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{ background: "radial-gradient(circle, rgba(120,60,220,0.15) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Mobile */}
      <div className="relative z-10 flex flex-col items-center text-center gap-3 lg:hidden">
        <Link href="/">
          <span className="text-[26px] font-[900] tracking-widest uppercase leading-none"
            style={{ background: HERO_BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
            <sup className="text-xs font-bold ml-0.5" style={{ WebkitTextFillColor: "transparent" }}>®</sup>
          </span>
        </Link>
        <p className="text-white/50 text-[12px] font-[500] tracking-wide leading-snug max-w-[220px]">
          India&apos;s coolest youth fashion brand
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col justify-between h-full px-12 xl:px-14 py-12 xl:py-16">
        <div>
          <Link href="/">
            <span className="text-3xl font-[900] tracking-widest uppercase"
              style={{ background: HERO_BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
              <sup className="text-sm font-bold ml-0.5" style={{ WebkitTextFillColor: "transparent" }}>®</sup>
            </span>
          </Link>
          <p className="mt-2 text-white/40 text-[13px] font-[500]">India&apos;s coolest youth fashion brand</p>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 mb-7">
            <span className="inline-block text-[10px] font-[900] uppercase tracking-[0.22em] px-4 py-1.5 rounded-full border"
              style={{ background: "rgba(255,82,0,0.12)", borderColor: "rgba(255,82,0,0.3)", color: "#ff8c42" }}>
              New season, fresh styles ✦
            </span>
          </div>
          <h2 className="text-4xl xl:text-[3.2rem] font-[900] text-white leading-[1.06] tracking-tight">
            Express{" "}
            <span style={{ background: HERO_BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>yourself</span>
            <br /><span className="text-white/35">with every fit.</span>
          </h2>
          <div className="mt-3 h-[3px] w-16 rounded-full" style={{ background: HERO_BG }} />
          <p className="mt-6 text-white/50 text-[14px] leading-relaxed max-w-[280px] font-[400]">
            Log in to shop the latest drops — tees, oversized fits, mobile covers and more.
          </p>
        </div>

        <div className="border-t pt-7 space-y-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {["Free delivery on orders above ₹599", "Easy returns within 15 days", "Secure payments — UPI, cards, EMI"].map((p) => (
            <div key={p} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,140,66,0.18)", border: "1px solid rgba(255,140,66,0.3)" }}>
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="#ff8c42" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[13px] text-white/45 font-[400]">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────── */
export default function LoginClient() {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuth();
  const [step, setStep] = useState<Step>("login");

  /* ── Redirect away if already logged in ── */
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  /* login state */
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  /* forgot state */
  const [forgotId, setForgotId] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [resetToken, setResetToken] = useState("");

  /* reset state */
  const [newPassword, setNewPassword] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  /* ── Early return while redirect is happening ── */
  if (isAuthenticated) return null;

  /* ── Login handler ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      // identifier = email; password is case-sensitive (sent as-is)
      const { ok, data } = await apiPost("/customer/auth/login", { identifier, password });
      if (ok) {
        const innerData = (data.data as Record<string, unknown>) ?? {};
        const token = (innerData.token) as string | undefined;
        if (token) {
          setAuth(token);
          router.push("/");
        }
      } else {
        const msg = (data.message || data.error || "Invalid credentials. Please try again.") as string;
        setLoginError(msg);
      }
    } catch {
      setLoginError("Network error. Please check your connection.");
    } finally {
      setLoginLoading(false);
    }
  };

  /* ── Forgot password handler ── */
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);
    try {
      const { ok, data } = await apiPost("/customer/auth/forgot-password", { identifier: forgotId });
      if (ok) {
        // In dev mode the token comes back in the response
        const token = (data.token || data.reset_token || data.resetToken) as string | undefined;
        if (token) setResetToken(token);
        setForgotSuccess("Reset instructions sent! Check your email/phone.");
        setTimeout(() => setStep("reset"), 1500);
      } else {
        const msg = (data.message || data.error || "Could not find that account. Please try again.") as string;
        setForgotError(msg);
      }
    } catch {
      setForgotError("Network error. Please check your connection.");
    } finally {
      setForgotLoading(false);
    }
  };

  /* ── Reset password handler ── */
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);
    try {
      const { ok, data } = await apiPost("/customer/auth/reset-password", {
        token: resetToken,
        new_password: newPassword, // case-sensitive, min 6 chars
      });
      if (ok) {
        setStep("reset-success");
      } else {
        const msg = (data.message || data.error || "Failed to reset password. The token may have expired.") as string;
        setResetError(msg);
      }
    } catch {
      setResetError("Network error. Please check your connection.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white" style={{ animation: "pageIn .4s ease both" }}>
      <LeftPanel />

      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-10 py-10 bg-white">
        <div className="w-full max-w-[400px]" style={{ animation: "slideUp .45s cubic-bezier(.16,1,.3,1) both" }}>

          {/* ══ STEP: LOGIN ══ */}
          {step === "login" && (
            <>
              <div className="mb-8">
                <h1 className="text-[27px] sm:text-[30px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Welcome back
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <InputRow
                  label="Email Address"
                  type="email"
                  value={identifier}
                  onChange={setIdentifier}
                  placeholder="you@example.com"
                  icon={<HiOutlineEnvelope size={18} strokeWidth={1.8} />}
                  autoComplete="email"
                />
                <InputRow
                  label="Password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter your password"
                  icon={<HiOutlineLockClosed size={18} strokeWidth={1.8} />}
                  autoComplete="current-password"
                  hint="🔒 Password is case-sensitive"
                  suffix={
                    <button type="button" onClick={() => setShowPw((v) => !v)}
                      className="p-1 text-gray-400 hover:text-gray-700 transition-colors" tabIndex={-1}>
                      {showPw ? <HiOutlineEyeSlash size={17} /> : <HiOutlineEye size={17} />}
                    </button>
                  }
                />

                <div className="flex justify-end">
                  <button type="button" onClick={() => { setStep("forgot"); setForgotId(identifier); }}
                    className="text-[12px] font-[700] text-gray-500 hover:text-gray-900 underline-offset-2 hover:underline transition-colors">
                    Forgot password?
                  </button>
                </div>

                <ErrorBox msg={loginError} />
                <PrimaryBtn label="Sign In" loading={loginLoading} />
              </form>

              <p className="text-center text-[13px] text-gray-400 mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-[800] text-gray-900 hover:underline underline-offset-2">
                  Sign up
                </Link>
              </p>

              <p className="text-center text-[11px] text-gray-400 mt-6 leading-relaxed">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-gray-700 font-[700] underline-offset-2 hover:underline">Terms of Use</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-700 font-[700] underline-offset-2 hover:underline">Privacy Policy</Link>
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                {[
                  { icon: <HiOutlineShieldCheck size={14} />, label: "Secure login" },
                  { icon: <HiOutlineLockClosed size={14} />, label: "Encrypted" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5 text-[11px] font-[700] text-gray-400 uppercase tracking-wide">
                    {t.icon}{t.label}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ STEP: FORGOT PASSWORD ══ */}
          {step === "forgot" && (
            <>
              <button type="button" onClick={() => setStep("login")}
                className="flex items-center gap-1.5 text-[13px] font-[600] text-gray-400 hover:text-gray-800 mb-8 transition-colors">
                <HiArrowLeft size={15} /> Back to login
              </button>

              <div className="mb-8">
                <h1 className="text-[27px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Forgot password?
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  Enter your email and we&apos;ll send reset instructions.
                </p>
              </div>

              <form onSubmit={handleForgot} className="space-y-5">
                <InputRow
                  label="Email Address"
                  type="email"
                  value={forgotId}
                  onChange={setForgotId}
                  placeholder="you@example.com"
                  icon={<HiOutlineEnvelope size={18} strokeWidth={1.8} />}
                  autoComplete="email"
                />
                <SuccessBox msg={forgotSuccess} />
                <ErrorBox msg={forgotError} />
                <PrimaryBtn label="Send Reset Link" loading={forgotLoading} />
              </form>

              {/* Manual token entry (for dev/test) */}
              {forgotSuccess && !resetToken && (
                <div className="mt-5 space-y-2">
                  <p className="text-[11px] font-[800] text-gray-500 uppercase tracking-[0.13em]">
                    Have a reset token?
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      placeholder="Paste token here"
                      className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-[14px] font-[500] text-gray-900 focus:outline-none focus:border-orange-400"
                    />
                    <button type="button" onClick={() => setStep("reset")} disabled={!resetToken}
                      className="px-4 py-2.5 rounded-xl text-[13px] font-[800] text-black disabled:opacity-40"
                      style={{ background: HERO_BG }}>
                      Go
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ══ STEP: RESET PASSWORD ══ */}
          {step === "reset" && (
            <>
              <button type="button" onClick={() => setStep("forgot")}
                className="flex items-center gap-1.5 text-[13px] font-[600] text-gray-400 hover:text-gray-800 mb-8 transition-colors">
                <HiArrowLeft size={15} /> Back
              </button>

              <div className="mb-8">
                <h1 className="text-[27px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Reset password
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  Enter your reset token and choose a new password.
                </p>
              </div>

              <form onSubmit={handleReset} className="space-y-5">
                {/* Token field — pre-filled from API response or user-pasted */}
                <div>
                  <p className="text-[11px] font-[800] text-gray-500 uppercase tracking-[0.13em] mb-2">Reset Token</p>
                  <input
                    type="text"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Your reset token"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-[14px] font-[500] text-gray-900 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>

                <InputRow
                  label="New Password"
                  type={showNewPw ? "text" : "password"}
                  value={newPassword}
                  onChange={setNewPassword}
                  placeholder="Min. 6 characters"
                  icon={<HiOutlineLockClosed size={18} strokeWidth={1.8} />}
                  autoComplete="new-password"
                  hint="🔒 Password is case-sensitive"
                  suffix={
                    <button type="button" onClick={() => setShowNewPw((v) => !v)}
                      className="p-1 text-gray-400 hover:text-gray-700 transition-colors" tabIndex={-1}>
                      {showNewPw ? <HiOutlineEyeSlash size={17} /> : <HiOutlineEye size={17} />}
                    </button>
                  }
                />

                <ErrorBox msg={resetError} />
                <PrimaryBtn label="Reset Password" loading={resetLoading} />
              </form>
            </>
          )}

          {/* ══ STEP: RESET SUCCESS ══ */}
          {step === "reset-success" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                <HiOutlineCheckCircle size={32} className="text-white" />
              </div>
              <h1 className="text-[27px] font-[900] text-gray-900 tracking-tight leading-tight mb-2">
                Password reset!
              </h1>
              <p className="text-gray-400 text-[14px] font-[500] mb-8">
                Your password has been updated successfully. You can now log in with your new password.
              </p>
              <button type="button" onClick={() => { setStep("login"); setPassword(""); setNewPassword(""); setResetToken(""); }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[13px] font-[900] uppercase tracking-[0.14em] text-black transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: HERO_BG, boxShadow: "0 6px 22px rgba(255,140,66,0.45)" }}>
                Back to Login <HiChevronRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes pageIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,22px) scale(1.04)} }
        @keyframes floatB { 0%,100%{transform:translate(-33%,33%)} 50%{transform:translate(calc(-33% - 16px),calc(33% - 20px))} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}
