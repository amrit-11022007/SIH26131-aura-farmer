"use client";

import React, { useState } from "react";
import { Search, AlertTriangle, ShieldCheck, MapPin, X, Megaphone, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const data = [
  { id: "nashik", district: "Nashik District", taluka: "Pimpalgaon Baswant", risk: 85, alert: "Critical Alert", time: "2 hrs ago", lat: "19.9975", lng: "73.7898", pos: "top-[40%] left-[45%]", maize: "1,250", sorghum: "420" },
  { id: "pune", district: "Pune District", taluka: "Baramati", risk: 62, alert: "Warning Alert", time: "5 hrs ago", lat: "18.5204", lng: "73.8567", pos: "top-[60%] left-[40%]", maize: "890", sorghum: "310" },
  { id: "nagpur", district: "Nagpur District", taluka: "Katol", risk: 25, alert: "Low Risk", time: "1 day ago", lat: "21.1458", lng: "79.0882", pos: "top-[30%] left-[65%]", maize: "210", sorghum: "95" },
];

export default function OutbreakMap() {
  const [selected, setSelected] = useState(data[0]);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="relative w-full h-screen bg-[#e8e6dc] overflow-hidden text-slate-800 text-xs">
      <iframe title="Maharashtra Map" src={`https://maps.google.com/maps?q=${selected.lat},${selected.lng}&t=k&z=9&ie=UTF8&iwloc=&output=embed`} className="absolute inset-0 w-full h-full border-0" />

      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm">
        <div className="relative shadow-md rounded-lg">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
          <Input placeholder="Search District, Taluka or Crop..." className="bg-white/95 border-none pl-9 h-10 text-xs shadow-xs" />
        </div>
      </div>

      {/* Map Markers */}
      {data.map((item) => (
        <button key={item.id} onClick={() => { setSelected(item); setPanelOpen(true); }} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 ${item.pos}`}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-lg animate-pulse ${item.risk > 70 ? "bg-red-500/80 border-red-200" : "bg-amber-500/80 border-amber-200"} text-white`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
        </button>
      ))}

      {/* Legend */}
      <Card className="absolute bottom-6 left-4 z-10 w-60 border-none shadow-md bg-white/95 rounded-xl">
        <CardContent className="p-3.5 space-y-1.5">
          <p className="font-semibold text-stone-700 text-[11px]">Risk Severity Legend</p>
          {[
            { label: "Critical (71-100%)", desc: "Immediate action required", icon: AlertTriangle, color: "bg-red-100 text-red-600 border-red-500" },
            { label: "Warning (31-70%)", desc: "Monitor closely", icon: AlertTriangle, color: "bg-amber-100 text-amber-700 border-amber-500" },
            { label: "Low Risk (0-30%)", desc: "Normal conditions", icon: ShieldCheck, color: "bg-emerald-100 text-emerald-700 border-emerald-500" },
          ].map(({ label, desc, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`p-1 rounded-full border ${color}`}><Icon className="w-2.5 h-2.5" /></div>
              <div><p className="font-semibold text-[10px]">{label}</p><p className="text-[9px] text-stone-500">{desc}</p></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Drawer */}
      {panelOpen && (
        <aside className="absolute top-0 right-0 z-20 w-full sm:w-96 h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto p-5 space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={selected.risk > 70 ? "bg-red-700 text-white" : "bg-amber-600 text-white"}>{selected.alert}</Badge>
                  <span className="text-stone-400 text-[10px]">{selected.time}</span>
                </div>
                <h2 className="text-lg font-bold">{selected.district}</h2>
                <p className="text-stone-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {selected.taluka} Taluka</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setPanelOpen(false)}><X className="w-4 h-4" /></Button>
            </div>

            {/* Gauge */}
            <div className="p-4 bg-[#fbf9f4] rounded-xl text-center space-y-2">
              <p className="text-left font-medium text-stone-600">Risk Assessment</p>
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path stroke="#e2ded4" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path stroke={selected.risk > 70 ? "#b91c1c" : "#d97706"} strokeWidth="3" strokeDasharray={`${selected.risk}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-lg font-bold text-stone-900">{selected.risk}%</span>
              </div>
              <p>High probability of <strong className="text-red-700">Fall Armyworm</strong> infestation.</p>
            </div>

            {/* Affected Areas */}
            <div className="space-y-1">
              <p className="font-bold text-stone-600 uppercase text-[10px]">Affected Areas</p>
              <div className="grid grid-cols-3 bg-[#f5f2eb] p-2 font-semibold rounded-t-md"><span>Crop</span><span>Area (Ha)</span><span className="text-right">Trend</span></div>
              <div className="grid grid-cols-3 p-2 border-b"><span>Maize</span><span>{selected.maize}</span><span className="text-right text-red-600">📈 12%</span></div>
              <div className="grid grid-cols-3 p-2 border-b"><span>Sorghum</span><span>{selected.sorghum}</span><span className="text-right text-stone-600">→ 2%</span></div>
            </div>

            {/* AI Insight */}
            <div className="p-3 bg-[#f2f6f2] rounded-xl border border-emerald-100 text-stone-700 space-y-1">
              <p className="font-bold text-stone-600 uppercase text-[10px]">AI Insight</p>
              <p>Weather patterns show optimal humidity levels for rapid larvae hatching.</p>
              <a href="#" className="inline-flex items-center gap-1 text-[#2e5d38] font-medium">View full report <ArrowRight className="w-3 h-3" /></a>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t">
            <Button className="w-full bg-[#2e5d38] text-white gap-2"><Megaphone className="w-3.5 h-3.5" /> Broadcast Alert to Farmers</Button>
            <Button variant="outline" className="w-full gap-2"><UserPlus className="w-3.5 h-3.5" /> Assign Field Expert</Button>
          </div>
        </aside>
      )}
    </div>
  );
}