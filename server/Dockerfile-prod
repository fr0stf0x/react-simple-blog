FROM node:12-alpine

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install 

COPY . .

# Fix bcrypt
RUN apk update && apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

EXPOSE 3000

CMD ["npm", "run", "docker"]
