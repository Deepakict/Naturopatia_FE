"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { useCart } from "@/components/layout/cart-context";

type SizeOption = { label: string; price?: string; inStock?: boolean; usp?: string };

type WhatOnProductItem = {
  id?: string | number;
  title?: string;
  description?: string;
  icon?: { src?: string; alt?: string; width?: number; height?: number };
};

type WhatOnProductGroup = {
  id?: string | number;
  eyebrow?: string;
  items?: WhatOnProductItem[];
};

type ProductDetailProps = {
  product: {
    id?: string;
    title: string;
    price?: string;
    originalPrice?: string;
    rating?: number;
    reviews?: number;
    badge?: string;
    limited?: string;
    bestSeller?: boolean;
    inStock?: boolean;
    gallery: { src: string; alt: string }[];
    sizes?: SizeOption[];
    description?: string;
    highlights?: { title: string; body: string }[];
    whatOnProduct?: WhatOnProductGroup[];
    shippingNote?: string;
  };
  onAddToCart?: (item: { name: string; price?: string; size?: string; quantity: number; image?: string }) => void;
};

export function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const { addItem, items, updateQuantity } = useCart();
  const gallery = useMemo(
    () => (product.gallery.length ? product.gallery : fallbackGallery),
    [product.gallery],
  );
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [activeSize, setActiveSize] = useState(product.sizes?.[0]?.label);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const priceNumber = useMemo(() => {
    if (!product.price) return null;
    const cleaned = product.price.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : null;
  }, [product.price]);
  const pricePrefix = useMemo(() => product.price?.match(/^[^0-9]+/)?.[0] ?? "", [product.price]);
  const pricePlus10 = useMemo(() => (priceNumber !== null ? priceNumber * 1.1 : null), [priceNumber]);
  const qty = 1;
  const productId = product.id ?? product.title;
  const cartItem = items.find((i) => i.id === productId);
  const added = Boolean(cartItem);
  const displayQty = cartItem?.quantity ?? qty;

  return (
    <section className="flex w-full justify-center px-4 sm:px-6 md:px-8">
      <div className="flex w-full max-w-[1440px] flex-col items-start gap-12">
        <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-[520px_1fr] px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-4">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full self-stretch overflow-hidden rounded-[16px] bg-white shadow-md">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
                unoptimized={activeImage.src.includes("localhost")}
              />
              {product.badge ? (
                <div className="absolute -right-12 sm:-right-16 top-4 sm:top-8 w-36 sm:w-48 rotate-45 bg-[#DF382C] px-6 sm:px-8 py-2 sm:py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-lg">
                  {product.badge}
                </div>
              ) : null}
              {product.limited ? (
                <div className="absolute bottom-0 left-0 w-full bg-brand-forest/90 px-4 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-wide text-white">
                  {product.limited}
                </div>
              ) : null}
            </div>

            <div className="flex w-full items-center gap-3 overflow-x-auto pr-1">
              {gallery.map((img) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    "relative h-[60px] sm:h-[80px] md:h-[100px] w-[60px] sm:w-[80px] md:w-[100px] flex-shrink-0 overflow-hidden rounded-[16px] bg-center bg-cover shadow-sm transition",
                    activeImage.src === img.src && "shadow-md",
                  )}
                  style={{
                    backgroundImage: `url(${img.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    backgroundSize: "cover",
                  }}
                >
                  <span className="sr-only">{img.alt || "Product thumbnail"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-6 sm:gap-8 self-stretch rounded-[24px] bg-[#FFFFFF] px-4 sm:px-6 md:px-[44px] py-4 sm:py-6 md:py-[64px]">
            <div className="flex flex-col items-start justify-center gap-4 self-stretch">
              <div className="flex items-center gap-3">
                {product.bestSeller ? (
                  <span
                    className="inline-flex w-fit text-center text-[12px] sm:text-[14px] md:text-[16px] font-medium leading-[20px] sm:leading-[26px] text-[#9CA8A5]"
                    style={{ fontFamily: "Inter Tight" }}
                  >
                    Best Sellers
                  </span>
                ) : null}
              </div>

              <h1 className="font-[550] font-[Optima] text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[120%] text-[#1D3A34]">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[24px] text-[#6E7F7B]" style={{ fontFamily: "Inter Tight" }}>
                {product.rating ? (
                  <div className="flex items-center gap-2 text-[#1D3A34]" style={{ fontFamily: "Inter Tight" }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg
                        key={idx}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 18 17"
                        fill={idx < Math.round(product.rating!) ? "#1D3A34" : "#E2E8E6"}
                      >
                        <path d="M17.049 7.72177L13.5333 10.7554L14.6044 15.2921C14.6635 15.5384 14.6483 15.7966 14.5607 16.0343C14.4731 16.2719 14.317 16.4782 14.1122 16.6272C13.9074 16.7762 13.663 16.8611 13.4099 16.8713C13.1569 16.8814 12.9065 16.8163 12.6904 16.6843L8.74507 14.2561L4.79741 16.6843C4.58134 16.8156 4.33124 16.88 4.07861 16.8695C3.82599 16.859 3.58212 16.7739 3.37773 16.6251C3.17333 16.4762 3.01755 16.2702 2.92999 16.033C2.84244 15.7958 2.82702 15.538 2.88569 15.2921L3.96069 10.7554L0.445069 7.72177C0.253895 7.55654 0.115635 7.33865 0.0475548 7.09532C-0.0205252 6.85198 -0.0154079 6.59398 0.0622678 6.35354C0.139943 6.11309 0.286735 5.90086 0.48431 5.74335C0.681885 5.58583 0.921487 5.49001 1.17319 5.46786L5.78257 5.09598L7.56069 0.79286C7.65694 0.558342 7.82075 0.357742 8.0313 0.216562C8.24184 0.0753819 8.48962 0 8.74312 0C8.99661 0 9.24439 0.0753819 9.45494 0.216562C9.66548 0.357742 9.82929 0.558342 9.92554 0.79286L11.7029 5.09598L16.3123 5.46786C16.5645 5.48919 16.8048 5.58447 17.0031 5.74177C17.2013 5.89907 17.3488 6.11139 17.427 6.35212C17.5051 6.59286 17.5105 6.85131 17.4424 7.09509C17.3744 7.33886 17.2359 7.55713 17.0443 7.72255L17.049 7.72177Z" />
                      </svg>
                    ))}
                  </div>
                ) : null}
                {product.reviews ? (
                  <span
                    className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[24px] text-[#6E7F7B]"
                    style={{ fontFamily: "Inter Tight" }}
                  >
                    ({product.reviews})
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <p
                  className="text-[12px] sm:text-[14px] md:text-[16px] font-medium leading-[20px] sm:leading-[24px] text-[#1D3A34]"
                  style={{ fontFamily: "Inter Tight" }}
                >
                  Net content:
                </p>
                <p
                  className="text-[12px] sm:text-[14px] md:text-[16px] font-[700] leading-[20px] sm:leading-[24px] text-[#1D3A34]"
                  style={{ fontFamily: "Inter Tight" }}
                >
                  200g
                </p>
              </div>

              <div className="flex items-center gap-4 self-stretch">
                {product.originalPrice ? (
                  <span className="text-xs sm:text-sm text-[#DF382C] line-through">{product.originalPrice}</span>
                ) : null}
                {product.price ? (
                  <span className="font-[550] font-[Optima] text-[24px] sm:text-[32px] md:text-[40px] leading-[120%] text-[#1D3A34]">
                    {product.price}
                  </span>
                ) : null}
              </div>

              {product.sizes?.length ? (
                <div className="flex flex-col gap-3 pt-4">
                  <p
                    className="text-[14px] font-normal leading-[20px] text-[#1D3A34]"
                    style={{ fontFamily: "Inter Tight" }}
                  >
                    Select Size
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setActiveSize(size.label)}
                        className={cn(
                          "flex h-full w-[180px] flex-col items-start gap-1 rounded-[18px] border bg-white pt-4 shadow-sm transition",
                          activeSize === size.label
                            ? "border-2 border-brand-forest shadow-lg"
                            : "border border-slate-200 hover:border-brand-forest/70",
                          !size.inStock && "cursor-not-allowed opacity-60",
                        )}
                        disabled={size.inStock === false}
                      >
                        <span
                          className="text-[14px] font-normal leading-[20px] text-[#1D3A34] pl-2"
                          style={{ fontFamily: "Inter Tight" }}
                        >
                          Single pack ({size.label} ml)
                        </span>
                        {size.price ? (
                          <span className="text-base font-semibold text-[#1D3A34] pl-2" style={{ fontFamily: "Inter Tight" }}>
                            {size.price}
                          </span>
                        ) : null}
                        <div
                          className="flex w-full items-center bg-[#F2EDE7] rounded-b-[18px]"
                          style={{ fontFamily: "Inter Tight", height: "28px", padding: "5px 57px 5px 18px" }}
                        >
                          <span className="text-[11px] font-semibold uppercase text-[#4B5855]">USP:</span>
                          <span className="text-[12px] font-semibold text-[#4B5855]">{size.usp || "₹2.99 / g"}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}


              <p
                className="text-[16px] font-normal leading-[24px] text-[#6E7F7B]"
                style={{ fontFamily: "Inter Tight", fontStyle: "italic" }}
              >
                Price are inclusive of all taxes
              </p>

              <div className="flex w-full flex-wrap items-center gap-3 pt-1">
                {added ? (
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-brand-forest">
                    <button
                      type="button"
                      onClick={() => {
                        const next = Math.max(1, displayQty - 1);
                        updateQuantity(productId, next);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition hover:border-brand-forest"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-base font-semibold">{displayQty}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = displayQty + 1;
                        updateQuantity(productId, next);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition hover:border-brand-forest"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="flex w-full items-center justify-center gap-[2px] self-stretch rounded-full bg-brand-forest px-[20px] py-[14px] text-sm font-semibold text-white shadow-md transition hover:bg-brand-leaf"
                    onClick={() => {
                      addItem({
                        id: productId,
                        name: product.title,
                        price: product.price,
                        size: activeSize,
                        image: product.gallery?.[0]?.src,
                        quantity: qty,
                      });
                      onAddToCart?.({
                        name: product.title,
                        price: product.price,
                        size: activeSize,
                        quantity: qty,
                        image: product.gallery?.[0]?.src,
                      });
                    }}
                  >
                    <span
                      className="flex items-center justify-center gap-2 px-1 text-[18px] font-[550] leading-[26px] text-white"
                      style={{ fontFamily: "Optima" }}
                    >
                      Add to bag
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                )}

              </div>

              {product.whatOnProduct?.[0]?.items?.length ? (
                <div className="flex w-full flex-col items-start gap-4 self-stretch p-4">
                  <p
                    className="self-stretch text-[16px] font-medium leading-[24px] text-[#1D3A34]"
                    style={{ fontFamily: "Inter Tight" }}
                  >
                    {product.whatOnProduct[0]?.eyebrow ?? "What's in it?"}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {product.whatOnProduct[0].items?.map((item) => (
                      <div
                        key={item?.id ?? item?.title}
                        className="flex flex-col items-start justify-between gap-4 self-stretch rounded-[16px]  bg-white p-6"
                        style={{ backdropFilter: "blur(10px)" }}
                      >
                        {item?.icon?.src ? (
                          <div className="mt-1 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                            <Image
                              src={item.icon.src}
                              alt={item.icon.alt ?? item.title ?? "Item icon"}
                              width={item.icon.width ?? 48}
                              height={item.icon.height ?? 48}
                              className="h-12 w-12 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="mt-1 h-12 w-12 rounded-xl bg-slate-100" />
                        )}

                        <div className="space-y-2 self-stretch">
                          <p
                            className="self-stretch text-[16px] font-normal leading-[24px] text-[#6E7F7B]"
                            style={{ fontFamily: "Inter Tight" }}
                          >
                            {item?.title || "Ingredient"}
                          </p>
                          {item?.description ? (
                            <p
                              className="flex-1 text-[14px] font-normal leading-[20px] text-[#859390]"
                              style={{ fontFamily: "Inter Tight" }}
                            >
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}


            </div>


          </div>
        </section>

        <section className="flex flex-col md:flex-row w-full items-start gap-6 md:gap-10 lg:gap-[120px] px-4 sm:px-6 md:px-10 lg:px-[120px] pb-6 sm:pb-8 md:pb-10 lg:pb-[80px] pt-6 sm:pt-8 md:pt-10 lg:pt-[120px]">
          <div className="flex w-full md:w-[305px] flex-shrink-0 flex-col items-start gap-5 self-stretch text-sm text-slate-600">
            {product.highlights?.map((item, idx) => (
              <button
                key={item.title || idx}
                type="button"
                onClick={() => setActiveHighlight(idx)}
                className={cn(
                  "flex w-full items-start justify-between gap-2 self-stretch border-b px-0 py-3 sm:py-4 md:py-4 lg:py-5 text-sm sm:text-base font-normal leading-5 sm:leading-6 transition",
                  activeHighlight === idx
                    ? "border-[#1D3A34] text-[#1D3A34]"
                    : "border-[#859390] text-[#859390]",
                )}
              >
                <span
                  className={cn(
                    "flex-1 text-left",
                    activeHighlight === idx ? "text-[#1D3A34]" : "text-[#859390]",
                  )}
                >
                  {item.title}
                </span>
                <ArrowRight
                  className={cn(
                    "h-4 w-4",
                    activeHighlight === idx ? "text-[#1D3A34]" : "text-[#859390]",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full">
            <h3
              className="self-stretch text-[20px] sm:text-[24px] md:text-[22px] lg:text-[24px] font-[550] leading-[130%] sm:leading-[140%] text-[#1D3A34]"
              style={{ fontFamily: "Optima" }}
            >
              Overview
            </h3>

            {product.highlights?.length ? (
              <div className="mt-4 sm:mt-6">
                <div className="rounded-xl border-slate-200 text-sm text-slate-700">
                  {(product.highlights[activeHighlight]?.body ?? "")
                    .split("\n")
                    .filter(Boolean)
                    .map((para, idx) => (
                      <p
                        key={idx}
                        className="mb-2 self-stretch text-[16px] sm:text-[18px] md:text-[16px] lg:text-[20px] font-normal leading-[24px] sm:leading-[26px] md:leading-[24px] lg:leading-[28px] text-[#3F5650] last:mb-0"
                        style={{ fontFamily: "Inter Tight" }}
                      >
                        {para}
                      </p>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>



      </div>
    </section>
  );
}

const fallbackGallery = [
  {
    src: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80",
    alt: "Product image",
  },
];
