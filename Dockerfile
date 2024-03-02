FROM node:20.11.1-alpine

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "start"]