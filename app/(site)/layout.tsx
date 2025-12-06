import { CouponBar } from "@/components/layout/coupon-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-foreground">
      <CouponBar className="relative z-10" />
      <Header className="relative z-10" />

      <main className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-12 px-4 pb-16 pt-8 sm:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
