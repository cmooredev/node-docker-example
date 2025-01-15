FROM node:23

WORKDIR /app

COPY node-backend/package*.json ./
RUN npm install

COPY node-backend/ .

EXPOSE 3000

CMD ["node", "server.js"]