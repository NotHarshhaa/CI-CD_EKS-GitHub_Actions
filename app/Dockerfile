# syntax=docker/dockerfile:1

# ---- Base: shared dependency manifest -------------------------------
FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

# ---- Development: all deps (incl. nodemon) for docker-compose ------
FROM base AS development

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ---- Dependencies: production-only dependency tree -----------------
FROM base AS dependencies

RUN npm ci --omit=dev && npm cache clean --force

# ---- Production: minimal runtime image ------------------------------
FROM node:22-alpine AS production

# dumb-init forwards signals correctly as PID 1
RUN apk add --no-cache dumb-init

WORKDIR /app

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

COPY --chown=nodejs:nodejs . .

ENV NODE_ENV=production \
    PORT=3000

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "index.js"]
