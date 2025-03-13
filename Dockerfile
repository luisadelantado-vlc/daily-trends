FROM node:23

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY src/config/scrapper-config.json dist/config/scrapper-config.json

RUN npm install

RUN npx playwright install --with-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
