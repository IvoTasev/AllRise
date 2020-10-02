FROM node:8.15.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD [ "npm","run","start" ]
