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
    <section
      className={cn(
        "flex w-full flex-col items-center justify-center gap-14 bg-[#F1F3F3] pt-[40px] pr-[40px] pb-[120px] pl-[40px]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <div className="w-full">
          <h2
            className="text-[48px] font-[400] leading-[normal] tracking-[-0.72px] text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)]"
            style={{ fontFamily: "Inter Tight" }}
          >
            {title}
          </h2>
        </div>

        <div className="grid w-full justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => {
            const imageSrc = article.image || fallbackArticles[0].image;
            return (
              <article
                key={article.title}
                className="flex h-full w-full max-w-[440px] flex-col items-start justify-center gap-4 overflow-hidden p-3"
              >
                <div
                  className="h-[325px] w-full self-stretch overflow-hidden rounded-[24px]"
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundColor: "var(--Base-Color-Pure-White, #FFF)",
                    backgroundPosition: "50% 50%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                <div className="flex flex-1 flex-col items-start gap-[12px] self-stretch px-2 pb-2">
                  <div className="flex flex-col items-start gap-1 self-stretch">
                    <span
                      className="w-full text-[14px] font-[400] leading-[20px] text-[#9CA8A5]"
                      style={{ fontFamily: "Inter Tight" }}
                    >
                      {article.category ?? "Insights"}
                    </span>
                  </div>

                  <div className="flex w-full flex-col gap-[12px] self-stretch">
                    <div className="flex w-full items-center justify-center gap-6 self-stretch">
                      <h3
                        className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-[550] leading-[140%] text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)]"
                        style={{ fontFamily: "Optima" }}
                      >
                        {article.title}
                      </h3>
                      <span className="shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M18.7504 6V15.75C18.7504 15.9489 18.6714 16.1397 18.5307 16.2803C18.3901 16.421 18.1993 16.5 18.0004 16.5C17.8015 16.5 17.6107 16.421 17.4701 16.2803C17.3294 16.1397 17.2504 15.9489 17.2504 15.75V7.81031L6.53104 18.5306C6.39031 18.6714 6.19944 18.7504 6.00042 18.7504C5.80139 18.7504 5.61052 18.6714 5.46979 18.5306C5.32906 18.3899 5.25 18.199 5.25 18C5.25 17.801 5.32906 17.6101 5.46979 17.4694L16.1901 6.75H8.25042C8.0515 6.75 7.86074 6.67098 7.72009 6.53033C7.57943 6.38968 7.50042 6.19891 7.50042 6C7.50042 5.80109 7.57943 5.61032 7.72009 5.46967C7.86074 5.32902 8.0515 5.25 8.25042 5.25H18.0004C18.1993 5.25 18.3901 5.32902 18.5307 5.46967C18.6714 5.61032 18.7504 5.80109 18.7504 6Z" fill="#1D3A34" />
                        </svg>
                      </span>
                    </div>

                    <p
                      className="w-full overflow-hidden text-ellipsis text-[16px] font-[400] leading-[24px] text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)] line-clamp-2"
                      style={{ fontFamily: "Inter Tight" }}
                    >
                      {article.excerpt}
                    </p>
                    <div
                      className="mt-auto w-full text-[14px] font-[400] leading-[20px] text-[#9CA8A5]"
                      style={{ fontFamily: "Inter Tight" }}
                    >
                      {article.date}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center justify-center gap-[2px] rounded-[24px] bg-[color:var(--Brand-Deep-Forest-Green,#1D3A34)] px-4 py-3 text-[16px] font-[400] leading-[24px] text-[color:var(--Base-Color-Pure-White,#FFF)] transition hover:opacity-90"
            style={{ fontFamily: "Optima" }}
          >
            More Article
          </button>
        </div>
      </div>
    </section>
  );
}
