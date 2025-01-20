FROM nginx:stable-alpine

ADD ./nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/www/html/backend

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

RUN chown laravel:laravel /var/www/html/backend

COPY default.conf /etc/nginx/templates/default.conf.template
COPY docker-default.sh /

# Just in case the file mode was not properly set in Git
RUN chmod +x /docker-default.sh

# This will delegate to the original `docker-entrypoint.sh`
ENTRYPOINT ["/docker-default.sh"]

CMD ["nginx", "-g", "daemon off;"]
