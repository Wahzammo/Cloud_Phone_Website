import React from 'react';
import { Terminal, Cpu, Server } from 'lucide-react';

interface NavbarProps {
  onDisconnect: () => void;
}

export default function Navbar({ onDisconnect }: NavbarProps) {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-900/30 border border-emerald-500/30 rounded flex items-center justify-center">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 tracking-tight leading-none">FRANKEN-FARM</h1>
            <span className="text-xs text-emerald-500 font-mono">Z220 CLOUD NODE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-slate-400 hidden sm:flex">
            <Cpu className="w-4 h-4" />
            <span className="font-mono">Load: 34%</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 hidden sm:flex">
            <Server className="w-4 h-4" />
            <span className="font-mono">Mem: 12GB/32GB</span>
          </div>
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <button 
            onClick={onDisconnect}
            className="text-red-400 hover:text-red-300 font-mono text-xs uppercase hover:underline"
          >
            Disconnect
          </button>
        </div>
      </div>
    </nav>
  );
}
