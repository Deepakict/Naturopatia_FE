import Image from "next/image";

import { cn } from "@/lib/utils";

type PhilosophyItem = {
  title: string;
  description?: string;
  icon?: string;
};

type PhilosophySectionProps = {
  className?: string;
  eyebrow?: string;
  headline?: string;
  images?: string[];
  items?: PhilosophyItem[];
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
];

const fallbackItems: PhilosophyItem[] = [
  { title: "Proven Results", description: "Committed" },
  { title: "Clean Ingredients", description: "Committed" },
  { title: "Kindness First", description: "Committed" },
];

export function PhilosophySection({
  className,
  eyebrow,
  headline,
  images = [],
  items = [],
}: PhilosophySectionProps) {
  const visuals = [
    images[0] ?? fallbackImages[0],
    images[1] ?? fallbackImages[1],
    images[2] ?? fallbackImages[2],
  ];

  const cards = items.length ? items : fallbackItems;

  const headlineParts = splitHeadline(headline ?? defaultHeadline);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        className,
      )}
    >
      <FloatingImage className="left-16 top-14 h-24 w-36" src={visuals[0]} />
      <FloatingCard className="right-16 top-16 h-28 w-36" item={cards[0]} />
      <FloatingCard className="left-20 bottom-14 h-32 w-40" item={cards[1]} />
      <FloatingCard className="right-20 bottom-12 h-32 w-40" item={cards[2]} />
      <FloatingImage className="left-1/2 top-10 h-28 w-36 -translate-x-1/2" src={visuals[1]} />

      <div className="mx-auto flex min-h-[800px] max-w-[1440px] flex-col items-center gap-[118px] px-5 pb-[160px] pt-[160px] sm:px-[80px]">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          {eyebrow ?? "Our Philosophy"}
        </p>
        <div className="max-w-[1100px] text-balance text-3xl font-semibold leading-normal text-[#4a615a] sm:text-4xl lg:text-[40px] lg:leading-[52px]">
          <span>{headlineParts[0]} </span>
          <InlineBadge src={visuals[1]} />
          <span>{headlineParts[1]} </span>
          <InlineBadge src={visuals[2]} />
          <span>{headlineParts[2]}</span>
        </div>
      </div>
    </section>
  );
}

function FloatingImage({ className, src }: { className: string; src: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute hidden rounded-3xl bg-cover bg-center shadow-lg shadow-black/10 lg:block",
        className,
      )}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

function FloatingCard({ className, item }: { className: string; item: PhilosophyItem }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute hidden flex-col justify-center rounded-3xl border border-white/60 bg-white/80 px-4 shadow-lg shadow-black/10 lg:flex",
        className,
      )}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600">
        {item.icon ? (
          <Image alt={item.title} src={item.icon} width={32} height={32} className="h-6 w-6 object-contain" />
        ) : (
          <span className="text-sm font-semibold text-brand-forest">{item.title?.[0] ?? "•"}</span>
        )}
      </div>
      <div className="text-sm font-semibold text-emerald-900">{item.title}</div>
      <div className="text-xs text-slate-500">{item.description}</div>
    </div>
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

const defaultHeadline =
  "Every product is formulated with plant-based ingredients that are gentle yet powerful, free from harmful chemicals.";

function splitHeadline(text: string) {
  const words = text.split(" ");
  if (words.length < 6) return [text, "", ""];
  const chunk = Math.floor(words.length / 3);
  const first = words.slice(0, chunk).join(" ");
  const second = words.slice(chunk, chunk * 2).join(" ");
  const third = words.slice(chunk * 2).join(" ");
  return [first, second, third];
}
