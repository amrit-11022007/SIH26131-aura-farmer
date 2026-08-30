type ExpertCardProps = {
  name: string;
  location: string;
  position: string;
  timing: string;
  description: string;
};

export function ExpertCard({
  name,
  location,
  position,
  timing,
  description,
}: ExpertCardProps) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-900">{name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span>{location}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{position}</span>
          </div>
        </div>

        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          {timing}
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm leading-6 text-slate-700">
        {description}
      </div>
    </div>
  );
}
