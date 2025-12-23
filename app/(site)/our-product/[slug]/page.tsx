import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/shared/product/product-detail";
import { NewsLetterSection } from "@/components/shared/sections/cta-subscribe-section";
import { RetailersSection } from "@/components/shared/sections/retailers-section";
import { ProductsSection } from "@/components/shared/sections/products-section";
import { ourProductQueryOptions } from "@/lib/api/our-product";
import { productQueryOptions } from "@/lib/api/product";
import type { Product } from "@/lib/sections-content";
import { buildMediaUrl } from "@/lib/utils/content";
import type { MediaInput, RichTextBlock } from "@/lib/types/content";

type SizeType = { size?: string | number; price?: number; isStock?: boolean };

type WhatOnItItem = {
  id?: string | number;
  title?: string;
  description?: string;
  icon?: MediaInput;
};

type ProductItemGroup = {
  id?: string | number;
  eyebrow?: string;
  what_on_it_items?: WhatOnItItem[];
};

type ProductListItem = { title?: string; description?: string };

type ProductAttributes = {
  id?: string;
  slug?: string;
  documentId?: string;
  title?: string;
  defaultPrice?: number;
  compareAtPrice?: number;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  limitedEdition?: boolean;
  bestSellers?: boolean;
  inStock?: boolean;
  size?: string | number;
  gallery?: { data?: MediaInput[] } | MediaInput[];
  sizeType?: SizeType[];
  description?: string | string[];
  productList?: ProductListItem[];
  items?: ProductItemGroup[];
};

type ProductEntry = {
  id?: string;
  attributes?: ProductAttributes;
} & ProductAttributes;

type Retailer = {
  title?: string;
  name?: string;
  icon?: MediaInput;
  logo?: MediaInput;
};

type RetailerSectionContent = {
  retailer?: Retailer[];
  eyebrow?: string;
  title?: string;
};

type NewsletterContent = {
  eyebrow?: string;
  title?: string;
  description?: string | RichTextBlock[];
  inputPlaceholder?: string;
  buttonLabel?: string;
  background?: MediaInput;
};

type OurProductsAttributes = {
  newLetterSection?: NewsletterContent;
  RetailersSection?: RetailerSectionContent;
  RetailerSection?: RetailerSectionContent;
  products?: ProductAttributes[];
};

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

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

  const productEntryRaw = productData?.data as ProductEntry | ProductEntry[] | undefined;
  const productEntry = Array.isArray(productEntryRaw) ? productEntryRaw[0] : productEntryRaw;
  const productAttr: ProductAttributes = productEntry?.attributes ?? productEntry ?? {};

  if (!productEntry) {
    notFound();
  }

  const gallerySource = productAttr?.gallery;
  const galleryMedia: MediaInput[] = Array.isArray(gallerySource)
    ? gallerySource
    : gallerySource && "data" in gallerySource && Array.isArray(gallerySource.data)
      ? gallerySource.data ?? []
      : [];
  const gallery: { src: string; alt: string }[] =
    galleryMedia
      .map((img: MediaInput) => {
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
      .filter((img): img is { src: string; alt: string } => Boolean(img)) || [];

  const sizeOptions: { label: string; price: string | undefined; inStock: boolean }[] =
    (productAttr?.sizeType ?? [])
      .map((s) => {
        if (s?.size === undefined || s?.size === null) return null;
        const label = `${s.size}${Number.isFinite(Number(s.size)) ? " ml" : ""}`;
        const price = typeof s?.price === "number" ? `₹${s.price}` : undefined;
        return {
          label,
          price,
          inStock: s?.isStock ?? true,
        };
      })
      .filter(
        (s): s is { label: string; price: string | undefined; inStock: boolean } => Boolean(s),
      );

  const descriptionText =
    typeof productAttr?.description === "string"
      ? productAttr.description
      : Array.isArray(productAttr?.description)
        ? productAttr.description.join("\n")
        : undefined;

  const highlights =
    productAttr?.productList?.map((item) => ({
      title: item?.title ?? "",
      body: item?.description ?? "",
    })) ?? [];

  const whatOnProduct =
    productAttr?.items
      ?.map((group) => {
        const items =
          group?.what_on_it_items
            ?.map((entry) => {
              const iconUrl = buildMediaUrl(baseUrl, entry?.icon);

              return {
                id: entry?.id ?? entry?.title,
                title: entry?.title ?? "",
                description: entry?.description ?? "",
                icon: iconUrl
                  ? {
                      src: iconUrl,
                      alt:
                        entry?.icon?.alternativeText ??
                        entry?.title ??
                        "Item icon",
                      width: entry?.icon?.width,
                      height: entry?.icon?.height,
                    }
                  : undefined,
              };
            })
            .filter((entry) => entry && (entry.title || entry.description || entry.icon?.src)) ?? [];

        if (!items.length) return null;

        return {
          id: group?.id ?? group?.eyebrow ?? items[0]?.id,
          eyebrow: group?.eyebrow,
          items,
        };
      })
      .filter((group): group is NonNullable<typeof group> => Boolean(group)) ?? [];

  const productDetailData = {
    id: productAttr?.slug ?? productAttr?.documentId ?? String(productAttr?.id ?? productAttr?.title),
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
    gallery: gallery.filter((g) => g.src),
    sizes: sizeOptions,
    description: descriptionText,
    highlights,
    whatOnProduct,
    shippingNote:
      "For orders shipped within your region, please allow 3 to 7 business days for delivery.",
  };



  const attributesSource = ourProductsData?.data as OurProductsAttributes | { attributes?: OurProductsAttributes } | undefined;
  const attributes: OurProductsAttributes =
    attributesSource && typeof attributesSource === "object" && "attributes" in attributesSource
      ? (attributesSource as { attributes?: OurProductsAttributes }).attributes ?? {}
      : (attributesSource as OurProductsAttributes) ?? {};

  const newsletter = attributes?.newLetterSection;
  const newsletterBg = newsletter?.background;
  const newsletterBgUrl = buildMediaUrl(baseUrl, newsletterBg);
  const newsletterDescription =
    Array.isArray(newsletter?.description) && newsletter.description.length
      ? newsletter.description
          .map((block) =>
            Array.isArray(block?.children)
              ? block.children.map((child: { text?: string }) => child?.text ?? "").join(" ")
              : "",
          )
          .join(" ")
          .trim() || undefined
      : typeof newsletter?.description === "string"
        ? newsletter.description
        : undefined;

  const retailerSection = attributes?.RetailersSection ?? attributes?.RetailerSection;
  const retailerItems =
    retailerSection?.retailer
      ?.map((retailer) => {
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
      .filter(
        (retailer): retailer is { name: string; logo: string; width: number; height: number } =>
          Boolean(retailer),
      ) ||
    undefined;

  const allProducts = Array.isArray(attributes?.products) ? attributes.products : [];
  const relatedProducts: Product[] =
    allProducts
      .filter((p) => (p?.slug ?? p?.documentId) !== slug)
      .slice(0, 4)
      .map((product) => {
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
