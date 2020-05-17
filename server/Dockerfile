FROM node:12-alpine

WORKDIR /usr/src/server

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN yarn 

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]
