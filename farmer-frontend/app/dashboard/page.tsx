"use client";

import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Camera,
  CheckCircle2,
  ChevronDown,
  CloudRain,
  CloudSun,
  Download,
  Droplets,
  Eye,
  FilePlus,
  Filter,
  Globe,
  Home,
  MapPin,
  Menu,
  Plus,
  Radio,
  Scan,
  Search,
  User,
  Wind,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertBanner } from "@/app/components/dashboard/AlertBanner";
import { SidebarNav } from "@/app/components/dashboard/SidebarNav";

import { outbreakData } from "../data/dashboard";
import { navigationItems } from "../data/dashboard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedTimeframe] = useState("Last 30 Days");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [toastMessage, setToastMessage] = useState("");
  const [showAlertBanner, setShowAlertBanner] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F2922] font-sans antialiased selection:bg-[#1C3A27] selection:text-white flex flex-col md:flex-row">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-5 right-5 z-50 bg-[#1A382B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* MOBILE HEADER */}
      <header className="md:hidden sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#EBE7DF]">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-700 hover:bg-black/5 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-serif font-bold text-[#1C3A27]">
          CropGuard
        </h1>
        <button className="text-xs font-bold text-gray-700 px-2.5 py-1 bg-[#EDE9DE] rounded-md">
          EN
        </button>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-72 bg-[#1E1915] text-[#D1D5DB] flex flex-col justify-between p-4 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between px-2 py-3 mb-4">
                <div>
                  <h1 className="font-serif font-bold text-lg text-white">
                    CropGuard
                  </h1>
                  <p className="text-[11px] text-[#A1A1A1] font-mono uppercase">
                    Agri-Intelligence
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <SidebarNav
                items={navigationItems}
                activeTab={activeTab}
                onSelect={(name) => {
                  setActiveTab(name);
                  setIsMobileMenuOpen(false);
                }}
                mobile
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-[#1E1915] text-[#D1D5DB] flex-col justify-between p-4 border-r border-[#2A2420] overflow-y-auto z-50">
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div>
              <h1 className="font-serif font-bold text-lg leading-none text-white tracking-tight">
                CropGuard
              </h1>
              <p className="text-[11px] text-[#A1A1A1] mt-1 tracking-wide font-mono uppercase">
                Agri-Intelligence
              </p>
            </div>
          </div>

          <SidebarNav
            items={navigationItems}
            activeTab={activeTab}
            onSelect={setActiveTab}
          />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="md:pl-64 flex-1 min-h-screen pb-20 md:pb-8 flex flex-col min-w-0">
        <header className="hidden md:flex px-8 py-4 bg-[#FDFBF7] items-center justify-between border-b border-[#E7E3D8] sticky top-0 z-20 backdrop-blur-md bg-opacity-90">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#1A382B] hover:underline cursor-pointer tracking-wide border-b-2 border-[#1A382B]">
              Maharashtra, India
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search fields, crops..."
                className="bg-[#EDE9DE] text-sm text-gray-800 placeholder-gray-500 rounded-full pl-10 pr-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-all"
              />
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-[#EDE9DE] transition">
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-[#EDE9DE] transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#F8F6F0]" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#D1C9B8] flex items-center justify-center font-bold text-xs text-[#4A4335] border border-[#BDB3A0]">
              P
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
          {/* HEADER ACTION ROW */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F2922] tracking-tight">
                Overview
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                Real-time agricultural telemetry & AI insights across
                Maharashtra.
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#DDD8C9] rounded-xl text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition">
                <Filter className="w-4 h-4 text-gray-600" />
                <span>{selectedTimeframe}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
              <button
                onClick={() => showToast("Exporting PDF Report...")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-[#DDD8C9] rounded-xl text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition"
              >
                <Download className="w-4 h-4 text-gray-600" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => showToast("Opening New AI Scan...")}
                className="flex items-center gap-2 px-4 py-2 bg-[#1A382B] text-white rounded-xl text-xs md:text-sm font-semibold hover:bg-[#2D6A4F] shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>New Scan</span>
              </button>
            </div>
          </div>

          {/* WEATHER ALERT BANNER */}
          {showAlertBanner && (
            <AlertBanner onDismiss={() => setShowAlertBanner(false)} />
          )}

          {/* METRIC CARD GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#ECE8DC] shadow-sm">
              <span className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Monitored
              </span>
              <div className="mt-2 md:mt-3">
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  4,285
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-emerald-600 mt-1 font-medium">
                📈 +12% this month
              </p>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#ECE8DC] shadow-sm">
              <span className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Scans Today
              </span>
              <div className="mt-2 md:mt-3">
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  1,492
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-emerald-600 mt-1 font-medium">
                ✓ 98% accuracy
              </p>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#ECE8DC] shadow-sm">
              <span className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Alerts
              </span>
              <div className="mt-2 md:mt-3">
                <span className="text-xl md:text-2xl font-bold text-amber-600">
                  24
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-amber-700 mt-1 font-medium">
                Action required
              </p>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#ECE8DC] shadow-sm">
              <span className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                High-Risk Locs
              </span>
              <div className="mt-2 md:mt-3">
                <span className="text-xl md:text-2xl font-bold text-red-600">
                  7
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-red-700 mt-1 font-medium">
                Nashik & Pune
              </p>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#ECE8DC] shadow-sm col-span-2 sm:col-span-1">
              <span className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pending Review
              </span>
              <div className="mt-2 md:mt-3">
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  188
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 mt-1 font-medium">
                94% confirmed
              </p>
            </div>
          </div>

          {/* TELEMETRY & RISK LEVEL ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT 8-COLUMN TELEMETRY CONTENT */}
            <div className="lg:col-span-8 space-y-6">
              {/* HOTSPOTS MAP & WEATHER INTEL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#ECE8DC] shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-2">
                      <CloudSun className="w-4 h-4 text-amber-500" />
                      Weather Telemetry
                    </h3>
                    <div className="mt-2">
                      <span className="text-4xl font-serif font-bold text-gray-900">
                        34°C
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        Partly Cloudy, Nashik
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="bg-[#F8F6F0] p-2 rounded-xl">
                      <Droplets className="w-3.5 h-3.5 mx-auto text-blue-500" />
                      <span className="text-xs font-bold block mt-1">65%</span>
                      <span className="text-[10px] text-gray-400">
                        Moisture
                      </span>
                    </div>
                    <div className="bg-[#F8F6F0] p-2 rounded-xl">
                      <CloudRain className="w-3.5 h-3.5 mx-auto text-indigo-500" />
                      <span className="text-xs font-bold block mt-1">12mm</span>
                      <span className="text-[10px] text-gray-400">
                        Rainfall
                      </span>
                    </div>
                    <div className="bg-[#F8F6F0] p-2 rounded-xl">
                      <Wind className="w-3.5 h-3.5 mx-auto text-teal-500" />
                      <span className="text-xs font-bold block mt-1">
                        14km/h
                      </span>
                      <span className="text-[10px] text-gray-400">Wind</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#263328] p-4 rounded-2xl border border-[#2E3D30] shadow-sm text-white flex flex-col justify-between relative overflow-hidden min-h-40">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('https://cdn.sanity.io/images/hvd5n54p/production/84b5cea2eaadf1168be1781a15ec92481e8664f5-1608x1608.jpg?w=1200')`,
                    }}
                  />
                  <div className="flex justify-between items-center z-10">
                    <span className="text-xs font-bold bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-md">
                      Hotspots: Maharashtra
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Live Satellite
                    </span>
                  </div>
                  <div className="my-6 relative h-20">
                    <div className="absolute top-2 left-10 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
                    <div className="absolute top-2 left-10 w-3 h-3 bg-amber-500 rounded-full" />
                    <span className="absolute top-1 left-16 text-[10px] font-bold text-amber-300">
                      Nashik Plot A
                    </span>

                    <div className="absolute bottom-3 right-12 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    <div className="absolute bottom-3 right-12 w-3 h-3 bg-red-500 rounded-full" />
                    <span className="absolute bottom-2 right-16 text-[10px] font-bold text-red-400">
                      Pune North
                    </span>
                  </div>
                </div>
              </div>

              {/* OUTBREAK FORECAST CHART */}
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#ECE8DC] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-base md:text-lg text-gray-900">
                      Regional Outbreak Risk Forecast
                    </h3>
                    <p className="text-xs text-gray-500">
                      Downy Mildew & Rust incidence projection over 30 days
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F5E9] px-2.5 py-1 rounded-md">
                    Weekly Trend
                  </span>
                </div>
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={outbreakData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#F0ECE1"
                      />
                      <XAxis dataKey="week" stroke="#A0A0A0" fontSize={11} />
                      <YAxis stroke="#A0A0A0" fontSize={11} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="incidence"
                        stroke="#2D6A4F"
                        fill="#2D6A4F"
                        fillOpacity={0.15}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* COLUMN SIDEBAR (RISK DONUT & ALERTS) */}
            <div className="lg:col-span-4 space-y-6">
              {/* RISK DONUT CARD */}
              <div className="bg-white p-6 rounded-2xl border border-[#ECE8DC] shadow-sm text-center">
                <h3 className="font-serif font-bold text-base text-gray-900 text-left mb-4">
                  Overall Risk Level
                </h3>
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-8 border-gray-100 border-t-amber-500 border-r-amber-500 transform -rotate-45" />
                  <div className="absolute text-center">
                    <span className="text-2xl font-bold text-gray-900">
                      65%
                    </span>
                  </div>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mt-4">
                  Elevated Risk
                </h4>
                <p className="text-[11px] text-gray-500 mt-1">
                  Driven by high humidity in Nashik sector.
                </p>
              </div>

              {/* PRIORITY ALERTS */}
              <div className="bg-white p-6 rounded-2xl border border-[#ECE8DC] shadow-sm space-y-3">
                <h3 className="font-serif font-bold text-base text-gray-900">
                  Priority Alerts
                </h3>
                <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-xs">
                  <div className="flex items-center gap-2 font-bold text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    Pest Outbreak Detected
                  </div>
                  <p className="text-[11px] text-red-600 mt-1">
                    Fall Armyworm clustering in Pune North fields.
                  </p>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-700">
                    <AlertTriangle className="w-4 h-4" />
                    Heat Stress Warning
                  </div>
                  <p className="text-[11px] text-amber-600 mt-1">
                    Forecast suggests prolonged temperatures above 38°C.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI DIAGNOSES and QUICK ACTIONS*/}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* AI DIAGNOSES & FIELD TELEMETRY */}
            <div className="lg:col-span-8 bg-white p-4 md:p-6 rounded-2xl border border-[#ECE8DC] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-gray-900">
                    AI Diagnoses & Field Telemetry
                  </h3>
                  <p className="text-xs text-gray-500">
                    Live inspection records across registered crop sectors.
                  </p>
                </div>
                <button className="text-xs font-semibold text-[#2D6A4F] hover:underline">
                  View All Logged Cases
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-150">
                  <thead>
                    <tr className="bg-[#F8F6F0] text-[11px] font-semibold text-gray-500 uppercase border-b border-[#EBE7DF]">
                      <th className="py-3 px-3">Field / Plot</th>
                      <th className="py-3 px-3">Crop Type</th>
                      <th className="py-3 px-3">Confidence</th>
                      <th className="py-3 px-3">Diagnosis</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs font-medium">
                    <tr>
                      <td className="py-3.5 px-3 font-bold text-gray-900">
                        Sector 4A
                      </td>
                      <td className="py-3.5 px-3 text-gray-600">
                        Tomato / Grapes
                      </td>
                      <td className="py-3.5 px-3">94%</td>
                      <td className="py-3.5 px-3 text-[#D32F2F] font-bold">
                        Downy Mildew
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="bg-[#FFEBEE] text-[#D32F2F] px-2.5 py-1 rounded-md font-bold text-[10px]">
                          High Risk
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => showToast("Viewing Sector 4A Details")}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-3 font-bold text-gray-900">
                        North Block 2
                      </td>
                      <td className="py-3.5 px-3 text-gray-600">Cotton</td>
                      <td className="py-3.5 px-3">88%</td>
                      <td className="py-3.5 px-3 text-[#B45309] font-bold">
                        Aphid Infestation
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="bg-[#FFF3E0] text-[#D97706] px-2.5 py-1 rounded-md font-bold text-[10px]">
                          Monitoring
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() =>
                            showToast("Viewing North Block 2 Details")
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-3 font-bold text-gray-900">
                        South Field 1
                      </td>
                      <td className="py-3.5 px-3 text-gray-600">Maize</td>
                      <td className="py-3.5 px-3">99%</td>
                      <td className="py-3.5 px-3 text-emerald-700 font-bold">
                        Healthy Leaf
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="bg-[#E8F5E9] text-[#2D6A4F] px-2.5 py-1 rounded-md font-bold text-[10px]">
                          Optimal
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() =>
                            showToast("Viewing South Field 1 Details")
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUICK ACTIONS SIDEBAR */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#ECE8DC] shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => showToast("Analyze Image Selected")}
                    className="p-4 bg-[#F8F6F0] hover:bg-[#EDE9DE] rounded-xl border border-[#ECE8DC] flex flex-col items-center justify-center gap-2 text-xs font-bold text-gray-700 transition"
                  >
                    <Camera className="w-5 h-5 text-[#2D6A4F]" />
                    <span>Analyze Image</span>
                  </button>
                  <button
                    onClick={() => showToast("View Map Selected")}
                    className="p-4 bg-[#F8F6F0] hover:bg-[#EDE9DE] rounded-xl border border-[#ECE8DC] flex flex-col items-center justify-center gap-2 text-xs font-bold text-gray-700 transition"
                  >
                    <MapPin className="w-5 h-5 text-[#2D6A4F]" />
                    <span>View Map</span>
                  </button>
                  <button
                    onClick={() => showToast("Add Pest Data Selected")}
                    className="p-4 bg-[#F8F6F0] hover:bg-[#EDE9DE] rounded-xl border border-[#ECE8DC] flex flex-col items-center justify-center gap-2 text-xs font-bold text-gray-700 transition"
                  >
                    <Radio className="w-5 h-5 text-[#2D6A4F]" />
                    <span>Add Pest Data</span>
                  </button>
                  <button
                    onClick={() => showToast("Create Report Selected")}
                    className="p-4 bg-[#F8F6F0] hover:bg-[#EDE9DE] rounded-xl border border-[#ECE8DC] flex flex-col items-center justify-center gap-2 text-xs font-bold text-gray-700 transition"
                  >
                    <FilePlus className="w-5 h-5 text-[#2D6A4F]" />
                    <span>Create Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EBE7DF] px-6 py-2 flex items-center justify-between shadow-lg">
        {[
          { name: "Home", icon: Home },
          { name: "Scan", icon: Scan },
          { name: "Alerts", icon: Bell, badge: true },
          { name: "Profile", icon: User },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`flex flex-col items-center gap-1 relative ${
                isActive ? "text-[#1C3A27]" : "text-gray-400"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl ${isActive ? "bg-[#1C3A27] text-white" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold">{item.name}</span>
              {item.badge && (
                <span className="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
