FROM node:latest

RUN node -v && npm -v

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
