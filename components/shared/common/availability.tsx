import type { Availability } from "./types";

export function AvailabilitySection({ availability }: { availability: Availability }) {
  return (
    <section className="space-y-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        {availability.title}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {availability.logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-10 w-auto grayscale transition hover:grayscale-0"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
