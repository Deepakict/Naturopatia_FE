"use client";

import { ChevronRight, Menu, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { CartModal } from "./cart-modal";
import { useCart } from "./cart-context";
import type { Product } from "@/lib/sections-content";
import { fetchOurProduct } from "@/lib/api/our-product";
import { buildMediaUrl, toArray } from "@/lib/utils/content";
import type { MediaInput } from "@/lib/types/content";

type NavItem = { label: string; href: string };

type HeaderProduct = {
  title?: string;
  gallery?: MediaInput[] | MediaInput;
  rating?: number | string;
  defaultPrice?: number;
  sizeType?: { size?: string | number; price?: number }[];
  size?: string | number;
  compareAtPrice?: number;
  badge?: string;
  inStock?: boolean;
  limitedEdition?: boolean;
  slug?: string;
  documentId?: string;
  reviewsCount?: number;
  reviews?: number;
};

type OurProductData = { attributes?: { products?: HeaderProduct[] } };

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

const badgeToneClasses = (tone?: string) => {
  switch (tone) {
    case "success":
      return "bg-emerald-600";
    case "warning":
      return "bg-amber-500";
    case "danger":
      return "bg-red-500";
    default:
      return "bg-brand-forest";
  }
};

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [shopProducts, setShopProducts] = useState<Product[] | null>(null);
  const [isLoadingShop, setIsLoadingShop] = useState(false);
  const { items: cartItems, updateQuantity, removeItem } = useCart();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartTotalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const loadShopProducts = async () => {
    console.log("Loading shop products...");
    if (shopProducts || isLoadingShop) return;
    try {
      setIsLoadingShop(true);
      const response = await fetchOurProduct();
      const data = (response?.data ?? {}) as OurProductData["attributes"] & OurProductData;
      const attributes = data?.attributes ?? data;
      const products = attributes?.products;
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
      const formatted: Product[] | null = products
        ?.map((product) => {
          const img = toArray(product?.gallery)?.[0];
          const image = buildMediaUrl(baseUrl, img);
          const ratingValue =
            typeof product?.rating === "number"
              ? product.rating
              : Number(product?.rating ?? 0) || 0;
          const priceValue =
            typeof product?.defaultPrice === "number"
              ? product.defaultPrice
              : product?.sizeType?.[0]?.price ?? undefined;
          const sizeRaw = product?.sizeType?.[0]?.size ?? product?.size ?? "";
          const sizeLabel = sizeRaw
            ? `${sizeRaw}${Number.isFinite(Number(sizeRaw)) ? " ml" : ""}`
            : undefined;

          return {
            name: product?.title ?? "Product",
            image,
            price: typeof priceValue === "number" ? `₹${priceValue}` : undefined,
            originalPrice:
              typeof product?.compareAtPrice === "number"
                ? `₹${product.compareAtPrice}`
                : undefined,
            rating: ratingValue || 5,
            reviews: product?.reviewsCount ?? product?.reviews ?? 0,
            sizeLabel,
            badgeLabel: product?.badge ?? (product?.inStock ? "In Stock" : undefined),
            badgeTone: product?.inStock ? "success" : "accent",
            limitedLabel: product?.limitedEdition ? "Limited Edition" : undefined,
            slug: product?.slug ?? product?.documentId,
            documentId: product?.documentId,
          } satisfies Product;
        })
        ?.filter(Boolean) ?? null;

      setShopProducts(formatted ?? []);
    } catch (error) {
      console.error("Failed to load products", error);
      setShopProducts([]);
    } finally {
      setIsLoadingShop(false);
    }
  };

  const openShop = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsShopOpen(true);
    void loadShopProducts();
  };

  const closeShop = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => setIsShopOpen(false), 250);
  };
  return (
    <>
      <header
        className={cn(
          "sticky inset-x-0 top-0 w-full border-b border-border bg-[#F1F3F3] backdrop-blur",
          className,
        )}
        style={{ zIndex: 220 }}
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

          <div className="relative hidden items-center gap-4 whitespace-nowrap text-sm font-medium text-brand-forest lg:flex lg:gap-8 lg:text-base">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const isShop = item.label === "Shop";
                return (
                  <div
                    key={item.label}
                    className="relative flex items-center"
                    onMouseEnter={() => isShop && openShop()}
                    onMouseLeave={() => isShop && closeShop()}
                    onFocus={() => isShop && openShop()}
                    onBlur={() => isShop && closeShop()}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-base font-normal text-brand-forest transition hover:text-brand-leaf",
                        isActive && "font-semibold text-brand-forest",
                      )}
                      onClick={() => {
                        setIsNavOpen(false);
                        setIsShopOpen(false);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {isShop ? <ChevronRight className="h-4 w-4" /> : null}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

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
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest text-white shadow-sm transition hover:brightness-110 lg:hidden"
              aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen((open) => !open)}
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isNavOpen ? (
          <div
            className="fixed inset-0 z-[240] flex items-start justify-center bg-[#0b1613]/10 backdrop-blur-sm lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative m-3 flex w-full flex-col items-start gap-8 rounded-[24px] bg-white p-6 shadow-lg">
              <button
                type="button"
                className="absolute -top-8 -right-2 z-[245] flex items-center gap-2 rounded-full border border-brand-mist bg-white px-4 py-2 text-sm font-medium text-brand-forest shadow-sm"
                onClick={() => setIsNavOpen(false)}
              >
                <X className="h-4 w-4" />
                CLOSE
              </button>
              <nav className="flex flex-1 flex-col items-start gap-8 text-brand-forest">
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
                        "w-full text-justify text-[32px] font-normal leading-[38.4px] text-[#102D26]",
                        isActive && "font-semibold",
                      )}
                      onClick={() => setIsNavOpen(false)}
                      style={{ fontFamily: "Optima" }}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.label === "Shop" ? <ChevronRight className="h-5 w-5" /> : null}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "pointer-events-none fixed left-0 right-0 top-[72px] flex justify-center opacity-0 transition-opacity duration-150 ease-out",
            isShopOpen ? "pointer-events-auto opacity-100" : "opacity-0",
          )}
          style={{ zIndex: 230 }}
          onMouseEnter={openShop}
          onMouseLeave={closeShop}
          aria-hidden={!isShopOpen}
        >
          <div className="w-full px-0 py-0">
            <div className="flex w-full  flex-col items-center gap-10 bg-[#F1F3F3] px-12 py-6">
              <div className="flex w-full flex-row flex-wrap items-center gap-4">
                <h4
                  className="text-center text-[40px] font-[400] leading-[56px] text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)]"
                  style={{ fontFamily: "Optima" }}
                >
                  Our Product
                </h4>
                <Link
                  href="/our-product"
                  className="flex items-center gap-2 rounded-[32px] bg-white px-3 py-[10px] text-sm font-normal text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)] transition hover:bg-brand-forest hover:text-white"
                  style={{ fontFamily: "Inter Tight", lineHeight: "20px" }}
                  onClick={() => setIsShopOpen(false)}
                >
                  View Product Page
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <g opacity="0.4">
                      <path d="M5.625 3.375V4.5H12.7069L3.375 13.8319L4.16812 14.625L13.5 5.29312V12.375H14.625V3.375H5.625Z" fill="#1D3A34" />
                    </g>
                  </svg>
                </Link>
              </div>
              {shopProducts && shopProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {shopProducts.map((product) => {
                    const price = product.price ?? "";
                    const originalPrice = product.originalPrice;
                    const size = product.sizeLabel;
                    const badge = product.badgeLabel;
                    const limited = product.limitedLabel;
                    const numericPrice = price
                      ? Number((price as string).replace(/[^0-9.]/g, ""))
                      : undefined;
                    const currencySymbol = price?.trim()?.[0];
                    const computedOriginal =
                      originalPrice ??
                      (numericPrice !== undefined && !Number.isNaN(numericPrice)
                        ? `${currencySymbol ?? ""}${(numericPrice * 1.1).toFixed(0)}`
                        : undefined);
                    const href =
                      product.slug || product.documentId
                        ? `/our-product/${product.slug ?? product.documentId}`
                        : undefined;
                    const key = product.slug ?? product.documentId ?? product.name;

                    const Card = (
                      <article className="group relative flex h-full flex-col gap-4 rounded-[28px]  p-4 transition hover:-translate-y-1">
                        <div className="relative w-full overflow-hidden rounded-[24px]">
                          <div
                            className="h-[300px] w-full max-w-full rounded-[24px] bg-cover bg-center sm:h-[320px] lg:h-[355.2px] aspect-[296/355.2]"
                            style={{
                              backgroundImage: `url(${product.image}), url(${product.image})`,
                              backgroundPosition: "50% 50%, 0 0",
                              backgroundSize: "cover, 100% 100%",
                              backgroundRepeat: "no-repeat, no-repeat",
                              backgroundColor: "lightgray",
                            }}
                          />
                          {badge ? (
                            product.badgeTone === "success" ? (
                              <div
                                className="absolute -right-14 top-6 w-40 rotate-45 bg-[#E5210E] px-6 py-2 text-center text-[20px] font-[400] leading-[28px] text-white"
                                style={{ fontFamily: "Optima" }}
                              >
                                {badge}
                              </div>
                            ) : (
                              <div
                                className={cn(
                                  "absolute right-3 top-3 rounded-md px-3 py-2 text-xs font-semibold uppercase text-white shadow",
                                  badgeToneClasses(product.badgeTone),
                                )}
                              >
                                {badge}
                              </div>
                            )
                          ) : null}
                          {limited ? (
                            <div
                              className="absolute bottom-5 left-1/2 h-[58px] w-[394px] -translate-x-1/2 rounded-b-[22px] px-4 py-3 text-center text-[24px] font-[400] leading-[33.6px] text-white"
                              style={{
                                fontFamily: "Optima",
                                backgroundColor: "#1e5b4e",
                                backgroundImage:
                                  "linear-gradient(120deg, rgba(255,255,255,0.08) 18%, transparent 18%), linear-gradient(240deg, rgba(255,255,255,0.08) 18%, transparent 18%)",
                                backgroundSize: "32px 32px",
                              }}
                            >
                              {limited}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-1 flex-col gap-2 px-1">
                          <p
                            className="self-stretch text-[20px] font-medium leading-[28px] text-[color:var(--Brand-Deep-Forest-Green,#1D3A34)] opacity-80"
                            style={{ fontFamily: "Inter Tight" }}
                          >
                            {product.name}
                          </p>
                          <p
                            className="self-stretch text-[16px] font-medium leading-[24px] text-[color:var(--Secondary-Myrtle,#1C391A)] opacity-80"
                            style={{ fontFamily: "Inter Tight" }}
                          >
                            {size || "Size not specified"}
                          </p>
                          <div className="flex flex-col items-start gap-2">
                            {computedOriginal ? (
                              <span
                                className="text-[14px] font-normal leading-[20px] text-[color:var(--System-Red,#FF3B30)] line-through sm:text-[16px] sm:leading-[24px]"
                                style={{ fontFamily: "Inter Tight" }}
                              >
                                {computedOriginal}
                              </span>
                            ) : null}
                            <span
                              className="text-[20px] font-medium leading-[28px] text-[color:var(--Secondary-Myrtle,#1C391A)] opacity-80"
                              style={{ fontFamily: "Inter Tight" }}
                            >
                              {price}
                            </span>
                          </div>
                        </div>
                      </article>
                    );

                    if (href) {
                      return (
                        <Link key={product.slug ?? product.documentId ?? product.name} href={href} className="block">
                          {Card}
                        </Link>
                      );
                    }

                    return (
                      <div key={product.slug ?? product.documentId ?? product.name}>
                        {Card}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
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
