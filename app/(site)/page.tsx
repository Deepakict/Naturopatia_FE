import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { Hero } from "@/components/shared/sections/hero";
import { PhilosophySection } from "@/components/shared/sections/philosophy-section";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { DifferenceSection } from "@/components/shared/sections/difference-section";
import { IngredientsSection } from "@/components/shared/sections/ingredients-section";
import { TestimonialsSection } from "@/components/shared/sections/testimonials-section";
import { CtaSubscribeSection } from "@/components/shared/sections/cta-subscribe-section";
import { CommunitySection } from "@/components/shared/sections/community-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { homepageQueryOptions } from "@/lib/api/homepage";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(homepageQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <Hero />
        <PhilosophySection />
        <ProductsSection />
        <DifferenceSection />
        <IngredientsSection />
        <TestimonialsSection />
        <CtaSubscribeSection />
        <CommunitySection />
        <RetailersSection />
      </>
    </HydrationBoundary>
  );
}
