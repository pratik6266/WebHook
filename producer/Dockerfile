# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Install curl for health checks and pnpm globally
RUN apk add --no-cache curl && npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files for workspace setup
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy service-specific package files
COPY producer/package.json ./producer/

# Install dependencies (this will install both root and service deps)
RUN pnpm install --frozen-lockfile

# Copy service source code
COPY producer/src ./producer/src
COPY producer/tsconfig.json ./producer/

# Build the service
RUN cd producer && pnpm build

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# Run the service
CMD ["pnpm", "--filter", "producer", "start"]