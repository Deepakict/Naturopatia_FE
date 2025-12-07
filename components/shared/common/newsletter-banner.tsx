import { Eyebrow } from "./eyebrow";

type NewsletterData = {
  eyebrow: string;
  title: string;
  description: string;
  background: string;
};

type NewsletterBannerProps = {
  data: NewsletterData;
  variant?: "dark" | "emerald";
};

export function NewsletterBanner({ data, variant = "dark" }: NewsletterBannerProps) {
  const overlayClass = variant === "emerald" ? "bg-emerald-900/85" : "bg-black/40";
  const buttonClass =
    variant === "emerald"
      ? "mr-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
      : "mr-1 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-white";

  return (
    <section className="overflow-hidden rounded-[22px]">
      <div
        className="relative flex flex-col items-center justify-center gap-4 bg-cover bg-center px-8 py-16 text-center text-white sm:px-12"
        style={{ backgroundImage: `url(${data.background})` }}
      >
        <div className={`absolute inset-0 ${overlayClass}`} />
        <div className="relative z-10 flex max-w-2xl flex-col items-center gap-2">
          <Eyebrow text={data.eyebrow} tone="light" />
          <h3 className="text-3xl font-semibold sm:text-4xl">{data.title}</h3>
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">{data.description}</p>
          <form className="mt-4 flex w-full max-w-md items-center rounded-full bg-white/15 p-1 backdrop-blur">
            <input
              className="flex-1 rounded-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/70 focus:outline-none"
              placeholder="Enter email..."
              type="email"
              aria-label="Email"
            />
            <button className={buttonClass} type="button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
