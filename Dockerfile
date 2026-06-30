# =============================================================
# Portfolio Dockerfile — multi-stage build
#
# Stage 1 (build):   compiles React/TS to static assets via Vite
# Stage 2 (runtime): serves static assets with nginx:alpine
#
# Mirrors the dashboard frontend: non-root nginx user, port 8080.
# =============================================================

# --- Build stage ---
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# --- Runtime stage ---
FROM nginxinc/nginx-unprivileged:alpine AS runtime
# Upgrade Alpine packages to pick up any patched OS-level CVEs
USER root
RUN apk upgrade --no-cache
# Replace default site config with SPA config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Drop back to the built-in non-root user (UID 101)
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
