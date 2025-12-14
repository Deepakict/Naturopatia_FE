import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { HeroCarousel } from "@/components/shared/sections/hero-carousel";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { homepageQueryOptions } from "@/lib/api/homepage";

export default async function OurProductPage() {
  const queryClient = new QueryClient();
  const homepageData = await queryClient.ensureQueryData(homepageQueryOptions());
  const attributes = (homepageData?.data as any)?.attributes ?? (homepageData?.data as any);

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

  const ourProductsSection = attributes?.OurProductSection;
  const ourProducts =
    ourProductsSection?.products?.map((product: any) => {
      const img = Array.isArray(product?.gallery) ? product.gallery[0] : undefined;
      const image =
        (img?.formats?.large?.url && `${baseUrl}${img.formats.large.url}`) ||
        (img?.formats?.medium?.url && `${baseUrl}${img.formats.medium.url}`) ||
        (img?.url && `${baseUrl}${img.url}`) ||
        undefined;
      const ratingValue =
        typeof product?.rating === "number" ? product.rating : Number(product?.rating ?? 0) || 0;
      return {
        name: product?.title ?? "Product",
        image,
        price: product?.price ? `$${product.price}` : undefined,
        rating: ratingValue || 5,
        reviews: product?.reviews ?? 0,
      };
    }) ?? undefined;

  const newsletter = attributes?.NewsletterSection;
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

  const retailerSection = attributes?.RetailerSection;
  const retailerItems =
    retailerSection?.retailers
      ?.map((retailer: any) => {
        const logo = retailer?.logo;
        const logoUrl =
          (logo?.url && `${baseUrl}${logo.url}`) ||
          (logo?.formats?.large?.url && `${baseUrl}${logo.formats.large.url}`) ||
          (logo?.formats?.medium?.url && `${baseUrl}${logo.formats.medium.url}`) ||
          undefined;
        if (!logoUrl) return null;
        return {
          name: retailer?.name ?? "Retailer",
          logo: logoUrl,
          width: logo?.width ?? 180,
          height: logo?.height ?? 60,
        };
      })
      .filter(Boolean) || undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <HeroCarousel slides={heroSlides} />

        <ProductsSection
          title={ourProductsSection?.productTitle ?? "Our Products"}
          products={ourProducts}
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
