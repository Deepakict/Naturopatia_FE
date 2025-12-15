"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, CheckCircle, Shield, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type SizeOption = { label: string; price?: string; inStock?: boolean };

type ProductDetailProps = {
  product: {
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
    shippingNote?: string;
  };
};

export function ProductDetail({ product }: ProductDetailProps) {
  const gallery = useMemo(
    () => (product.gallery.length ? product.gallery : fallbackGallery),
    [product.gallery],
  );
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [activeSize, setActiveSize] = useState(product.sizes?.[0]?.label);
  const [activeHighlight, setActiveHighlight] = useState(0);

  return (
    <div className="flex flex-col gap-12">
      <section className="grid gap-6 rounded-[28px] bg-white p-6 shadow-sm lg:grid-cols-[520px_1fr]">
        <div className="flex gap-4">
          <div className="flex max-h-[560px] flex-col gap-3 overflow-y-auto pr-1">
            {gallery.map((img) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveImage(img)}
                className={cn(
                  "relative h-20 w-16 overflow-hidden rounded-2xl border border-transparent bg-white shadow-sm transition",
                  activeImage.src === img.src ? "border-brand-forest" : "border-slate-200",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized={img.src.includes("localhost")}
                />
              </button>
            ))}
          </div>

          <div className="relative h-[520px] flex-1 overflow-hidden rounded-[32px] bg-white shadow-md">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
              unoptimized={activeImage.src.includes("localhost")}
            />
            {product.badge ? (
              <div className="absolute -right-16 top-8 w-48 rotate-45 bg-[#DF382C] px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-lg">
                {product.badge}
              </div>
            ) : null}
            {product.limited ? (
              <div className="absolute bottom-0 left-0 w-full bg-brand-forest/90 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white">
                {product.limited}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[24px] bg-[#F6F8F8] p-6">
          <div className="flex items-center gap-3">
            {product.bestSeller ? (
              <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                Best Sellers
              </span>
            ) : null}
            {product.inStock !== false ? (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                In Stock
              </span>
            ) : (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
                Out of Stock
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-brand-forest sm:text-4xl">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            {product.rating ? (
              <div className="flex items-center gap-1 text-brand-forest">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={cn(
                      "h-4 w-4",
                      idx < Math.round(product.rating!)
                        ? "fill-brand-forest text-brand-forest"
                        : "text-slate-300",
                    )}
                  />
                ))}
                <span className="ml-1 text-sm font-semibold">{product.rating.toFixed(1)}</span>
              </div>
            ) : null}
            {product.reviews ? <span className="text-xs">({product.reviews})</span> : null}
          </div>

          <div className="flex items-baseline gap-3">
            {product.originalPrice ? (
              <span className="text-sm text-[#DF382C] line-through">{product.originalPrice}</span>
            ) : null}
            {product.price ? (
              <span className="text-2xl font-semibold text-brand-forest">{product.price}</span>
            ) : null}
          </div>

          {product.sizes?.length ? (
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    onClick={() => setActiveSize(size.label)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      activeSize === size.label
                        ? "border-brand-forest bg-brand-forest text-white"
                        : "border-slate-200 bg-white text-brand-forest hover:border-brand-forest",
                      !size.inStock && "cursor-not-allowed opacity-50",
                    )}
                    disabled={size.inStock === false}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex gap-3 pt-1">
            <button className="flex h-11 items-center justify-center rounded-full bg-brand-forest px-6 text-sm font-semibold text-white shadow-md transition hover:bg-brand-leaf">
              Add to bag
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
            <button className="flex h-11 items-center justify-center rounded-full border border-brand-forest px-4 text-sm font-semibold text-brand-forest transition hover:bg-brand-forest hover:text-white">
              Subscribe & Save
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-3 text-sm text-slate-600">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Shipping & Return
            </p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-forest" />
              <span>Free shipping for subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-forest" />
              <span>{product.shippingNote ?? "Delivery times may vary based on destination."}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="space-y-3 text-sm text-slate-600">
          {product.highlights?.map((item, idx) => (
            <button
              key={item.title || idx}
              type="button"
              onClick={() => setActiveHighlight(idx)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition",
                activeHighlight === idx
                  ? "border-brand-forest bg-brand-forest text-white"
                  : "border-slate-200 bg-white text-brand-forest hover:border-brand-forest",
              )}
            >
              <span>{item.title}</span>
              <ArrowRight
                className={cn(
                  "h-4 w-4",
                  activeHighlight === idx ? "text-white" : "text-slate-400",
                )}
              />
            </button>
          ))}
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-forest">Overview</h3>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
            {product.description ? (
              product.description
                .split("\n")
                .filter(Boolean)
                .map((para, idx) => <p key={idx}>{para}</p>)
            ) : (
              <p>
                Skincare begins here — a cleanser that truly understands your skin. Gentle yet
                hardworking, formulated to calm, hydrate, and keep your natural barrier happy.
              </p>
            )}
          </div>

          {product.highlights?.length ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Key Benefits
              </p>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                {(product.highlights[activeHighlight]?.body ?? "")
                  .split("\n")
                  .filter(Boolean)
                  .map((para, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">
                      {para}
                    </p>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

const fallbackGallery = [
  {
    src: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80",
    alt: "Product image",
  },
];
