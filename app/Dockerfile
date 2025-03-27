# Use a multi-stage build to keep the final image lightweight
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies with production flag
RUN npm install --only=production

# Copy application source code
COPY . .

# Expose the port
EXPOSE 3000

# Set a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Run the app
CMD ["node", "index.js"]
