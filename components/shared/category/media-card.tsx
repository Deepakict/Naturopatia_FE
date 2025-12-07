export function MediaCard({ image }: { image: string }) {
  return (
    <div className="overflow-hidden rounded-[22px] bg-slate-100">
      <div className="aspect-[4/5] w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
    </div>
  );
}
