import type { ComponentType } from "react";

import Overview from "@/app/components/dashboard/Overview";
import CaseManagement from "@/app/components/dashboard/Case";
import OutbreakMap from "@/app/components/dashboard/map";
import ReportsAndHistory from "@/app/components/dashboard/Report";
import SettingsPage from "@/app/components/dashboard/Setting";
import Scanner from "@/app/components/dashboard/Scanner";

const dashboardComponents: Record<string, ComponentType> = {
  Overview,
  "AI Diagnosis": Scanner,
  "Risk Forecasting": Overview,
  "Outbreak Map": OutbreakMap,
  Cases: CaseManagement,
  "Expert Review": Overview,
  "Field Confirmation": Overview,
  "Pest & Sensor Data": Overview,
  Analytics: Overview,
  Reports: ReportsAndHistory,
  Setting: SettingsPage,
};

export function DashboardContent({
  activeTab = "Overview",
}: {
  activeTab?: string;
}) {
  const SelectedComponent = dashboardComponents[activeTab] ?? Overview;
  return <SelectedComponent />;
}

export default function DashboardPage() {
  return <DashboardContent activeTab="Overview" />;
}
