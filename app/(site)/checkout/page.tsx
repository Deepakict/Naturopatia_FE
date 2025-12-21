'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/components/layout/cart-context';

export default function CheckoutPage() {
  const { items } = useCart();

  const subtotal = items.reduce((acc, item) => {
    const numeric = item.price ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : 0;
    return acc + numeric * item.quantity;
  }, 0);

  const shippingFee = items.length > 0 ? 200 : 0; // example
  const discount = 0; // placeholder
  const taxes = subtotal * 0.05; // 5% sample
  const total = subtotal - discount + taxes + shippingFee;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <section className="mb-6">
                <h2 className="text-lg font-medium">Contact</h2>
                <p className="text-sm text-slate-500 mt-1">Email address</p>
                <input className="mt-3 w-full rounded-md border p-3" placeholder="Email address" />

                <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" />
                  <span>Email me with news and offers</span>
                </label>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium">Delivery</h2>
                <select className="mt-3 w-full rounded-md border p-3">
                  <option>Select country/region</option>
                </select>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <input className="rounded-md border p-3" placeholder="First name" />
                  <input className="rounded-md border p-3" placeholder="Last name" />
                </div>

                <div className="mt-4">
                  <input className="w-full rounded-md border p-3" placeholder="Address" />
                </div>

                <div className="mt-4">
                  <input className="w-full rounded-md border p-3" placeholder="Apartment, suite, etc. (optional)" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <input className="rounded-md border p-3 col-span-2" placeholder="City" />
                  <input className="rounded-md border p-3" placeholder="ZIP Code" />
                </div>

                <div className="mt-4">
                  <input className="w-full rounded-md border p-3" placeholder="Phone (optional)" />
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium">Delivery</h3>
                  <div className="mt-3 space-y-3">
                    <label className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="text-sm font-medium">Free Shipping</div>
                        <div className="text-xs text-slate-500">For orders over $1500</div>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">FREE</div>
                    </label>

                    <label className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="text-sm font-medium">Standard</div>
                        <div className="text-xs text-slate-500">3 to 4 business day</div>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">₹200</div>
                    </label>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium">Payment Method</h2>
                <div className="mt-4 space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="pay" defaultChecked />
                    <span>Credit Card</span>
                  </label>

                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <input className="rounded-md border p-3" placeholder="Cardholder Name" />
                    <input className="rounded-md border p-3" placeholder="Card Number" />
                    <div className="grid grid-cols-3 gap-3">
                      <input className="rounded-md border p-3" placeholder="Expiration Date" />
                      <input className="rounded-md border p-3" placeholder="CVV" />
                      <div />
                    </div>
                  </div>

                  <label className="flex items-center gap-3">
                    <input type="radio" name="pay" />
                    <span>PayPal</span>
                  </label>
                </div>

                <div className="mt-6">
                  <button className="w-full rounded-full bg-rose-50 py-3 text-sm font-semibold text-rose-200 cursor-not-allowed">PAY NOW</button>
                </div>

                <p className="mt-3 text-xs text-slate-500">Your info will be saved to a Shop account. By continuing, you agree to Shop’s Terms of Service and acknowledge the Privacy Policy.</p>
              </section>
            </div>
          </div>

          {/* Right: summary */}
          <aside>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium">Order summary</h2>

              <div className="mt-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-md bg-slate-100 overflow-hidden relative">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" unoptimized={item.image.includes('localhost')} />
                        ) : null}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.quantity} × {item.price}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">${((parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0')) * item.quantity).toFixed(2)}</div>
                  </div>
                ))}

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <input className="flex-1 rounded-md border p-2" placeholder="Enter discount code" />
                    <button className="p-2 text-slate-500">→</button>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4 text-sm text-slate-700 space-y-2">
                  <div className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between text-emerald-600"><span>Discount</span><span>-₹{discount.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between"><span>Taxes (5%)</span><span>₹{taxes.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between"><span>Shipping</span><span>Standard (3 to 4 business day)</span></div>
                  <div className="flex items-center justify-between"><span>Shipping Fee</span><span>₹{shippingFee.toFixed(2)}</span></div>

                  <div className="mt-4 flex items-center justify-between text-lg font-semibold text-slate-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-slate-500">AUTHORIZED RETAILERS</div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="h-6 w-16 bg-slate-100" />
                  <div className="h-6 w-16 bg-slate-100" />
                  <div className="h-6 w-16 bg-slate-100" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
