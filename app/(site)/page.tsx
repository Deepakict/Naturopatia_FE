import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { Hero } from "@/components/shared/hero";
import { PhilosophySection } from "@/components/shared/philosophy-section";
import { ProductsSection } from "@/components/shared/products-section";
import { DifferenceSection } from "@/components/shared/difference-section";
import { IngredientsSection } from "@/components/shared/ingredients-section";
import { TestimonialsSection } from "@/components/shared/testimonials-section";
import { CtaSubscribeSection } from "@/components/shared/cta-subscribe-section";
import { CommunitySection } from "@/components/shared/community-section";
import { RetailersSection } from "@/components/shared/retailers-section";
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
