FROM node:18-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci 

COPY . /opt/app

RUN pnpm i && pnpm build

CMD [ "npm", "start" ]