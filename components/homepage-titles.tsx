"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { HomePageAttributes, homepageQueryOptions } from "@/lib/api/homepage";

type SectionKey = keyof HomePageAttributes;

const SECTION_LABELS: Array<{ key: SectionKey; label: string }> = [
  { key: "HeroSection", label: "Hero Section" },
  { key: "PhilosophySection", label: "Philosophy Section" },
  { key: "OurProductsSection", label: "Our Products" },
  { key: "ProductSection", label: "Product Section" },
  { key: "ChooseUsSection", label: "Choose Us" },
  { key: "NewsletterSection", label: "Newsletter" },
  { key: "CommunitySection", label: "Community" },
  { key: "TestimonialSection", label: "Testimonials" },
];

type SectionWithTitle = { title?: string | null; subtitle?: string | null } | null | undefined;

function resolveTitle(section: SectionWithTitle) {
  return section?.title ?? section?.subtitle ?? null;
}

export function HomepageTitles() {
  const { data, isLoading, error } = useQuery(homepageQueryOptions());

  useEffect(() => {
    if (data) {
      // Debug log to confirm client received the payload
      // eslint-disable-next-line no-console
      console.log("[HomepageTitles] data received", data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Loading homepage content…</p>
      </section>
    );
  }

  if (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <section className="rounded-2xl border border-rose-100 bg-rose-50/60 p-6 text-rose-800 shadow-sm">
        <p className="text-sm font-semibold">Could not load homepage titles.</p>
        <p className="mt-1 text-sm text-rose-700">{message}</p>
      </section>
    );
  }

  const attributes = data?.data?.attributes;

  const titles = SECTION_LABELS.map(({ key, label }) => ({
    label,
    value: resolveTitle(attributes?.[key]),
  })).filter((entry) => entry.value);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            CMS Preview
          </p>
          <h2 className="text-xl font-semibold text-slate-900">Homepage titles from Strapi</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          React Query cached
        </span>
      </div>

      {titles.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {titles.map((title) => (
            <div
              key={title.label}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-slate-800"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {title.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{title.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600">No titles found in the Strapi response.</p>
      )}
    </section>
  );
}
