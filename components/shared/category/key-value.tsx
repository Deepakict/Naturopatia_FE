export function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold text-slate-900">{label}:</p>
      <p>{value}</p>
    </div>
  );
}
