import { CategoryIntro } from "./intro";
import { IngredientsCard } from "./ingredients-card";
import { MediaCard } from "./media-card";
import { HowToCard } from "./how-to-card";
import { NewsletterBanner } from "../common/newsletter-banner";
import { HeroBanner } from "../common/hero-banner";
import type { CategoryPageProps } from "./types";

export function CategoryPage(props: CategoryPageProps) {
  const {
    title,
    eyebrow,
    heroImage,
    introTitle,
    introDescription,
    productImage,
    howToImage,
    howToTitle,
    howToDescription,
    ingredients,
    newsletter,
  } = props;

  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroBanner title={title} eyebrow={eyebrow} image={heroImage} />
      <CategoryIntro eyebrow={eyebrow} title={introTitle} description={introDescription} />

      <section className="grid gap-6 md:grid-cols-2">
        <IngredientsCard eyebrow={eyebrow} ingredients={ingredients} />
        <MediaCard image={productImage} />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <MediaCard image={howToImage} />
        <HowToCard eyebrow={eyebrow} title={howToTitle} description={howToDescription} />
      </section>

      <NewsletterBanner data={newsletter} variant="dark" />
    </div>
  );
}

export * from "./types";
export * from "./intro";
export * from "./ingredients-card";
export * from "./media-card";
export * from "./how-to-card";
