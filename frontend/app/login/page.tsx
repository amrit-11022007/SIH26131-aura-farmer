"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Navbar } from "@/components/agri/Navbar";
import { Shield, Lock, Mail, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [role, setRole] = useState<"FARMER" | "EXPERT" | "AGRICULTURE_OFFICIAL">("FARMER");
  const [email, setEmail] = useState("farmer@example.com");
  const [password, setPassword] = useState("Farmer@123");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRoleChange = (selectedRole: "FARMER" | "EXPERT" | "AGRICULTURE_OFFICIAL") => {
    setRole(selectedRole);
    setErrorMsg("");
    if (selectedRole === "FARMER") {
      setEmail("farmer@example.com");
      setPassword("Farmer@123");
    } else if (selectedRole === "EXPERT") {
      setEmail("expert@example.com");
      setPassword("Expert@123");
    } else {
      setEmail("official@example.com");
      setPassword("Official@123");
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Invalid credentials or authentication error.");
        setLoading(false);
      } else {
        redirectToDashboard(role);
      }
    } catch {
      // Fallback redirection for local/demo mode
      redirectToDashboard(role);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Google OAuth is designated specifically for Farmers
    await signIn("google", { callbackUrl: "/farmer" });
  };

  const redirectToDashboard = (targetRole: string) => {
    if (targetRole === "AGRICULTURE_OFFICIAL" || targetRole === "ADMIN") {
      router.push("/official");
    } else if (targetRole === "EXPERT") {
      router.push("/expert");
    } else {
      router.push("/farmer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF7]">
      <Navbar currentRole="Guest" />

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl border border-emerald-200 shadow-xl overflow-hidden p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center mx-auto mb-3">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t("sign_in_to_cropguard")}</h2>
            <p className="text-xs text-gray-500">{t("access_role_portal")}</p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => handleRoleChange("FARMER")}
              className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                role === "FARMER"
                  ? "bg-[#166534] text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🌱 {t("farmer")}
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("EXPERT")}
              className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                role === "EXPERT"
                  ? "bg-[#166534] text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🔬 {t("expert")}
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("AGRICULTURE_OFFICIAL")}
              className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                role === "AGRICULTURE_OFFICIAL"
                  ? "bg-[#166534] text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📊 {t("official")}
            </button>
          </div>

          {/* Farmer-Specific Google OAuth Button */}
          {role === "FARMER" && (
            <div className="space-y-3">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full border-gray-300 hover:bg-emerald-50/50 text-gray-700 py-5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                {t("sign_in_with_google")}
              </Button>
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <span className="relative bg-white px-3 text-[10px] uppercase font-bold text-gray-400">or use email credentials</span>
              </div>
            </div>
          )}

          {/* Quick Demo Credentials Info */}
          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 block">{t("quick_demo_login")}</span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active: {role}
              </span>
            </div>
            <p className="text-[11px] text-gray-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Auto-filled demo account for instant testing.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-700">{t("email_address")}</Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 text-xs py-2 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-700">{t("password")}</Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 text-xs py-2 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#166534] hover:bg-emerald-800 text-white rounded-xl py-5 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? t("signing_in") : t("enter_portal")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

        </div>
      </main>
    </div>
  );
}
