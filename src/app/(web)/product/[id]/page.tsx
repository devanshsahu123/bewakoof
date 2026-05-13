"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Heart, ShoppingBag, ShieldCheck, Star, 
  Truck, RotateCcw, Gem, ChevronRight, 
  Info, Share2, Ruler
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import BestSellers from "@/components/web/home/BestSellers";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return <div className="py-40 text-center font-serif">Jewel not found.</div>;

  const images = [product.image, product.hoverImage, product.image, product.hoverImage]; // Dummy extra images

  return (
    <div className="min-h-screen bg-secondary pt-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-12">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-primary">Gallery</Link>
          <ChevronRight size={10} />
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32">
          
          {/* Left: Gallery Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 order-2 md:order-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-24 md:w-24 md:h-32 border transition-all ${
                    selectedImage === i ? "border-accent" : "border-warm/20 hover:border-warm/50"
                  }`}
                >
                  <Image src={img} alt={product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] bg-warm/5 order-1 md:order-2 overflow-hidden group">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full"
              >
                <Image 
                  src={images[selectedImage]} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 shimmer-gold opacity-10 pointer-events-none" />
              </motion.div>
              
              <button className="absolute top-6 right-6 z-10 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-primary hover:text-white transition-all">
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
                  {product.material}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
                   <ShieldCheck size={14} className="text-accent" />
                   <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Hallmarked</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-bold text-primary">
                  ₹{(product.price).toLocaleString('en-IN')}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{(product.oldPrice).toLocaleString('en-IN')}
                  </span>
                )}
                <div className="px-3 py-1 border border-red-100 bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                  Limited Piece
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-light text-lg leading-loose tracking-wide">
              {product.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                <Gem size={16} strokeWidth={1.5} className="text-accent" />
                Key Highlights
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-[12px] text-gray-500 tracking-wide">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-none" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-6 pt-10 border-t border-warm/20">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-4 py-6 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-700 shadow-xl">
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>
                <button className="px-12 py-6 border border-primary text-primary text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all duration-700">
                  Buy Now
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest italic">
                Free fully insured shipping across India.
              </p>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-warm/20">
               <div className="flex flex-col items-center text-center gap-3">
                 <Truck size={20} strokeWidth={1} className="text-accent" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Dispatch in 48h</span>
               </div>
               <div className="flex flex-col items-center text-center gap-3">
                 <RotateCcw size={20} strokeWidth={1} className="text-accent" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">15 Day Exchange</span>
               </div>
               <div className="flex flex-col items-center text-center gap-3">
                 <ShieldCheck size={20} strokeWidth={1} className="text-accent" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Lifetime Warranty</span>
               </div>
            </div>

            {/* Additional Info Accordion (Simplfied) */}
            <div className="space-y-6 pt-10">
               <div className="flex items-center justify-between py-4 border-b border-warm/20 group cursor-pointer hover:text-accent transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Size & Fit Guide</span>
                  <Ruler size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="flex items-center justify-between py-4 border-b border-warm/20 group cursor-pointer hover:text-accent transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Material & Purity</span>
                  <Info size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="flex items-center justify-between py-4 border-b border-warm/20 group cursor-pointer hover:text-accent transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Shipping & Returns</span>
                  <Share2 size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
          </div>
        </div>

        {/* Suggested Section */}
        <div className="mt-40 border-t border-warm/20 pt-24">
           <BestSellers />
        </div>
      </div>
    </div>
  );
}
