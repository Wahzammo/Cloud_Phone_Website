# 🖥️ North Metro Portal - Franken-Farm

**A cyberpunk-themed web dashboard for managing Android container farms (Redroid) on legacy hardware.**

---

## 📋 Project Overview

The **North Metro Portal** is a production-ready web interface for managing a farm of Android containers running on the HP Z220 "Franken-Farm" workstation. Built with a **lean, flat architecture** optimized for low-resource environments, it provides real-time monitoring and control of virtualized Android devices through an elegant Matrix/cyberpunk aesthetic.

### Mission Statement
> "Maximum efficiency, minimum bloat. Zero Trust security. Legacy hardware, modern capabilities."

---

## 🏗️ Architecture

### Hardware Specifications
- **Workstation:** HP Z220 Workstation
- **CPU:** Intel Core i7-3770 (Ivy Bridge, 4C/8T)
  - ⚠️ **Constraint:** AVX support only (no AVX2/AVX-512)
- **RAM:** 32GB DDR3
- **OS:** Ubuntu Server 22.04 LTS (Headless)
- **Kernel:** Linux 5.15 LTS
  - ⚠️ **Critical:** Do NOT upgrade to HWE (6.x) - breaks BinderFS/Ashmem

### Tech Stack

```
┌─────────────────────────────────────────────────┐
│         FRONTEND (React Dashboard)              │
│  React 18 + Vite + Tailwind CSS + TypeScript   │
│         Served via Nginx Alpine (~25MB)         │
└─────────────────┬───────────────────────────────┘
                  │ Direct WebSocket
                  ▼
┌─────────────────────────────────────────────────┐
│       WS-SCRCPY BRIDGES (4x instances)          │
│    WebSocket Server for Browser Streaming       │
└─────────────────┬───────────────────────────────┘
                  │ ADB Protocol
                  ▼
┌─────────────────────────────────────────────────┐
│       REDROID NODES (4x Android 12.0.0)         │
│   Containerized Android with BinderFS/Ashmem    │
└─────────────────────────────────────────────────┘
```

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No Backend API Layer** | i7-3770 has limited threads. Direct WebSocket to ws-scrcpy reduces overhead. |
| **Mock Authentication** | Zero Trust via Cloudflare Tunnels/Tailscale handles real security. UI login is a "velvet rope" only. |
| **Read-Only Device Control** | Mounting docker.sock is a security risk. V1 focuses on visibility. Reboot via SSH for now. |
| **Multi-Stage Docker Build** | Node 18 build stage → Nginx Alpine serve (~25MB final image vs 1GB+ with Node). |
| **30 FPS Cap** | Ivy Bridge CPU constraint. Keeps frame rate manageable for older AVX-only instructions. |

---

## 📁 Project Structure

```
north-metro-portal/
├── backend/
│   ├── docker-compose.yml      # Full stack orchestration
│   └── data/                   # Persistent volumes (gitignored)
│       ├── redroid-1/
│       ├── redroid-2/
│       ├── redroid-3/
│       └── redroid-4/
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Modular React components
│   │   │   ├── Login.tsx       # Auth screen (velvet rope UI)
│   │   │   ├── Dashboard.tsx   # Main container
│   │   │   ├── Navbar.tsx      # Top navigation
│   │   │   ├── StatsGrid.tsx   # System stats cards
│   │   │   └── DeviceCard.tsx  # Individual device display
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript interfaces
│   │   ├── App.tsx             # Main router
│   │   ├── main.tsx            # Vite entry
│   │   └── index.css           # Tailwind imports
│   ├── Dockerfile              # Multi-stage build
│   ├── nginx.conf              # SPA routing config
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── .gitignore
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Docker** & **Docker Compose** installed
- **Node.js 18+** (for local dev only)
- **BinderFS** mounted at `/dev/binderfs/binder`
- **Linux Kernel 5.15 LTS** (critical for Redroid)

### Production Deployment (Z220)

```bash
# 1. Clone the repository
git clone <your-repo-url> north-metro-portal
cd north-metro-portal

# 2. Navigate to backend
cd backend

# 3. Start all services
docker-compose up -d

# 4. Verify services
docker-compose ps

# 5. Access the portal
# Open browser: http://192.168.1.220:3000
```

**Services will be running:**
- Frontend: `http://192.168.1.220:3000`
- WS-SCRCPY Bridges: `http://192.168.1.220:8000-8003`
- Redroid ADB: `5555-5558`

### Development Workflow (Laptop)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open browser
# Vite will run at: http://localhost:5173
```

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

### Key Variables:
- `SERVER_IP`: Your Z220's IP address (default: 192.168.1.220)
- `REDROID_X_PORT`: ADB ports for each Android container
- `SCRCPY_X_PORT`: WebSocket ports for streaming bridges
- `FRONTEND_PORT`: Dashboard web interface port

---

## 🛠️ Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild frontend container
docker-compose up -d --build frontend

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f redroid-1
docker-compose logs -f scrcpy-1
docker-compose logs -f frontend

# Restart a single service
docker-compose restart redroid-1
```

---

## 🔐 Security Model

### Zero Trust Network Layer
- **Cloudflare Tunnels** or **Tailscale VPN** for remote access
- No public-facing ports
- Network-level authentication handles real security

### Application Layer
- Mock login screen (UX only, prevents accidental clicks)
- No JWT/session management (handled by VPN layer)
- Read-only device control (no docker.sock mounting)

---

## 🐛 Troubleshooting

### BinderFS Issues
```bash
# Verify BinderFS is mounted
ls -la /dev/binderfs/binder

# If missing, mount it:
sudo mkdir -p /dev/binderfs
sudo mount -t binder binder /dev/binderfs
```

### Kernel Version Check
```bash
uname -r
# Should show: 5.15.x-xxx-generic
# DO NOT upgrade to 6.x (breaks Redroid)
```

### Container Won't Start
```bash
# Check logs
docker logs redroid-1

# Verify devices are accessible
ls -la /dev/binder
ls -la /dev/dri
```

### Frontend Build Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🗺️ Roadmap

### V1.0 (Current) ✅
- [x] Monorepo structure
- [x] Modular React components
- [x] Multi-stage Docker build
- [x] Full Docker Compose orchestration
- [x] Cyberpunk UI theme
- [x] Real-time device status display

### V2.0 (Future)
- [ ] WebSocket API for real-time status updates
- [ ] Container control (start/stop via Docker API)
- [ ] System metrics monitoring (CPU, RAM, network)
- [ ] Device health checks and alerts
- [ ] Logs viewer integration
- [ ] Dark/Light theme toggle
- [ ] Mobile-responsive improvements

### V3.0 (Ambitious)
- [ ] Device automation scripts
- [ ] Scheduled tasks and cron jobs
- [ ] Analytics dashboard
- [ ] Multi-user support with roles
- [ ] Backup/restore functionality

---

## 📚 Key Technologies

- **Frontend:** React 18, Vite, Tailwind CSS, TypeScript, Lucide Icons
- **Backend:** Docker, Docker Compose
- **Android:** Redroid 12.0.0
- **Streaming:** WS-SCRCPY
- **Web Server:** Nginx Alpine
- **Version Control:** Git

---

## 🤝 Contributing

This is a personal project optimized for the Z220 Franken-Farm. Feel free to fork and adapt for your own hardware.

### Making Changes
1. Create a feature branch
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Test in production with Docker
5. Submit a pull request

---

## 📝 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Aaron Clifft** - CTO, North Metro Tech  
Building lean, efficient systems on legacy hardware.

---

## 🎯 Philosophy

> "The best code is the code you don't write.  
> The best server is the one you already have.  
> Maximum capability, minimum complexity."

---

**Built with ⚡ on the Franken-Farm Z220**
