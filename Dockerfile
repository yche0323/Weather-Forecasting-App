# Stage 1: Build the frontend
FROM node:19 AS frontend-build

# Set working directory inside the Docker container
WORKDIR /client

# Copy the frontend files from your local client/ directory
COPY client/package*.json ./
COPY client/ ./

# Install dependencies and build the frontend
RUN npm install
RUN npm run build

# Stage 2: Build the backend
FROM node:19 AS backend-build

# Set working directory inside the Docker container
WORKDIR /backend

# Copy the backend files from your local backend/ directory
COPY backend/package*.json ./
COPY backend/ ./

# Install dependencies
RUN npm install

# Copy the frontend build to the backend's public directory
COPY --from=frontend-build /client/build ./public

# Stage 3: Run the backend
FROM node:19

# Set working directory inside the Docker container
WORKDIR /backend

# Copy backend files from the previous build stage
COPY --from=backend-build /backend .

# Expose port 8080
EXPOSE 8080

# Start the backend server
CMD ["npm", "start"]
