import { queryOptions } from "@tanstack/react-query";

const CONTACT_POPULATE_QUERY =
  "populate[contactForm][populate][hero][populate][file]=true&populate[faq][populate][faqItem]=true&populate[support][populate][contactSupport]=true&populate[support][populate][supportItem][populate][icon]=true&populate[newLetterSection][populate][background]=true&populate[retailersSection][populate][retailer][populate][icon]=true";

export async function fetchContact() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/contact?${CONTACT_POPULATE_QUERY}`;
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch contact data (${response.status}).`);
  }

  return response.json();
}

export const contactQueryKey = ["contact"];

export const contactQueryOptions = () =>
  queryOptions({
    queryKey: contactQueryKey,
    queryFn: fetchContact,
    staleTime: 1000 * 60 * 5,
  });
