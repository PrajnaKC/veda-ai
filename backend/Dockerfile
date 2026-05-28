FROM node:20-alpine AS builder
WORKDIR /app

# Copy repository files
COPY package.json package-lock.json* ./
COPY . .

# Install full deps and build backend
RUN npm install
RUN npm run build:backend

FROM node:20-alpine AS runner
WORKDIR /app

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy built backend
COPY --from=builder /app/backend/dist ./backend/dist

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "backend/dist/server.js"]
