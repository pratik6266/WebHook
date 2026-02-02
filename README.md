# Webhook Monorepo

A monorepo containing two Express.js microservices that demonstrate webhook functionality. The **Producer** service manages webhook registrations and triggers events, while the **Consumer** service receives and processes webhook notifications.

## Architecture

```
┌─────────────────┐    Webhook Events    ┌─────────────────┐
│   Producer      │ ──────────────────► │   Consumer      │
│   (Port 3001)   │                     │   (Port 3002)   │
│                 │                     │                 │
│ • Register      │                     │ • Receive       │
│   Webhooks      │                     │   Webhooks      │
│ • Trigger       │                     │ • Process       │
│   Events        │                     │   Events        │
│ • Health Check  │                     │ • Health Check  │
└─────────────────┘                     └─────────────────┘
```

## Features

- **Webhook Registration**: Register webhook URLs with specific events
- **Event Triggering**: Simulate purchase events that notify all registered webhooks
- **Graceful Shutdown**: Proper cleanup on service termination
- **TypeScript**: Full type safety across services
- **Docker Support**: Containerized deployment
- **Monorepo**: Shared tooling and efficient dependency management

## API Documentation

### Producer Service (Port 3001)

#### Health Check
```http
GET /
```
**Response:** `"Producer service is running!"`

#### Register Webhook
```http
POST /register/webhook
Content-Type: application/json

{
  "url": "http://localhost:3002/consume",
  "event": "purchase"
}
```
**Response:** `"Webhook registered successfully"`

#### Trigger Purchase Event
```http
GET /purchase
```
**Response:** Triggers webhooks to all registered URLs
```json
{
  "message": "Purchase event processed",
  "webhooksTriggered": 1,
  "results": [
    {
      "url": "http://localhost:3002/consume",
      "status": 200
    }
  ]
}
```

### Consumer Service (Port 3002)

#### Health Check
```http
GET /
```
**Response:** `"Consumer service is running!"`

#### Receive Webhook
```http
POST /consume
Content-Type: application/json

{
  "event": "purchase",
  "data": {
    "item": "Sample Item",
    "price": 100
  }
}
```
**Response:** `"Webhook received successfully"`

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Services
```bash
# Development mode (with hot reload)
pnpm dev

# Production mode
pnpm start
```

### 3. Test Webhook Flow

**Terminal 1: Register a webhook**
```bash
curl -X POST http://localhost:3001/register/webhook \
  -H "Content-Type: application/json" \
  -d '{"url": "http://localhost:3002/consume", "event": "purchase"}'
```

**Terminal 2: Trigger purchase event**
```bash
curl http://localhost:3001/purchase
```

**Expected Output:**
- Producer logs: `"Sending purchase event to http://localhost:3002/consume"`
- Consumer logs: `"Received webhook event: { event: 'purchase', data: {...} }"`

## Docker Deployment

### Using Docker Compose (Recommended)
```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

### Individual Services
```bash
# Producer
docker build -f producer/Dockerfile -t webhook-producer .
docker run -p 3001:3001 webhook-producer

# Consumer
docker build -f consumer/Dockerfile -t webhook-consumer .
docker run -p 3002:3002 webhook-consumer
```

## Development

### Available Scripts
```bash
# Install dependencies
pnpm install

# Build all services
pnpm build

# Start all services (production)
pnpm start

# Start all services (development with hot reload)
pnpm dev

# Run specific service
pnpm --filter producer dev
pnpm --filter consumer dev

# Test all services
pnpm test
```

### Project Structure
```
webhook/
├── package.json              # Root monorepo config
├── pnpm-workspace.yaml       # Workspace configuration
├── docker-compose.yml        # Multi-service orchestration
├── producer/                 # Producer microservice
│   ├── Dockerfile           # Container definition
│   ├── package.json         # Service dependencies
│   ├── src/index.ts         # Express server + webhook logic
│   └── tsconfig.json        # TypeScript config
├── consumer/                 # Consumer microservice
│   ├── Dockerfile           # Container definition
│   ├── package.json         # Service dependencies
│   ├── src/index.ts         # Express server + webhook receiver
│   └── tsconfig.json        # TypeScript config
└── README.md                # This file
```

## Monorepo Benefits

- **Shared Dependencies**: TypeScript, nodemon, ts-node installed once at root
- **Centralized Management**: Scripts and configs managed from one place
- **Atomic Changes**: Changes across services committed together
- **Consistent Tooling**: Same versions of development tools
- **Efficient Storage**: Dependencies hoisted to root, reducing duplication
- **Cross-Service Imports**: Services can import utilities from each other

## Technology Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Framework**: Express.js
- **Package Manager**: pnpm
- **Monorepo Tool**: pnpm workspaces
- **Development**: nodemon (hot reload)
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git

## Development Notes

### Graceful Shutdown
Both services implement graceful shutdown handling for proper cleanup on termination signals (SIGTERM, SIGINT).

### Error Handling
- JSON parsing errors are handled with appropriate HTTP status codes
- Unhandled errors are logged and return 500 status
- Webhook validation ensures required fields are present

### Port Configuration
- Producer: `PORT` environment variable or 3001
- Consumer: `PORT` environment variable or 3002

### Environment Variables
```bash
# Optional: Override default ports
PORT=3001  # For producer
PORT=3002  # For consumer
```

## Contributing

1. Follow the existing code style and TypeScript conventions
2. Add tests for new functionality
3. Update documentation for API changes
4. Ensure Docker builds work correctly

## License

ISC