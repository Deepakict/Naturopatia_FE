"use client";

import { ChevronRight, Menu, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { CartModal } from "./cart-modal";
import { useCart } from "./cart-context";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Shop", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "AI Assistant", href: "/ai-assistant" },
  { label: "Track Order", href: "/track-order" },
];

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { items: cartItems, updateQuantity, removeItem } = useCart();

  const cartTotalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full border-b border-border bg-[#F1F3F3] backdrop-blur",
          className,
        )}
      >
        <div className="container flex items-center justify-between gap-6 py-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-sm transition hover:bg-white lg:hidden"
            aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen((open) => !open)}
          >
            {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logos/logo.svg"
              alt="Naturopatia × Anti Fake"
              width={210}
              height={55}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-4 whitespace-nowrap text-sm font-medium text-brand-forest lg:flex lg:gap-8 lg:text-base">
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
                    "text-base font-normal text-brand-forest transition hover:text-brand-leaf",
                    isActive && "font-semibold text-brand-forest",
                  )}
                  onClick={() => setIsNavOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.label === "Shop" ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-mist bg-white text-brand-ink shadow-sm transition hover:border-brand-forest"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartTotalCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-forest px-1 text-[10px] font-semibold text-white">
                  {cartTotalCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest text-white shadow-sm transition hover:bg-brand-leaf"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isNavOpen ? (
          <div className="block border-t border-border bg-[#F1F3F3]/95 px-4 py-3 backdrop-blur lg:hidden">
            <nav className="flex flex-col gap-3 text-base font-normal text-brand-forest">
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
                      "flex items-center justify-between text-base font-normal text-brand-forest transition hover:text-brand-leaf",
                      isActive && "font-semibold text-brand-forest",
                    )}
                    onClick={() => setIsNavOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.label === "Shop" ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </header>

      <CartModal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push("/checkout");
        }}
      />
    </>
  );
}
