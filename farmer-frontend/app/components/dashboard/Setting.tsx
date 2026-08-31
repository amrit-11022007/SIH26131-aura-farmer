"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [highRiskSMS, setHighRiskSMS] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f3] text-stone-800 text-xs p-4 sm:p-6 lg:p-8 flex justify-center">
      <main className="w-full max-w-4xl space-y-5">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-serif font-bold text-stone-900">Settings</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-stone-200 font-medium">
          {["Profile", "Organization", "Notifications", "Data Sources"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 relative ${
                activeTab === tab
                  ? "text-[#2e5d38] font-semibold border-b-2 border-[#2e5d38]"
                  : "text-stone-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Personal Info Card */}
        <Card className="border-none shadow-xs bg-white rounded-xl">
          <CardContent className="p-5 space-y-4">
            <h2 className="text-base font-serif font-bold text-stone-900">Personal Information</h2>
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://img.freepik.com/premium-photo/photo-happy-young-indian-rural-man-farmer-examining-crops-agriculture-land_911060-11340.jpg" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="bg-stone-100 border-none text-stone-700 h-6 text-[11px] px-2.5">
                  Change Photo
                </Button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">First Name</label>
                  <Input defaultValue="Anand" className="bg-[#f5f2eb] border-none h-8 text-xs" />
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Last Name</label>
                  <Input defaultValue="Sharma" className="bg-[#f5f2eb] border-none h-8 text-xs" />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-medium text-stone-700 block mb-1">Email Address</label>
                  <Input defaultValue="a.sharma@cropguard.in" className="bg-[#f5f2eb] border-none h-8 text-xs" />
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Phone Number</label>
                  <Input defaultValue="+91 98765 43210" className="bg-[#f5f2eb] border-none h-8 text-xs" />
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Role</label>
                  <Input defaultValue="Lead Agronomist" className="bg-[#f5f2eb] border-none h-8 text-xs" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences Card */}
        <Card className="border-none shadow-xs bg-white rounded-xl">
          <CardContent className="p-5 space-y-4">
            <h2 className="text-base font-serif font-bold text-stone-900">Preferences</h2>
            <div className="max-w-xs space-y-1">
              <label className="font-medium text-stone-700 block">Display Language</label>
              <Select defaultValue="English">
                <SelectTrigger className="bg-[#f5f2eb] border-none h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Marathi">Marathi</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-stone-400">Select the primary language for the interface and reports.</p>
            </div>

            <div className="space-y-3 pt-1">
              <p className="font-medium text-stone-700">Notification Toggles</p>
              {[
                { label: "High Risk Alerts (SMS)", desc: "Receive immediate SMS for critical pest outbreaks.", val: highRiskSMS, set: setHighRiskSMS },
                { label: "Daily Summary (Email)", desc: "A digest of field reports and AI diagnoses.", val: dailySummary, set: setDailySummary },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-800">{item.label}</p>
                    <p className="text-[10px] text-stone-400">{item.desc}</p>
                  </div>
                  <Switch checked={item.val} onCheckedChange={item.set} className="data-[state=checked]:bg-[#2e5d38]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-2.5">
          <Button variant="outline" className="border-stone-300 text-stone-700 bg-white h-8 text-xs px-4">
            Cancel
          </Button>
          <Button className="bg-[#2e5d38] hover:bg-[#23482b] text-white h-8 text-xs px-4 font-medium">
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
}