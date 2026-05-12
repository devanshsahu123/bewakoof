"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-32 bg-secondary/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4">
              Join the Inner Circle
            </h3>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Experience the <span className="italic">Noir Lifestyle</span>
            </h2>
            <p className="text-lg font-light text-primary/70 tracking-wide">
              Subscribe to receive exclusive access to new collections, 
              editorial insights, and a 10% welcome offer.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form className="relative group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-primary/20 py-4 px-2 text-[12px] font-bold tracking-[0.2em] outline-none focus:border-accent transition-colors placeholder:text-gray-400"
              />
              <button 
                type="submit"
                className="absolute right-0 bottom-4 text-[12px] font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors"
              >
                Subscribe
              </button>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-focus-within:w-full transition-all duration-700" />
            </form>
            <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest text-center md:text-left">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
