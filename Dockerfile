# Use a base image with a web server
FROM nginx:latest

# Copy the HTML files to the appropriate location
COPY loginchatgpt.html /usr/share/nginx/html/
COPY welcome.html /usr/share/nginx/html/

# Expose port 80 (default HTTP port)
EXPOSE 80
