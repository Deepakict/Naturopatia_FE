"use client";

import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Product", href: "/category/cleanser" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "w-full border-b border-slate-200/50 bg-slate-50/80 backdrop-blur",
        className,
      )}
    >
      <div className="container flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-900">
            <span className="rounded bg-emerald-900 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
              natu
            </span>
            <span className="text-emerald-900">ropatia</span>
          </div>
          <span className="text-xl text-slate-400">×</span>
          <div className="text-lg font-black uppercase tracking-[0.24em] text-slate-900">
            Anti <span className="text-black">Fake</span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-emerald-900 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "transition hover:text-emerald-700",
                  isActive && "font-semibold text-emerald-800",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-emerald-900/60"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900 text-white shadow-sm transition hover:bg-emerald-800"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
