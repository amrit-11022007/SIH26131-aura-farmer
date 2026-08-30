import type { MetricCardData } from "@/app/types/dashboard";

const toneClasses: Record<MetricCardData["tone"], string> = {
  emerald: "text-emerald-600",
  amber: "text-amber-700",
  red: "text-red-700",
  gray: "text-gray-500",
};

export function MetricCard({ label, value, hint, tone }: MetricCardData) {
  return (
    <div className="rounded-2xl border border-[#ECE8DC] bg-white p-4 shadow-sm md:p-5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 md:text-xs">
        {label}
      </span>
      <div className="mt-2 md:mt-3">
        <span className="text-xl font-bold text-gray-900 md:text-2xl">
          {value}
        </span>
      </div>
      <p
        className={`mt-1 text-[10px] font-medium md:text-xs ${toneClasses[tone]}`}
      >
        {hint}
      </p>
    </div>
  );
}
