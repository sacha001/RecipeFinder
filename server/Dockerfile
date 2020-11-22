FROM node:12

WORKDIR /app/server

COPY package.json /app/server
COPY package-lock.json /app/server

RUN npm install

COPY . /app/server

CMD ["npm", "start"]