"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, ChevronLeft, Gift, ShieldCheck, Truck } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export default function CartPage() {
  const cartItems = [PRODUCTS[0], PRODUCTS[1]]; // Dummy cart items

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-secondary pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Your Shopping <span className="italic">Bag</span></h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
              {cartItems.length} Treasures Selected
            </p>
          </div>
          <Link 
            href="/shop" 
            className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors"
          >
            <ChevronLeft size={14} />
            Continue Browsing
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {cartItems.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 pb-10 border-b border-warm/20 group"
              >
                <div className="relative w-32 h-40 md:w-40 md:h-52 overflow-hidden bg-warm/5 flex-none">
                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-[1s] group-hover:scale-110" />
                </div>
                
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-2 block">
                        {item.material}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif mb-2">{item.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                        <ShieldCheck size={12} className="text-accent" />
                        BIS Hallmarked
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-warm/30">
                      <button className="px-4 py-2 hover:bg-warm/10 transition-colors">-</button>
                      <span className="px-4 py-2 text-[12px] font-bold">1</span>
                      <button className="px-4 py-2 hover:bg-warm/10 transition-colors">+</button>
                    </div>
                    <span className="text-xl font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Gift Wrapping Toggle */}
            <div className="p-8 bg-white border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="p-4 bg-accent/5 rounded-full">
                    <Gift size={24} strokeWidth={1} className="text-accent" />
                 </div>
                 <div>
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-1">Make it a Gift</h4>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-relaxed">
                      Complimentary premium SIYAPAA packaging and a handwritten note.
                    </p>
                 </div>
              </div>
              <button className="px-10 py-3 border border-accent text-accent text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all">
                Add Packaging
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 border border-warm/20 sticky top-32">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.4em] mb-10 pb-6 border-b border-warm/20">
                Order Summary
              </h4>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Shipping</span>
                  <span className="text-accent uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span>GST (Tax Included)</span>
                  <span>₹{(subtotal * 0.03).toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-6 border-t border-warm/20 flex justify-between text-[16px] font-bold uppercase tracking-[0.2em] text-primary">
                  <span>Total Amount</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full flex items-center justify-center py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-700 shadow-xl mb-6"
              >
                Proceed to Checkout
              </Link>

              <div className="flex flex-col gap-4 pt-6">
                 <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                   <ShieldCheck size={14} className="text-accent" />
                   Fully Insured Logistics
                 </div>
                 <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                   <Truck size={14} className="text-accent" />
                   Estimated Delivery: 3-5 Days
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
