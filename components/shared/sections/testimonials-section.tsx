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
        "flex w-full flex-col items-center justify-center gap-10 self-stretch bg-[#F1F3F3] px-4 pt-10 pb-10 sm:gap-12 sm:px-6 sm:pt-10 sm:pb-10 lg:gap-14 lg:px-0 lg:pt-10 lg:pb-10",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14">
        <div className="text-center">
          <h3 className="mx-auto w-full max-w-[486px] font-['Optima'] text-[32px] font-[550] leading-[38.4px] text-brand-forest opacity-80 sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[57.6px]">
            {heading}
          </h3>
        </div>

        <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6 lg:grid lg:snap-none lg:grid-cols-2 lg:overflow-visible">
          {testimonials.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="flex h-full min-w-[280px] max-w-[520px] snap-start flex-col items-center gap-4 rounded-[32px] border border-[#E8EBEA] bg-white p-4 sm:min-w-[320px] sm:p-5 lg:min-w-0 lg:max-w-none lg:flex-row lg:items-center lg:gap-5"
            >
              {item.image ? (
                <div className="relative h-[220px] w-full overflow-hidden rounded-[24px] bg-slate-100 sm:h-[260px] sm:w-full lg:h-[300px] lg:w-[260px] xl:h-[320px] xl:w-[300px]">
                  <Image
                    src={item.image}
                    alt={item.name || "Testimonial"}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 260px, (min-width: 640px) 100vw, 100vw"
                    className="object-cover"
                    unoptimized={item.image.includes("localhost")}
                  />
                </div>
              ) : null}

              <div className="flex h-full w-full flex-col items-start justify-between gap-3 self-stretch px-1 py-1 sm:px-2 sm:py-2 lg:px-5 lg:py-5 lg:pl-0">
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

                <p className="self-stretch font-['Optima'] text-[20px] font-[550] leading-[28px] text-brand-forest sm:text-[22px] sm:leading-[30px] lg:text-[24px] lg:leading-[33.6px]">
                  {item.title}
                </p>

                <p className="self-stretch font-['Inter_Tight'] text-[16px] font-normal leading-[24px] text-brand-forest sm:text-[17px] sm:leading-[25px] lg:text-[18px] lg:leading-[26px]">
                  {item.quote}
                </p>

                <p className="mt-auto font-['Inter_Tight'] text-[15px] font-[500] leading-[22px] text-[#9CA8A5] sm:text-[16px] sm:leading-[24px]">
                  {item.name} {" "}
                  <span className="font-['Inter_Tight'] text-[15px] font-[500] leading-[22px] text-[#9CA8A5] sm:text-[16px] sm:leading-[24px]">{item.location}</span>
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
