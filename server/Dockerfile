FROM node:alpine

COPY package*.json ./

RUN npm install mongodb --save \
 && npm install express --save \
 && npm install body-parser --save \
 && nom install mongoose --save

COPY . .

CMD ["node", "start.js"]