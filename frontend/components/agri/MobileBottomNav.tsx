"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { 
  LayoutDashboard, 
  Sprout, 
  Scan, 
  Bug, 
  Bell, 
  UserCheck, 
  Map, 
  FlaskConical,
  BarChart3,
  Camera
} from "lucide-react";

interface MobileBottomNavProps {
  role?: "FARMER" | "EXPERT" | "AGRICULTURE_OFFICIAL";
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ role = "FARMER" }) => {
  const pathname = usePathname();
  const { t } = useTranslation();

  // 1. Paytm-style Mobile Navigation for Farmer (Big Scanner Button in Center)
  if (role === "FARMER") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-emerald-900/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
        <div className="relative flex items-center justify-around h-16 px-2">
          
          {/* 1. Home / Overview */}
          <Link
            href="/farmer"
            className={`flex flex-col items-center justify-center w-14 py-1 transition-all ${
              pathname === "/farmer" ? "text-[#166534] font-extrabold scale-105" : "text-gray-500 hover:text-emerald-700"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">{t("overview")}</span>
          </Link>

          {/* 2. My Fields */}
          <Link
            href="/farmer/fields"
            className={`flex flex-col items-center justify-center w-14 py-1 transition-all ${
              pathname === "/farmer/fields" ? "text-[#166534] font-extrabold scale-105" : "text-gray-500 hover:text-emerald-700"
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">{t("my_fields")}</span>
          </Link>

          {/* 3. CENTER PAYTM-STYLE BIG FLOATING AI CROP SCANNER */}
          <div className="relative -top-5 flex flex-col items-center justify-center">
            <Link href="/farmer/diagnose" aria-label="Scan Crop">
              <div className="relative group flex items-center justify-center">
                {/* Glowing Outer Ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 via-[#22C55E] to-amber-400 opacity-75 blur-sm group-hover:opacity-100 transition animate-pulse" />
                
                {/* Main Big Circular Scanner Button */}
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#14532D] via-[#166534] to-[#22C55E] text-white shadow-xl border-4 border-white flex items-center justify-center transition-transform active:scale-95 group-hover:scale-105">
                  <Camera className="w-7 h-7 text-white drop-shadow" />
                </div>
              </div>
            </Link>
            <span className="text-[10px] font-extrabold text-[#166534] mt-1 tracking-tight">
              {t("scan_crop")}
            </span>
          </div>

          {/* 4. Pest Reports */}
          <Link
            href="/farmer/pests"
            className={`flex flex-col items-center justify-center w-14 py-1 transition-all ${
              pathname === "/farmer/pests" ? "text-[#166534] font-extrabold scale-105" : "text-gray-500 hover:text-emerald-700"
            }`}
          >
            <Bug className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">{t("pest_reports")}</span>
          </Link>

          {/* 5. Alerts */}
          <Link
            href="/alerts"
            className={`flex flex-col items-center justify-center w-14 py-1 transition-all relative ${
              pathname === "/alerts" ? "text-[#166534] font-extrabold scale-105" : "text-gray-500 hover:text-emerald-700"
            }`}
          >
            <div className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
            </div>
            <span className="text-[10px] mt-1 font-medium">{t("alerts")}</span>
          </Link>

        </div>
      </div>
    );
  }

  // 2. Standard Mobile Bottom Navigation for Expert
  if (role === "EXPERT") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-emerald-900/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          <Link
            href="/expert"
            className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
              pathname === "/expert" ? "text-[#166534] font-extrabold" : "text-gray-500 hover:text-emerald-700"
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">{t("review_queue")}</span>
          </Link>

          <Link
            href="/official/map"
            className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
              pathname === "/official/map" ? "text-[#166534] font-extrabold" : "text-gray-500 hover:text-emerald-700"
            }`}
          >
            <Map className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">{t("hotspot_map_label")}</span>
          </Link>

          <Link
            href="/alerts"
            className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
              pathname === "/alerts" ? "text-[#166534] font-extrabold" : "text-gray-500 hover:text-emerald-700"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">{t("alerts")}</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Standard Mobile Bottom Navigation for Agriculture Official / Admin
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-emerald-900/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        <Link
          href="/official"
          className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
            pathname === "/official" ? "text-[#166534] font-extrabold" : "text-gray-500 hover:text-emerald-700"
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">{t("surveillance")}</span>
        </Link>

        <Link
          href="/official/map"
          className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
            pathname === "/official/map" ? "text-[#166534] font-extrabold" : "text-gray-500 hover:text-emerald-700"
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">{t("hotspot_map_label")}</span>
        </Link>

        <Link
          href="/expert"
          className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
            pathname === "/expert" ? "text-[#166534] font-extrabold" : "text-gray-500 hover:text-emerald-700"
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">{t("expert_reviews")}</span>
        </Link>

        <Link
          href="/alerts"
          className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
            pathname === "/alerts" ? "text-[#166534] font-extrabold" : "text-gray-500 hover:text-emerald-700"
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">{t("alerts")}</span>
        </Link>
      </div>
    </div>
  );
};
