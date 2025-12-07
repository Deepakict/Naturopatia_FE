import { AboutPage } from "@/components/shared/about";

const content = {
  hero: {
    eyebrow: "Our philosophy",
    title: "Your Natural Journey to Glowing Skin",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80",
  },
  intro: {
    eyebrow: "Skincare built on trust",
    title:
      "At Anti Fake, skincare is more than a routine, it’s a relationship between you and your skin.",
    body:
      "We believe true beauty starts with trust—trust in ingredients, process, and the people behind the products you choose. Everything we create is grounded in transparency, guided by research, and inspired by nature.",
  },
  founder: {
    name: "Charvi K. Verma",
    role: "Founder, Anti Fake",
    quote:
      "Skincare isn’t just about how you look. It’s how you feel when you see real, honest results. We’re here to make your routine simple, effective, and rooted in mindful care.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  team: [
    {
      name: "Anika Rao",
      role: "Product Lead",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Priya Sharma",
      role: "Clinical Research",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Maya Sen",
      role: "Formulation Scientist",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Rhea Patel",
      role: "Sustainability",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
  ],
  testimonials: [
    {
      title: "Even my husband noticed the difference.",
      quote:
        "I started using the Brightening Set and within a week, my skin looked more even-toned and alive.",
      name: "Lauren M.",
      location: "Brooklyn, NY",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "A glow I didn’t think was possible.",
      quote:
        "Clean ingredients, no breakouts, and I love the packaging too! Obsessed with how gentle it is.",
      name: "Maya S.",
      location: "London, UK",
      avatar:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Gentle, effective, and so luxurious.",
      quote:
        "The serum absorbs beautifully and my skin feels calm. Finally found a line that cares about sensitive skin.",
      name: "Priya K.",
      location: "Toronto, CA",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
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

export default function About() {
  return <AboutPage {...content} />;
}
