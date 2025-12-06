import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaSubscribeSectionProps = {
  className?: string;
};

export function CtaSubscribeSection({ className }: CtaSubscribeSectionProps) {
  return (
    <section className={cn("w-full rounded-[32px] bg-[#eef2f1] px-6 py-12 sm:px-12 lg:px-16", className)}>
      <div className="relative mx-auto flex max-w-[1400px] overflow-hidden rounded-[28px] bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center text-white sm:py-20 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Get Started
          </p>
          <h3 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Join the Anti Fake Community
          </h3>
          <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Sign up for exclusive offers, skincare tips, and new product launches directly
            in your inbox.
          </p>

          <form className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter email..."
              className="h-12 w-full max-w-md rounded-full border-none bg-white/95 px-5 text-sm text-slate-800 shadow-md outline-none ring-2 ring-transparent transition focus:ring-white sm:flex-1"
            />
            <Button className="h-12 w-full rounded-full bg-[#1f3b34] px-6 text-sm font-semibold text-white shadow-lg hover:bg-[#183128] sm:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
