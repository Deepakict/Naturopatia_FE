export type Ingredients = {
  title: string;
  body: string;
  texture: string;
  idealFor: string;
  keyBenefits: string;
  ctaLabel: string;
};

export type Newsletter = {
  eyebrow: string;
  title: string;
  description: string;
  background: string;
};

export type CategoryPageProps = {
  title: string;
  eyebrow?: string;
  heroImage: string;
  introTitle: string;
  introDescription: string;
  productImage: string;
  howToImage: string;
  howToTitle: string;
  howToDescription: string;
  ingredients: Ingredients;
  newsletter: Newsletter;
};
