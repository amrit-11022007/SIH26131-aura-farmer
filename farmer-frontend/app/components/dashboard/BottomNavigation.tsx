"use client";
import { useState } from "react";
import { Home, Scan, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BottomNavigation() {
  const [activeNav, setActiveNav] = useState("overview");
  const pages = [
    { name: "overview", icon: Home },
    { name: "scan", icon: Scan },
    { name: "alerts", icon: Bell, badge: true },
    { name: "profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EBE7DF] px-6 py-2 flex items-center justify-between shadow-lg">
      {pages.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.name;

        return (
          <Link href={`/${item.name}`} key={item.name}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveNav(item.name)}
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
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
