# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Expose the port (GCP Cloud Run expects 8080)
EXPOSE 8080

# Command to run the application
CMD [ "node", "server.js" ]
