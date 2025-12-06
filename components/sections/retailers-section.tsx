import Image from "next/image";

import { cn } from "@/lib/utils";
import { retailersContent, type Retailer } from "@/lib/sections-content";

type RetailersSectionProps = {
  className?: string;
  retailers?: Retailer[];
};

export function RetailersSection({ className, retailers = retailersContent }: RetailersSectionProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[32px] bg-[#eef2f1] px-6 py-16 sm:px-12 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Authorised Retailers
          </p>
          <h3 className="text-3xl font-semibold text-[#2f4a41] sm:text-4xl">
            We&apos;re also available at
          </h3>
        </div>

        <div className="grid w-full gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12">
          {retailers.map((retailer) => (
            <div
              key={retailer.name}
              className="flex items-center justify-center rounded-2xl bg-white/80 p-4 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.25)] backdrop-blur"
            >
              <Image
                src={retailer.logo}
                alt={retailer.name}
                width={retailer.width}
                height={retailer.height}
                className="h-auto max-h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
