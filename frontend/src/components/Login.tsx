import React from 'react';
import { Terminal, Cpu, Lock, Power } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Matrix-ish effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,22,30,0.9),rgba(18,22,30,0.9)),url('https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
      
      <div className="z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span className="font-mono text-emerald-400 font-bold tracking-wider">NORTH METRO TECH</span>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-100">Franken-Farm Portal</h1>
            <p className="text-slate-400 text-sm">Z220 Workstation // Access Control</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Operator ID</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="AARON_CTO"
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 pl-10 text-slate-200 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <Cpu className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Passkey</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 pl-10 text-slate-200 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-all flex items-center justify-center gap-2 group"
            >
              <Power className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>INITIATE SESSION</span>
            </button>
          </div>
        </div>
        
        <div className="bg-slate-950/50 p-3 text-center border-t border-slate-800">
          <p className="text-xs text-slate-600 font-mono">System Status: ONLINE // i7-3770 [Ivy Bridge]</p>
        </div>
      </div>
    </div>
  );
}
