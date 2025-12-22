import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CaptionRegular,
  CaptionRegularSemiBold,
} from "../shared/typography";

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
        "w-full bg-brand-ink text-white shadow-lg shadow-black/20",
        className,
      )}
    >
      <div className="container flex h-[74.271px] max-w-[1440px] items-center justify-center gap-[10px] px-[21px] py-[26px]">
        <button
          type="button"
          aria-label="Previous offer"
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex flex-1 flex-wrap items-center justify-center gap-[10px] text-center">
          <CaptionRegularSemiBold className="font-sans text-[16px] font-semibold leading-[140%] text-white">
            {message}
          </CaptionRegularSemiBold>
          <CaptionRegular className="font-sans text-[16px] font-normal leading-[140%] text-white underline hover:text-slate-200">
            {linkLabel}
          </CaptionRegular>
        </div>

        <button
          type="button"
          aria-label="Next offer"
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
