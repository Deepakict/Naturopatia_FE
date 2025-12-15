import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Article = {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  image: string;
  href?: string;
};

type ArticlesSectionProps = {
  className?: string;
  title?: string;
  articles?: Article[];
};

const fallbackArticles: Article[] = [
  {
    title: "Why Traveling Solo Changed My Perspective",
    excerpt: "Traveling alone pushed me out of my comfort zone and opened my eyes to new cultures...",
    date: "19.05.2025",
    category: "Insights",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "The Importance of Vulnerability in Building Connection",
    excerpt: "Sharing my fears and insecurities deepened the connections with those I love...",
    date: "26.05.2025",
    category: "Insights",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "How Volunteering Helped Me Find My Purpose",
    excerpt: "Giving back to the community provided clarity on what I value most in life...",
    date: "02.06.2025",
    category: "Insights",
    image:
      "https://images.unsplash.com/photo-1508387028134-d52f2c7d02a4?auto=format&fit=crop&w=1400&q=80",
  },
];

export function ArticlesSection({
  className,
  title = "Our Articles",
  articles = fallbackArticles,
}: ArticlesSectionProps) {
  return (
    <section className={cn("w-full px-6 py-16 sm:px-12 lg:px-16", className)}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <div>
          <h2 className="text-4xl font-semibold leading-tight text-brand-forest sm:text-[44px]">
            {title}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => {
            const imageSrc = article.image || fallbackArticles[0].image;
            return (
              <article
                key={article.title}
                className="flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px]">
                  <Image
                    src={imageSrc}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
                    unoptimized={imageSrc.includes("localhost")}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 px-2 pb-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <span>{article.category ?? "Insights"}</span>
                    <ArrowUpRight className="h-4 w-4 text-brand-forest" />
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-brand-forest">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
                  <div className="mt-auto text-xs font-medium text-slate-500">{article.date}</div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-full bg-brand-forest px-6 text-sm font-semibold text-white shadow-md transition hover:bg-brand-leaf"
          >
            More Article
          </button>
        </div>
      </div>
    </section>
  );
}
