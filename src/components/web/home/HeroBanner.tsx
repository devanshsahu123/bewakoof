"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { bannerSlides } from "@/data/banners";

const AUTO_PLAY_MS = 4500;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = bannerSlides.length;

  const goTo = useCallback((idx: number) => setCurrent(idx), []);
  const next = useCallback(() => goTo((current + 1) % total), [current, goTo, total]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, goTo, total]);

  useEffect(() => {
    timerRef.current = setTimeout(next, AUTO_PLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  return (
    <div className="w-full relative overflow-hidden select-none">

      {/* ── Sliding Track — all slides side by side ── */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {bannerSlides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full shrink-0 overflow-hidden"
            style={{ aspectRatio: "18/5" }}
          >
            {/* Layer 0: gradient bg */}
            <div className="absolute inset-0 z-0"
              style={{ background: `linear-gradient(135deg, ${slide.bgFrom}, ${slide.bgTo})` }} />

            {/* Layer 1: hero image */}
            <div className="absolute inset-0 z-[1]">
              <Image
                src={slide.heroImage}
                alt={slide.headline.join(" ")}
                fill
                className="object-contain object-center"
                priority
                unoptimized
              />
            </div>

            {/* Layer 2: left-to-right dark overlay for text legibility (sweet spot) */}
            <div className="absolute inset-0 z-[2]" style={{
              background: `linear-gradient(to right,
                ${slide.bgFrom}d9 0%,   /* 85% opacity */
                ${slide.bgFrom}99 22%,   /* 60% opacity */
                ${slide.bgFrom}40 45%,   /* 25% opacity */
                transparent 68%)`,       /* smooth blend */
            }} />

            {/* Layer 3: content — left center */}
            <div
              className="absolute inset-0 z-[3] flex flex-col justify-center items-start text-left"
              style={{ paddingLeft: "5vw" }}
            >
              {/* Tag badge */}
              <span
                className="inline-block font-[800] uppercase rounded-full"
                style={{
                  fontSize: "0.8vw",
                  letterSpacing: "0.2em",
                  padding: "0.4vw 1vw",
                  marginBottom: "1.2vw",
                  color: slide.accentColor,
                  backgroundColor: `${slide.accentColor}22`,
                  border: `1px solid ${slide.accentColor}55`,
                }}
              >
                {slide.tag}
              </span>

              {/* Category pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5vw", marginBottom: "1.5vw" }}>
                {slide.categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="font-[700] uppercase hover:opacity-70 transition-opacity"
                    style={{
                      fontSize: "0.8vw",
                      letterSpacing: "0.15em",
                      padding: "0.3vw 0.7vw",
                      color: "#fff",
                      backgroundColor: "rgba(255,255,255,0.12)",
                      borderRadius: "0.3vw",
                      border: "1px solid rgba(255,255,255,0.2)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              {/* Shop Now CTA */}
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-1 font-[800] uppercase rounded-full hover:opacity-90 hover:scale-105 transition-all"
                style={{
                  fontSize: "0.95vw",
                  letterSpacing: "0.18em",
                  padding: "0.6vw 1.6vw",
                  backgroundColor: slide.accentColor,
                  color: "#000",
                  whiteSpace: "nowrap",
                }}
              >
                {slide.ctaLabel}
                <HiChevronRight style={{ width: "1.2vw", height: "1.2vw" }} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Prev / Next arrows ── */}
      {([
        { fn: prev, pos: "left-2", Icon: HiChevronLeft, label: "Previous" },
        { fn: next, pos: "right-2", Icon: HiChevronRight, label: "Next" },
      ] as const).map(({ fn, pos, Icon, label }) => (
        <button
          key={label}
          type="button"
          onClick={fn}
          aria-label={label}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm`}
          style={{ cursor: "pointer", width: "clamp(22px, 2.8vw, 40px)", height: "clamp(22px, 2.8vw, 40px)" }}
        >
          <Icon size={15} />
        </button>
      ))}

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              cursor: "pointer",
              width: i === current ? "clamp(14px, 2vw, 26px)" : "clamp(4px, 0.6vw, 7px)",
              height: "clamp(4px, 0.6vw, 7px)",
              backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
