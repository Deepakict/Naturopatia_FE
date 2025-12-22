import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const shopLinks: FooterLink[] = [
  { label: "Cleanser", href: "#" },
  { label: "Toner", href: "#" },
  { label: "Serum", href: "#" },
  { label: "Moisturizer", href: "#" },
];

const moreLinks: FooterLink[] = [
  { label: "About", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Shipping", href: "#" },
];

const socialLinks: FooterLink[] = [
  { label: "Instagram", href: "#", external: true },
  { label: "TikTok", href: "#", external: true },
  { label: "Youtube", href: "#", external: true },
];

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex w-full flex-col items-start gap-10 self-stretch bg-[#F1F3F3] px-[40px] pb-[32px] pt-[40px]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 md:gap-12">
        <div className="flex flex-col gap-8 self-stretch md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="flex w-full max-w-[422px] items-start justify-between self-stretch text-[20px] font-normal leading-[28px] text-[#3F5650] md:w-[422px]">
            A relationship between you and your skin, between nature and science, between
            beauty and responsibility.
          </p>

          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-[160px]">
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="More" links={moreLinks} />
            <FooterColumn title="Follow" links={socialLinks} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 self-stretch px-6 pb-6 pt-6 md:px-10 md:pb-8 md:pt-10">
          <Button className="inline-flex items-center justify-center gap-[2px] rounded-full bg-brand-forest px-4 py-3 font-[550] text-[16px] leading-[24px] text-white hover:bg-brand-leaf" style={{ fontFamily: "Optima", padding: "12px 16px" }}>
            Back to Top
          </Button>
        </div>

        <div className="flex flex-col items-start gap-2 text-left text-[14px] font-normal leading-[20px] text-[#859390] md:flex-row md:items-center md:justify-between md:text-center">
          <span>©2025 Naturopatia. all right reserved.</span>
          <a href="#" className="hover:text-brand-forest">
            Term &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col items-start gap-4 pr-16 pt-4">
      <div className="border-b border-slate-200/80 pb-3 text-sm font-semibold text-slate-500">
        {title}
      </div>
      <ul className="flex flex-col gap-4 text-left text-[16px] font-normal leading-[24px] text-[#1D3A34]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex items-center gap-1 transition hover:text-brand-leaf"
            >
              <span>{link.label}</span>
              {link.external ? (
                <ArrowUpRight className="h-3 w-3 text-slate-400" />
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
