import { Mail } from "lucide-react";

import { HeroBanner } from "../common/hero-banner";
import { Eyebrow } from "../common/eyebrow";
import type { ContactHero } from "./types";

export function ContactFormSection({ hero }: { hero: ContactHero }) {
  const firstLabel = hero.inputFirstNameLabel ?? "First name";
  const lastLabel = hero.inputLastNameLabel ?? "Last name";
  const emailLabel = hero.inputEmailLabel ?? "Email address";
  const messageLabel = hero.inputMessageLabel ?? "Message";
  const buttonLabel = hero.buttonLabel ?? "Send message";
  const sectionHeading = hero.sectionHeading ?? "Have a question about our products?";

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[22px] border border-slate-100 bg-white p-8 shadow-sm">
        {hero.eyebrow ? <Eyebrow text={hero.eyebrow} /> : null}
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          {sectionHeading}
        </h2>
        {hero.subtitle ? (
          <p className="mt-2 text-base text-slate-700">{hero.subtitle}</p>
        ) : null}

        <form className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-800">
              {firstLabel}
              <input
                className="mt-1 w-full border-b border-slate-200 pb-2 text-sm text-slate-900 outline-none focus:border-emerald-600"
                type="text"
                name="firstName"
              />
            </label>
            <label className="block text-sm font-medium text-slate-800">
              {lastLabel}
              <input
                className="mt-1 w-full border-b border-slate-200 pb-2 text-sm text-slate-900 outline-none focus:border-emerald-600"
                type="text"
                name="lastName"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-800">
            {emailLabel}
            <input
              className="mt-1 w-full border-b border-slate-200 pb-2 text-sm text-slate-900 outline-none focus:border-emerald-600"
              type="email"
              name="email"
            />
          </label>

          <label className="block text-sm font-medium text-slate-800">
            {messageLabel}
            <textarea
              className="mt-1 w-full border-b border-slate-200 pb-2 text-sm text-slate-900 outline-none focus:border-emerald-600"
              name="message"
              rows={3}
            />
          </label>

          <button
            className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-800"
            type="button"
          >
            <Mail className="h-4 w-4" />
            {buttonLabel}
          </button>
        </form>
      </div>

      <HeroBanner
        title=""
        eyebrow={hero.eyebrow}
        image={hero.image}
        minHeightClass="min-h-[380px]"
        paddingClass="p-0"
      />
    </section>
  );
}
