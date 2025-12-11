import React from 'react';
import { Activity, Wifi } from 'lucide-react';

interface StatsGridProps {
  activeDevices: number;
  totalDevices: number;
}

export default function StatsGrid({ activeDevices, totalDevices }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
        <div className="text-slate-500 text-xs font-mono uppercase mb-1">Active Nodes</div>
        <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          {activeDevices} / {totalDevices}
        </div>
      </div>
      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
        <div className="text-slate-500 text-xs font-mono uppercase mb-1">Network Bridge</div>
        <div className="text-2xl font-bold text-blue-400 flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          Stable
        </div>
      </div>
      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
        <div className="text-slate-500 text-xs font-mono uppercase mb-1">Uptime</div>
        <div className="text-2xl font-bold text-slate-200">
          14d 2h
        </div>
      </div>
      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
        <div className="text-slate-500 text-xs font-mono uppercase mb-1">BinderFS</div>
        <div className="text-2xl font-bold text-emerald-400 text-sm font-mono mt-1">
          /dev/binder: OK
        </div>
      </div>
    </div>
  );
}
