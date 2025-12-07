import { Eyebrow } from "../common/eyebrow";
import type { TeamMember } from "./types";

export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <section className="space-y-4">
      <Eyebrow text="Our team" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="overflow-hidden rounded-[18px] border border-slate-100 bg-white shadow-sm"
          >
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${member.image})` }}
            />
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-900">{member.name}</p>
              <p className="text-xs text-slate-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
