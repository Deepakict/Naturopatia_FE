import { Eyebrow } from "../common/eyebrow";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function CategoryIntro({ eyebrow, title, description }: Props) {
  return (
    <section className="text-center">
      {eyebrow ? <Eyebrow text={eyebrow} /> : null}
      <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-slate-700 sm:text-xl">{description}</p>
    </section>
  );
}
