import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ContactFormSection } from "@/components/shared/contact/contact-form";
import { ContactFAQ } from "@/components/shared/contact/faq";
import { ContactSupport } from "@/components/shared/contact/support";
import type { SupportChannel, FAQItem } from "@/components/shared/contact/types";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { contactQueryOptions } from "@/lib/api/contact";
import type { Retailer } from "@/lib/sections-content";

type MediaFormat = { url?: string; width?: number; height?: number };

type MediaInput = {
  url?: string;
  width?: number;
  height?: number;
  mime?: string;
  alternativeText?: string;
  caption?: string;
  formats?: {
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
  };
  data?: { attributes?: MediaInput };
  attributes?: MediaInput;
  file?: MediaInput;
};

type RichTextChild = { text?: string };
type RichTextBlock = { children?: RichTextChild[] };

type ContactFormContent = {
  title?: string;
  sectionHeading?: string;
  subtitle?: string;
  description?: string;
  hero?: MediaInput;
  inputFirstNameLabel?: string;
  inputLastNameLabel?: string;
  inputEmailLabel?: string;
  inputMessageLabel?: string;
  buttonLabel?: string;
};

type FAQEntry = { question?: string; answer?: string; title?: string; description?: string };

type SupportItem = { label?: string; value?: string; contact?: string; email?: string; note?: string; description?: string };

type NewsletterContent = {
  eyebrow?: string;
  title?: string;
  description?: string | RichTextBlock[];
  inputPlaceholder?: string;
  buttonLabel?: string;
  background?: MediaInput;
};

type RetailerSection = {
  retailer?: { title?: string; name?: string; icon?: MediaInput; logo?: MediaInput }[];
  eyeBrow?: string;
  eyebrow?: string;
  title?: string;
};

type ContactAttributes = {
  contactForm?: ContactFormContent;
  faq?: { faqItem?: FAQEntry[] };
  support?: { contactSupport?: { description?: string }; supportItem?: SupportItem[] };
  newLetterSection?: NewsletterContent;
  retailersSection?: RetailerSection;
  RetailersSection?: RetailerSection;
  RetailerSection?: RetailerSection;
};

type StrapiEntity<T> = { attributes?: T } & T;

const buildMediaUrl = (baseUrl: string, media?: MediaInput | null): string | undefined => {
  if (!media) return undefined;
  const m = media.data?.attributes ?? media.attributes ?? media.file ?? media;
  return (
    (m?.formats?.large?.url && `${baseUrl}${m.formats.large.url}`) ||
    (m?.formats?.medium?.url && `${baseUrl}${m.formats.medium.url}`) ||
    (m?.formats?.small?.url && `${baseUrl}${m.formats.small.url}`) ||
    (m?.url && `${baseUrl}${m.url}`) ||
    undefined
  );
};

const textFromRichBlocks = (blocks?: RichTextBlock[] | string | null): string | undefined => {
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks) || !blocks.length) return undefined;
  const joined = blocks
    .map((block) => (Array.isArray(block.children) ? block.children.map((child) => child?.text ?? "").join(" ") : ""))
    .join(" ")
    .trim();
  return joined || undefined;
};

export default async function Contact() {
  const queryClient = new QueryClient();
  const contactData = await queryClient.ensureQueryData(contactQueryOptions());
  const contactEntity = contactData?.data as StrapiEntity<ContactAttributes> | undefined;
  const attributes: ContactAttributes = contactEntity?.attributes ?? (contactEntity ?? {});
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
    attributes?.faq?.faqItem?.map((item) => ({
      question: item?.question ?? item?.title ?? "Question",
      answer: item?.answer ?? item?.description ?? "",
    })) ?? [];

  const supportHeader = attributes?.support?.contactSupport;
  const supportItemsRaw = Array.isArray(attributes?.support?.supportItem)
    ? attributes.support.supportItem
    : [];
  const support: SupportChannel[] =
    supportItemsRaw.map((item) => ({
      label: item?.label ?? "Support",
      value: item?.value ?? item?.contact ?? item?.email ?? "",
      description: item?.note ?? item?.description ?? supportHeader?.description ?? "",
      icon: inferIcon(item?.label),
    })) ?? [];

  const newsletter = attributes?.newLetterSection;
  const newsletterBg = newsletter?.background;
  const newsletterBgUrl = buildMediaUrl(baseUrl, newsletterBg);
  const newsletterDescription = textFromRichBlocks(newsletter?.description);


  const retailerSection =
    attributes?.retailersSection ?? attributes?.RetailersSection ?? attributes?.RetailerSection;
  const retailerItemsArray =
    retailerSection?.retailer
      ?.map((retailer) => {
        const logo = retailer?.icon ?? retailer?.logo;
        const logoUrl = buildMediaUrl(baseUrl, logo);
        if (!logoUrl) return null;
        return {
          name: retailer?.title ?? retailer?.name ?? "Retailer",
          logo: logoUrl,
          width: logo?.width ?? 180,
          height: logo?.height ?? 60,
        } satisfies Retailer;
      })
      .filter((r): r is Retailer => Boolean(r)) || [];
  const retailerItems: Retailer[] | undefined = retailerItemsArray.length ? retailerItemsArray : undefined;

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
