# Use the official Node.js image from the Docker Hub
FROM oven/bun:alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy app files
COPY . .

# Install app dependencies
RUN bun install

# Bind the app to port 3000
EXPOSE 3000

# Run the application
CMD ["bun", "start"]