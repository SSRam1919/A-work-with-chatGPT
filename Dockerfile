# Use a base image with a web server
FROM nginx:latest
FROM php:7.4-apache

# Copy PHP script into the container
COPY login.php /var/www/html/

#RUN rm /usr/share/nginx/html/index.html
RUN rm /etc/nginx/conf.d/default.conf


# Copy the HTML files to the appropriate location
COPY login.html /usr/share/nginx/html/
COPY welcome.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80 (default HTTP port)
EXPOSE 80
