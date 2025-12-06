import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ingredientsContent, type IngredientsContent } from "@/lib/sections-content";
import { Button } from "@/components/ui/button";

type IngredientsSectionProps = {
  className?: string;
  content?: IngredientsContent;
};

export function IngredientsSection({ className, content = ingredientsContent }: IngredientsSectionProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[32px] bg-[#eef2f1] px-6 py-12 sm:px-12 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto grid max-w-[1400px] gap-6 rounded-[28px] bg-white/85 p-4 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.2)] backdrop-blur lg:grid-cols-2 lg:p-8">
        <div className="flex flex-col justify-center gap-6 rounded-[24px] bg-white px-6 py-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {content.eyebrow}
          </p>
          <h3 className="text-3xl font-semibold leading-tight text-[#2f4a41] sm:text-[34px] sm:leading-[44px]">
            {content.heading}
          </h3>
          <p className="text-base leading-relaxed text-slate-700">
            {content.body}
          </p>
          <ul className="space-y-2 text-base text-[#2f4a41]">
            {content.bullets.map((item) => (
              <li key={item} className="list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="group mt-2 h-11 w-fit rounded-full border-[#2f4a41] px-5 text-sm font-semibold text-[#2f4a41] hover:bg-[#2f4a41] hover:text-white"
          >
            {content.ctaLabel}
            <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>

        <div className="overflow-hidden rounded-[24px] bg-white shadow-sm">
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
