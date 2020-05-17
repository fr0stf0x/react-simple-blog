FROM node:12-alpine

WORKDIR /usr/src/client

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 1234 1235

CMD ["yarn", "start"]
