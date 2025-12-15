import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ContactFormSection } from "@/components/shared/contact/contact-form";
import { ContactFAQ } from "@/components/shared/contact/faq";
import { ContactSupport } from "@/components/shared/contact/support";
import type { SupportChannel, FAQItem } from "@/components/shared/contact/types";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { contactQueryOptions } from "@/lib/api/contact";
import type { Retailer } from "@/lib/sections-content";

function buildMediaUrl(baseUrl: string, media?: any): string | undefined {
  if (!media) return undefined;
  const m = media?.data?.attributes ?? media?.attributes ?? media;
  return (
    (m?.formats?.large?.url && `${baseUrl}${m.formats.large.url}`) ||
    (m?.formats?.medium?.url && `${baseUrl}${m.formats.medium.url}`) ||
    (m?.url && `${baseUrl}${m.url}`) ||
    undefined
  );
}

export default async function Contact() {
  const queryClient = new QueryClient();
  const contactData = await queryClient.ensureQueryData(contactQueryOptions());

  const attributes = (contactData?.data as any)?.attributes ?? (contactData?.data as any);
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:1337";

  const contactForm = attributes?.contactForm;
  const heroMedia = contactForm?.hero?.file ?? contactForm?.hero;
  const heroImage = buildMediaUrl(baseUrl, heroMedia);

  const hero = {
    eyebrow: contactForm?.title ?? "Contact",
    title: contactForm?.sectionHeading ?? "Have a question about our products?",
    subtitle:
      contactForm?.subtitle ??
      contactForm?.description ??
      attributes?.support?.contactSupport?.description ??
      "We’re here to help.",
    image:
      heroImage ??
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  };

  const faqs: FAQItem[] =
    attributes?.faq?.faqItem?.map((item: any) => ({
      question: item?.question ?? item?.title ?? "Question",
      answer: item?.answer ?? item?.description ?? "",
    })) ?? [];

  const supportHeader = attributes?.support?.contactSupport;
  const supportItemsRaw = Array.isArray(attributes?.support?.supportItem)
    ? attributes.support.supportItem
    : [];
  const support: SupportChannel[] =
    supportItemsRaw.map((item: any) => ({
      label: item?.label ?? "Support",
      value: item?.value ?? item?.contact ?? item?.email ?? "",
      description: item?.note ?? item?.description ?? supportHeader?.description ?? "",
      icon: inferIcon(item?.label),
    })) ?? [];

  const newsletter = attributes?.newLetterSection;
  const newsletterBg = newsletter?.background;
  const newsletterBgUrl = buildMediaUrl(baseUrl, newsletterBg);
  const newsletterDescription =
    Array.isArray(newsletter?.description) && newsletter.description.length
      ? newsletter.description
        .map((block: any) =>
          Array.isArray(block?.children)
            ? block.children.map((child: any) => child?.text ?? "").join(" ")
            : "",
        )
        .join(" ")
        .trim()
      : undefined;


  const retailerSection =
    attributes?.retailersSection ?? attributes?.RetailersSection ?? attributes?.RetailerSection;
  const retailerItems: Retailer[] | undefined =
    retailerSection?.retailer
      ?.map((retailer: any) => {
        const logo = retailer?.icon ?? retailer?.logo;
        const logoUrl = buildMediaUrl(baseUrl, logo);
        if (!logoUrl) return null;
        return {
          name: retailer?.title ?? retailer?.name ?? "Retailer",
          logo: logoUrl,
          width: logo?.width ?? 180,
          height: logo?.height ?? 60,
        };
      })
      .filter(Boolean) as Retailer[] | undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-16 pb-16">
        <ContactFormSection
          hero={{
            ...hero,
            sectionHeading: contactForm?.sectionHeading,
            inputFirstNameLabel: contactForm?.inputFirstNameLabel,
            inputLastNameLabel: contactForm?.inputLastNameLabel,
            inputEmailLabel: contactForm?.inputEmailLabel,
            inputMessageLabel: contactForm?.inputMessageLabel,
            buttonLabel: contactForm?.buttonLabel,
          }}
        />
        {faqs.length ? <ContactFAQ faqs={faqs} /> : null}
        {support.length ? <ContactSupport support={support} /> : null}
        <NewsLetterSection
          eyebrow={newsletter?.eyebrow}
          title={newsletter?.title}
          description={
            newsletterDescription ??
            "Sign up for exclusive offers, skincare tips, and new product launches directly in your inbox."
          }
          inputPlaceholder={newsletter?.inputPlaceholder}
          buttonLabel={newsletter?.buttonLabel}
          backgroundUrl={newsletterBgUrl}
          isVideo={newsletterBg?.mime === "video/mp4"}
        />

        {retailerItems && retailerItems.length ? (
          <RetailersSection
            retailers={retailerItems}
            eyebrow={retailerSection?.eyeBrow ?? retailerSection?.eyebrow}
            title={retailerSection?.title ?? "We’re also available at"}
          />
        ) : null}
      </div>
    </HydrationBoundary>
  );
}

function inferIcon(label?: string): SupportChannel["icon"] {
  const lower = (label ?? "").toLowerCase();
  if (lower.includes("phone")) return "phone";
  if (lower.includes("address") || lower.includes("location")) return "map";
  return "mail";
}
