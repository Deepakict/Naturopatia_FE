import { queryOptions } from "@tanstack/react-query";

export type OurProductResponse = {
  data: any;
  meta?: Record<string, unknown>;
};

const OUR_PRODUCT_POPULATE_QUERY =
  "populate[HeroSection][populate][heroImage]=true&populate[HeroSection][populate][InfoItems][populate][icon]=true&populate[RetailersSection][populate][retailer][populate][icon]=true&populate[newLetterSection][populate][background]=true&populate[products][populate][gallery]=true&populate[products][populate][productCategory]=true&populate[products][populate][productList][populate][icon]=true&populate[products][populate][sizeType]=true&populate[articles][populate]=*";

export async function fetchOurProduct(): Promise<OurProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/our-product?${OUR_PRODUCT_POPULATE_QUERY}`;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch our-product data (${response.status}).`);
  }

  return response.json();
}

export const ourProductQueryKey = ["our-product"];

export const ourProductQueryOptions = () =>
  queryOptions({
    queryKey: ourProductQueryKey,
    queryFn: fetchOurProduct,
    staleTime: 1000 * 60 * 5,
  });
