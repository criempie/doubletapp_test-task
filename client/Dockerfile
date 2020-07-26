FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --silent --save

COPY . .

EXPOSE 3001:3000

CMD ["npm", "start"]