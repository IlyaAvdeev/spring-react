# Use the latest LTS version of Node.js
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY /frontend/package*.json ./

# Install dependencies
RUN npm install
RUN npm install web-vitals
RUN npm install --save bootstrap react-cookie react-router-dom@5.2.0 reactstrap


# Copy the rest of your application files
COPY ./frontend .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]