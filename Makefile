.PHONY: install install-backend install-frontend dev dev-backend dev-frontend build build-backend build-frontend clean

# Install all dependencies
install: install-backend install-frontend

install-backend:
	cd backend && yarn install

install-frontend:
	cd frontend && yarn install

# Start in development mode (both services)
dev:
	@echo "Starting backend and frontend in parallel..."
	@make -j2 dev-backend dev-frontend

dev-backend:
	cd backend && yarn run dev

dev-frontend:
	cd frontend && yarn run dev

# Build for production
build: build-backend build-frontend

build-backend:
	cd backend && yarn run build

build-frontend:
	cd frontend && yarn run build

# Clean generated files and dependencies
clean:
	rm -rf backend/node_modules backend/dist frontend/node_modules frontend/dist
