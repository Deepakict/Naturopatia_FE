import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { HeroCarousel } from "@/components/shared/sections/hero-carousel";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { WhyChooseUS } from "@/components/shared/sections/difference-section";
import { ProductHighlightSection } from "@/components/shared/sections/ingredients-section";
import { TestimonialsSection } from "@/components/shared/sections/testimonials-section";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { CommunitySection } from "@/components/shared/sections/community-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { homepageQueryKey, homepageQueryOptions, type HomePageResponse } from "@/lib/api/homepage";

export default async function Home() {
  const queryClient = new QueryClient();

  const homepageData = await queryClient.ensureQueryData(homepageQueryOptions());
  const attributes = (homepageData?.data as any)?.attributes ?? (homepageData?.data as any);

  console.log("[Homepage] fetched data", {
    id: homepageData?.data?.id,
    heroCount: Array.isArray(attributes?.HeroSection)
      ? attributes.HeroSection.length
      : attributes?.HeroSection
        ? 1
        : 0,
    testimonials: attributes?.TestimonialSection?.Testimonials?.length ?? 0,
    communityCards: attributes?.CommunitySection?.CommunityCards?.length ?? 0,
  });

  const heroEntry = attributes?.HeroSection;
  const heroArray = Array.isArray(heroEntry) ? heroEntry : heroEntry ? [heroEntry] : [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
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

  const philosophy = attributes?.PhilosophySection;

  const philosophyImages =
    philosophy?.images?.map((img: any) => {
      const url =
        (img?.formats?.thumbnail?.url && `${baseUrl}${img.formats.thumbnail.url}`) ||
        (img?.url && `${baseUrl}${img.url}`) ||
        undefined;
      return url;
    }) ?? [];

  const philosophyItems =
    philosophy?.PhilosophyItems?.map((item: any) => ({
      title: item?.title ?? "",
      description: item?.description ?? "",
      icon:
        (item?.icon?.url && `${baseUrl}${item.icon.url}`) ||
        (item?.icon?.formats?.thumbnail?.url && `${baseUrl}${item.icon.formats.thumbnail.url}`) ||
        undefined,
    })) ?? [];

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

  const testimonialSection = attributes?.TestimonialSection;
  const testimonialItems =
    (testimonialSection?.Testimonials ?? testimonialSection?.testimonials ?? [])?.map((item: any) => {
      const avatar = Array.isArray(item?.avatar) ? item.avatar[0] : item?.avatar?.[0];
      const image =
        (avatar?.formats?.medium?.url && `${baseUrl}${avatar.formats.medium.url}`) ||
        (avatar?.url && `${baseUrl}${avatar.url}`) ||
        undefined;
      return {
        title: item?.headline ?? "",
        quote: item?.quote ?? "",
        name: item?.name ?? "",
        location: item?.location ?? "",
        rating: typeof item?.rating === "number" ? item.rating : Number(item?.rating ?? 0) || 5,
        image,
      };
    }) || undefined;

  const communityTiles =
    attributes?.CommunitySection?.CommunityCards?.map((card: any) => {
      const img = card?.images;
      const image =
        (img?.formats?.large?.url && `${baseUrl}${img.formats.large.url}`) ||
        (img?.url && `${baseUrl}${img.url}`) ||
        undefined;
      return {
        image,
        ctaLabel: card?.ctaLabel ?? undefined,
        ctaHref: card?.ctaUrl ?? undefined,
      };
    }) || undefined;

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

  const productSection = attributes?.ProductSection;
  const productArticle = productSection?.article;
  const productCover = productArticle?.cover;
  const coverImage =
    (productCover?.formats?.large?.url && `${baseUrl}${productCover.formats.large.url}`) ||
    (productCover?.formats?.medium?.url && `${baseUrl}${productCover.formats.medium.url}`) ||
    (productCover?.url && `${baseUrl}${productCover.url}`) ||
    undefined;

  const richText = (productArticle?.richText as string | undefined) ?? "";
  const richLines = richText.split("\n").map((line) => line.trim()).filter(Boolean);
  const bulletLines = richLines.filter((line) => line.startsWith("-")).map((line) => line.replace(/^-\\s*/, ""));
  const bodyLines = richLines.filter((line) => !line.startsWith("-"));

  const productHighlightContent = {
    eyebrow: productSection?.tag ?? "Ingredients",
    heading: productArticle?.title ?? productSection?.title ?? "Powered by Nature's Best",
    body: bodyLines.join(" "),
    bullets: bulletLines.length ? bulletLines : ["No fillers.", "No chemicals.", "Just nature's finest."],
    ctaLabel: productSection?.ctaLabel ?? "Shop Now",
    image: coverImage,
  };
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

  const chooseUsRaw = Array.isArray(attributes?.ChooseUsSection)
    ? attributes.ChooseUsSection[0]
    : attributes?.ChooseUsSection;
  const chooseUsHeroMedia = Array.isArray(chooseUsRaw?.hero) ? chooseUsRaw.hero[0] : chooseUsRaw?.hero?.[0];
  const chooseUsHero =
    (chooseUsHeroMedia?.formats?.large?.url && `${baseUrl}${chooseUsHeroMedia.formats.large.url}`) ||
    (chooseUsHeroMedia?.formats?.medium?.url && `${baseUrl}${chooseUsHeroMedia.formats.medium.url}`) ||
    (chooseUsHeroMedia?.url && `${baseUrl}${chooseUsHeroMedia.url}`) ||
    undefined;

  const chooseUsItems =
    chooseUsRaw?.ChooseUsItems?.map((item: any) => ({
      title: item?.title ?? "",
      description: item?.description ?? "",
      icon:
        (item?.icon?.url && `${baseUrl}${item.icon.url}`) ||
        (item?.icon?.formats?.thumbnail?.url && `${baseUrl}${item.icon.formats.thumbnail.url}`) ||
        undefined,
    })) ?? undefined;

  console.log("Homepage hero slides:", heroSlides.length);
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
          eyebrow={retailerSection?.eyebrow}
          title={retailerSection?.title}
        />
      </>
    </HydrationBoundary>
  );
}
