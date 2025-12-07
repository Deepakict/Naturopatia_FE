"use client";

import { useState } from "react";

import { Eyebrow } from "../common/eyebrow";
import type { FAQItem } from "./types";

export function ContactFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="space-y-6">
      <div className="text-center">
        <Eyebrow text="FAQ" />
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Frequently asked questions</h3>
      </div>

      <div className="space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-900"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              >
                <span>{item.question}</span>
                <span className="text-lg">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen ? (
                <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-700">
                  {item.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)] transition hover:border-slate-400">
          More questions <span className="text-lg">↗</span>
        </button>
      </div>
    </section>
  );
}
