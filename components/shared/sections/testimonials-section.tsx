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
    <section className={cn("w-full px-6 py-16 sm:px-12 lg:px-16", className)}>
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-brand-forest sm:text-4xl">
            {heading}
          </h3>
        </div>

        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
          {testimonials.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="flex h-full min-w-[380px] max-w-[520px] flex-row gap-6 snap-start rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
            >
              {item.image ? (
                <div className="relative h-full w-40 min-h-[220px] overflow-hidden rounded-[18px] bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name || "Testimonial"}
                    fill
                    sizes="160px"
                    className="object-cover"
                    unoptimized={item.image.includes("localhost")}
                  />
                </div>
              ) : null}

              <div className="flex h-full flex-1 flex-col gap-3">
                <div className="flex items-center gap-1 text-brand-forest">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={cn(
                        "h-4 w-4",
                        starIdx < Math.round(item.rating ?? 5)
                          ? "fill-brand-forest text-brand-forest"
                          : "text-brand-mist",
                      )}
                    />
                  ))}
                </div>

                <p className="text-xl font-semibold leading-7 text-brand-forest">{item.title}</p>

                <p className="text-base leading-relaxed text-slate-700">{item.quote}</p>

                <p className="mt-auto text-sm font-semibold text-brand-forest">
                  {item.name}{" "}
                  <span className="font-normal text-slate-500">{item.location}</span>
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
        "h-2 w-2 rounded-full bg-brand-mist transition",
        active && "bg-brand-forest",
      )}
    />
  );
}
