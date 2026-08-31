"use client";

import { useState } from "react";
import {
  Bell,
  Globe,
  Home,
  Menu,
  Scan,
  Search,
  User,
  X,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";

import { SidebarNav } from "@/app/components/SidebarNav";
import { navigationItems } from "@/app/data/dashboard";
import { DashboardContent } from "@/app/dashboard/page";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F2922] font-sans antialiased selection:bg-[#1C3A27] selection:text-white flex flex-col md:flex-row">
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

      {/* Navbar */}
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
              <Link href="https://www.google.com/maps" target="_blank">
                <Globe className="w-5 h-5" />
              </Link>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-[#EDE9DE] transition relative">
              <Link href="/alerts">
                <TriangleAlert className="w-5 h-5" />
              </Link>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#F8F6F0]" />
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

        <DashboardContent activeTab={activeTab} />
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
                className={`p-1.5 rounded-xl ${
                  isActive ? "bg-[#1C3A27] text-white" : ""
                }`}
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
