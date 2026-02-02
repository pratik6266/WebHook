# Makefile for Webhook Monorepo

.PHONY: help install build dev start test clean docker-build docker-up docker-down docker-logs docker-dev docker-prod

# Default target
help:
	@echo "Available commands:"
	@echo "  install      - Install dependencies"
	@echo "  build        - Build all packages"
	@echo "  dev          - Run development servers"
	@echo "  start        - Start production servers"
	@echo "  test         - Run tests"
	@echo "  clean        - Clean build artifacts"
	@echo "  docker-build - Build Docker images"
	@echo "  docker-up    - Start Docker containers"
	@echo "  docker-down  - Stop Docker containers"
	@echo "  docker-logs  - Show Docker logs"
	@echo "  docker-dev   - Run in Docker development mode"
	@echo "  docker-prod  - Run in Docker production mode"

# Install dependencies
install:
	pnpm install

# Build all packages
build:
	pnpm build

# Run development servers
dev:
	pnpm dev

# Start production servers
start:
	pnpm start

# Run tests
test:
	pnpm test

# Clean build artifacts
clean:
	rm -rf producer/dist consumer/dist node_modules/.cache

# Docker commands
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

# Run in Docker development mode (with hot reload)
docker-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Run in Docker production mode
docker-prod:
	docker-compose -f docker-compose.yml up --build -d