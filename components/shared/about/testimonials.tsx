import { Eyebrow } from "../common/eyebrow";
import type { Testimonial } from "./types";

export function AboutTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <Eyebrow text="Testimonials" />
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">What Our Customers Are Saying</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col gap-3 rounded-[18px] border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-1 text-emerald-700">
              {"★★★★★"}
            </div>
            <p className="text-lg font-semibold text-slate-900">{item.title}</p>
            <p className="text-sm leading-relaxed text-slate-700">“{item.quote}”</p>
            <div className="mt-auto flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.avatar})` }}
              />
              <div className="text-sm font-semibold text-slate-900">
                {item.name}
                <div className="text-xs font-normal text-slate-600">{item.location}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
