import { Eyebrow } from "../common/eyebrow";
import type { Founder } from "./types";

export function FounderSection({ founder }: { founder: Founder }) {
  return (
    <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <article className="flex flex-col gap-4 rounded-[22px] border border-slate-100 bg-white p-8 shadow-sm">
        <Eyebrow text="Meet our founder" />
        <h3 className="text-2xl font-semibold text-slate-900">{founder.quote.split(".")[0]}.</h3>
        <p className="text-base leading-relaxed text-slate-700">{founder.quote}</p>
        <div className="text-sm font-semibold text-slate-900">
          {founder.name} <span className="font-normal text-slate-600">/ {founder.role}</span>
        </div>
      </article>

      <div className="overflow-hidden rounded-[22px] bg-slate-100">
        <div
          className="aspect-[4/5] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${founder.image})` }}
        />
      </div>
    </section>
  );
}
