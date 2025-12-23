import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type FounderSectionProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string | null;
  imageUrl?: string;
};

export function FounderSection({
  className,
  eyebrow = "Meet Our Founder",
  title = "Skincare isn’t just about how you look.",
  description,
  ctaLabel = "Learn more",
  ctaHref,
  imageUrl,
}: FounderSectionProps) {
  const paragraphs = description
    ?.split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      className={cn(
        "flex w-full items-center self-stretch px-4 py-10 sm:px-6 lg:h-[800px] lg:px-0",
        className,
      )}
    >
      <div className="mx-auto grid w-full items-stretch gap-6 rounded-[32px] bg-transparent sm:gap-8 lg:h-full lg:grid-cols-[1.05fr_1fr]">
        <div className="flex min-h-[320px] w-full flex-1 flex-col items-start justify-between gap-5 self-stretch rounded-[32px] bg-white p-5 shadow-sm sm:gap-6 sm:p-8 lg:gap-6 lg:p-16">
          <div className="space-y-4">
            <p className="self-stretch font-[500] font-['Inter_Tight'] text-[14px] leading-[20px] text-[#9CA8A5] sm:text-[15px] sm:leading-[21px] md:text-[16px] md:leading-[22px] lg:text-[18px] lg:leading-[26px]">
              {eyebrow}
            </p>
            <h2 className="self-stretch font-['Optima'] text-[28px] font-[550] leading-[34px] text-brand-forest sm:text-[32px] sm:leading-[38px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[57.6px]">
              {title}
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 self-stretch sm:gap-5 lg:gap-6">
            {paragraphs?.length ? (
              <div className="space-y-3">
                {paragraphs.map((para, idx) => {
                  const imageMatch = /!\[[^\]]*\]\(([^)]+)\)/.exec(para);
                  if (imageMatch) {
                    const src = "http://localhost:1337/uploads/Vector_1_951b95abd5.png";
                    return (
                      <div key={idx} className="flex h-[100px] w-[200px] items-center justify-start sm:h-[120px] sm:w-[240px]">
                        <img
                          src={src}
                          alt="Founder signature"
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    );
                  }

                  return (
                    <p
                      key={idx}
                      className="self-stretch font-['Inter_Tight'] text-[14px] font-normal leading-[21px] text-[#6E7F7B] sm:text-[15px] sm:leading-[22px] md:text-[16px] md:leading-[24px]"
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            ) : null}

            {ctaLabel ? (
              <Button
                asChild
                variant="outline"
                className="group mt-2 h-10 w-fit rounded-full border-brand-forest px-4 text-sm font-semibold text-brand-forest hover:bg-brand-forest hover:text-white sm:h-11 sm:px-5"
              >
                <Link href={ctaHref ?? "#"}>{ctaLabel}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="relative flex min-h-[240px] flex-1 overflow-hidden rounded-[32px] sm:min-h-[280px] lg:min-h-[360px]">
          <div
            className="h-[260px] w-full flex-1 rounded-[32px] bg-cover bg-center sm:h-[360px] md:h-[480px] lg:h-[800px]"
            style={{
              background: imageUrl
                ? `url('${imageUrl}') center / cover no-repeat, #DDDE92`
                : undefined,
            }}
          />
        </div>
      </div>
    </section>
  );
}
