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
  const firstRow = retailers.slice(0, 3);
  const secondRow = retailers.slice(3);

  return (
    <section className={cn("w-full px-6 py-16 sm:px-12 lg:px-16", className)}>
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {eyebrow}
          </p>
          <h3 className="text-4xl font-semibold text-brand-forest sm:text-[42px]">{title}</h3>
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-wrap items-center justify-center gap-12">
            {firstRow.map((retailer) => (
              <RetailerLogo key={retailer.name} retailer={retailer} />
            ))}
          </div>
          {secondRow.length ? (
            <div className="flex w-full flex-wrap items-center justify-center gap-12">
              {secondRow.map((retailer) => (
                <RetailerLogo key={retailer.name} retailer={retailer} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function RetailerLogo({ retailer }: { retailer: Retailer }) {
  return (
    <div className="flex items-center justify-center bg-transparent p-4 sm:p-6">
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
