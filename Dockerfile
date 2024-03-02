FROM node:latest

WORKDIR /app/client

COPY . .

RUN yarn install

CMD ["yarn", "start"]