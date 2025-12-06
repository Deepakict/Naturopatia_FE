import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { CouponBar } from "@/components/sections/coupon-bar";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ProductsSection } from "@/components/sections/products-section";
import { DifferenceSection } from "@/components/sections/difference-section";
import { IngredientsSection } from "@/components/sections/ingredients-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSubscribeSection } from "@/components/sections/cta-subscribe-section";
import { CommunitySection } from "@/components/sections/community-section";
import { RetailersSection } from "@/components/sections/retailers-section";
import { Footer } from "@/components/sections/footer";
import { homepageQueryOptions } from "@/lib/api/homepage";
import { HomepageTitles } from "@/components/homepage-titles";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(homepageQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-slate-100 text-foreground">
        <CouponBar className="relative z-10" />
        <Header className="relative z-10" />

        <main className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-12 px-4 pb-16 pt-8 sm:px-8">
          <HomepageTitles />
          <Hero />
          <PhilosophySection />
          <ProductsSection />
          <DifferenceSection />
          <IngredientsSection />
          <TestimonialsSection />
          <CtaSubscribeSection />
          <CommunitySection />
          <RetailersSection />
          <Footer />
        </main>
      </div>
    </HydrationBoundary>
  );
}
