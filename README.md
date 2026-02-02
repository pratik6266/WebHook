# Webhook Monorepo

This is a monorepo containing two backend microservices built with Express and TypeScript.

## Monorepo Benefits

- **Shared Dependencies**: Common tools (TypeScript, nodemon, ts-node) are installed once at the root and shared across all services
- **Centralized Management**: Scripts, configurations, and dependencies managed from one place
- **Atomic Changes**: Changes across multiple services can be committed together
- **Consistent Tooling**: Same versions of development tools across all services
- **Efficient Storage**: Dependencies are hoisted to root, reducing duplication

## Services

- **Producer**: Runs on port 3001
- **Consumer**: Runs on port 3002

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build the services:
   ```bash
   pnpm build
   ```

3. Start the services:
   ```bash
   pnpm start
   ```

4. For development (with hot reload using nodemon):
   ```bash
   pnpm dev
   ```

## Docker Setup

### Build and Run with Docker Compose

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop services:**
   ```bash
   docker-compose down
   ```

### Individual Service Docker Commands

**Producer Service:**
```bash
# Build
docker build -f producer/Dockerfile -t webhook-producer .

# Run
docker run -p 3001:3001 webhook-producer
```

**Consumer Service:**
```bash
# Build
docker build -f consumer/Dockerfile -t webhook-consumer .

# Run
docker run -p 3002:3002 webhook-consumer
```

### Docker Architecture

- **Multi-stage builds** for optimized images
- **Health checks** for service monitoring
- **Alpine Linux** base for smaller images
- **Workspace-aware** dependency installation
- **Production-optimized** runtime