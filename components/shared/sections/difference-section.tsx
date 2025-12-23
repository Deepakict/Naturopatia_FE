import Image from "next/image";
import { Droplets, Leaf, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { differenceFeatures, type Feature } from "@/lib/sections-content";

type DifferenceItem = {
  title: string;
  description: string;
  icon?: string;
};

type WhyChooseUSProps = {
  className?: string;
  eyebrow?: string;
  heading?: string;
  heroImage?: string;
  features?: (Feature | DifferenceItem)[];
};

function renderIcon(icon?: string | Feature["icon"]) {
  if (typeof icon === "string" && icon) {
    return (
      <span
        className="block h-6 w-6 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${icon})` }}
        aria-hidden="true"
      />
    );
  }
  if (icon === "sun") return <Sun className="h-6 w-6" />;
  if (icon === "droplets") return <Droplets className="h-6 w-6" />;
  return <Leaf className="h-6 w-6" />;
}

export function WhyChooseUS({
  className,
  eyebrow,
  heading,
  heroImage,
  features = differenceFeatures,
}: WhyChooseUSProps) {
  const displayHero =
    heroImage ??
    "https://images.unsplash.com/photo-1582719478248-54e9f2af5c89?auto=format&fit=crop&w=1600&q=80";
  const eyebrowText = eyebrow ?? "Why choose us?";
  const headingText = heading ?? "The Difference is in the Details";
  return (
    <section
      className={cn(
        "flex h-[900px] w-full items-center gap-3 self-stretch py-10",
        className,
      )}
    >
      <div className="mx-auto grid w-full items-stretch gap-8 rounded-[32px] bg-transparent lg:grid-cols-[1.05fr_1fr]">
        <div className="overflow-hidden rounded-[32px] bg-white">
          <div
            className="aspect-[4/5] min-h-[360px] w-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${displayHero}')`,
            }}
          />
        </div>

        <div className="flex min-h-[360px] flex-col justify-between gap-8 rounded-[32px] bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {eyebrowText}
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
              {headingText}
            </h2>
          </div>

          <div className="divide-y divide-slate-200/80">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-forest">
                  {renderIcon(feature.icon)}
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-brand-forest">
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
