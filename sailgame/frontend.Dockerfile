FROM node:23

WORKDIR /app

COPY svelte-frontend/package*.json ./
RUN npm install

COPY svelte-frontend/ .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]