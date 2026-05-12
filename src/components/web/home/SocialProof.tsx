"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Eleanor Vance",
    role: "Fashion Editor",
    content: "The attention to detail and fabric quality is unparalleled. It's the new standard for minimal luxury.",
    rating: 5,
  },
  {
    id: 2,
    name: "Julian Brooks",
    role: "Architect",
    content: "Minimalist design that actually feels substantial. Every piece I've bought has become a wardrobe staple.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sienna Miller",
    role: "Art Director",
    content: "Fast shipping and the packaging alone felt like a premium experience. Highly recommended.",
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4">
            Voices of Noir
          </h3>
          <h2 className="text-4xl font-serif">
            Trusted by <span className="italic">Visionaries</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
             <div className="flex text-accent">
               {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
             </div>
             <span className="text-[12px] font-bold uppercase tracking-widest text-primary">
               4.9/5 from 10,000+ Customers
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 text-secondary group-hover:text-accent transition-colors">
                <Quote size={40} strokeWidth={1} />
              </div>
              <p className="text-lg font-light leading-relaxed mb-8 text-primary/80">
                "{review.content}"
              </p>
              <div className="mt-auto">
                <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-1">
                  {review.name}
                </h4>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest italic">
                  {review.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
