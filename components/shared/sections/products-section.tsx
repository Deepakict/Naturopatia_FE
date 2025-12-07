import { ArrowUpRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { productsContent, type Product } from "@/lib/sections-content";
import { Button } from "@/components/ui/button";

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
        <h2 className="text-3xl font-semibold text-brand-forest sm:text-4xl">{title}</h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="flex flex-col items-center gap-4 bg-transparent p-4"
            >
              <div className="w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div
                  className="aspect-[4/5] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              </div>

              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-lg font-semibold text-brand-forest">{product.name}</p>
                <div className="flex items-center gap-2 text-sm text-brand-forest">
                  <RatingStars value={product.rating} />
                  <span className="text-xs text-slate-500">({product.reviews})</span>
                </div>
                <Button
                  variant="outline"
                  className="group h-11 rounded-full border-brand-forest px-5 text-sm font-semibold text-brand-forest hover:bg-brand-forest hover:text-white"
                >
                  Add to bag · {product.price}
                  <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RatingStars({ value }: { value: number }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-brand-forest">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={cn(
            "h-4 w-4",
            idx < rounded ? "fill-brand-forest text-brand-forest" : "text-brand-mist",
          )}
        />
      ))}
    </div>
  );
}
