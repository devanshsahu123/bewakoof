"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiChevronRight,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineUser,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

/* ── Brand gradient ──────────────────────────────── */
const HERO_BG = "linear-gradient(135deg, #ff5200 0%, #ff8c42 45%, #ffd700 100%)";
const PANEL_BG = "linear-gradient(160deg, #0f0f1a 0%, #12102b 55%, #1a1035 100%)";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

type Step = "form" | "otp" | "success";

async function apiPost(path: string, body: Record<string, string>) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: Record<string, unknown> = {};
  try { data = await res.json(); } catch { /* empty */ }
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
  maxLength,
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
  maxLength?: number;
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
          maxLength={maxLength}
          required
          className="flex-1 bg-transparent px-3 py-3.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none font-[500] min-w-0"
        />
        {suffix && <span className="flex items-center pr-3 shrink-0">{suffix}</span>}
      </div>
      {hint && <p className="text-[11px] text-gray-400 font-[500] mt-1.5">{hint}</p>}
    </div>
  );
}

/* ─── OTP Boxes ──────────────────────────────────── */
function OtpBoxes({ otp, onChange }: { otp: string[]; onChange: (o: string[]) => void }) {
  const refs: (HTMLInputElement | null)[] = [];
  const handleChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    onChange(next);
    if (v && i < 5) refs[i + 1]?.focus();
  };
  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1]?.focus();
  };
  return (
    <div className="flex gap-2 sm:gap-3 justify-between">
      {otp.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className="w-full h-12 sm:h-14 text-center text-xl font-[900] text-gray-900 rounded-xl border transition-all duration-200 focus:outline-none"
          style={{
            background: d ? "#fff" : "#f7f7f7",
            borderColor: d ? "#ff5200" : "#e5e7eb",
            boxShadow: d ? "0 0 0 3px rgba(255,82,0,0.12)" : "none",
          }}
        />
      ))}
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
          <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black/70"
            style={{ animation: "spin .7s linear infinite" }} />
          Please wait…
        </>
      ) : (
        <>{label}<HiChevronRight size={16} strokeWidth={2.5} /></>
      )}
    </button>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-[13px] font-[600] text-red-700 bg-red-50 border border-red-200">
      {msg}
    </div>
  );
}

/* ─── Left brand panel ──────────────────────────── */
function LeftPanel() {
  return (
    <div className="relative overflow-hidden flex flex-col w-full py-8 px-6 lg:w-[46%] lg:min-h-full lg:py-0 lg:px-0"
      style={{ background: PANEL_BG }}>
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
              Join the cool kids ✦
            </span>
          </div>
          <h2 className="text-4xl xl:text-[3.2rem] font-[900] text-white leading-[1.06] tracking-tight">
            Start your{" "}
            <span style={{ background: HERO_BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>style</span>
            <br /><span className="text-white/35">journey today.</span>
          </h2>
          <div className="mt-3 h-[3px] w-16 rounded-full" style={{ background: HERO_BG }} />
          <p className="mt-6 text-white/50 text-[14px] leading-relaxed max-w-[280px] font-[400]">
            Create your account and get access to exclusive drops, member offers, and early sale access.
          </p>
        </div>

        <div className="border-t pt-7 space-y-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {["Exclusive member discounts", "Early access to new drops", "Fast checkout on every order"].map((p) => (
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
export default function SignupClient() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");

  /* form state */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  /* otp state */
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [devOtp, setDevOtp] = useState(""); // OTP returned in dev mode

  /* ── Split full name into first + last ── */
  const splitName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0] || "";
    const last = parts.slice(1).join(" ") || "."; // API requires last_name, fallback to "."
    return { first, last };
  };

  /* ── Signup handler ── */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (fullName.trim().split(/\s+/).length < 1 || fullName.trim().length < 2) {
      setFormError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }

    setFormLoading(true);
    const { first, last } = splitName(fullName);
    try {
      const { ok, data } = await apiPost("/customer/auth/signup", {
        email,
        first_name: first,
        last_name: last,
        password, // case-sensitive, sent as-is
      });
      if (ok) {
        // Dev mode: OTP may be returned in response
        const returnedOtp = (data.otp || data.OTP || data.code) as string | undefined;
        if (returnedOtp) setDevOtp(String(returnedOtp));
        setStep("otp");
      } else {
        const msg = (data.message || data.error || "Signup failed. Please try again.") as string;
        setFormError(msg);
      }
    } catch {
      setFormError("Network error. Please check your connection.");
    } finally {
      setFormLoading(false);
    }
  };

  /* ── OTP verify handler ── */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }
    setOtpLoading(true);
    try {
      const { ok, data } = await apiPost("/customer/auth/verify-otp", {
        identifier: email,  // use email as identifier
        otp: otpString,
      });
      if (ok) {
        // Save JWT if returned
        const token = (data.token || data.access_token || data.jwt) as string | undefined;
        if (token) localStorage.setItem("auth_token", token);
        setStep("success");
      } else {
        const msg = (data.message || data.error || "Invalid OTP. Please try again.") as string;
        setOtpError(msg);
      }
    } catch {
      setOtpError("Network error. Please check your connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  /* ── Resend OTP ── */
  const handleResend = async () => {
    setOtpError("");
    const { first, last } = splitName(fullName);
    const { ok, data } = await apiPost("/customer/auth/signup", {
      email, first_name: first, last_name: last, password,
    });
    if (ok) {
      const returnedOtp = (data.otp || data.OTP || data.code) as string | undefined;
      if (returnedOtp) setDevOtp(String(returnedOtp));
      setOtp(["", "", "", "", "", ""]);
    } else {
      setOtpError("Could not resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white" style={{ animation: "pageIn .4s ease both" }}>
      <LeftPanel />

      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-10 py-10 bg-white">
        <div className="w-full max-w-[400px]" style={{ animation: "slideUp .45s cubic-bezier(.16,1,.3,1) both" }}>

          {/* ══ STEP: SIGNUP FORM ══ */}
          {step === "form" && (
            <>
              <div className="mb-8">
                <h1 className="text-[27px] sm:text-[30px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Create account
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  Join us — it&apos;s free and takes 30 seconds.
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full Name */}
                <InputRow
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={setFullName}
                  placeholder="Riya Sharma"
                  icon={<HiOutlineUser size={18} strokeWidth={1.8} />}
                  autoComplete="name"
                  hint="Enter your first and last name"
                />

                {/* Email */}
                <InputRow
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  icon={<HiOutlineEnvelope size={18} strokeWidth={1.8} />}
                  autoComplete="email"
                />


                {/* Password */}
                <InputRow
                  label="Password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="Min. 6 characters"
                  icon={<HiOutlineLockClosed size={18} strokeWidth={1.8} />}
                  autoComplete="new-password"
                  hint="🔒 Password is case-sensitive"
                  suffix={
                    <button type="button" onClick={() => setShowPw((v) => !v)}
                      className="p-1 text-gray-400 hover:text-gray-700 transition-colors" tabIndex={-1}>
                      {showPw ? <HiOutlineEyeSlash size={17} /> : <HiOutlineEye size={17} />}
                    </button>
                  }
                />

                <ErrorBox msg={formError} />
                <PrimaryBtn label="Create Account" loading={formLoading} />
              </form>

              <p className="text-center text-[13px] text-gray-400 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="font-[800] text-gray-900 hover:underline underline-offset-2">
                  Sign in
                </Link>
              </p>

              <p className="text-center text-[11px] text-gray-400 mt-6 leading-relaxed">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-gray-700 font-[700] underline-offset-2 hover:underline">Terms of Use</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-700 font-[700] underline-offset-2 hover:underline">Privacy Policy</Link>
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                {[
                  { icon: <HiOutlineShieldCheck size={14} />, label: "Secure signup" },
                  { icon: <HiOutlineCheckCircle size={14} />, label: "OTP verified" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5 text-[11px] font-[700] text-gray-400 uppercase tracking-wide">
                    {t.icon}{t.label}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ STEP: OTP VERIFICATION ══ */}
          {step === "otp" && (
            <>
              <button type="button" onClick={() => setStep("form")}
                className="flex items-center gap-1.5 text-[13px] font-[600] text-gray-400 hover:text-gray-800 mb-8 transition-colors">
                ← Change details
              </button>

              <div className="mb-8">
                <h1 className="text-[27px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Verify your email
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  We sent a 6-digit OTP to{" "}
                  <span className="font-[800] text-gray-800">{email}</span>
                </p>
              </div>

              {/* Dev mode OTP hint */}
              {devOtp && (
                <div className="mb-4 rounded-xl px-4 py-3 text-[13px] font-[600] text-amber-700 bg-amber-50 border border-amber-200">
                  Dev mode OTP: <span className="font-[900] tracking-widest">{devOtp}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <p className="text-[11px] font-[800] text-gray-500 uppercase tracking-[0.13em] mb-3">
                    Enter 6-digit OTP
                  </p>
                  <OtpBoxes otp={otp} onChange={setOtp} />
                </div>

                <ErrorBox msg={otpError} />
                <PrimaryBtn label="Verify & Continue" loading={otpLoading} />

                <p className="text-center text-[13px] text-gray-400">
                  Didn&apos;t receive it?{" "}
                  <button type="button" onClick={handleResend}
                    className="font-[800] text-gray-900 hover:underline">
                    Resend OTP
                  </button>
                </p>
              </form>
            </>
          )}

          {/* ══ STEP: SUCCESS ══ */}
          {step === "success" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: HERO_BG }}>
                <HiOutlineCheckCircle size={32} className="text-black" />
              </div>
              <h1 className="text-[27px] font-[900] text-gray-900 tracking-tight leading-tight mb-2">
                Welcome, {fullName.split(" ")[0]}! 🎉
              </h1>
              <p className="text-gray-400 text-[14px] font-[500] mb-8">
                Your account is ready. Start exploring the latest drops.
              </p>
              <button type="button" onClick={() => router.push("/")}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[13px] font-[900] uppercase tracking-[0.14em] text-black transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: HERO_BG, boxShadow: "0 6px 22px rgba(255,140,66,0.45)" }}>
                Start Shopping <HiChevronRight size={16} />
              </button>
              <p className="text-center text-[13px] text-gray-400 mt-4">
                or{" "}
                <Link href="/login" className="font-[800] text-gray-900 hover:underline underline-offset-2">
                  go to login
                </Link>
              </p>
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

