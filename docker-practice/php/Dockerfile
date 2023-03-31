FROM php:8.1.4-fpm-alpine

RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
COPY ./php/settings/php.ini /usr/local/etc/php/conf.d/php.ini
COPY ./root /var/www/html

RUN docker-php-ext-install mysqli

RUN apk update && \
  # apk upgrade && \
  apk add --update --no-cache \
  # autoconf \
  # zlib1g-dev \
  libjpeg-turbo-dev \
  libwebp-dev \
  libpng-dev
  # libxml2-dev \
  # libxslt-dev

RUN docker-php-ext-configure gd --with-jpeg
# RUN docker-php-ext-configure gd
# RUN docker-php-ext-install gd
RUN docker-php-ext-install -j$(nproc) gd
# RUN apk add php8.1-gd