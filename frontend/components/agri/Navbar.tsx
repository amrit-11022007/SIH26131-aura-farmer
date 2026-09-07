"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTranslation, Language } from "@/lib/i18n";
import { Shield, Globe, User, Bell, Menu, LogOut, LogIn } from "lucide-react";

interface NavbarProps {
  currentRole?: string;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, onToggleSidebar }) => {
  const { lang, setLang } = useTranslation();
  const pathname = usePathname();
  const { data: session } = useSession();

  const userRole = (session?.user as any)?.role || currentRole || "Farmer";
  const userName = session?.user?.name || userRole;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/10 bg-[#166534] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left branding */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg text-emerald-100 hover:bg-emerald-700/50 md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 p-2 backdrop-blur">
              <Shield className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">CropGuard</span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
                MVP
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Role switch links for portal navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-emerald-800/60 p-1 rounded-xl border border-emerald-700/50 text-xs">
          <Link
            href="/farmer"
            className={`px-3 py-1.5 rounded-lg transition-all ${
              pathname?.startsWith("/farmer") ? "bg-emerald-600 text-white font-semibold shadow-sm" : "text-emerald-200 hover:text-white"
            }`}
          >
            🌱 Farmer Portal
          </Link>
          <Link
            href="/expert"
            className={`px-3 py-1.5 rounded-lg transition-all ${
              pathname?.startsWith("/expert") ? "bg-emerald-600 text-white font-semibold shadow-sm" : "text-emerald-200 hover:text-white"
            }`}
          >
            🔬 Expert Validation
          </Link>
          <Link
            href="/official"
            className={`px-3 py-1.5 rounded-lg transition-all ${
              pathname?.startsWith("/official") ? "bg-emerald-600 text-white font-semibold shadow-sm" : "text-emerald-200 hover:text-white"
            }`}
          >
            📊 Official Dashboard
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          
          {/* Multilingual Selector */}
          <div className="relative flex items-center bg-emerald-800/80 rounded-lg p-1 border border-emerald-700">
            <Globe className="w-4 h-4 text-emerald-300 ml-1.5 mr-1" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="en" className="text-gray-900">English (EN)</option>
              <option value="hi" className="text-gray-900">हिंदी (HI)</option>
              <option value="mr" className="text-gray-900">मराठी (MR)</option>
            </select>
          </div>

          {/* Alert bell link */}
          <Link href="/alerts" className="relative p-2 text-emerald-100 hover:text-white hover:bg-emerald-700/50 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </Link>

          {/* User auth state badge */}
          {session ? (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-emerald-700/60">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-200 font-semibold text-sm">
                {session.user?.image ? (
                  <img src={session.user.image} alt="Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className="text-left text-xs leading-tight">
                <p className="font-medium text-white max-w-[100px] truncate">{userName}</p>
                <p className="text-emerald-300 text-[10px] uppercase font-bold">{userRole}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                title="Sign Out"
                className="ml-1 p-1 text-emerald-200 hover:text-white hover:bg-emerald-700/60 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3 py-1.5 rounded-lg border border-emerald-600 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};
