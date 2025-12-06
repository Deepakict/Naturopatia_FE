import { queryOptions } from "@tanstack/react-query";

export type StrapiMedia = {
  data?: {
    attributes?: {
      url?: string | null;
      alternativeText?: string | null;
    } | null;
  } | null;
};

export type HomePageAttributes = {
  HeroSection?: { title?: string | null; subtitle?: string | null; heroImage?: StrapiMedia };
  PhilosophySection?: { title?: string | null };
  OurProductsSection?: { title?: string | null };
  ProductSection?: { title?: string | null };
  ChooseUsSection?: { title?: string | null };
  NewsletterSection?: { title?: string | null };
  CommunitySection?: { title?: string | null };
  TestimonialSection?: { title?: string | null };
};

export type HomePageResponse = {
  data: { id: number; attributes: HomePageAttributes } | null;
  meta?: Record<string, unknown>;
};

const HOMEPAGE_POPULATE_QUERY =
  "populate[HeroSection][populate][heroImage]=true&populate[PhilosophySection][populate][images]=true&populate[PhilosophySection][populate][PhilosophyItems][populate][icon]=true&populate[OurProductsSection][populate][products][populate][gallery]=true&populate[ProductSection][populate][cover]=true&populate[ChooseUsSection][populate][hero]=true&populate[ChooseUsSection][populate][ChooseUsItems][populate][icon]=true&populate[NewsletterSection][populate][background]=true&populate[CommunitySection][populate][CommunityCards][populate][images]=true&populate[TestimonialSection][populate][Testimonials][populate][avatar]=true";

export async function fetchHomePage(): Promise<HomePageResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/homepage?${HOMEPAGE_POPULATE_QUERY}`;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Strapi homepage data (${response.status}).`);
  }

  console.log("[Strapi] homepage fetch", { url, status: response.status });

  const json = await response.json();

  console.log("[Strapi] homepage response", JSON.stringify(json, null, 2));

  return json;
}

export const homepageQueryKey = ["homepage"];

export const homepageQueryOptions = () =>
  queryOptions({
    queryKey: homepageQueryKey,
    queryFn: fetchHomePage,
    staleTime: 1000 * 60 * 5,
  });
