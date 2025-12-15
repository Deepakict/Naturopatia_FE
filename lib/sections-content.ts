export type Product = {
  name: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  image?: string;
  sizeLabel?: string;
  badgeLabel?: string;
  badgeTone?: "accent" | "success" | "muted";
  limitedLabel?: string;
  inStock?: boolean;
  slug?: string;
  documentId?: string;
};

export type Feature = {
  icon: "sun" | "droplets" | "leaf";
  title: string;
  description: string;
};

export type IngredientsContent = {
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  ctaLabel: string;
  image: string;
};

export type Testimonial = {
  title: string;
  quote: string;
  name: string;
  location: string;
  rating?: number;
  image?: string;
};

export type CommunityTile = {
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type Retailer = {
  name: string;
  logo: string;
  width: number;
  height: number;
};

export const productsContent: Product[] = [
  {
    name: "Cleanser · Purify and Refresh",
    price: "$40",
    originalPrice: "$65",
    rating: 4.6,
    reviews: 620,
    sizeLabel: "50 ml",
    badgeLabel: "62% OFF",
    badgeTone: "accent",
    slug: "cleanser-purify-and-refresh",
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Toner · Hydrate and Balance",
    price: "$40",
    rating: 4.6,
    reviews: 620,
    sizeLabel: "50 ml",
    badgeLabel: "IN STOCK!",
    badgeTone: "success",
    slug: "toner-hydrate-and-balance",
    image:
      "https://images.unsplash.com/photo-1601049313729-4726f8141040?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Serum · Targeted Treatment",
    price: "$40",
    rating: 4.7,
    reviews: 620,
    sizeLabel: "50 ml",
    limitedLabel: "Limited Edition",
    slug: "serum-targeted-treatment",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Moisturizer · Deep Nourishment",
    price: "$40",
    rating: 4.5,
    reviews: 620,
    sizeLabel: "50 ml",
    image:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80",
  },
];

export const differenceFeatures: Feature[] = [
  {
    icon: "sun",
    title: "Clean Beauty",
    description:
      "All our products are cruelty-free, vegan, and free from parabens, sulfates, and synthetic fragrances. We believe in transparency and integrity in every formula.",
  },
  {
    icon: "droplets",
    title: "Dermatologist Tested",
    description:
      "Our products are formulated and tested by dermatologists to ensure they are safe and suitable for all skin types, including sensitive skin.",
  },
  {
    icon: "leaf",
    title: "Sustainably Sourced",
    description:
      "We prioritize sustainability by using ethically sourced ingredients and eco-friendly packaging. Because we care about your skin, and the planet it lives on.",
  },
];

export const ingredientsContent: IngredientsContent = {
  eyebrow: "Ingredients",
  heading: "Powered by Nature's Best",
  body:
    "We source ingredients from the earth's purest and most potent botanicals. From nourishing oils to antioxidant-rich herbs, our formulas are packed with the good stuff to give your skin the care it deserves.",
  bullets: ["No fillers.", "No chemicals.", "Just nature's finest."],
  ctaLabel: "Shop Now",
  image:
    "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa4?auto=format&fit=crop&w=1600&q=80",
};

export const testimonialsContent: Testimonial[] = [
  {
    title: "Even my husband noticed the difference.",
    quote:
      "I started using the Brightening Set and within a week, my skin looked more even-toned and alive. Total confidence booster.",
    name: "Lauren M.",
    location: "Brooklyn, NY",
  },
  {
    title: "A glow I didn’t think was possible.",
    quote:
      "I’ve tried expensive brands, but this is next-level. Clean ingredients, no breakouts, and I love the packaging too!",
    name: "Maya S.",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gentle, effective, and so luxurious.",
    quote:
      "The serum absorbs beautifully and my skin feels plump and calm. Finally found a line that cares about sensitive skin.",
    name: "Priya K.",
    location: "Toronto, CA",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
];

export const communityContent: CommunityTile[] = [
  {
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    ctaLabel: "Instagram",
    ctaHref: "#",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
];

export const retailersContent: Retailer[] = [
  {
    name: "Purplle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Purplle_logo.png",
    width: 320,
    height: 120,
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    width: 260,
    height: 80,
  },
  {
    name: "Zepto",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Zepto_logo.svg",
    width: 240,
    height: 80,
  },
  {
    name: "Nykaa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Nykaa_logo.png",
    width: 260,
    height: 120,
  },
  {
    name: "Blinkit",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Blinkit_logo.svg",
    width: 220,
    height: 80,
  },
];
