import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import Navbar from './Navbar';
import StatsGrid from './StatsGrid';
import DeviceCard from './DeviceCard';
import { Device, INITIAL_DEVICES } from '../types';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  
  const activeDevices = devices.filter(d => d.status === 'online').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Navbar onDisconnect={onLogout} />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Stats */}
        <StatsGrid activeDevices={activeDevices} totalDevices={devices.length} />

        {/* Device Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-slate-400" />
            Device Inventory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
            
            {/* Add New Node Placeholder */}
            <div className="relative overflow-hidden rounded-xl border border-dashed border-slate-800 bg-slate-900/20 flex flex-col items-center justify-center gap-3 min-h-[300px] hover:border-slate-600 hover:bg-slate-900/40 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all text-slate-600">
                <span className="text-2xl">+</span>
              </div>
              <span className="text-sm font-mono text-slate-500 group-hover:text-slate-300">Deploy New Node</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-slate-800 pt-6 mt-8 flex justify-between items-center text-xs text-slate-600 font-mono">
          <span>Z220-LAB-MANAGER-V3.0</span>
          <span>LEAN // ZERO-TRUST // FRANKEN-FARM</span>
        </div>
      </main>
    </div>
  );
}
