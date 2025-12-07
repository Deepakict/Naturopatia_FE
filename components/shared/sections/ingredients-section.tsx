import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ingredientsContent, type IngredientsContent } from "@/lib/sections-content";
import { Button } from "@/components/ui/button";

type ProductHighlightSectionProps = {
  className?: string;
  content?: IngredientsContent;
};

export function ProductHighlightSection({ className, content = ingredientsContent }: ProductHighlightSectionProps) {
  return (
    <section className={cn("w-full px-6 py-12 sm:px-12 lg:px-16", className)}>
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-6 rounded-[32px] bg-transparent lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 rounded-[32px] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {content.eyebrow}
          </p>
          <h3 className="text-3xl font-semibold leading-tight text-brand-forest sm:text-[34px] sm:leading-[44px]">
            {content.heading}
          </h3>
          <p className="text-base leading-relaxed text-slate-700">
            {content.body}
          </p>
          <ul className="space-y-2 text-base text-brand-forest">
            {content.bullets.map((item) => (
              <li key={item} className="list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="group mt-4 h-11 w-fit rounded-full border-brand-forest px-5 text-sm font-semibold text-brand-forest hover:bg-brand-forest hover:text-white"
          >
            {content.ctaLabel}
            <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${content.image}')`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
