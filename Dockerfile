FROM registry.b2w.io/b2wdigital/nodejs:6

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 8080

CMD ["yarn", "start"]
