import { ContactPage } from "@/components/shared/contact";

const content = {
  hero: {
    eyebrow: "Contact",
    title: "Have a question about our products?",
    subtitle: "We’re here to help with ingredients, routines, or anything else.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  faqs: [
    {
      question: "What makes Anti Fake different?",
      answer:
        "We keep it clean, conscious, and kind. Plant-powered, cruelty-free formulas with zero harsh chemicals—just gentle, effective skincare.",
    },
    {
      question: "Are Anti Fake products safe for sensitive skin?",
      answer: "Yes. Everything is dermatologist-tested and formulated to be gentle for all skin types.",
    },
    {
      question: "Is Anti Fake cruelty-free and vegan?",
      answer: "Absolutely. We never test on animals, and our products are vegan-friendly.",
    },
    {
      question: "Where are Anti Fake products made?",
      answer: "Made with care in facilities that prioritize quality, safety, and sustainable practices.",
    },
    {
      question: "How long does shipping take?",
      answer: "Orders typically ship within 2-4 business days. You'll receive tracking as soon as it’s on the way.",
    },
  ],
  support: [
    { label: "Email", value: "support@AntiFake.com", description: "Mon–Fri, 9 AM–5 PM", icon: "mail" },
    { label: "Phone", value: "+1 (123) 456-7890", description: "Mon–Fri, 9 AM–5 PM", icon: "phone" },
    {
      label: "Address",
      value: "123 Clean Beauty Lane\nLos Angeles, CA 90001",
      description: "United States",
      icon: "map",
    },
    { label: "Press & PR", value: "press@AntiFake.com", description: "Media and partnerships", icon: "mail" },
  ],
  newsletter: {
    eyebrow: "Get started",
    title: "Join the Anti Fake Community",
    description:
      "Sign up for exclusive offers, skincare tips, and new product launches directly in your inbox.",
    background:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1600&q=80",
  },
  availability: {
    title: "Our trusted retailers",
    logos: [
      { name: "Purplle", src: "https://upload.wikimedia.org/wikipedia/commons/7/75/Purplle_logo.png" },
      { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
      { name: "Zepto", src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Zepto_logo.svg" },
      { name: "Nykaa", src: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Nykaa_logo.png" },
      { name: "Blinkit", src: "https://upload.wikimedia.org/wikipedia/commons/2/22/Blinkit_logo.svg" },
    ],
  },
};

export default function Contact() {
  return <ContactPage {...content} />;
}
