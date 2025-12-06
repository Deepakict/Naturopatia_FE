import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { communityContent, type CommunityTile } from "@/lib/sections-content";
import { Button } from "@/components/ui/button";

type CommunitySectionProps = {
  className?: string;
  tiles?: CommunityTile[];
};

export function CommunitySection({ className, tiles = communityContent }: CommunitySectionProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[32px] bg-[#eef2f1] px-6 py-14 sm:px-12 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
        <h3 className="text-3xl font-semibold text-[#2f4a41] sm:text-4xl">Our Community</h3>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiles.map((tile, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_-28px_rgba(0,0,0,0.35)]"
            >
              <div
                className="aspect-[4/4.5] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${tile.image})` }}
              />
              {tile.ctaLabel && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm">
                  <Button
                    variant="outline"
                    className="group h-11 rounded-full border-white text-white hover:bg-white hover:text-[#2f4a41]"
                    asChild={!!tile.ctaHref}
                  >
                    {tile.ctaHref ? (
                      <a href={tile.ctaHref} className="flex items-center">
                        {tile.ctaLabel}
                        <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    ) : (
                      <>
                        {tile.ctaLabel}
                        <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
