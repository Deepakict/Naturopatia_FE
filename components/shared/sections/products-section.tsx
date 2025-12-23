"use client";

import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { productsContent, type Product } from "@/lib/sections-content";
import { useCart } from "@/components/layout/cart-context";

type ProductsSectionProps = {
  className?: string;
  products?: Product[];
  title?: string;
};

export function ProductsSection({
  className,
  products = productsContent,
  title = "Our Products",
}: ProductsSectionProps) {
  const { addItem, items: cartItems, updateQuantity, removeItem } = useCart();
  const initialQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      const key = p.slug ?? p.documentId ?? p.name;
      map[key] = 1;
    });
    return map;
  }, [products]);

  const [quantities, setQuantities] = useState<Record<string, number>>(initialQuantities);

  const updateQty = (key: string, delta: number) => {
    const cartItem = cartItems.find((item) => item.id === key);
    if (cartItem) {
      const newQty = cartItem.quantity + delta;
      if (newQty <= 0) {
        removeItem(key);
        return;
      }
      updateQuantity(key, newQty);
      return;
    }
    setQuantities((prev) => {
      const next = { ...prev };
      const current = prev[key] ?? 1;
      const newVal = Math.max(1, current + delta);
      next[key] = newVal;
      return next;
    });
  };

  const handleAdd = (key: string, product: Product) => {
    const qty = quantities[key] ?? 1;
    addItem({
      id: product.slug ?? product.documentId ?? product.name,
      name: product.name,
      price: product.price,
      size: product.sizeLabel,
      image: product.image,
      quantity: qty,
    });
  };

  return (
    <section
      className={cn(
        "inline-flex w-full flex-col items-start justify-center gap-8 bg-[#F1F3F3] py-6 sm:gap-10 sm:py-10",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 sm:gap-8 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-semibold leading-tight text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)] sm:text-3xl lg:text-4xl"
          style={{ fontFamily: "Optima" }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const price = product.price ?? "";
            const originalPrice = product.originalPrice;
            const size = product.sizeLabel;
            const badge = product.badgeLabel;
            const limited = product.limitedLabel;
            const numericPrice = price ? Number((price as string).replace(/[^0-9.]/g, "")) : undefined;
            const computedOriginal =
              originalPrice ??
              (numericPrice !== undefined && !Number.isNaN(numericPrice)
                ? `${price?.trim()?.startsWith("$") ? "$" : ""}${(numericPrice * 1.1).toFixed(0)}`
                : undefined);
            const href =
              product.slug || product.documentId
                ? `/our-product/${product.slug ?? product.documentId}`
                : undefined;
            const key = product.slug ?? product.documentId ?? product.name;
            const cartItem = cartItems.find((item) => item.id === key);
            const qty = cartItem?.quantity ?? quantities[key] ?? 1;
            const isAdded = Boolean(cartItem);

            const Card = (
              <article className="group relative flex h-full flex-col gap-4 rounded-lg p-4 transition hover:-translate-y-1">
                <div className="relative w-full overflow-hidden rounded-lg">
                  <div
                    className="mx-auto h-64 w-full max-w-xs bg-cover bg-center sm:h-72 lg:h-80"
                    style={{ backgroundImage: `url(${product.image})`, aspectRatio: "394 / 486.4" }}
                  />
                  {badge ? (
                    product.badgeTone === "success" ? (
                      <div
                        className="absolute -right-10 top-4 w-32 rotate-45 bg-[#E5210E] px-4 py-1 text-center text-sm font-medium text-white"
                        style={{ fontFamily: "Optima" }}
                      >
                        {badge}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-semibold uppercase text-white shadow",
                          badgeToneClasses(product.badgeTone),
                        )}
                      >
                        {badge}
                      </div>
                    )
                  ) : null}
                  {limited ? (
                    <div
                      className="absolute bottom-4 left-1/2 w-full max-w-xs -translate-x-1/2 rounded-b-lg px-4 py-2 text-center text-sm font-medium text-white"
                      style={{
                        fontFamily: "Optima",
                        backgroundColor: "#1e5b4e",
                        backgroundImage:
                          "linear-gradient(120deg, rgba(255,255,255,0.08) 18%, transparent 18%), linear-gradient(240deg, rgba(255,255,255,0.08) 18%, transparent 18%)",
                        backgroundSize: "32px 32px",
                      }}
                    >
                      {limited}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-2 px-1">
                  <p
                    className="text-base font-medium leading-snug text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)] sm:text-lg"
                    style={{ fontFamily: "Inter Tight" }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="text-sm font-medium leading-snug text-[color:var(--Secondary-Myrtle,#1C391A)] sm:text-base"
                    style={{ fontFamily: "Inter Tight" }}
                  >
                    {size || "Size not specified"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {computedOriginal ? (
                      <span
                        className="text-sm font-normal leading-snug text-[color:var(--System-Red,#FF3B30)] line-through sm:text-base"
                        style={{ fontFamily: "Inter Tight" }}
                      >
                        {computedOriginal}
                      </span>
                    ) : null}
                    <span
                      className="text-base font-medium leading-snug text-[color:var(--Secondary-Myrtle,#1C391A)] sm:text-lg"
                      style={{ fontFamily: "Inter Tight" }}
                    >
                      {price}
                    </span>
                  </div>
                </div>

                <div className="mt-auto">
                  {isAdded ? (
                    <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-brand-forest">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateQty(key, -1);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm transition hover:border-brand-forest"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-base font-semibold">{qty}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateQty(key, 1);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm transition hover:border-brand-forest"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="flex w-full items-center justify-center gap-1 rounded-full bg-brand-forest px-4 py-3 text-sm font-medium text-white transition-opacity md:opacity-0 md:group-hover:opacity-100"
                      style={{ fontFamily: "Optima" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdd(key, product);
                      }}
                    >
                      ADD TO BAG
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </div>
                  )}
                </div>
              </article>
            );

            if (href) {
              return (
                <Link key={product.slug ?? product.documentId ?? product.name} href={href} className="block">
                  {Card}
                </Link>
              );
            }

            return (
              <div key={product.slug ?? product.documentId ?? product.name}>
                {Card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function badgeToneClasses(tone: Product["badgeTone"]) {
  switch (tone) {
    case "success":
      return "bg-emerald-600";
    case "muted":
      return "bg-slate-500";
    default:
      return "bg-[#DF382C]";
  }
}
