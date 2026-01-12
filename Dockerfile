FROM node:20.11.1-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

CMD ["npm", "start"]