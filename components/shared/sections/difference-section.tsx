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
        className="block h-8 w-8 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${icon})` }}
        aria-hidden="true"
      />
    );
  }
  if (icon === "sun") return <Sun className="h-8 w-8" />;
  if (icon === "droplets") return <Droplets className="h-8 w-8" />;
  return <Leaf className="h-8 w-8" />;
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
        "flex w-full items-center self-stretch px-4 py-5 sm:px-6 sm:py-5 lg:h-[900px] lg:px-0",
        className,
      )}
    >
      <div className="mx-auto grid w-full items-stretch gap-8 rounded-[32px] bg-transparent sm:gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative flex min-h-[280px] flex-1 overflow-hidden rounded-[32px] sm:min-h-[320px] lg:min-h-[360px]">
          <div
            className="h-[320px] w-full flex-1 rounded-[32px] bg-cover bg-center sm:h-[420px] md:h-[520px] lg:h-[800px]"
            style={{
              background: `url('${displayHero}') center / cover no-repeat, #DDDE92`,
            }}
          />
        </div>

        <div className="flex min-h-[360px] w-full flex-1 flex-col items-start justify-between gap-6 self-stretch rounded-[32px] bg-white p-6 shadow-sm sm:gap-8 sm:p-10 lg:p-20">
          <div className="space-y-4">
            <p className="self-stretch font-[500] font-['Inter_Tight'] text-[14px] leading-[20px] text-[#9CA8A5] sm:text-[16px] sm:leading-[22px] md:text-[18px] md:leading-[26px]">
              {eyebrowText}
            </p>
            <h2 className="self-stretch font-['Optima'] text-[32px] font-[550] leading-[38.4px] text-brand-forest sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[57.6px]">
              {headingText}
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 self-stretch sm:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 self-stretch"
              >
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-[24px] border border-[#E7EAE9] bg-white p-2 text-brand-forest">
                  {renderIcon(feature.icon)}
                </div>
                <div className="space-y-1">
                  <p className="font-['Optima'] text-[18px] font-[550] leading-[25.2px] text-brand-forest sm:text-[20px] sm:leading-[28px]">
                    {feature.title}
                  </p>
                  <p className="self-stretch font-['Inter_Tight'] text-[15px] font-normal leading-[22px] text-[#6E7F7B] sm:text-[16px] sm:leading-[24px]">
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
