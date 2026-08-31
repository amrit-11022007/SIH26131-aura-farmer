"use client";

import React, { useState } from "react";
import { Plus, MapPin, Calendar, Sparkles, Search, Download, FileSpreadsheet, Bug, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reports = [
  { id: "1", name: "Q3 Yield Forecast - Vidarbha", type: "Financial Risk", gen: "Oct 24, 2023", status: "Complete", icon: FileSpreadsheet, bg: "bg-[#e2efe0]", color: "text-[#2d5a27]" },
  { id: "2", name: "Fall Armyworm Assessment", type: "Pest Outbreak", gen: "Oct 18, 2023", status: "Complete", icon: Bug, bg: "bg-[#f8ede2]", color: "text-[#8a5327]" },
  { id: "3", name: "Annual Soil Health - Wardha", type: "Soil Health", gen: "Today", status: "Processing...", icon: RefreshCw, bg: "bg-muted", color: "text-muted-foreground" },
];

export default function ReportsAndHistory() {
  const [reportType, setReportType] = useState("yield");
  const [selectedCrops, setSelectedCrops] = useState(["Sugarcane", "Cotton"]);

  const toggleCrop = (crop: string) =>
    setSelectedCrops((prev) => (prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]));

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] p-4 sm:p-6 lg:p-8 text-slate-800 text-xs">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Reports & History</h1>
          <p className="text-muted-foreground mt-1">Generate custom intelligence reports and review historical field data.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Panel */}
          <Card className="lg:col-span-5 border-none shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg font-bold flex items-center gap-2">
                <span className="p-1.5 bg-[#2d5a27]/10 text-[#2d5a27] rounded-full"><Plus className="w-3.5 h-3.5" /></span>
                New Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Report Type</label>
                <Select value={reportType} onValueChange={(value) => setReportType(value ?? "")}>
                  <SelectTrigger className="bg-[#f1f5f0] border-none text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yield">Comprehensive Yield Analysis</SelectItem>
                    <SelectItem value="pest">Pest Risk Assessment</SelectItem>
                    <SelectItem value="soil">Soil Fertility Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Location Filter</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <Input defaultValue="Maharashtra, India (All Districts)" className="bg-[#f1f5f0] border-none pl-8 text-xs" />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Crop Focus</label>
                <div className="flex flex-wrap gap-1.5">
                  {["Sugarcane", "Cotton", "Soybean"].map((crop) => (
                    <Badge
                      key={crop}
                      onClick={() => toggleCrop(crop)}
                      className={`cursor-pointer text-[11px] font-normal rounded-full px-2.5 py-0.5 border-none ${
                        selectedCrops.includes(crop) ? "bg-[#2d5a27] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Input defaultValue="01-08-2023" className="bg-[#f1f5f0] border-none pr-7 text-[11px]" />
                    <Calendar className="w-3.5 h-3.5 absolute right-2 top-2.5 text-muted-foreground" />
                  </div>
                  <div className="relative">
                    <Input defaultValue="31-10-2023" className="bg-[#f1f5f0] border-none pr-7 text-[11px]" />
                    <Calendar className="w-3.5 h-3.5 absolute right-2 top-2.5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-white border-slate-300 gap-1.5 mt-2 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Table Panel */}
          <Card className="lg:col-span-7 border-none shadow-sm bg-white">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="font-serif text-lg font-bold">Recent Reports</CardTitle>
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <Input placeholder="Search history..." className="bg-[#f6f4ee] border-none pl-8 rounded-full text-xs h-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <Table className="min-w-125">
                  <TableHeader className="bg-[#eef4ee]">
                    <TableRow className="border-none">
                      <TableHead className="font-semibold text-slate-700">Report Name</TableHead>
                      <TableHead className="font-semibold text-slate-700">Type</TableHead>
                      <TableHead className="font-semibold text-slate-700">Generated</TableHead>
                      <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      <TableHead className="text-right font-semibold text-slate-700">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((item) => {
                      const Icon = item.icon;
                      return (
                        <TableRow key={item.id} className="border-slate-100">
                          <TableCell className="font-medium text-slate-900 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-md ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="line-clamp-1">{item.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-[11px]">{item.type}</TableCell>
                          <TableCell className="text-muted-foreground text-[11px]">{item.gen}</TableCell>
                          <TableCell>
                            {item.status === "Complete" ? (
                              <Badge className="bg-[#2d5a27] text-white rounded-full text-[10px] font-normal px-2 py-0 border-none">
                                ● Complete
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-[#f0e3c8] text-[#714d2a] rounded-full text-[10px] font-normal px-2 py-0 border-none gap-1">
                                <Loader2 className="w-2.5 h-2.5 animate-spin" /> Processing...
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                              <Download className="w-3.5 h-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
                <span>1-3 of 24</span>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="sm" className="h-7 text-xs border-slate-200" disabled>Prev</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs border-slate-200">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}