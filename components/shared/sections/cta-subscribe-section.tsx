import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsLetterSectionProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  inputPlaceholder?: string;
  buttonLabel?: string;
  backgroundUrl?: string;
  isVideo?: boolean;
};

export function NewsLetterSection({
  className,
  eyebrow = "Get Started",
  title = "Join the Anti Fake Community",
  description = "Sign up for exclusive offers, skincare tips, and new product launches directly in your inbox.",
  inputPlaceholder = "Enter email...",
  buttonLabel = "Subscribe",
  backgroundUrl,
  isVideo = false,
}: NewsLetterSectionProps) {
  const hasVideo = isVideo || (backgroundUrl?.toLowerCase().endsWith(".mp4") ?? false);

  return (
    <section className={cn("w-full px-6 py-12 sm:px-12 lg:px-16", className)}>
      <div className="relative mx-auto flex max-w-[1440px] overflow-hidden rounded-[32px] bg-[#F1F3F3]">
        {backgroundUrl ? (
          hasVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={backgroundUrl}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${backgroundUrl}')` }}
            />
          )
        ) : null}
        {backgroundUrl ? (
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        ) : null}

        <div
          className={cn(
            "relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-16 text-center sm:py-20 lg:py-24",
            backgroundUrl ? "text-white" : "text-brand-forest",
          )}
        >
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.22em]",
              backgroundUrl ? "text-white/85" : "text-slate-600",
            )}
          >
            {eyebrow}
          </p>
          <h3
            className={cn(
              "text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl",
              backgroundUrl ? "text-white" : "text-brand-forest",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed sm:text-lg",
              backgroundUrl ? "text-white/85" : "text-brand-forest",
            )}
          >
            {description}
          </p>

          <form className="flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder={inputPlaceholder}
              className={cn(
                "h-12 w-full rounded-full px-5 text-sm shadow-lg outline-none ring-2 ring-transparent transition sm:flex-1",
                backgroundUrl ? "border-none bg-white text-slate-800 focus:ring-white" : "border border-brand-mist bg-white text-brand-forest focus:ring-brand-forest/40",
              )}
            />
            <Button
              className={cn(
                "h-12 w-full rounded-full px-8 text-sm font-semibold shadow-lg sm:w-auto",
                backgroundUrl
                  ? "bg-brand-forest text-white hover:bg-brand-leaf"
                  : "border border-brand-forest bg-brand-forest text-white hover:bg-brand-leaf",
              )}
            >
              {buttonLabel}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
