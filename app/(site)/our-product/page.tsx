import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HeroCarousel } from "@/components/shared/sections/hero-carousel";
import { ArticlesSection } from "@/components/shared/sections/articles-section";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { ourProductQueryOptions } from "@/lib/api/our-product";
import type { Product as ProductCard, Retailer as RetailerCard } from "@/lib/sections-content";
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

type SizeType = { size?: string | number; price?: number };

type OurProduct = {
  title?: string;
  gallery?: MediaInput[];
  rating?: number | string;
  defaultPrice?: number;
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

type ArticleEntry = {
  title?: string;
  description?: string;
  publishedAt?: string;
  createdAt?: string;
  category?: { name?: string };
  cover?: MediaInput;
};

type NewsletterContent = {
  eyebrow?: string;
  title?: string;
  description?: string | RichTextBlock[];
  inputPlaceholder?: string;
  buttonLabel?: string;
  background?: MediaInput;
};

type Retailer = {
  title?: string;
  name?: string;
  icon?: MediaInput;
  logo?: MediaInput;
};

type RetailerSection = {
  retailer?: Retailer[];
  eyebrow?: string;
  title?: string;
};

type OurProductAttributes = {
  HeroSection?: HeroSection | HeroSection[];
  products?: OurProduct[];
  productsTitle?: string;
  articles?: ArticleEntry[];
  newLetterSection?: NewsletterContent;
  RetailersSection?: RetailerSection;
  RetailerSection?: RetailerSection;
};


function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB").format(date).replace(/\//g, ".");
}

export default async function OurProductPage() {
  const queryClient = new QueryClient();
  const ourProductData = await queryClient.ensureQueryData(ourProductQueryOptions());
  const attributesEntity = ourProductData?.data as StrapiEntity<OurProductAttributes> | undefined;
  const attributes: OurProductAttributes = attributesEntity?.attributes ?? (attributesEntity ?? {});

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

  const heroEntry = attributes?.HeroSection;
  const heroArray = toArray(heroEntry);
  const heroSlides = heroArray.map((item) => {
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

  const productEntries = attributes?.products;
  const ourProducts: ProductCard[] | undefined =
    productEntries?.map((product): ProductCard => {
      const img = toArray(product?.gallery)[0];
      const image = buildMediaUrl(baseUrl, img);
      const ratingValue =
        typeof product?.rating === "number" ? product.rating : Number(product?.rating ?? 0) || 0;
      const priceValue =
        typeof product?.defaultPrice === "number"
          ? product.defaultPrice
          : product?.sizeType?.[0]?.price ?? undefined;
      const sizeRaw = product?.sizeType?.[0]?.size ?? product?.size ?? "";
      const sizeLabel = sizeRaw ? `${sizeRaw}${Number.isFinite(Number(sizeRaw)) ? " ml" : ""}` : undefined;
      return {
        name: product?.title ?? "Product",
        image,
        price: typeof priceValue === "number" ? `₹${priceValue}` : undefined,
        originalPrice:
          typeof product?.compareAtPrice === "number"
            ? `₹${product.compareAtPrice}`
            : undefined,
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
  const productsTitle = attributes?.productsTitle ?? "Our Products";

  const articleEntries = attributes?.articles ?? [];
  const articleCards =
    articleEntries?.map((article) => {
      const cover = article?.cover;
      const coverUrl = buildMediaUrl(baseUrl, cover) ?? "https://placehold.co/800x600?text=Article";
      const date = formatDate(article?.publishedAt ?? article?.createdAt);
      return {
        title: article?.title ?? "Article",
        excerpt: article?.description ?? "",
        date,
        category: article?.category?.name ?? "Insights",
        image: coverUrl,
      };
    }) ?? [];

  const newsletter = attributes?.newLetterSection;
  const newsletterBg = newsletter?.background;
  const newsletterBgUrl = buildMediaUrl(baseUrl, newsletterBg);
  const newsletterDescription = textFromRichBlocks(newsletter?.description);

  const retailerSection = attributes?.RetailersSection ?? attributes?.RetailerSection;
  const retailerItemsArray =
    retailerSection?.retailer
      ?.map((retailer) => {
        const logo = retailer?.icon ?? retailer?.logo;
        const logoUrl = buildMediaUrl(baseUrl, logo);
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <HeroCarousel
          slides={heroSlides}
          minHeightClass="min-h-[85vh] sm:min-h-[90vh] lg:min-h-[95vh]"
        />

        <ProductsSection
          title={productsTitle}
          products={ourProducts}
        />

        <ArticlesSection
          className="-mt-6"
          articles={articleCards?.length ? articleCards : undefined}
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

        <RetailersSection
          retailers={retailerItems}
          eyebrow={retailerSection?.eyebrow}
          title={retailerSection?.title}
        />
      </>
    </HydrationBoundary>
  );
}
