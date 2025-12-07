import { Eyebrow } from "../common/eyebrow";
import type { AboutIntro } from "./types";

export function AboutIntro({ eyebrow, title, body }: AboutIntro) {
  return (
    <section className="text-center">
      {eyebrow ? <Eyebrow text={eyebrow} /> : null}
      <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-slate-700 sm:text-xl">{body}</p>
    </section>
  );
}
