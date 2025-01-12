FROM node:23

# Set the working directory
WORKDIR /app

# Copy the application file
COPY app.js .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]