FROM node:alpine

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run reseed

EXPOSE 8082

CMD ["npm", "start"]