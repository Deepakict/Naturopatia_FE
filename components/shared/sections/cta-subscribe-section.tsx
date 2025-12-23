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
    <section
      className={cn(
        "relative left-1/2 right-1/2 flex w-screen -translate-x-1/2 justify-center bg-[#F1F3F3] px-4 py-8 sm:px-5 sm:py-10 lg:px-5 lg:py-12",
        className,
      )}
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-start gap-2 overflow-hidden rounded-[32px] bg-[#F1F3F3]">
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
            "relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 rounded-[32px] px-5 py-14 text-center sm:gap-16 sm:px-6 sm:py-18 lg:w-[1400px] lg:gap-[118px] lg:px-5 lg:py-40",
            backgroundUrl ? "text-white" : "text-brand-forest",
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="font-['Inter_Tight'] text-[14px] font-[500] leading-[22px] text-white sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[26px]">
              {eyebrow}
            </p>
            <h3 className="font-['Optima'] text-[30px] font-[550] leading-[38px] text-white opacity-80 sm:text-[36px] sm:leading-[44px] md:text-[46px] md:leading-[56px] lg:text-[56px] lg:leading-[67.2px]">
              {title}
            </h3>
            <p className="max-w-[473px] font-['Inter_Tight'] text-[14px] font-normal leading-[22px] text-white/80 sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[26px]">
              {description}
            </p>
          </div>

          <form className="flex w-full max-w-[620px] flex-col items-center gap-3 rounded-[32px] bg-white px-3 py-1.5 shadow-lg sm:flex-row sm:justify-center sm:px-4">
            <input
              type="email"
              placeholder={inputPlaceholder}
              className="h-[50px] w-full min-w-[200px] flex-1 rounded-full border border-transparent bg-transparent px-3 text-[15px] font-normal leading-[22px] text-[#859390] placeholder:text-[#859390] outline-none ring-0 sm:min-w-[220px] sm:text-[16px] sm:leading-[24px]"
            />
            <Button className="flex h-[50px] w-full items-center justify-center gap-1 rounded-full bg-brand-forest px-5 py-[14px] text-white sm:w-auto">
              <span className="font-['Optima'] text-[18px] font-[550] leading-[26px]">{buttonLabel}</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
