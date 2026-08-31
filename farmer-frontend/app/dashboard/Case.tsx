"use client";

import React from "react";
import { Search, SlidersHorizontal, Download, Plus, MoreVertical, Sparkles, Sprout, Wheat, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const cases = [
  { id: "#CG-8821", crop: "Cotton", Icon: Sprout, dist: "Jalgaon", sub: "Bhusawal", diag: "Pink Bollworm", conf: "94%", sev: "High (85%)", status: "Field Verified", badge: "bg-red-100 text-red-700", sevColor: "text-red-600" },
  { id: "#CG-8820", crop: "Sugarcane", Icon: Wheat, dist: "Kolhapur", sub: "Karvir", diag: "Red Rot", conf: "78%", sev: "Medium (45%)", status: "Expert Reviewed", badge: "bg-amber-100 text-amber-800", sevColor: "text-amber-600" },
  { id: "#CG-8819", crop: "Soybean", Icon: Leaf, dist: "Latur", sub: "Ausa", diag: "Yellow Mosaic", conf: "91%", sev: "High (72%)", status: "Pending Review", badge: "bg-stone-200 text-stone-700", sevColor: "text-red-600" },
];

export default function CaseManagement() {
  return (
    <div className="w-full min-h-screen bg-[#faf8f5] p-4 sm:p-6 text-slate-800 text-xs">
      <div className="max-w-6xl mx-auto space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl font-serif font-bold text-slate-900">Case Management</h1>
            <p className="text-slate-500">View and manage all agricultural anomaly reports.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white h-8 gap-1"><SlidersHorizontal className="w-3.5 h-3.5" /> Filters</Button>
            <Button variant="outline" className="bg-white h-8 gap-1"><Download className="w-3.5 h-3.5" /> Export</Button>
            <Button className="bg-[#2d5a37] hover:bg-[#23472b] text-white h-8 gap-1"><Plus className="w-3.5 h-3.5" /> New Case</Button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-3">
          
          {/* Search Bar */}
          <div className="flex justify-between items-center gap-2">
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <Input placeholder="Search by ID, Crop, or District..." className="bg-[#edf3ec] border-none pl-8 h-8 text-xs" />
            </div>
            <span className="text-slate-500">Showing 1-10 of 156 Cases</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#7e4a1a] border-b border-slate-100 font-semibold">
                  <th className="py-2">Case ID</th>
                  <th>Crop</th>
                  <th>Location</th>
                  <th>AI Diagnosis</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases.map(({ id, crop, Icon, dist, sub, diag, conf, sev, status, badge, sevColor }) => (
                  <tr key={id} className="hover:bg-slate-50/50">
                    <td className="py-2 font-medium text-[#2d5a37]">{id}</td>
                    <td><div className="flex items-center gap-1.5"><Icon className="w-4 h-4 text-[#7e4a1a]" /> {crop}</div></td>
                    <td><div>{dist}</div><div className="text-slate-400 text-[10px]">{sub}</div></td>
                    <td><div>{diag}</div><div className="text-[#2d5a37] text-[10px] flex items-center gap-1"><Sparkles className="w-2.5 h-2.5" />{conf} Confidence</div></td>
                    <td className={`font-medium ${sevColor}`}>● {sev}</td>
                    <td><Badge className={`${badge} border-none font-normal text-[11px] px-2 py-0.5`}>{status}</Badge></td>
                    <td className="text-right"><MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer inline" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-[#f4f2ea] p-2 rounded-lg text-slate-600">
            <Button variant="outline" size="sm" className="bg-white h-7 text-xs" disabled>Previous</Button>
            <div className="flex gap-1 items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-[#2d5a37] text-white rounded">1</span>
              {[2, 3].map((n) => <span key={n} className="w-6 h-6 flex items-center justify-center cursor-pointer">{n}</span>)}
              <span className="px-1">...</span>
              <span className="w-6 h-6 flex items-center justify-center cursor-pointer">10</span>
            </div>
            <Button variant="outline" size="sm" className="bg-white h-7 text-xs">Next</Button>
          </div>

        </div>
      </div>
    </div>
  );
}