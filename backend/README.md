# Backend - North Metro Portal

This directory contains the Docker Compose orchestration for the entire North Metro Portal stack.

## Services

### Redroid Nodes (Android Containers)
- **redroid-1** → Port 5555 → WebSocket 8000
- **redroid-2** → Port 5556 → WebSocket 8001
- **redroid-3** → Port 5557 → WebSocket 8002
- **redroid-4** → Port 5558 → WebSocket 8003

### WS-SCRCPY Bridges
- **scrcpy-1** → Port 8000 (connects to redroid-1)
- **scrcpy-2** → Port 8001 (connects to redroid-2)
- **scrcpy-3** → Port 8002 (connects to redroid-3)
- **scrcpy-4** → Port 8003 (connects to redroid-4)

### Frontend
- **frontend** → Port 3000 (Nginx serving React build)

## Quick Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart redroid-1

# Check status
docker-compose ps
```

## Data Persistence

Container data is stored in `./data/`:
- `./data/redroid-1/` → Redroid 1 persistent storage
- `./data/redroid-2/` → Redroid 2 persistent storage
- `./data/redroid-3/` → Redroid 3 persistent storage
- `./data/redroid-4/` → Redroid 4 persistent storage

These directories are gitignored and contain the Android system data for each container.

## Network Architecture

```
Frontend (3000) → ws-scrcpy (8000-8003) → Redroid (5555-5558)
```

All services use bridge networking for isolation and performance.
