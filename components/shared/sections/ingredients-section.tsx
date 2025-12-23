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
    <section
      className={cn(
        "flex w-full items-center self-stretch px-4 py-0 sm:px-6 lg:h-[800px] lg:px-0",
        className,
      )}
    >
      <div className="mx-auto grid w-full items-stretch gap-8 rounded-[32px] bg-transparent sm:gap-10 lg:h-full lg:grid-cols-[1.05fr_1fr]">
        <div className="flex min-h-[360px] w-full flex-1 flex-col items-start justify-between gap-6 self-stretch rounded-[32px] bg-white p-6 shadow-sm sm:gap-8 sm:p-10 lg:p-20">
          <div className="space-y-4">
            <p className="self-stretch font-[500] font-['Inter_Tight'] text-[14px] leading-[20px] text-[#9CA8A5] sm:text-[16px] sm:leading-[22px] md:text-[18px] md:leading-[26px]">
              {content.eyebrow}
            </p>
            <h2 className="self-stretch font-['Optima'] text-[32px] font-[550] leading-[38.4px] text-brand-forest sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[57.6px]">
              {content.heading}
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 self-stretch sm:gap-6">
            <p className="self-stretch font-['Inter_Tight'] text-[15px] font-normal leading-[22px] text-[#6E7F7B] sm:text-[16px] sm:leading-[24px]">
              {content.body}
            </p>
            <ul className="space-y-2 self-stretch font-['Inter_Tight'] text-[15px] leading-[22px] text-brand-forest sm:text-[16px] sm:leading-[24px]">
              {content.bullets.map((item) => (
                <li key={item} className="list-disc list-inside">
                  {item}
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="group mt-2 h-11 w-fit rounded-full border-brand-forest px-5 text-sm font-semibold text-brand-forest hover:bg-brand-forest hover:text-white"
            >
              {content.ctaLabel}
              <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-[280px] flex-1 overflow-hidden rounded-[32px] sm:min-h-[320px] lg:min-h-[360px]">
          <div
            className="h-[320px] w-full flex-1 rounded-[32px] bg-cover bg-center sm:h-[420px] md:h-[520px] lg:h-[800px]"
            style={{
              background: `url('${content.image}') center / cover no-repeat, #DDDE92`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
