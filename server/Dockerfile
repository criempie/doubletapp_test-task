FROM node:alpine

COPY package*.json ./

RUN npm install mongodb --save \
 && npm install express --save \
 && npm install multer --save

COPY . .

CMD ["node", "start.js"]