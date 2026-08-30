import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  name: string;
  icon: LucideIcon;
  badge?: string;
}

export interface MetricCardData {
  label: string;
  value: string;
  hint: string;
  tone: "emerald" | "amber" | "red" | "gray";
}

export interface OutbreakDataPoint {
  week: string;
  incidence: number;
}
