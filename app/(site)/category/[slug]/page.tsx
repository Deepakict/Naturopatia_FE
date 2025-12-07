import { CategoryPage } from "@/components/shared/category";

const mockContent = {
  title: "Fresh Start, Every Day",
  eyebrow: "Cleanser",
  heroImage:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80",
  introTitle:
    "Start your routine the right way. Our gentle cleanser effortlessly removes dirt, oil, makeup, and daily pollutants without disrupting your skin’s natural balance.",
  introDescription:
    "Lightweight, calm, and balanced — designed to leave skin fresh, hydrated, and comfortable after every wash.",
  productImage:
    "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80",
  howToImage:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  howToTitle: "How to use",
  howToDescription:
    "Massage onto damp skin in circular motions, then rinse with lukewarm water. Use morning and night for a clean, comfortable start.",
  ingredients: {
    title: "Ingredients",
    body:
      "Formulated with soothing botanicals like Chamomile and Green Tea to cleanse without stripping. Skin is left calm, balanced, and hydrated.",
    texture: "Lightweight, creamy, non-stripping",
    idealFor: "All skin types, including sensitive",
    keyBenefits: "Deeply cleanses, maintains hydration, minimizes irritation",
    ctaLabel: "Shop now",
  },
  newsletter: {
    eyebrow: "Get started",
    title: "Join the Anti Fake Community",
    description:
      "Sign up for exclusive offers, skincare tips, and new product launches directly in your inbox.",
    background:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1800&q=80",
  },
};

export default async function CategoryPageRoute({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app you’d fetch by slug here.
  void params;

  return <CategoryPage {...mockContent} />;
}
