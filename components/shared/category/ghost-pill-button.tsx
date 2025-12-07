export function GhostPillButton({ label }: { label: string }) {
  return (
    <button className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)] transition hover:border-slate-400 hover:shadow-[0_14px_36px_-18px_rgba(0,0,0,0.36)]">
      {label}
      <span className="text-lg">↗</span>
    </button>
  );
}
