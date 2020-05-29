FROM node:latest as node
#ENV PORT 80
EXPOSE 8080

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build
CMD ng serve --host 0.0.0.0 --port 4200

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/bcmphase2ear /usr/share/nginx/html
