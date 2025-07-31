FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .

RUN npx tsc

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/app.js"]