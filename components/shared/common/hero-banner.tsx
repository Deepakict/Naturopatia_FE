import { Eyebrow } from "./eyebrow";

type HeroBannerProps = {
  title: string;
  eyebrow?: string;
  image: string;
  minHeightClass?: string;
  overlayClassName?: string;
  paddingClass?: string;
};

export function HeroBanner({
  title,
  eyebrow,
  image,
  minHeightClass = "min-h-[500px] sm:min-h-[560px]",
  overlayClassName = "bg-gradient-to-t from-black/60 via-black/10 to-transparent",
  paddingClass = "p-8 sm:p-12",
}: HeroBannerProps) {
  return (
    <section className="overflow-hidden rounded-[28px] bg-black">
      <div
        className={`relative flex items-end rounded-[28px] bg-cover bg-center ${minHeightClass} ${paddingClass}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={`absolute inset-0 rounded-[28px] ${overlayClassName}`} />
        <div className="relative z-10 max-w-3xl space-y-3 text-white">
          {eyebrow ? <Eyebrow text={eyebrow} tone="light" /> : null}
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        </div>
      </div>
    </section>
  );
}
