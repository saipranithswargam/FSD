# Use official Node.js image as base
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5050

# Command to run the server
CMD ["node", "app.js"]
