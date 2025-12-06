import { ArrowRight, Droplets, Sparkles, Wand2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type HeroProps = {
  className?: string;
};

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-slate-900/80 shadow-2xl">
        <div
          className="relative flex min-h-[75vh] items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/35" />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Beauty Care
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Your Best Skin Starts Here
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Science-backed formulas. Nature-inspired ingredients. Glow with skincare
              that&apos;s made to love and made to last.
            </p>
            <Button
              className="group mt-2 h-12 rounded-full bg-[#1f3b34] px-6 text-base font-semibold text-white shadow-lg hover:bg-[#1a312b]"
              size="lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </Button>
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
        </div>
      </div>
    </section>
  );
}
