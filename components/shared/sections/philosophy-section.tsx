import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type PhilosophySectionProps = {
  className?: string;
  eyebrow?: string;
  headline?: string;
  ctaLabel?: string;
  ctaHref?: string | null;
  backgroundUrl?: string;
};

export function PhilosophySection({
  className,
  eyebrow = "Our Philosophy",
  headline = "Every product is formulated with plant-based ingredients that are gentle yet powerful, free from harmful chemicals",
  ctaLabel = "Discover our story",
  ctaHref,
  backgroundUrl,
}: PhilosophySectionProps) {
  const href = ctaHref || "#";
  const bgStyle = backgroundUrl
    ? {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url('${backgroundUrl}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <section className={cn("flex w-full justify-center", className)}>
      <div
        className="flex h-[900px] w-full flex-col items-center justify-center gap-6 px-16"
        style={bgStyle}
      >
        <p className="self-stretch text-center font-['Inter_Tight'] text-[16px] font-normal leading-[24px] text-white">
          {eyebrow}
        </p>
        <h2 className="self-stretch text-center font-['Optima'] text-[56px] font-[400] leading-[67.2px] text-white">
          {headline}
        </h2>

        <Button
          asChild
          variant="outline"
          className="mt-2 flex h-auto items-center justify-center gap-2 rounded-[32px] border-0 bg-white px-3 py-2 text-sm font-normal text-brand-forest hover:bg-white"
        >
          <Link href={href} className="flex items-center gap-2">
            <span className="font-['Inter_Tight'] text-[14px] font-normal leading-[20px] text-brand-forest">
              {ctaLabel}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <g opacity="0.4">
                <path d="M5.625 3.375V4.5H12.7069L3.375 13.8319L4.16812 14.625L13.5 5.29312V12.375H14.625V3.375H5.625Z" fill="#1D3A34" />
              </g>
            </svg>
          </Link>
        </Button>
      </div>
    </section>
  );
}
