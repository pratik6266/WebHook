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

## Project Structure

```
webhook/
├── package.json
├── pnpm-workspace.yaml
├── producer/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   └── index.ts
│   └── dist/
└── consumer/
    ├── package.json
    ├── tsconfig.json
    ├── src/
    │   └── index.ts
    └── dist/
```