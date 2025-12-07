export function Eyebrow({
  text,
  tone = "dark",
}: {
  text: string;
  tone?: "dark" | "light";
}) {
  const base = "text-xs font-semibold uppercase tracking-[0.3em]";
  return (
    <p className={`${base} ${tone === "light" ? "text-white/80" : "text-slate-500"}`}>{text}</p>
  );
}
