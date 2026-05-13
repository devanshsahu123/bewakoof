"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight, Lock, CreditCard, Banknote, Smartphone } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  return (
    <div className="min-h-screen bg-secondary pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
          {[
            { id: 1, label: "Address" },
            { id: 2, label: "Payment" },
            { id: 3, label: "Review" },
          ].map((s) => (
            <div key={s.id} className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step >= s.id ? "bg-accent text-white" : "bg-warm/30 text-gray-500"
                }`}>
                  {s.id}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                  step >= s.id ? "text-primary" : "text-gray-400"
                }`}>
                  {s.label}
                </span>
              </div>
              {s.id < 3 && <div className="w-8 md:w-16 h-[1px] bg-warm/30" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Forms */}
          <div className="lg:col-span-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-serif mb-10">Shipping <span className="italic">Address</span></h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Full Name</label>
                    <input type="text" className="w-full bg-white border border-warm/20 p-4 text-[12px] font-bold tracking-widest outline-none focus:border-accent" placeholder="Enter name" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Mobile Number</label>
                    <input type="text" className="w-full bg-white border border-warm/20 p-4 text-[12px] font-bold tracking-widest outline-none focus:border-accent" placeholder="+91" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">House No / Apartment / Area</label>
                    <input type="text" className="w-full bg-white border border-warm/20 p-4 text-[12px] font-bold tracking-widest outline-none focus:border-accent" placeholder="Complete address" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">City</label>
                    <input type="text" className="w-full bg-white border border-warm/20 p-4 text-[12px] font-bold tracking-widest outline-none focus:border-accent" placeholder="Your city" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Pincode</label>
                    <input type="text" className="w-full bg-white border border-warm/20 p-4 text-[12px] font-bold tracking-widest outline-none focus:border-accent" placeholder="6 digits" />
                  </div>
                </form>
                <button 
                  onClick={() => setStep(2)}
                  className="mt-12 px-12 py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-700 shadow-xl"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-serif mb-10">Select <span className="italic">Payment Method</span></h2>
                <div className="space-y-6">
                  {[
                    { id: "upi", label: "UPI (PhonePe, GPay)", icon: Smartphone },
                    { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                    { id: "cod", label: "Cash on Delivery", icon: Banknote },
                  ].map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex items-center justify-between p-6 cursor-pointer border transition-all ${
                        paymentMethod === m.id ? "bg-white border-accent shadow-lg" : "bg-white/50 border-warm/20 hover:border-warm/50"
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`p-3 rounded-full ${paymentMethod === m.id ? "bg-accent/10 text-accent" : "bg-warm/10 text-gray-400"}`}>
                          <m.icon size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{m.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === m.id ? "border-accent" : "border-warm/30"
                      }`}>
                        {paymentMethod === m.id && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 flex gap-6">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-8 py-5 border border-primary text-primary text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-warm/10 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-700 shadow-xl"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-serif mb-10">Review your <span className="italic">Selection</span></h2>
                <div className="bg-white p-8 border border-accent/10 mb-12">
                   <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-loose">
                     By clicking 'Place Order', you agree to SIYAPAA's luxury terms and conditions. 
                     Your jewelry is insured from the moment it leaves our atelier until it reaches your door.
                   </p>
                </div>
                <button 
                  className="w-full py-6 bg-primary text-white text-[12px] font-bold uppercase tracking-[0.5em] hover:bg-accent transition-all duration-700 shadow-xl"
                >
                  Place Order & Pay
                </button>
              </motion.div>
            )}
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-4">
             <div className="bg-white p-8 border border-warm/20">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] mb-8 pb-4 border-b border-warm/10">Order Total</h4>
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                     <span>Subtotal</span>
                     <span>₹1,70,000</span>
                   </div>
                   <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
                     <span>Shipping</span>
                     <span className="text-accent uppercase">Free</span>
                   </div>
                   <div className="pt-4 border-t border-warm/10 flex justify-between text-[14px] font-bold uppercase tracking-[0.2em]">
                     <span>Total</span>
                     <span>₹1,70,000</span>
                   </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    <ShieldCheck size={14} className="text-accent" />
                    Authenticity Guaranteed
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    <Lock size={14} className="text-accent" />
                    Secure Checkout
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
