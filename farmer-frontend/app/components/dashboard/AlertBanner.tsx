import { CloudLightning, X } from "lucide-react";

interface AlertBannerProps {
  onDismiss: () => void;
}

export function AlertBanner({ onDismiss }: AlertBannerProps) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-[#FFD0C4] bg-[#FFEBE5] p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D99B00] text-white">
          <CloudLightning className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Heavy rain & high risk weather alert
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-gray-600">
            Waterlogging warning for lower elevation plots in Nashik. Adjust
            automated irrigation cycles accordingly.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="hidden text-xs font-semibold text-gray-500 hover:text-gray-800 sm:block"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
