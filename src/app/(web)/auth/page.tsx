"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronRight, Mail, Phone, Lock } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup" | "otp">("login");

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full">
        
        {/* Logo/Brand Header */}
        <div className="text-center mb-12">
          <Link href="/">
            <h1 className="text-4xl font-serif tracking-[0.4em] uppercase mb-2">Siyapaa</h1>
            <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">Luxury Jewelry</span>
          </Link>
        </div>

        <div className="bg-white p-10 shadow-2xl border border-warm/10 relative overflow-hidden">
          {/* Subtle gold decoration */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-accent" />
          
          <AnimatePresence mode="wait">
            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col"
              >
                <h2 className="text-2xl font-serif mb-8 text-center">Welcome Back <span className="italic">to Royalty</span></h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Email or Phone</label>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                       <input type="text" className="w-full bg-secondary/50 border border-warm/20 p-4 pl-12 text-[12px] font-bold tracking-widest outline-none focus:border-accent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Password</label>
                    <div className="relative">
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                       <input type="password" className="w-full bg-secondary/50 border border-warm/20 p-4 pl-12 text-[12px] font-bold tracking-widest outline-none focus:border-accent" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setMode("otp")}
                    className="w-full py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-700 shadow-xl"
                  >
                    Authenticate
                  </button>
                </div>
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setMode("signup")}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-accent transition-colors"
                  >
                    Create a new Legacy Account
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "signup" && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col"
              >
                <h2 className="text-2xl font-serif mb-8 text-center">Join the <span className="italic">Elite Circle</span></h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Full Name</label>
                    <input type="text" className="w-full bg-secondary/50 border border-warm/20 p-4 text-[12px] font-bold tracking-widest outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-secondary/50 border border-warm/20 p-4 text-[12px] font-bold tracking-widest outline-none focus:border-accent" />
                  </div>
                  <button 
                    onClick={() => setMode("otp")}
                    className="w-full py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-700 shadow-xl"
                  >
                    Join Now
                  </button>
                </div>
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setMode("login")}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-accent transition-colors"
                  >
                    Already have an account? Login
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col"
              >
                <h2 className="text-2xl font-serif mb-4 text-center">Verify <span className="italic">Identity</span></h2>
                <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mb-8">
                  A verification code has been sent to your device.
                </p>
                <div className="flex gap-4 mb-8 justify-center">
                  {[1, 2, 3, 4].map(i => (
                    <input 
                      key={i}
                      type="text" 
                      maxLength={1}
                      className="w-14 h-16 bg-secondary/50 border border-warm/20 text-center text-xl font-bold outline-none focus:border-accent" 
                    />
                  ))}
                </div>
                <button 
                  className="w-full py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-700 shadow-xl"
                >
                  Confirm Code
                </button>
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setMode("login")}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-accent transition-colors"
                  >
                    Resend Code in 00:59
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trust Footer */}
        <div className="mt-12 flex items-center justify-center gap-6">
           <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400">
             <ShieldCheck size={14} className="text-accent" />
             Bank-grade Security
           </div>
           <div className="w-[1px] h-4 bg-warm/30" />
           <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400">
             <Lock size={14} className="text-accent" />
             Encrypted Access
           </div>
        </div>
      </div>
    </div>
  );
}
