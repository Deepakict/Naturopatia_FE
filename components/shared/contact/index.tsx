import { NewsletterBanner } from "../common/newsletter-banner";
import { AvailabilitySection } from "../common/availability";
import { ContactFAQ } from "./faq";
import { ContactFormSection } from "./contact-form";
import { ContactSupport } from "./support";
import type { ContactPageProps } from "./types";

export function ContactPage({
  hero,
  faqs,
  support,
  newsletter,
  availability,
}: ContactPageProps) {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <ContactFormSection hero={hero} />
      <ContactFAQ faqs={faqs} />
      <ContactSupport support={support} />
      <NewsletterBanner data={newsletter} variant="dark" />
      <AvailabilitySection availability={availability} />
    </div>
  );
}

export * from "./types";
