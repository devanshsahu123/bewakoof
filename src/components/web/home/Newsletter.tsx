"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-40 bg-secondary">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-24">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-8">
              Become a Siyapaa Insider
            </h3>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Join our <span className="italic">Inner Circle</span>
            </h2>
            <p className="text-lg font-light text-primary/70 tracking-wide leading-relaxed">
              Experience the world of SIYAPAA. Subscribe for early access to new 
              handcrafted collections, bridal styling sessions, and a ₹5,000 welcome gift.
            </p>
          </div>

          <div className="w-full max-w-lg">
            <form className="relative group">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-primary/10 py-6 px-2 text-[12px] font-bold tracking-[0.3em] outline-none focus:border-accent transition-all duration-700 placeholder:text-gray-400"
              />
              <button 
                type="submit"
                className="absolute right-0 bottom-6 text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:text-accent transition-colors"
              >
                Subscribe
              </button>
              <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent group-focus-within:w-full transition-all duration-1000 ease-[0.23,1,0.32,1]" />
            </form>
            <p className="mt-8 text-[9px] text-gray-400 uppercase tracking-[0.3em] text-center md:text-left leading-loose">
              By subscribing, you agree to our <span className="text-primary hover:text-accent cursor-pointer transition-colors">Privacy Policy</span> and <span className="text-primary hover:text-accent cursor-pointer transition-colors">Terms of Service</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
