"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/agri/Navbar";
import { Sidebar } from "@/components/agri/Sidebar";
import { WeatherCard } from "@/components/agri/WeatherCard";
import { RiskBadge } from "@/components/agri/RiskBadge";
import { DEMO_FIELDS, DEMO_ALERTS } from "@/lib/demo-data";
import { fetchLiveWeather } from "@/lib/weather";
import { WeatherData } from "@/types";
import { MobileBottomNav } from "@/components/agri/MobileBottomNav";
import { 
  Scan, 
  Bug, 
  Sprout, 
  AlertTriangle, 
  ShieldCheck, 
  Bell,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export default function FarmerDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const [liveWeather, setLiveWeather] = useState<WeatherData | null>(null);
  const [alerts, setAlerts] = useState(DEMO_ALERTS);

  useEffect(() => {
    async function loadOpenMeteoWeather() {
      const data = await fetchLiveWeather();
      setLiveWeather(data);
    }
    loadOpenMeteoWeather();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7] pb-20 md:pb-0">
      <Navbar currentRole="Farmer: Ramesh Patel" onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex">
        <Sidebar role="FARMER" isCollapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* Top Greeting Header (Section 17) */}
          <div className="bg-gradient-to-r from-[#166534] via-emerald-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                {t("good_evening_label")}, Ramesh 👋
              </h1>
              <p className="text-emerald-100 text-sm mt-1">
                {t("farm_health_summary")}: <span className="font-bold text-white">{t("field_healthy_single")}</span> • <span className="font-bold text-amber-300">{t("field_needs_single")}</span>
              </p>
            </div>

            {/* Primary & Secondary CTAs with Fixed Premium Color UI */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
              <Link href="/farmer/diagnose">
                <Button className="bg-[#22C55E] hover:bg-emerald-400 text-gray-950 font-extrabold px-6 py-6 rounded-2xl text-sm shadow-lg flex items-center gap-2 transition-all transform hover:scale-[1.02]">
                  <Scan className="w-5 h-5 text-gray-950" />
                  {t("check_crop_health")}
                </Button>
              </Link>

              {/* Fixed Color UI: High contrast amber-gold button with dark text & crisp borders */}
              <Link href="/farmer/pests">
                <Button className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold px-6 py-6 rounded-2xl text-sm shadow-lg flex items-center gap-2 transition-all border-2 border-amber-300 transform hover:scale-[1.02]">
                  <Bug className="w-5 h-5 text-gray-950" />
                  {t("report_pest")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Card className="border-emerald-200/70 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">🌱 {t("farm_health_overview")}</span>
                <span className="text-lg font-bold text-gray-900">82%</span>
              </div>
            </Card>

            <Card className="border-amber-200/80 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">⚠️ {t("active_alerts_label")}</span>
                <span className="text-lg font-bold text-amber-900">2 {t("alerts")}</span>
              </div>
            </Card>

            <Card className="border-blue-200/80 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">🔬 {t("recent_diagnosis_label")}</span>
                <span className="text-sm font-bold text-gray-900 line-clamp-1">Tomato Early Blight</span>
              </div>
            </Card>

            <Card className="border-emerald-200/70 shadow-sm bg-white p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">🌦 {t("weather_risk_warning")}</span>
                <span className="text-sm font-bold text-orange-600">
                  {liveWeather?.disease_conducive ? "High Risk" : "Moderate Risk"}
                </span>
              </div>
            </Card>

          </div>

          {/* Microclimate Weather & My Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Open-Meteo Powered Live Weather Module */}
            <div className="lg:col-span-1">
              <WeatherCard weather={liveWeather || undefined} />
            </div>

            {/* My Fields List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">{t("my_monitored_fields")}</h3>
                <Link href="/farmer/fields" className="text-xs font-semibold text-emerald-700 hover:underline">
                  {t("view_all_fields")}
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_FIELDS.map((field) => (
                  <Card key={field.id} className="border-gray-200 shadow-sm bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-gray-900">{field.crop} ({field.variety})</h4>
                        <RiskBadge level={field.risk_level || "LOW"} size="sm" />
                      </div>
                      <p className="text-xs text-gray-500">
                        {field.area} Acres • {field.soil_type} • Stage: <span className="text-gray-800 font-medium">{field.growth_stage}</span>
                      </p>
                    </div>

                    <Link href={`/farmer/diagnose?field=${field.id}`}>
                      <Button variant="outline" className="border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs font-semibold rounded-xl">
                        {t("scan_this_field")}
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* Inline Alerts Panel */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                {t("alerts_notification_center")}
                {alerts.filter(a => !a.read).length > 0 && (
                  <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-2 py-0.5 font-bold">
                    {alerts.filter(a => !a.read).length}
                  </span>
                )}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}
                className="text-xs font-semibold rounded-xl border-gray-300"
              >
                {t("mark_all_read")}
              </Button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {alerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setAlerts(alerts.map(a => a.id === alert.id ? { ...a, read: true } : a))}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    alert.read
                      ? "bg-gray-50 border-gray-200"
                      : "bg-amber-50/60 border-amber-300 shadow-sm"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-xs text-gray-900 truncate">{alert.title}</h4>
                      {!alert.read && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-red-500" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5 line-clamp-2">{alert.message}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{alert.created_at}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      <MobileBottomNav role="FARMER" />
    </div>
  );
}
