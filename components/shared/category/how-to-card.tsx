import { Eyebrow } from "../common/eyebrow";
import { GhostPillButton } from "./ghost-pill-button";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function HowToCard({ eyebrow, title, description }: Props) {
  return (
    <article className="flex flex-col gap-6 rounded-[22px] border border-slate-100 bg-white p-8 shadow-sm">
      <Eyebrow text={eyebrow ?? "Cleanser"} />
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="text-base leading-relaxed text-slate-700">{description}</p>
      <GhostPillButton label="Discover the refresh" />
    </article>
  );
}
