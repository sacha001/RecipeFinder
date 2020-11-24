FROM node:12

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install request

COPY . .

EXPOSE 5000

CMD ["npm", "start"]