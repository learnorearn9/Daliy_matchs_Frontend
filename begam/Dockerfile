# Use the Node.js version matching your system
FROM node:20.5.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server to serve the React app
RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 3000

# Set the command to start the server
CMD ["npm", "start"]
