import type { NavigationItem } from "@/app/types/dashboard";

import {
  LayoutDashboard,
  Stethoscope,
  TrendingUp,
  Map,
  FolderKanban,
  UserCheck,
  CheckCircle,
  Radio,
  Bell,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

export const outbreakData = [
  { week: "Week 1", incidence: 20 },
  { week: "Week 2", incidence: 42 },
  { week: "Week 3", incidence: 35 },
  { week: "Week 4", incidence: 68 },
];

export const navigationItems: NavigationItem[] = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "AI Diagnosis", icon: Stethoscope },
  { name: "Risk Forecasting", icon: TrendingUp },
  { name: "Outbreak Map", icon: Map },
  { name: "Cases", icon: FolderKanban },
  { name: "Expert Review", icon: UserCheck },
  { name: "Field Confirmation", icon: CheckCircle },
  { name: "Pest & Sensor Data", icon: Radio },
  { name: "Alerts", icon: Bell, badge: "2" },
  { name: "Analytics", icon: BarChart3 },
  { name: "Reports", icon: FileText },
  { name: "Setting", icon: Settings },
];
