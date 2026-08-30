import React from 'react';
import { Search, SlidersHorizontal, Download, Plus, MoreVertical, Sparkles, Sprout, Wheat, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const cases = [
  { id: '#CG-8821', crop: 'Cotton', icon: Sprout, dist: 'Jalgaon', sub: 'Bhusawal', diag: 'Pink Bollworm', conf: '94%', sev: 'High (85%)', status: 'Field Verified', badge: 'bg-red-100 text-red-700' },
  { id: '#CG-8820', crop: 'Sugarcane', icon: Wheat, dist: 'Kolhapur', sub: 'Karvir', diag: 'Red Rot', conf: '78%', sev: 'Medium (45%)', status: 'Expert Reviewed', badge: 'bg-amber-100 text-amber-800' },
  { id: '#CG-8819', crop: 'Soybean', icon: Leaf, dist: 'Latur', sub: 'Ausa', diag: 'Yellow Mosaic', conf: '91%', sev: 'High (72%)', status: 'Pending Review', badge: 'bg-stone-200 text-stone-700' },
];

export default function CaseManagement() {
  return (
    <div className="w-full min-h-screen bg-[#faf8f5] p-4 sm:p-6 lg:p-8 text-slate-800 text-xs">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Case Management</h1>
            <p className="text-slate-500">View and manage all agricultural anomaly reports.</p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none bg-white gap-1 text-xs"><SlidersHorizontal className="w-3.5 h-3.5" /> Filters</Button>
            <Button variant="outline" className="flex-1 sm:flex-none bg-white gap-1 text-xs"><Download className="w-3.5 h-3.5" /> Export</Button>
            <Button className="w-full sm:w-auto bg-[#2d5a37] text-white gap-1 hover:bg-[#23472b] text-xs"><Plus className="w-3.5 h-3.5" /> New Case</Button>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs space-y-4 border border-slate-100">
          
          {/* Search & Counter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <Input placeholder="Search by ID, Crop, or District..." className="bg-[#edf3ec] border-none pl-8 text-xs h-9" />
            </div>
            <span className="text-slate-500 text-right sm:text-left">Showing 1-10 of 156 Cases</span>
          </div>

          {/* Table Container (Scrollable on small devices) */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full min-w-150 text-left border-collapse">
              <thead>
                <tr className="text-[#7e4a1a] border-b border-slate-100 font-semibold">
                  <th className="py-3">Case ID</th>
                  <th>Crop</th>
                  <th>Location</th>
                  <th>AI Diagnosis</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases.map((item) => {
                  const Icon = item.icon;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-medium text-[#2d5a37]">{item.id}</td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-4 h-4 text-[#7e4a1a]" /> {item.crop}
                        </div>
                      </td>
                      <td>
                        <div>{item.dist}</div>
                        <div className="text-slate-400 text-[10px]">{item.sub}</div>
                      </td>
                      <td>
                        <div>{item.diag}</div>
                        <div className="text-[#2d5a37] text-[10px] flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />{item.conf} Confidence
                        </div>
                      </td>
                      <td className={item.sev.startsWith('High') ? 'text-red-600 font-medium' : 'text-amber-600 font-medium'}>
                        ● {item.sev}
                      </td>
                      <td>
                        <Badge className={`${item.badge} rounded-full border-none font-normal text-[11px] px-2.5 py-0.5`}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer inline" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-[#f4f2ea] p-2.5 rounded-lg text-slate-600 font-medium">
            <div className="flex justify-between w-full sm:w-auto gap-2">
              <Button variant="outline" size="sm" className="bg-white h-7 text-xs flex-1 sm:flex-none" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-white h-7 text-xs flex-1 sm:flex-none sm:hidden">Next</Button>
            </div>

            <div className="flex gap-1">
              <span className="w-6 h-6 flex items-center justify-center bg-[#2d5a37] text-white rounded">1</span>
              <span className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/50 cursor-pointer">2</span>
              <span className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/50 cursor-pointer">3</span>
              <span className="px-1">...</span>
              <span className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/50 cursor-pointer">10</span>
            </div>

            <Button variant="outline" size="sm" className="bg-white h-7 text-xs hidden sm:inline-flex">Next</Button>
          </div>

        </div>
      </div>
    </div>
  );
}