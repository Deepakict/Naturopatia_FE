import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";

export type CartItem = {
  id: string;
  name: string;
  size?: string;
  price: string;
  image: string;
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
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 backdrop-blur-sm">
      <div className="relative m-4 w-full max-w-[460px] rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          aria-label="Close cart"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            Cart 1
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[92px_1fr_auto] items-center gap-4">
                <div className="relative h-24 w-20 overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                    unoptimized={item.image.includes("localhost")}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 transition hover:border-brand-forest"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 transition hover:border-brand-forest"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </span>
                    {item.size ? <span className="text-slate-500">{item.size}</span> : null}
                  </div>
                  <button
                    className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-rose-600"
                    onClick={() => onRemove?.(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Taxes and shipping calculated at checkout</p>
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
