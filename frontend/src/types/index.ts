// --- Device Types ---
export type DeviceStatus = 'online' | 'offline' | 'booting';

export interface Device {
  id: string;
  name: string;
  port: number;
  status: DeviceStatus;
  ip: string;
}

// --- Mock Data ---
export const INITIAL_DEVICES: Device[] = [
  { id: 'dev-01', name: 'Redroid Node 1', port: 5555, status: 'online', ip: '192.168.1.220' },
  { id: 'dev-02', name: 'Redroid Node 2', port: 5556, status: 'online', ip: '192.168.1.220' },
  { id: 'dev-03', name: 'Redroid Node 3', port: 5557, status: 'booting', ip: '192.168.1.220' },
  { id: 'dev-04', name: 'Redroid Node 4', port: 5558, status: 'offline', ip: '192.168.1.220' },
];
