import { FounderSection } from "./founder";
import { AboutIntro } from "./intro";
import { AboutTestimonials } from "./testimonials";
import { TeamGrid } from "./team";
import { HeroBanner } from "../common/hero-banner";
import type { AboutPageProps } from "./types";
import { Eyebrow } from "../common/eyebrow";
import { AvailabilitySection } from "../common/availability";

export function AboutPage({
  hero,
  intro,
  founder,
  team,
  testimonials,
  newsletter,
  availability,
}: AboutPageProps) {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroBanner
        title={hero.title}
        eyebrow={hero.eyebrow}
        image={hero.image}
        overlayClassName="bg-gradient-to-t from-black/65 via-black/20 to-transparent"
        minHeightClass="min-h-[420px] sm:min-h-[520px]"
      />
      <AboutIntro {...intro} />
      <FounderSection founder={founder} />
      <TeamGrid team={team} />
      <AboutTestimonials testimonials={testimonials} />
      <AvailabilitySection availability={availability} />
    </div>
  );
}

export { Eyebrow };
export * from "./types";
