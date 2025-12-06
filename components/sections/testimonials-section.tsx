import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { testimonialsContent, type Testimonial } from "@/lib/sections-content";

type TestimonialsSectionProps = {
  className?: string;
  testimonials?: Testimonial[];
};

export function TestimonialsSection({
  className,
  testimonials = testimonialsContent,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[32px] bg-[#eef2f1] px-6 py-16 sm:px-12 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-[#2f4a41] sm:text-4xl">
            What Our Customers Are Saying
          </h3>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-[22px] bg-white/85 p-6 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.18)] backdrop-blur"
            >
              <div className="flex items-center gap-1 text-[#2f4a41]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-[#2f4a41] text-[#2f4a41]" />
                ))}
              </div>

              <p className="text-xl font-semibold text-[#2f4a41]">{item.title}</p>

              <p className="text-base leading-relaxed text-slate-700">
                “{item.quote}”
              </p>

              <p className="mt-auto text-sm font-semibold text-[#2f4a41]">
                — {item.name},{" "}
                <span className="font-normal text-slate-500">{item.location}</span>
              </p>

              {item.image ? (
                <div className="overflow-hidden rounded-[18px] border border-white/80">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
              ) : null}
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
        "h-2 w-2 rounded-full bg-[#b6c4bf] transition",
        active && "bg-[#2f4a41]",
      )}
    />
  );
}
