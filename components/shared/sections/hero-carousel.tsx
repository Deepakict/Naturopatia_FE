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
  minHeightClass = "h-[560px] sm:h-[640px] md:h-[800px] lg:h-[900px]",
}: HeroCarouselProps) {
  const safeSlides = useMemo(() => (slides.length ? slides : [defaultSlide]), [slides]);
  const [index, setIndex] = useState(0);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

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
    <section
      className={cn(
        "flex w-full flex-col items-start gap-2 bg-[#F1F3F3]  py-10",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-slate-900/80 shadow-2xl group">
        <div
          className={cn(
            "relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-900",
            minHeightClass,
          )}
        >
          <Image
            src={backgroundSrc}
            alt={current.title || "Hero background"}
            key={index}
            fill
            priority
            className="h-full w-full object-cover animate-[heroFade_0.8s_ease]"
            sizes="100vw"
            unoptimized={backgroundSrc.startsWith("http://localhost")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/35" />

          <div key={`content-${index}`} className="relative z-10 w-full pt-12 pb-12 px-12 text-center text-white animate-[heroFade_0.8s_ease] sm:pt-16 sm:pb-16 sm:px-16 lg:pt-20 lg:pb-20 lg:px-20">
            <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 px-4 sm:px-6">
              {current.eyebrow ? (
                <span
                  className="text-[16px] font-medium leading-[22px] text-[color:var(--Base-Color-Soft-Cream,#F2EDE7)] sm:text-[18px] sm:leading-[26px]"
                  style={{ fontFamily: "Inter Tight" }}
                >
                  {current.eyebrow}
                </span>
              ) : null}
              {current.title ? (
                <h1
                  className="whitespace-pre-line text-center text-[36px] font-[550] leading-[1.2] text-[color:var(--Base-Color-Soft-Cream,#F2EDE7)] sm:text-[44px] md:text-[54px] lg:text-[64px]"
                  style={{ fontFamily: "Optima" }}
                >
                  {current.title}
                </h1>
              ) : null}
            </div>

            {/* Left info block (description + CTA); stack on mobile to prevent overlap */}
            <div className="relative mt-8 flex w-full max-w-md flex-col items-center gap-5 px-6 text-center text-white sm:mt-10 sm:max-w-lg md:mt-12 md:max-w-xl md:gap-6 md:px-8 lg:absolute lg:bottom-[120px] lg:left-[120px] lg:mt-0 lg:w-full lg:max-w-xs lg:items-start lg:gap-10 lg:px-0 lg:text-left">
              {current.description ? (
                <p
                  className="mb-3 text-[14px] font-normal leading-[20px] text-[color:var(--Base-Color-Soft-Cream,#F2EDE7)] sm:mb-4 sm:text-[16px] sm:leading-[24px]"
                  style={{ fontFamily: "Inter Tight" }}
                >
                  {current.description}
                </p>
              ) : null}
              <div className="flex items-center gap-3">
                <Button
                  className="group mt-0 h-10 rounded-full bg-brand-forest px-4 text-sm font-semibold text-white shadow-lg hover:bg-brand-leaf sm:h-11 sm:px-5 sm:text-sm md:h-12 md:px-6 md:text-base"
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
          </div>

          {/* Hotspots (small visible dots) to reveal floating tags when hovered */}
          <button
            aria-label="Show tag 1"
            onMouseEnter={() => setHoveredTag("tag1")}
            onMouseLeave={() => setHoveredTag(null)}
            className="absolute left-8 top-20 z-30 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/70 md:flex"
          />
          <button
            aria-label="Show tag 2"
            onMouseEnter={() => setHoveredTag("tag2")}
            onMouseLeave={() => setHoveredTag(null)}
            className="absolute right-20 top-1/2 z-30 hidden h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/70 md:flex"
          />
          <button
            aria-label="Show tag 3"
            onMouseEnter={() => setHoveredTag("tag3")}
            onMouseLeave={() => setHoveredTag(null)}
            className="absolute left-6 bottom-12 z-30 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/70 md:flex"
          />

          {/* Floating tags */}
          <div className={cn(
            (hoveredTag === "tag1" ? "opacity-100" : "opacity-0"),
            "absolute left-8 top-1/3 hidden md:block w-28 rounded-2xl bg-white/20 p-3 text-white backdrop-blur transition-opacity duration-200"
          )}>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/25">
              <Wand2 className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold">Smooth Texture</p>
            <p className="text-xs text-white/80">Texture</p>
          </div>

          <div className={cn(
            (hoveredTag === "tag2" ? "opacity-100" : "opacity-0"),
            "absolute right-12 top-1/2 hidden md:block -translate-y-1/2 w-28 rounded-2xl bg-white/20 p-3 text-white backdrop-blur transition-opacity duration-200"
          )}>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/25">
              <Droplets className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold">All Skin Type</p>
            <p className="text-xs text-white/80">Skin type</p>
          </div>

          <div className={cn(
            (hoveredTag === "tag3" ? "opacity-100" : "opacity-0"),
            "absolute bottom-8 right-10 hidden md:block min-w-[220px] max-w-xs rounded-3xl bg-white/25 p-4 text-white shadow-lg backdrop-blur transition-opacity duration-200"
          )}>
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
  title: "Your Best Skin\nStarts Here",
  description:
    "Science-backed formulas. Nature-inspired ingredients. Glow with skincare that's made to love and made to last.",
  imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80",
  ctaLabel: "Shop Now",
  ctaHref: "#",
};
