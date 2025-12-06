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
        "w-full rounded-[32px] bg-[#eef2f1] px-6 py-12 sm:px-12 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <p className="max-w-sm text-lg leading-relaxed text-[#2f4a41]">
            A relationship between you and your skin, between nature and science, between
            beauty and responsibility.
          </p>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="More" links={moreLinks} />
          <FooterColumn title="Follow" links={socialLinks} />
        </div>

        <div className="flex justify-center">
          <Button className="h-12 rounded-full bg-[#1f3b34] px-8 text-sm font-semibold text-white hover:bg-[#183128]">
            Back to Top
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>©2025 Naturopatia. all right reserved.</span>
          <a href="#" className="hover:text-[#2f4a41]">
            Term &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200/80 pb-3 text-sm font-semibold text-slate-500">
        {title}
      </div>
      <ul className="space-y-3 text-sm text-[#2f4a41]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex items-center gap-1 transition hover:text-[#183128]"
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
