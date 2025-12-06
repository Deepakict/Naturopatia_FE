import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type CouponBarProps = {
  className?: string;
  message?: string;
  linkLabel?: string;
};

export function CouponBar({
  className,
  message = "GET 40% FOR FIRST TIME DELIVERY.",
  linkLabel = "See Details",
}: CouponBarProps) {
  return (
    <div
      className={cn(
        "w-full bg-[#0f0f0f] text-white shadow-lg shadow-black/20",
        className,
      )}
    >
      <div className="container flex items-center justify-between gap-6 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em]">
        <button
          type="button"
          aria-label="Previous offer"
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[13px] font-semibold">
          <span>{message}</span>
          <a
            href="#"
            className="text-xs font-semibold normal-case underline underline-offset-4 hover:text-slate-200"
          >
            {linkLabel}
          </a>
        </div>

        <button
          type="button"
          aria-label="Next offer"
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
