import Image from "next/image";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { testimonialsContent, type Testimonial } from "@/lib/sections-content";

type TestimonialsSectionProps = {
  className?: string;
  testimonials?: Testimonial[];
  heading?: string;
};

export function TestimonialsSection({
  className,
  testimonials = testimonialsContent,
  heading = "What Our Customers Are Saying",
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-center gap-10 self-stretch bg-[#F1F3F3] px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:gap-14 lg:px-0 lg:py-[120px]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14">
        <div className="text-center">
          <h3 className="mx-auto w-full max-w-[486px] font-['Optima'] text-[32px] font-[550] leading-[38.4px] text-brand-forest opacity-80 sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[57.6px]">
            {heading}
          </h3>
        </div>

        <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6">
          {testimonials.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="flex h-full min-w-[300px] max-w-[520px] flex-row items-center gap-4 snap-start rounded-[32px] border border-[#E8EBEA] bg-white p-3 sm:min-w-[360px] sm:gap-5"
            >
              {item.image ? (
                <div className="relative h-[240px] w-[220px] overflow-hidden rounded-[24px] bg-slate-100 sm:h-[300px] sm:w-[280px] lg:h-[342px] lg:w-[310px]">
                  <Image
                    src={item.image}
                    alt={item.name || "Testimonial"}
                    fill
                    sizes="(min-width: 1024px) 310px, (min-width: 640px) 280px, 220px"
                    className="object-cover"
                    unoptimized={item.image.includes("localhost")}
                  />
                </div>
              ) : null}

              <div className="flex h-full w-full flex-col items-start justify-between gap-3 self-stretch px-5 py-5 pl-0 sm:w-[320px] lg:w-[342px]">
                <div className="flex items-center gap-1 text-brand-forest">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={cn(
                        "h-5 w-5",
                        starIdx < Math.round(item.rating ?? 5)
                          ? "fill-brand-forest text-brand-forest"
                          : "text-brand-mist",
                      )}
                    />
                  ))}
                </div>

                <p className="self-stretch font-['Optima'] text-[24px] font-[550] leading-[33.6px] text-brand-forest">
                  {item.title}
                </p>

                <p className="self-stretch font-['Inter_Tight'] text-[18px] font-normal leading-[26px] text-brand-forest">
                  {item.quote}
                </p>

                <p className="mt-auto font-['Inter_Tight'] text-[16px] font-[500] leading-[24px] text-[#9CA8A5]">
                  {item.name} {" "}
                  <span className="font-['Inter_Tight'] text-[16px] font-[500] leading-[24px] text-[#9CA8A5]">{item.location}</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Dot active />
          <Dot />
          <Dot />
          <Dot />
        </div>
      </div>
    </section>
  );
}

function Dot({ active = false }: { active?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full transition",
        active
          ? "h-[18px] w-[18px] border border-brand-forest bg-brand-forest"
          : "h-3 w-3 bg-[#CCC]",
      )}
    />
  );
}
