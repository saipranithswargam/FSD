# Use official Node.js image as base
FROM node:alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use NGINX for serving the built React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
