import Image from "next/image";

import { cn } from "@/lib/utils";
import { retailersContent, type Retailer } from "@/lib/sections-content";

type RetailersSectionProps = {
  className?: string;
  retailers?: Retailer[];
  eyebrow?: string;
  title?: string;
};

export function RetailersSection({
  className,
  retailers = retailersContent,
  eyebrow = "Authorised Retailers",
  title = "We’re also available at",
}: RetailersSectionProps) {
  const logos = retailers;

  return (
    <section className={cn("w-full bg-[#F1F3F3] px-4 py-0 sm:px-8 sm:py-0 lg:px-12 lg:py-0", className)}>
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 sm:gap-9 lg:gap-10">
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <p className="font-['Inter_Tight'] text-[12px] font-semibold uppercase tracking-[0.28em] text-[#A8B4B1] sm:text-[13px]">
            {eyebrow}
          </p>
          <h3 className="w-full max-w-[1014px] font-['Optima'] text-[30px] font-[550] leading-[38px] text-[#4B6660] opacity-90 sm:text-[36px] sm:leading-[44px] lg:text-[48px] lg:leading-[57.6px]">
            {title}
          </h3>
        </div>

        <div
          className="flex w-full max-w-[1088px] flex-wrap items-center justify-center content-center py-0"
          style={{ columnGap: "80px", rowGap: "60px" }}
        >
          {logos.map((retailer) => (
            <RetailerLogo key={retailer.name} retailer={retailer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RetailerLogo({ retailer }: { retailer: Retailer }) {
  return (
    <div className="flex items-center justify-center bg-transparent">
      {retailer.logo ? (
        <Image
          src={retailer.logo}
          alt={retailer.name}
          width={retailer.width}
          height={retailer.height}
          unoptimized={retailer.logo.includes("localhost")}
          className="h-auto max-h-24 w-auto object-contain"
        />
      ) : (
        <span className="text-sm text-slate-500">{retailer.name}</span>
      )}
    </div>
  );
}
