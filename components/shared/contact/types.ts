export type ContactHero = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type SupportChannel = {
  label: string;
  value: string;
  description?: string;
  icon: "mail" | "phone" | "map";
};

export type ContactPageProps = {
  hero: ContactHero;
  faqs: FAQItem[];
  support: SupportChannel[];
  newsletter: {
    eyebrow: string;
    title: string;
    description: string;
    background: string;
  };
  availability: {
    title: string;
    logos: Array<{ name: string; src: string }>;
  };
};
