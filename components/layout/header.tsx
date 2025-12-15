"use client";

import { ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { CartModal } from "./cart-modal";
import { useCart } from "./cart-context";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Product", href: "/our-product" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "AI Assistant", href: "/ai-assistant" },
];

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items: cartItems, updateQuantity, removeItem } = useCart();

  const cartTotalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  return (
    <>
      <header
        className={cn(
          "w-full border-b border-border bg-brand-cream/80 backdrop-blur",
          className,
        )}
      >
        <div className="container flex items-center justify-between gap-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logos/logo.svg"
              alt="Naturopatia × Anti Fake"
              width={210}
              height={55}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-brand-forest lg:flex">
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
                >
                  {item.label}
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
      </header>

      <CartModal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </>
  );
}
