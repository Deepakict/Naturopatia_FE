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
    <section className={cn("w-full px-6 py-14 sm:px-12 lg:px-16", className)}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
        <h3 className="text-3xl font-semibold text-brand-forest sm:text-4xl">Our Community</h3>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiles.map((tile, idx) => (
            <div
              key={idx}
              className="group relative flex aspect-[1/1] items-center justify-center overflow-hidden rounded-[26px] bg-white shadow-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-200 group-hover:scale-[1.02]"
                style={{ backgroundImage: `url(${tile.image})` }}
              />
              {tile.ctaLabel && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/70 opacity-0 transition duration-200 group-hover:opacity-100">
                  <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-brand-forest px-5 py-2 text-sm font-semibold text-brand-forest bg-white">
                    {tile.ctaHref ? (
                      <a href={tile.ctaHref} className="flex items-center gap-2">
                        {tile.ctaLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <>
                        {tile.ctaLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
