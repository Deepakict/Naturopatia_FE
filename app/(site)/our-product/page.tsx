import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HeroCarousel } from "@/components/shared/sections/hero-carousel";
import { ArticlesSection } from "@/components/shared/sections/articles-section";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { ourProductQueryOptions } from "@/lib/api/our-product";

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB").format(date).replace(/\//g, ".");
}

export default async function OurProductPage() {
  const queryClient = new QueryClient();
  const ourProductData = await queryClient.ensureQueryData(ourProductQueryOptions());
  const attributes = (ourProductData?.data as any)?.attributes ?? (ourProductData?.data as any);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

  const heroEntry = attributes?.HeroSection;
  const heroArray = Array.isArray(heroEntry) ? heroEntry : heroEntry ? [heroEntry] : [];
  const heroSlides =
    heroArray.map((item: any) => {
      const img = Array.isArray(item?.heroImage) ? item.heroImage[0] : item?.heroImage?.[0];
      const imageUrl =
        (img?.formats?.large?.url && `${baseUrl}${img.formats.large.url}`) ||
        (img?.url && `${baseUrl}${img.url}`) ||
        undefined;

      const subtitle =
        item?.subtitle && Array.isArray(item.subtitle)
          ? item.subtitle
              .map((node: any) => {
                if (node?.children && Array.isArray(node.children)) {
                  return node.children.map((child: any) => child?.text ?? "").join(" ");
                }
                return "";
              })
              .join(" ")
              .trim()
          : undefined;

      return {
        eyebrow: item?.eyebrow ?? undefined,
        title: item?.title ?? undefined,
        description: subtitle || undefined,
        imageUrl,
        ctaLabel: item?.primaryCtaLabel ?? "Shop Now",
        ctaHref: item?.primaryCtaUrl ?? undefined,
      };
    }) ?? [];

  const productEntries = attributes?.products;
  const ourProducts =
    productEntries?.map((product: any) => {
      const img = Array.isArray(product?.gallery) ? product.gallery[0] : undefined;
      const image =
        (img?.formats?.large?.url && `${baseUrl}${img.formats.large.url}`) ||
        (img?.formats?.medium?.url && `${baseUrl}${img.formats.medium.url}`) ||
        (img?.url && `${baseUrl}${img.url}`) ||
        undefined;
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
    articleEntries?.map((article: any) => {
      const cover = article?.cover;
      const coverUrl =
        (cover?.formats?.large?.url && `${baseUrl}${cover.formats.large.url}`) ||
        (cover?.formats?.medium?.url && `${baseUrl}${cover.formats.medium.url}`) ||
        (cover?.url && `${baseUrl}${cover.url}`) ||
        undefined;
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
  const newsletterBgUrl =
    (newsletterBg?.url && `${baseUrl}${newsletterBg.url}`) ||
    (newsletterBg?.formats?.large?.url && `${baseUrl}${newsletterBg.formats.large.url}`) ||
    undefined;
  const newsletterDescription =
    Array.isArray(newsletter?.description) && newsletter.description.length
      ? newsletter.description
          .map((block: any) =>
            Array.isArray(block?.children)
              ? block.children.map((child: any) => child?.text ?? "").join(" ")
              : "",
          )
          .join(" ")
          .trim()
      : undefined;

  const retailerSection = attributes?.RetailersSection ?? attributes?.RetailerSection;
  const retailerItems =
    retailerSection?.retailer
      ?.map((retailer: any) => {
        const logo = retailer?.icon ?? retailer?.logo;
        const logoUrl =
          (logo?.url && `${baseUrl}${logo.url}`) ||
          (logo?.formats?.large?.url && `${baseUrl}${logo.formats.large.url}`) ||
          (logo?.formats?.medium?.url && `${baseUrl}${logo.formats.medium.url}`) ||
          undefined;
        if (!logoUrl) return null;
        return {
          name: retailer?.title ?? retailer?.name ?? "Retailer",
          logo: logoUrl,
          width: logo?.width ?? 180,
          height: logo?.height ?? 60,
        };
      })
      .filter(Boolean) || undefined;

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
