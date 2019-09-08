FROM debian:latest

ARG API_SECRET_KEY

ENV API_SECRET_KEY=$API_SECRET_KEY

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y software-properties-common python && \
    apt-get install curl -y && curl -sSL https://deb.nodesource.com/setup_10.x | sh && \
    apt-get install -y nodejs && apt-get install -y build-essential && \
    apt-get clean && apt-get autoremove

RUN mkdir -p /var/www/api

COPY . /var/www/api/

WORKDIR /var/www/api

CMD ["npm", "ci"]

EXPOSE 4000/tcp

