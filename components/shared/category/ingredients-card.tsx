import { Eyebrow } from "../common/eyebrow";
import { GhostPillButton } from "./ghost-pill-button";
import { KeyValue } from "./key-value";
import type { Ingredients } from "./types";

export function IngredientsCard({
  eyebrow,
  ingredients,
}: {
  eyebrow?: string;
  ingredients: Ingredients;
}) {
  return (
    <article className="flex flex-col gap-6 rounded-[22px] border border-slate-100 bg-white p-8 shadow-sm">
      <Eyebrow text={eyebrow ?? "Cleanser"} />

      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-slate-900">{ingredients.title}</h3>
        <p className="text-base leading-relaxed text-slate-700">{ingredients.body}</p>
      </div>

      <div className="space-y-4 text-sm text-slate-700">
        <KeyValue label="Texture" value={ingredients.texture} />
        <KeyValue label="Ideal for" value={ingredients.idealFor} />
        <KeyValue label="Key benefits" value={ingredients.keyBenefits} />
      </div>

      <GhostPillButton label={ingredients.ctaLabel} />
    </article>
  );
}
