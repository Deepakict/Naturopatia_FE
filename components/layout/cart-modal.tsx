import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";

export type CartItem = {
  id: string;
  name: string;
  size?: string;
  price?: string;
  image?: string;
  quantity: number;
};

type CartModalProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
};

export function CartModal({ open, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartModalProps) {
  if (!open) return null;

  const total = items.reduce((acc, item) => {
    const numeric = item.price ? parseFloat(item.price.replace(/[^0-9.]/g, "")) : 0;
    return acc + numeric * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-[260] flex items-start justify-end bg-black/40 pt-6 backdrop-blur-sm">
      <div className="relative m-4 flex w-full max-w-[520px] flex-col gap-6 rounded-[32px] bg-white px-10 pb-10 pt-14 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute -right-4 -top-8 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          aria-label="Close cart"
        >
          <X className="h-4 w-4" />
          CLOSE
        </button>

        <div className="flex flex-1 flex-col items-start gap-6">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">Cart 1</div>

          <div className="flex w-full flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[92px_1fr_auto] items-start gap-4">
                <div className="relative h-24 w-20 overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={item.image ?? "/logos/logo.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                    unoptimized={item.image?.includes("localhost") ?? false}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold leading-6 text-slate-900">{item.name}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition hover:border-brand-forest"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[20px] text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition hover:border-brand-forest"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </span>
                    {item.size ? <span className="text-slate-600">{item.size}</span> : null}
                  </div>
                  <button
                    className="text-xs font-semibold uppercase tracking-wide text-slate-600 underline underline-offset-4 hover:text-rose-600"
                    onClick={() => onRemove?.(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="text-base font-semibold leading-6 text-slate-900">{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-xs text-slate-600">Taxes and shipping calculated at checkout</p>
          <button
            type="button"
            aria-label="Checkout"
            onClick={() => onCheckout?.()}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-brand-forest text-sm font-semibold text-white transition hover:bg-brand-leaf"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
