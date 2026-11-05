# Use official Node.js lightweight LTS image
FROM node:20-slim

# Create a non-root user for Hugging Face container permissions (User ID 1000)
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set working directory inside container
WORKDIR /app

# Copy package management files with correct user permissions
COPY --chown=user package*.json ./

# Install application dependencies
RUN npm ci

# Copy all application source code
COPY --chown=user . .

# Hugging Face Spaces expects the application to run on port 7860
EXPOSE 7860
ENV PORT=7860

# Command to start your Express application
CMD ["npm", "start"]
