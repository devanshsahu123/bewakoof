"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/web/shop/ProductCard";
import { PRODUCTS } from "@/data/products";

const CATEGORIES = ["All", "Necklaces", "Earrings", "Rings", "Bracelets", "Bridal", "Gold"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => 
      activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-secondary pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6">
            Explore Collections
          </h3>
          <h1 className="text-4xl md:text-6xl font-serif mb-8">
            The SIYAPAA <span className="italic">Gallery</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-[13px] uppercase tracking-widest leading-loose">
            Handcrafted heritage meets modern elegance. <br />
            Discover our curated collection of gold, platinum, and diamonds.
          </p>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-y border-warm/20 py-8 mb-12 gap-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap transition-all relative pb-2 ${
                  activeCategory === cat ? "text-accent" : "text-primary/50 hover:text-primary"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors">
                Sort By: {sortBy}
                <ChevronDown size={14} />
              </button>
              <div className="absolute top-full right-0 mt-4 bg-white shadow-2xl border border-warm/20 p-6 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {["Recommended", "Price: Low to High", "Price: High to Low", "Newest"].map(s => (
                  <button 
                    key={s}
                    onClick={() => setSortBy(s)}
                    className="block w-full text-left text-[9px] font-bold uppercase tracking-widest text-primary hover:text-accent py-2.5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <h2 className="text-2xl font-serif italic text-gray-400">No treasures found in this collection.</h2>
            <button 
              onClick={() => setActiveCategory("All")}
              className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-accent border-b border-accent pb-2"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* SEO/Content Section */}
        <div className="mt-40 border-t border-warm/20 pt-24 text-center">
           <h4 className="text-[12px] font-bold uppercase tracking-[0.5em] mb-8">Craftsmanship at Siyapaa</h4>
           <p className="max-w-4xl mx-auto text-gray-500 font-light text-lg leading-loose italic">
             "Our artisans spend hundreds of hours on a single piece, ensuring that every curve and 
             stone placement reflects the heritage of Indian royalty. At SIYAPAA, we don't just sell jewelry; 
             we curate legacies."
           </p>
        </div>
      </div>
    </div>
  );
}
