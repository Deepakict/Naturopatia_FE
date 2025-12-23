import { queryOptions } from "@tanstack/react-query";

const PRODUCT_POPULATE_QUERY =
  "populate[gallery]=true&populate[productCategory]=true&populate[productList][populate][icon]=true&populate[sizeType]=true&populate[items][populate][what_on_it_items][populate][icon]=true";

export async function fetchProduct(slugOrId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:1337";
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL not set, using http://localhost:1337");
  }
  if (!slugOrId) {
    console.warn("fetchProduct called without slugOrId");
    return { data: null };
  }

  const filter = encodeURIComponent(slugOrId);
  const directUrl = `${baseUrl}/api/products/${filter}?${PRODUCT_POPULATE_QUERY}`;

  const response = await fetch(directUrl, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    console.warn("Failed to fetch product", { slugOrId, status: response.status, urlTried: directUrl });
    return { data: null };
  }

  console.log("[Product API] fetched product", {
    slugOrId,
    url: directUrl,
    status: response.status,
  });

  return response.json();
}

export const productQueryKey = (slugOrId: string) => ["product", slugOrId];

export const productQueryOptions = (slugOrId: string) =>
  queryOptions({
    queryKey: productQueryKey(slugOrId),
    queryFn: () => fetchProduct(slugOrId),
    staleTime: 1000 * 60 * 5,
  });
