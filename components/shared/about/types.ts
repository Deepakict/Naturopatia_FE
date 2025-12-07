export type AboutHero = {
  eyebrow?: string;
  title: string;
  image: string;
};

export type AboutIntro = {
  eyebrow?: string;
  title: string;
  body: string;
};

export type Founder = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export type Testimonial = {
  title: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
};

export type Availability = {
  title: string;
  logos: Array<{ name: string; src: string; width?: number; height?: number }>;
};

export type NewsletterSlice = {
  eyebrow: string;
  title: string;
  description: string;
  background: string;
};

export type AboutPageProps = {
  hero: AboutHero;
  intro: AboutIntro;
  founder: Founder;
  team: TeamMember[];
  testimonials: Testimonial[];
  newsletter: NewsletterSlice;
  availability: Availability;
};
