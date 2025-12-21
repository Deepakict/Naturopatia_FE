"use client";

import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

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
  const [added, setAdded] = useState<Record<string, boolean>>({});

  // Keep `added` flags in sync with cart items: clear added state for items removed from cart elsewhere
  useEffect(() => {
    setAdded((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        const inCart = cartItems.some((c) => c.id === k);
        if (!inCart) next[k] = false;
      });
      return next;
    });
  }, [cartItems]);

  const updateQty = (key: string, delta: number) => {
    const cartItem = cartItems.find((item) => item.id === key);
    if (cartItem) {
      const newQty = cartItem.quantity + delta;
      if (newQty <= 0) {
        removeItem(key);
        setAdded((prev) => ({ ...prev, [key]: false }));
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
    setAdded((prev) => ({ ...prev, [key]: true }));
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
    <section className={cn("w-full px-6 py-16 sm:px-12 lg:px-16", className)}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <h2 className="text-4xl font-semibold text-brand-forest sm:text-[44px]">{title}</h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const price = product.price ?? "";
            const originalPrice = product.originalPrice;
            const size = product.sizeLabel;
            const badge = product.badgeLabel;
            const limited = product.limitedLabel;
            const href =
              product.slug || product.documentId
                ? `/our-product/${product.slug ?? product.documentId}`
                : undefined;
            const key = product.slug ?? product.documentId ?? product.name;
            const cartItem = cartItems.find((item) => item.id === key);
            const qty = cartItem?.quantity ?? quantities[key] ?? 1;
            const isAdded = cartItem ? true : added[key] ?? false;

            const Card = (
              <article className="group relative flex h-full flex-col gap-4 rounded-[28px] bg-[#F6F8F8] p-4 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative w-full overflow-hidden rounded-[22px] bg-white shadow-sm">
                  <div
                    className="aspect-[4/5] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  {badge ? (
                    product.badgeTone === "success" ? (
                      <div className="absolute -right-14 top-6 w-40 rotate-45 bg-[#DF382C] px-6 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-md">
                        {badge}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "absolute right-3 top-3 rounded-md px-3 py-2 text-xs font-semibold uppercase text-white shadow",
                          badgeToneClasses(product.badgeTone),
                        )}
                      >
                        {badge}
                      </div>
                    )
                  ) : null}
                  {limited ? (
                    <div
                      className="absolute bottom-0 left-0 w-full rounded-b-[22px] px-4 py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-white"
                      style={{
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

                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-base font-semibold leading-6 text-brand-forest">
                    {product.name}
                  </p>
                  {size ? <p className="text-xs text-slate-600">{size}</p> : null}
                  <div className="flex items-center gap-2 text-sm text-brand-forest">
                    {originalPrice ? (
                      <span className="text-xs text-[#DF382C] line-through">{originalPrice}</span>
                    ) : null}
                    <span className="text-base font-semibold text-brand-forest">{price}</span>
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
                      className="flex h-11 w-full items-center justify-center rounded-full bg-brand-forest text-sm font-semibold text-white transition hover:bg-brand-leaf"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdd(key, product);
                      }}
                    >
                      ADD TO BAG
                      <ArrowUpRight className="ml-2 h-4 w-4" />
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
