import React from 'react';
import { Wifi, ExternalLink, AlertCircle } from 'lucide-react';
import { Device } from '../types';

interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  const getStatusColor = () => {
    switch (device.status) {
      case 'online':
        return 'border-emerald-500/30 bg-slate-900';
      case 'booting':
        return 'border-amber-500/30 bg-slate-900';
      case 'offline':
        return 'border-slate-800 bg-slate-900/50 grayscale';
    }
  };

  const getStatusBadge = () => {
    const baseClasses = 'px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider';
    switch (device.status) {
      case 'online':
        return `${baseClasses} bg-emerald-950 text-emerald-400 border border-emerald-900`;
      case 'booting':
        return `${baseClasses} bg-amber-950 text-amber-400 border border-amber-900`;
      case 'offline':
        return `${baseClasses} bg-slate-800 text-slate-500 border border-slate-700`;
    }
  };

  const getStatusBarColor = () => {
    switch (device.status) {
      case 'online':
        return '#10b981';
      case 'booting':
        return '#f59e0b';
      case 'offline':
        return '#334155';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 group ${getStatusColor()}`}>
      {/* Status Bar */}
      <div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
        style={{ color: getStatusBarColor() }}
      />

      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-200">{device.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">PORT: {device.port}</p>
          </div>
          <span className={getStatusBadge()}>
            {device.status}
          </span>
        </div>

        {/* Visual Representation of Screen */}
        <div className="aspect-[9/16] bg-black rounded-lg border border-slate-800 relative flex items-center justify-center overflow-hidden group-hover:border-slate-600 transition-colors">
          {device.status === 'online' ? (
            <div className="text-center space-y-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto animate-pulse">
                <Wifi className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-500 font-mono">Ready to Stream</p>
            </div>
          ) : device.status === 'booting' ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-amber-500 font-mono">Loading OS...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-600">
              <AlertCircle className="w-8 h-8" />
              <p className="text-xs font-mono">NO SIGNAL</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2">
          {device.status === 'online' ? (
            <button 
              onClick={() => window.open(`http://${device.ip}:8000`, '_blank')}
              className="w-full bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 border border-slate-700 text-sm font-semibold py-2 rounded transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Launch Interface
            </button>
          ) : (
            <button 
              disabled 
              className="w-full bg-slate-900 border border-slate-800 text-slate-600 text-sm font-semibold py-2 rounded cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
