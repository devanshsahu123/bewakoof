"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  HiChevronRight,
  HiOutlineShieldCheck,
  HiArrowLeft,
  HiOutlineDevicePhoneMobile,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";

/* ── exact brand hero gradient ──────────────────── */
const HERO_BG =
  "linear-gradient(135deg, #ff5200 0%, #ff8c42 45%, #ffd700 100%)";

type Step = "phone" | "otp" | "password";

/* ─── input row ─────────────────────────────────── */
function InputRow({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  suffix,
  autoComplete,
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
        {suffix && (
          <span className="flex items-center pr-3 shrink-0">{suffix}</span>
        )}
      </div>
    </div>
  );
}

/* ─── CTA btn ────────────────────────────────────── */
function PrimaryBtn({
  label,
  loading,
  type = "submit",
}: {
  label: string;
  loading?: boolean;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[13px] font-[900] uppercase tracking-[0.14em] text-black transition-all duration-200 disabled:opacity-60 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      style={{
        background: HERO_BG,
        boxShadow: loading
          ? "none"
          : "0 6px 22px rgba(255,140,66,0.45), 0 0 0 1px rgba(255,215,0,0.3) inset",
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

/* ─── OTP boxes ──────────────────────────────────── */
function OtpBoxes({
  otp,
  onChange,
}: {
  otp: string[];
  onChange: (otp: string[]) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    onChange(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      refs.current[i - 1]?.focus();
  };
  return (
    <div className="flex gap-2 sm:gap-3 justify-between">
      {otp.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
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

/* ─── Left brand panel ───────────────────────────── */
const PANEL_BG = "linear-gradient(160deg, #0f0f1a 0%, #12102b 55%, #1a1035 100%)";

function LeftPanel() {
  return (
    <div
      className="relative overflow-hidden flex flex-col
        w-full py-8 px-6
        lg:w-[46%] lg:min-h-full lg:py-0 lg:px-0"
      style={{ background: PANEL_BG }}
    >
      {/* ── Ambient glow orbs ── */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,82,0,0.22) 0%, transparent 70%)",
          animation: "floatA 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-10 -right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,215,0,0.13) 0%, transparent 70%)",
          animation: "floatB 13s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(120,60,220,0.15) 0%, transparent 65%)",
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Mobile layout ── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-3 lg:hidden">
        {/* Brand name */}
        <Link href="/">
          <span
            className="text-[26px] font-[900] tracking-widest uppercase leading-none"
            style={{ background: HERO_BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
            <sup className="text-xs font-bold ml-0.5" style={{ WebkitTextFillColor: "transparent" }}>®</sup>
          </span>
        </Link>

        {/* Tagline */}
        <p className="text-white/50 text-[12px] font-[500] tracking-wide leading-snug max-w-[220px]">
          India&apos;s coolest youth fashion brand
        </p>

  
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:flex flex-col justify-between h-full px-12 xl:px-14 py-12 xl:py-16">

        {/* Top: logo */}
        <div>
          <Link href="/">
            <span
              className="text-3xl font-[900] tracking-widest uppercase"
              style={{ background: HERO_BG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
              <sup className="text-sm font-bold ml-0.5" style={{ WebkitTextFillColor: "transparent" }}>®</sup>
            </span>
          </Link>
          <p className="mt-2 text-white/40 text-[13px] font-[500]">
            India&apos;s coolest youth fashion brand
          </p>
        </div>

        {/* Middle: headline */}
        <div>
          {/* badge */}
          <div className="inline-flex items-center gap-2 mb-7">
            <span
              className="inline-block text-[10px] font-[900] uppercase tracking-[0.22em] px-4 py-1.5 rounded-full border"
              style={{
                background: "rgba(255,82,0,0.12)",
                borderColor: "rgba(255,82,0,0.3)",
                color: "#ff8c42",
              }}
            >
              New season, fresh styles ✦
            </span>
          </div>

          <h2 className="text-4xl xl:text-[3.2rem] font-[900] text-white leading-[1.06] tracking-tight">
            Express{" "}
            <span
              style={{
                background: HERO_BG,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              yourself
            </span>
            <br />
            <span className="text-white/35">with every fit.</span>
          </h2>

          {/* accent underline */}
          <div
            className="mt-3 h-[3px] w-16 rounded-full"
            style={{ background: HERO_BG }}
          />

          <p className="mt-6 text-white/50 text-[14px] leading-relaxed max-w-[280px] font-[400]">
            Log in to shop the latest drops — tees, oversized fits, mobile covers and more.
          </p>

          {/* stats */}

        </div>

        {/* Bottom: trust */}
        <div
          className="border-t pt-7 space-y-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {[
            "Free delivery on orders above ₹599",
            "Easy returns within 15 days",
            "Secure payments — UPI, cards, EMI",
          ].map((p) => (
            <div key={p} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,140,66,0.18)", border: "1px solid rgba(255,140,66,0.3)" }}
              >
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
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    setResendTimer(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); startTimer(); }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("password"); }, 1200);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const reset = () => {
    setStep("phone"); setPhone(""); setOtp(["", "", "", "", "", ""]);
    setPassword(""); setResendTimer(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  /* strength */
  const strength =
    password.length < 6 ? 1
    : password.length < 8 ? 2
    : /[A-Z]/.test(password) && /\d/.test(password) ? 4 : 3;
  const strengthColor = ["", "#ef4444", "#f59e0b", "#22c55e", "#16a34a"][strength];
  const strengthLabel = ["", "Too short", "Weak", "Good", "Strong ✓"][strength];

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-white"
      style={{ animation: "pageIn .4s ease both" }}
    >
      {/* ── Left / Top brand panel ── */}
      <LeftPanel />

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-10 py-10 bg-white">
        <div
          className="w-full max-w-[400px]"
          style={{ animation: "slideUp .45s cubic-bezier(.16,1,.3,1) both" }}
        >
          {/* ── PHONE step ── */}
          {step === "phone" && (
            <>
              <div className="mb-8">
                <h1 className="text-[27px] sm:text-[30px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Login / Sign up
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  Enter your mobile number to continue
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-5">
                {/* Phone field */}
                <div>
                  <p className="text-[11px] font-[800] text-gray-500 uppercase tracking-[0.13em] mb-2">
                    Mobile Number
                  </p>
                  <PhoneInput value={phone} onChange={setPhone} />
                </div>
                <PrimaryBtn label="Get OTP" loading={loading} />
              </form>

              {/* divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11px] font-[700] uppercase tracking-widest text-gray-300">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* social */}
              <div className="space-y-3">
                <SocialBtn
                  label="Continue with Email"
                  icon={<HiOutlineEnvelope size={18} strokeWidth={1.8} />}
                />
                <SocialBtn
                  label="Continue with Google"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.3 0 6.2 1.2 8.5 3.1l6.3-6.3C34.8 2.9 29.7 1 24 1 14.8 1 6.9 6.7 3.2 14.9l7.3 5.7C12.2 14 17.6 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"/>
                      <path fill="#FBBC05" d="M10.5 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7.3-5.7A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l8-6.1z"/>
                      <path fill="#34A853" d="M24 47c5.7 0 10.5-1.9 14-5.1l-7.4-5.7c-1.9 1.3-4.4 2-6.6 2-6.4 0-11.8-4.3-13.7-10.2l-8 6.2C6.9 41.3 14.8 47 24 47z"/>
                    </svg>
                  }
                />
              </div>

              {/* T&C */}
              <p className="text-center text-[11px] text-gray-400 mt-8 leading-relaxed">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-gray-700 font-[700] underline-offset-2 hover:underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-700 font-[700] underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </p>

              {/* trust strip */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                {[
                  { icon: <HiOutlineShieldCheck size={14} />, label: "Secure login" },
                  { icon: <HiOutlineDevicePhoneMobile size={14} />, label: "OTP verified" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5 text-[11px] font-[700] text-gray-400 uppercase tracking-wide">
                    {t.icon}{t.label}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── OTP step ── */}
          {step === "otp" && (
            <>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 text-[13px] font-[600] text-gray-400 hover:text-gray-800 mb-8 transition-colors"
              >
                <HiArrowLeft size={15} />
                Change number
              </button>
              <div className="mb-8">
                <h1 className="text-[27px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Verify your number
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  OTP sent to{" "}
                  <span className="font-[800] text-gray-800">+91 {phone}</span>
                </p>
              </div>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <p className="text-[11px] font-[800] text-gray-500 uppercase tracking-[0.13em] mb-3">
                    Enter 6-digit OTP
                  </p>
                  <OtpBoxes otp={otp} onChange={setOtp} />
                </div>
                <PrimaryBtn label="Verify OTP" loading={loading} />
                <p className="text-center text-[13px] text-gray-400">
                  {resendTimer > 0 ? (
                    <>Resend OTP in <span className="font-[800] text-gray-800">0:{resendTimer.toString().padStart(2, "0")}</span></>
                  ) : (
                    <>Didn&apos;t receive it?{" "}
                      <button
                        type="button"
                        onClick={() => { setOtp(["", "", "", "", "", ""]); startTimer(); }}
                        className="font-[800] text-gray-900 hover:underline"
                      >
                        Resend OTP
                      </button>
                    </>
                  )}
                </p>
              </form>
            </>
          )}

          {/* ── Password step ── */}
          {step === "password" && (
            <>
              <button
                type="button"
                onClick={() => setStep("otp")}
                className="flex items-center gap-1.5 text-[13px] font-[600] text-gray-400 hover:text-gray-800 mb-8 transition-colors"
              >
                <HiArrowLeft size={15} />
                Back
              </button>
              <div className="mb-8">
                <h1 className="text-[27px] font-[900] text-gray-900 tracking-tight leading-tight">
                  Set your password
                </h1>
                <p className="text-gray-400 text-[14px] font-[500] mt-1.5">
                  Create a secure password to protect your account
                </p>
              </div>
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <InputRow
                  label="New Password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="Min. 8 characters"
                  icon={<HiOutlineLockClosed size={18} strokeWidth={1.8} />}
                  autoComplete="new-password"
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                      tabIndex={-1}
                    >
                      {showPw ? <HiOutlineEyeSlash size={17} /> : <HiOutlineEye size={17} />}
                    </button>
                  }
                />
                {/* strength bar */}
                {password.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{ background: i <= strength ? strengthColor : "#e5e7eb" }}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] font-[700] text-gray-400">{strengthLabel}</p>
                  </div>
                )}
                <PrimaryBtn label="Create Account" loading={loading} />
              </form>
            </>
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

/* ─── Phone input ───────────────────────────────── */
function PhoneInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center rounded-xl border transition-all duration-200"
      style={{
        background: focused ? "#fff" : "#f7f7f7",
        borderColor: focused ? "#ff5200" : "#e5e7eb",
        boxShadow: focused ? "0 0 0 3px rgba(255,82,0,0.1)" : "none",
      }}
    >
      <div
        className="flex items-center gap-2 pl-4 pr-3 shrink-0 border-r py-3.5"
        style={{ borderColor: focused ? "rgba(255,82,0,0.2)" : "#e5e7eb" }}
      >
        <span className="text-lg leading-none">🇮🇳</span>
        <span className="text-[14px] font-[800] text-gray-700">+91</span>
      </div>
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Enter 10-digit number"
        autoComplete="tel"
        required
        className="flex-1 bg-transparent px-4 py-3.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none font-[500]"
      />
    </div>
  );
}

/* ─── Social btn ────────────────────────────────── */
function SocialBtn({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-gray-200 bg-white text-[13px] font-[700] text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 uppercase tracking-wider"
    >
      {icon}
      {label}
    </button>
  );
}
