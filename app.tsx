import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Wifi, Activity, Lock, Server, Smartphone, ExternalLink, Power, AlertCircle } from 'lucide-react';

// --- Types ---
interface Device {
  id: string;
  name: string;
  port: number;
  status: 'online' | 'offline' | 'booting';
  ip: string;
}

// --- Mock Data ---
const INITIAL_DEVICES: Device[] = [
  { id: 'dev-01', name: 'Redroid Node 1', port: 5555, status: 'online', ip: '192.168.1.220' },
  { id: 'dev-02', name: 'Redroid Node 2', port: 5556, status: 'online', ip: '192.168.1.220' },
  { id: 'dev-03', name: 'Redroid Node 3', port: 5557, status: 'booting', ip: '192.168.1.220' },
  { id: 'dev-04', name: 'Redroid Node 4', port: 5558, status: 'offline', ip: '192.168.1.220' },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // --- Components ---

  const LoginPage = () => (
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
              onClick={() => setIsLoggedIn(true)}
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

  const Dashboard = () => (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Navbar */}
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
              onClick={() => setIsLoggedIn(false)}
              className="text-red-400 hover:text-red-300 font-mono text-xs uppercase hover:underline"
            >
              Disconnect
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
            <div className="text-slate-500 text-xs font-mono uppercase mb-1">Active Nodes</div>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              2 / 4
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

        {/* Device Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-slate-400" />
            Device Inventory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {devices.map((device) => (
              <div 
                key={device.id} 
                className={`
                  relative overflow-hidden rounded-xl border transition-all duration-300 group
                  ${device.status === 'online' ? 'border-emerald-500/30 bg-slate-900' : 
                    device.status === 'booting' ? 'border-amber-500/30 bg-slate-900' : 
                    'border-slate-800 bg-slate-900/50 grayscale'}
                `}
              >
                {/* Status Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
                  style={{ color: device.status === 'online' ? '#10b981' : device.status === 'booting' ? '#f59e0b' : '#334155' }}
                />

                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-200">{device.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-1">PORT: {device.port}</p>
                    </div>
                    <span className={`
                      px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                      ${device.status === 'online' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 
                        device.status === 'booting' ? 'bg-amber-950 text-amber-400 border border-amber-900' : 
                        'bg-slate-800 text-slate-500 border border-slate-700'}
                    `}>
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
                       <button disabled className="w-full bg-slate-900 border border-slate-800 text-slate-600 text-sm font-semibold py-2 rounded cursor-not-allowed">
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              </div>
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

  return (
    <div className="antialiased">
      {isLoggedIn ? <Dashboard /> : <LoginPage />}
    </div>
  );
}