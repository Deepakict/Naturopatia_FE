import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HeroCarousel } from "@/components/shared/sections/hero-carousel";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { WhyChooseUS } from "@/components/shared/sections/difference-section";
import { ProductHighlightSection } from "@/components/shared/sections/ingredients-section";
import { TestimonialsSection } from "@/components/shared/sections/testimonials-section";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { CommunitySection } from "@/components/shared/sections/community-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { homepageQueryOptions } from "@/lib/api/homepage";
import type { CommunityTile as CommunityTileItem, IngredientsContent, Product as ProductCard, Retailer as RetailerCard } from "@/lib/sections-content";
import { buildMediaUrl, textFromRichBlocks, toArray } from "@/lib/utils/content";
import type { MediaInput, RichTextBlock, StrapiEntity } from "@/lib/types/content";

type HeroSection = {
  eyebrow?: string;
  title?: string;
  subtitle?: string | RichTextBlock[];
  heroImage?: MediaInput[] | MediaInput;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
};

type SizeType = { size?: string | number; price?: number; isStock?: boolean };

type OurProduct = {
  title?: string;
  gallery?: MediaInput[];
  rating?: number | string;
  defaultPrice?: number;
  price?: number | string;
  sizeType?: SizeType[];
  size?: string | number;
  compareAtPrice?: number;
  badge?: string;
  inStock?: boolean;
  limitedEdition?: boolean;
  slug?: string;
  documentId?: string;
  reviewsCount?: number;
  reviews?: number;
};

type TestimonialItem = {
  headline?: string;
  quote?: string;
  name?: string;
  location?: string;
  rating?: number | string;
  avatar?: MediaInput[] | MediaInput;
};

type CommunityCard = {
  images?: MediaInput;
  ctaLabel?: string;
  ctaUrl?: string;
};

type Retailer = {
  title?: string;
  name?: string;
  icon?: MediaInput;
  logo?: MediaInput;
};

type RetailerSection = {
  retailer?: Retailer[];
  retailers?: Retailer[];
  eyebrow?: string;
  eyeBrow?: string;
  title?: string;
};

type ProductSectionContent = {
  article?: {
    cover?: MediaInput;
    richText?: string;
    title?: string;
  };
  tag?: string;
  title?: string;
  ctaLabel?: string;
};

type NewsletterContent = {
  eyebrow?: string;
  title?: string;
  description?: string | RichTextBlock[];
  inputPlaceholder?: string;
  buttonLabel?: string;
  background?: MediaInput;
};

type ChooseUsItem = {
  title?: string;
  description?: string;
  icon?: MediaInput;
};

type ChooseUsContent = {
  eyebrows?: string;
  title?: string;
  hero?: MediaInput[] | MediaInput;
  ChooseUsItems?: ChooseUsItem[];
};

type HomepageAttributes = {
  HeroSection?: HeroSection | HeroSection[];
  OurProductSection?: { productTitle?: string; products?: OurProduct[] };
  TestimonialSection?: { testimonialsHeading?: string; Testimonials?: TestimonialItem[]; testimonials?: TestimonialItem[] };
  CommunitySection?: { CommunityCards?: CommunityCard[] };
  RetailerSection?: RetailerSection;
  RetailersSection?: RetailerSection;
  retailersSection?: RetailerSection;
  ProductSection?: ProductSectionContent;
  NewsletterSection?: NewsletterContent;
  ChooseUsSection?: ChooseUsContent | ChooseUsContent[];
};


export default async function Home() {
  const queryClient = new QueryClient();

  const homepageData = await queryClient.ensureQueryData(homepageQueryOptions());
  const homepageEntity = homepageData?.data as StrapiEntity<HomepageAttributes> | undefined;
  const attributes: HomepageAttributes = homepageEntity?.attributes ?? (homepageEntity ?? {});
  const heroEntry = attributes?.HeroSection;
  const heroArray = toArray(heroEntry);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:1337";
  const heroSlides =
    heroArray.map((item) => {
      const img = toArray(item?.heroImage)[0];
      const imageUrl = buildMediaUrl(baseUrl, img);
      const subtitle = textFromRichBlocks(item?.subtitle);

      return {
        eyebrow: item?.eyebrow ?? undefined,
        title: item?.title ?? undefined,
        description: subtitle,
        imageUrl,
        ctaLabel: item?.primaryCtaLabel ?? "Shop Now",
        ctaHref: item?.primaryCtaUrl ?? undefined,
      };
    });

  const ourProductsSection = attributes?.OurProductSection;
  const ourProducts: ProductCard[] | undefined =
    ourProductsSection?.products?.map((product): ProductCard => {
      const img = toArray(product?.gallery)[0];
      const image = buildMediaUrl(baseUrl, img);
      const ratingValue =
        typeof product?.rating === "number" ? product.rating : Number(product?.rating ?? 0) || 0;
      const priceValue =
        typeof product?.defaultPrice === "number"
          ? product.defaultPrice
          : typeof product?.price === "number"
            ? product.price
            : typeof product?.price === "string"
              ? Number(product.price)
              : product?.sizeType?.[0]?.price ?? undefined;
      const sizeRaw = product?.sizeType?.[0]?.size ?? product?.size ?? "";
      const sizeLabel = sizeRaw ? `${sizeRaw}${Number.isFinite(Number(sizeRaw)) ? " ml" : ""}` : undefined;
      return {
        name: product?.title ?? "Product",
        image,
        price: typeof priceValue === "number" ? `₹${priceValue}` : typeof product?.price === "string" ? product.price : undefined,
        originalPrice:
          typeof product?.compareAtPrice === "number" ? `₹${product.compareAtPrice}` : undefined,
        rating: ratingValue || 5,
        reviews: product?.reviewsCount ?? product?.reviews ?? 0,
        sizeLabel,
        badgeLabel: product?.badge ?? (product?.inStock ? "In Stock" : undefined),
        badgeTone: product?.inStock ? "success" : "accent",
        limitedLabel: product?.limitedEdition ? "Limited Edition" : undefined,
        slug: product?.slug ?? product?.documentId,
        documentId: product?.documentId,
      };
    }) ?? undefined;

  const testimonialSection = attributes?.TestimonialSection;
  const testimonialItems =
    (testimonialSection?.Testimonials ?? testimonialSection?.testimonials ?? [])
      ?.map((item) => {
        const avatar = toArray(item?.avatar)[0];
        const image = buildMediaUrl(baseUrl, avatar) ??
          (avatar?.formats?.medium?.url ? `${baseUrl}${avatar.formats.medium.url}` : undefined);
        return {
          title: item?.headline ?? "",
          quote: item?.quote ?? "",
          name: item?.name ?? "",
          location: item?.location ?? "",
          rating: typeof item?.rating === "number" ? item.rating : Number(item?.rating ?? 0) || 5,
          image,
        };
      }) || undefined;

  const communityTilesArray =
    attributes?.CommunitySection?.CommunityCards?.map((card): CommunityTileItem | null => {
      const image = buildMediaUrl(baseUrl, card?.images);
      if (!image) return null;
      return {
        image,
        ctaLabel: card?.ctaLabel,
        ctaHref: card?.ctaUrl,
      };
    }) || [];
  const communityTiles: CommunityTileItem[] | undefined = communityTilesArray.filter(
    (tile): tile is CommunityTileItem => Boolean(tile),
  );

  const retailerSection =
    attributes?.RetailerSection ?? attributes?.RetailersSection ?? attributes?.retailersSection;
  const retailerItemsArray =
    (retailerSection?.retailer ?? retailerSection?.retailers)
      ?.map((retailer) => {
        const logo = retailer?.icon ?? retailer?.logo;
        const logoUrl =
          buildMediaUrl(baseUrl, logo) ||
          (logo?.formats?.small?.url ? `${baseUrl}${logo.formats.small.url}` : undefined);
        if (!logoUrl) return null;
        const width = logo?.width ?? logo?.formats?.large?.width ?? 180;
        const height = logo?.height ?? logo?.formats?.large?.height ?? 60;
        return {
          name: retailer?.title ?? retailer?.name ?? "Retailer",
          logo: logoUrl,
          width,
          height,
        } satisfies RetailerCard;
      })
      .filter((retailer): retailer is RetailerCard => Boolean(retailer)) || [];
  const retailerItems: RetailerCard[] | undefined = retailerItemsArray.length
    ? retailerItemsArray
    : undefined;

  const productSection = attributes?.ProductSection;
  const productArticle = productSection?.article;
  const productCover = productArticle?.cover;
  const coverImage = buildMediaUrl(baseUrl, productCover);
  const fallbackCover = "https://placehold.co/800x600?text=Product";

  const richText = (productArticle?.richText as string | undefined) ?? "";
  const richLines = richText.split("\n").map((line) => line.trim()).filter(Boolean);
  const bulletLines = richLines.filter((line) => line.startsWith("-")).map((line) => line.replace(/^-\\s*/, ""));
  const bodyLines = richLines.filter((line) => !line.startsWith("-"));

  const productHighlightContent: IngredientsContent = {
    eyebrow: productSection?.tag ?? "Ingredients",
    heading: productArticle?.title ?? productSection?.title ?? "Powered by Nature's Best",
    body: bodyLines.join(" "),
    bullets: bulletLines.length ? bulletLines : ["No fillers.", "No chemicals.", "Just nature's finest."],
    ctaLabel: productSection?.ctaLabel ?? "Shop Now",
    image: coverImage ?? fallbackCover,
  };
  const newsletter = attributes?.NewsletterSection;
  const newsletterBg = newsletter?.background;
  const newsletterBgUrl = buildMediaUrl(baseUrl, newsletterBg);
  const newsletterDescription = textFromRichBlocks(newsletter?.description) ?? undefined;

  const chooseUsRaw = Array.isArray(attributes?.ChooseUsSection)
    ? attributes.ChooseUsSection[0]
    : attributes?.ChooseUsSection;
  const chooseUsHero = buildMediaUrl(baseUrl, toArray(chooseUsRaw?.hero)[0]);

  const chooseUsItems =
    chooseUsRaw?.ChooseUsItems?.map((item) => ({
      title: item?.title ?? "",
      description: item?.description ?? "",
      icon: buildMediaUrl(baseUrl, item?.icon),
    })) ?? undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <HeroCarousel slides={heroSlides} />
        <ProductsSection
          title={ourProductsSection?.productTitle ?? "Our Products"}
          products={ourProducts}
        />
      
        <WhyChooseUS
          eyebrow={chooseUsRaw?.eyebrows}
          heading={chooseUsRaw?.title}
          heroImage={chooseUsHero}
          features={chooseUsItems}
        />
        
        <ProductHighlightSection content={productHighlightContent} />
          {/* 
        <TestimonialsSection
          heading={testimonialSection?.testimonialsHeading}
          testimonials={testimonialItems}
        />
        <NewsLetterSection
          eyebrow={newsletter?.eyebrow}
          title={newsletter?.title}
          description={newsletterDescription}
          inputPlaceholder={newsletter?.inputPlaceholder}
          buttonLabel={newsletter?.buttonLabel}
          backgroundUrl={newsletterBgUrl}
          isVideo={newsletterBg?.mime === "video/mp4"}
        />
        <CommunitySection tiles={communityTiles} />
        <RetailersSection
          retailers={retailerItems}
          eyebrow={retailerSection?.eyebrow ?? retailerSection?.eyeBrow}
          title={retailerSection?.title}
        /> */}
      </>
    </HydrationBoundary>
  );
}
