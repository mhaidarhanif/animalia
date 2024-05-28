# Use the official Node.js image from the Docker Hub
FROM node:lts-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy app files
COPY . .

# Install app dependencies
RUN npm install

RUN npm run generate

# Run the application
CMD ["npm", "start"]
