FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built application
COPY .next ./.next
COPY public ./public
COPY next.config.ts ./

# Expose port
EXPOSE 3001

# Set environment
ENV PORT=3001
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
