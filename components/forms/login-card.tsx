"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type LoginCardProps = {
  className?: string;
};

export function LoginCard({ className }: LoginCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-[28px] bg-white/95 p-8 shadow-2xl ring-1 ring-black/5 backdrop-blur",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between text-sm font-semibold text-emerald-950">
        <span className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Login
        </span>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:text-emerald-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <h2 className="text-xl font-semibold tracking-[0.14em] text-emerald-950">
        LOGIN
      </h2>

      <div className="mt-6 flex items-center gap-8 text-sm font-medium text-slate-500">
        <button
          type="button"
          className="relative pb-3 text-emerald-900"
          aria-current="page"
        >
          Sign in
          <span className="absolute inset-x-0 -bottom-[2px] h-[2px] rounded-full bg-emerald-900" />
        </button>
        <button type="button" className="pb-3">
          I&apos;m new here
        </button>
      </div>

      <form className="mt-6 space-y-7">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            Email Address*
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border-b border-slate-200 pb-3 text-sm text-emerald-950 placeholder:text-slate-400 focus:border-emerald-900 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            Password*
          </label>
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full text-sm text-emerald-950 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-slate-500 transition hover:text-emerald-900"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button className="h-12 w-full rounded-full bg-[#1f3b34] text-base font-semibold tracking-wide text-white hover:bg-[#1b332c]">
          LOGIN
        </Button>
      </form>

      <div className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.08em] text-[#1f3b34]">
        <button type="button" className="underline underline-offset-4">
          Forgot password
        </button>
      </div>
    </div>
  );
}
