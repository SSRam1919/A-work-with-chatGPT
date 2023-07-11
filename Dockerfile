# Use a base image with a web server
FROM nginx:latest

RUN rm /usr/share/nginx/html/index.html

# Copy the HTML files to the appropriate location
COPY index.html /usr/share/nginx/html/
COPY welcome.html /usr/share/nginx/html/

# Expose port 80 (default HTTP port)
EXPOSE 80
