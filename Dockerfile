# Multi-stage Dockerfile for Astro static site
# Based on markdown-pdf deployment pattern

# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (cached layer)
RUN npm ci --production=false

# Copy source code
COPY . .

# Build and export static site
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built static files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Add health check - check root page
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
