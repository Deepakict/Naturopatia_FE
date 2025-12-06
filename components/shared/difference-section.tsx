import { Droplets, Leaf, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { differenceFeatures, type Feature } from "@/lib/sections-content";

type DifferenceSectionProps = {
  className?: string;
  features?: Feature[];
};

function renderIcon(icon: Feature["icon"]) {
  if (icon === "sun") return <Sun className="h-5 w-5" />;
  if (icon === "droplets") return <Droplets className="h-5 w-5" />;
  return <Leaf className="h-5 w-5" />;
}

export function DifferenceSection({ className, features = differenceFeatures }: DifferenceSectionProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[32px] bg-[#eef2f1] px-6 py-12 sm:px-12 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]">
          <div
            className="aspect-[5/4] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582719478248-54e9f2af5c89?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
        </div>

        <div className="flex flex-col justify-center gap-8 rounded-[28px] bg-white/80 p-8 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.2)] backdrop-blur">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Why choose us?
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-[#2f4a41] sm:text-4xl">
              The Difference is in the Details
            </h2>
          </div>

          <div className="divide-y divide-slate-200/80">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#2f4a41]">
                  {renderIcon(feature.icon)}
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-[#2f4a41]">
                    {feature.title}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
