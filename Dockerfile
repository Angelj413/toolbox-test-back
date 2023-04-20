# Use an official Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the Express server will run on
EXPOSE 3000

# Start the Express server when the container runs
CMD ["npm", "start"]
