FROM node:10-alpine

RUN mkdir -p /home/pipedrive/app/node_modules && chown -R node:node /home/pipedrive/app

WORKDIR /home/pipedrive/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080