"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Droplets, Sparkles, Wand2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type HeroSlide = {
  eyebrow?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string | null;
};

type HeroCarouselProps = {
  className?: string;
  slides: HeroSlide[];
  intervalMs?: number;
  minHeightClass?: string;
};

export function HeroCarousel({
  className,
  slides,
  intervalMs = 6000,
  minHeightClass = "min-h-[120vh]",
}: HeroCarouselProps) {
  const safeSlides = useMemo(() => (slides.length ? slides : [defaultSlide]), [slides]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeSlides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [safeSlides.length, intervalMs]);

  const current = safeSlides[index];
  const backgroundSrc =
    current.imageUrl ||
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80";

  return (
    <section className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-slate-900/80 shadow-2xl">
        <div className={cn("relative flex items-center justify-center overflow-hidden bg-slate-900", minHeightClass)}>
          <Image
            src={backgroundSrc}
            alt={current.title || "Hero background"}
            key={index}
            fill
            priority
            className="object-cover animate-[heroFade_0.8s_ease]"
            sizes="100vw"
            unoptimized={backgroundSrc.startsWith("http://localhost")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/35" />

          <div
            key={`content-${index}`}
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-10 py-28 text-center text-white animate-[heroFade_0.8s_ease] sm:px-16 sm:py-28 lg:px-20 lg:py-32"
          >
            {current.eyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                {current.eyebrow}
              </span>
            ) : null}
            {current.title ? (
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {current.title}
              </h1>
            ) : null}
            {current.description ? (
              <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {current.description}
              </p>
            ) : null}
            <div className="flex items-center gap-3">
              <Button
                className="group mt-2 h-12 rounded-full bg-brand-forest px-6 text-base font-semibold text-white shadow-lg hover:bg-brand-leaf"
                size="lg"
                asChild={Boolean(current.ctaHref)}
              >
                {current.ctaHref ? (
                  <a href={current.ctaHref}>{current.ctaLabel ?? "Shop Now"}</a>
                ) : (
                  <span>{current.ctaLabel ?? "Shop Now"}</span>
                )}
              </Button>
            </div>
          </div>

          {/* Floating tags */}
          <div className="absolute left-8 top-1/3 hidden w-28 rounded-2xl bg-white/20 p-3 text-white backdrop-blur md:block">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/25">
              <Wand2 className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold">Smooth Texture</p>
            <p className="text-xs text-white/80">Texture</p>
          </div>

          <div className="absolute right-12 top-1/2 hidden w-28 -translate-y-1/2 rounded-2xl bg-white/20 p-3 text-white backdrop-blur md:block">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/25">
              <Droplets className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold">All Skin Type</p>
            <p className="text-xs text-white/80">Skin type</p>
          </div>

          <div className="absolute bottom-8 right-10 hidden min-w-[220px] max-w-xs rounded-3xl bg-white/25 p-4 text-white shadow-lg backdrop-blur md:block">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/30">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold">Serum · Targeted Treatment</p>
                <p className="text-xs text-white/70">4.8 ★★★★☆ (620)</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/15 p-3">
              <div className="text-sm font-semibold">Shop Now</div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Controls: removed arrows, keep dots */}
          {safeSlides.length > 1 ? (
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {safeSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  onClick={() => setIndex(dotIdx)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full bg-white/40 transition",
                    dotIdx === index && "w-6 bg-white",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const defaultSlide: HeroSlide = {
  eyebrow: "Beauty Care",
  title: "Your Best Skin Starts Here",
  description:
    "Science-backed formulas. Nature-inspired ingredients. Glow with skincare that's made to love and made to last.",
  imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80",
  ctaLabel: "Shop Now",
  ctaHref: "#",
};
