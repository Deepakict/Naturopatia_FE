import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { productsContent, type Product } from "@/lib/sections-content";

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
                  <div className="hidden h-11 w-full items-center justify-center rounded-full bg-brand-forest text-sm font-semibold text-white transition hover:bg-brand-leaf group-hover:flex">
                    ADD TO BAG
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </div>
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
