FROM nginx:1.21

MAINTAINER tongwoo

EXPOSE 80

ENV API=http://host.docker.internal

WORKDIR /app

COPY --chown=nginx:nginx . .
COPY --chown=nginx:nginx ./conf/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx ./conf/app.conf /etc/nginx/templates/default.conf.template
