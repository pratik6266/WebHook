# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Install curl for health checks and pnpm globally
RUN apk add --no-cache curl && npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files for workspace setup
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy service-specific package files
COPY consumer/package.json ./consumer/

# Install dependencies (this will install both root and service deps)
RUN pnpm install --frozen-lockfile

# Copy service source code
COPY consumer/src ./consumer/src
COPY consumer/tsconfig.json ./consumer/

# Build the service
RUN cd consumer && pnpm build

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3002/ || exit 1

# Run the service
CMD ["pnpm", "--filter", "consumer", "start"]