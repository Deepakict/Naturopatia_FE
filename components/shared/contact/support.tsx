import { Mail, MapPin, Phone } from "lucide-react";

import { Eyebrow } from "../common/eyebrow";
import type { SupportChannel } from "./types";

const ICONS = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
};

export function ContactSupport({ support }: { support: SupportChannel[] }) {
  return (
    <section className="space-y-4">
      <Eyebrow text="Customer support" />
      <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
        {support.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.label}
              className="flex h-full flex-col gap-2 rounded-[16px] border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 text-emerald-800">
                <Icon className="h-5 w-5" />
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              </div>
              <p className="text-sm font-semibold text-slate-800">{item.value}</p>
              {item.description ? (
                <p className="text-xs text-slate-600">{item.description}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
