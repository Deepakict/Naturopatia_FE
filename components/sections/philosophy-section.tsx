import { FileText, Heart, Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

type PhilosophySectionProps = {
  className?: string;
};

export function PhilosophySection({ className }: PhilosophySectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-[32px] bg-[#eef2f1]",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-16 top-14 hidden h-24 w-36 rounded-3xl bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center shadow-lg shadow-black/10 lg:block" />
      <div className="pointer-events-none absolute right-16 top-16 hidden h-28 w-36 rounded-3xl bg-white shadow-lg shadow-black/5 lg:block">
        <div className="flex h-full flex-col justify-center gap-2 rounded-3xl border border-slate-200/70 bg-white/90 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600">
            <FileText className="h-4 w-4" />
          </div>
          <div className="text-sm font-semibold text-emerald-900">
            Proven Results
          </div>
          <div className="text-xs text-slate-500">Committed</div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-20 bottom-14 hidden h-32 w-40 rounded-3xl border border-white/60 bg-white/80 shadow-lg shadow-black/10 lg:flex flex-col justify-center px-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600">
          <Leaf className="h-4 w-4" />
        </div>
        <div className="text-sm font-semibold text-emerald-900">Clean Ingredients</div>
        <div className="text-xs text-slate-500">Committed</div>
      </div>

      <div className="pointer-events-none absolute right-20 bottom-12 hidden h-32 w-40 rounded-3xl border border-white/60 bg-white/80 shadow-lg shadow-black/10 lg:flex flex-col justify-center px-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600">
          <Heart className="h-4 w-4" />
        </div>
        <div className="text-sm font-semibold text-emerald-900">Kindness First</div>
        <div className="text-xs text-slate-500">Committed</div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-10 hidden h-28 w-36 -translate-x-1/2 rounded-3xl bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center shadow-lg shadow-black/10 md:block" />

      <div className="mx-auto flex min-h-[800px] max-w-[1440px] flex-col items-center gap-[118px] px-5 pb-[160px] pt-[160px] sm:px-[80px]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Our Philosophy
        </p>
        <div className="max-w-[1100px] text-balance text-3xl font-semibold leading-normal text-[#4a615a] sm:text-4xl lg:text-[40px] lg:leading-[52px]">
          <span>Every product </span>
          <InlineBadge src="https://images.unsplash.com/photo-1614707267537-433d6c5235c7?auto=format&fit=crop&w=400&q=80" />
          <span> is formulated with plant-based ingredients that are gentle yet powerful, </span>
          <InlineBadge src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80" />
          <span> free from harmful chemicals.</span>
        </div>
      </div>
    </section>
  );
}

type InlineBadgeProps = {
  src: string;
};

function InlineBadge({ src }: InlineBadgeProps) {
  return (
    <span className="mx-2 inline-flex h-12 w-16 items-center justify-center rounded-full border border-white/70 bg-white/80 p-1 align-middle shadow-md shadow-black/10">
      <span
        className="h-full w-full rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
    </span>
  );
}
