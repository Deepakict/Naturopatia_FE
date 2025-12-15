import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/shared/product/product-detail";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { ourProductQueryOptions } from "@/lib/api/our-product";
import { productQueryOptions } from "@/lib/api/product";
import type { Product } from "@/lib/sections-content";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

function buildMediaUrl(baseUrl: string, media?: any): string | undefined {
  if (!media) return undefined;
  const m = media?.data?.attributes ?? media?.attributes ?? media;
  return (
    (m?.formats?.large?.url && `${baseUrl}${m.formats.large.url}`) ||
    (m?.formats?.medium?.url && `${baseUrl}${m.formats.medium.url}`) ||
    (m?.url && `${baseUrl}${m.url}`) ||
    undefined
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const [productData, ourProductsData] = await Promise.all([
    queryClient.ensureQueryData(productQueryOptions(slug)),
    queryClient.ensureQueryData(ourProductQueryOptions()),
  ]);

  const productEntryRaw = productData?.data;
  const productEntry = Array.isArray(productEntryRaw) ? productEntryRaw[0] : productEntryRaw;
  const productAttr = (productEntry?.attributes as any) ?? productEntry ?? {};

  if (!productEntry) {
    notFound();
  }

  const galleryMedia = Array.isArray(productAttr?.gallery?.data)
    ? productAttr.gallery.data
    : Array.isArray(productAttr?.gallery)
      ? productAttr.gallery
      : [];
  const gallery =
    galleryMedia
      .map((img: any) => {
        const src = buildMediaUrl(baseUrl, img);
        if (!src) return null;
        const altSource =
          img?.attributes?.alternativeText ??
          img?.alternativeText ??
          img?.attributes?.caption ??
          img?.caption;
        return {
          src,
          alt: altSource ?? productAttr?.title ?? "Product image",
        };
      })
      .filter(Boolean) || [];

  const sizeOptions =
    productAttr?.sizeType?.map((s: any) => ({
      label: s?.size ? `${s.size}${Number.isFinite(Number(s.size)) ? " ml" : ""}` : undefined,
      price: typeof s?.price === "number" ? `₹${s.price}` : undefined,
      inStock: s?.isStock ?? true,
    })) ?? [];

  const descriptionText =
    typeof productAttr?.description === "string"
      ? productAttr.description
      : Array.isArray(productAttr?.description)
        ? productAttr.description.join("\n")
        : undefined;

  const highlights =
    productAttr?.productList?.map((item: any) => ({
      title: item?.title ?? "",
      body: item?.description ?? "",
    })) ?? [];

  const productDetailData = {
    title: productAttr?.title ?? "Product",
    price:
      typeof productAttr?.defaultPrice === "number"
        ? `₹${productAttr.defaultPrice}`
        : sizeOptions?.[0]?.price ?? undefined,
    originalPrice:
      typeof productAttr?.compareAtPrice === "number"
        ? `₹${productAttr.compareAtPrice}`
        : undefined,
    rating: typeof productAttr?.rating === "number" ? productAttr.rating : undefined,
    reviews: productAttr?.reviewsCount ?? undefined,
    badge: productAttr?.badge ?? (productAttr?.inStock ? "In Stock!" : undefined),
    limited: productAttr?.limitedEdition ? "Limited Edition" : undefined,
    bestSeller: productAttr?.bestSellers ?? false,
    gallery: gallery.filter((g: any) => g.src),
    sizes: sizeOptions.filter((s: any) => s.label),
    description: descriptionText,
    highlights,
    shippingNote:
      "For orders shipped within your region, please allow 3 to 7 business days for delivery.",
  };

  const attributes = (ourProductsData?.data as any)?.attributes ?? (ourProductsData?.data as any);
  const newsletter = attributes?.newLetterSection;
  const newsletterBg = newsletter?.background;
  const newsletterBgUrl = buildMediaUrl(baseUrl, newsletterBg);
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
        const logoUrl = buildMediaUrl(baseUrl, logo);
        if (!logoUrl) return null;
        return {
          name: retailer?.title ?? retailer?.name ?? "Retailer",
          logo: logoUrl,
          width: logo?.width ?? 180,
          height: logo?.height ?? 60,
        };
      })
      .filter(Boolean) || undefined;

  const allProducts = Array.isArray(attributes?.products) ? attributes.products : [];
  const relatedProducts: Product[] =
    allProducts
      .filter((p: any) => (p?.slug ?? p?.documentId) !== slug)
      .slice(0, 4)
      .map((product: any) => {
        const img = Array.isArray(product?.gallery) ? product.gallery[0] : undefined;
        const image = buildMediaUrl(baseUrl, img);
        const priceValue =
          typeof product?.defaultPrice === "number"
            ? product.defaultPrice
            : product?.sizeType?.[0]?.price ?? undefined;
        const sizeRaw = product?.sizeType?.[0]?.size ?? product?.size ?? "";
        const sizeLabel = sizeRaw
          ? `${sizeRaw}${Number.isFinite(Number(sizeRaw)) ? " ml" : ""}`
          : undefined;
        return {
          name: product?.title ?? "Product",
          image,
          price: typeof priceValue === "number" ? `₹${priceValue}` : undefined,
          originalPrice:
            typeof product?.compareAtPrice === "number"
              ? `₹${product.compareAtPrice}`
              : undefined,
          sizeLabel,
          badgeLabel: product?.badge ?? (product?.inStock ? "In Stock" : undefined),
          badgeTone: product?.inStock ? "success" : "accent",
          limitedLabel: product?.limitedEdition ? "Limited Edition" : undefined,
          slug: product?.slug ?? product?.documentId,
          documentId: product?.documentId,
        };
      }) ?? [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-12 pb-16 pt-8">
        <ProductDetail product={productDetailData} />

        {relatedProducts?.length ? (
          <ProductsSection
            className="pt-0"
            title="Related Products"
            products={relatedProducts}
          />
        ) : null}

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
      </div>
    </HydrationBoundary>
  );
}
