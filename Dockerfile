FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${PORT}

COPY ./dist ./dist

CMD ["npm", "run", "start:docker"]