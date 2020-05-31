FROM node:latest as node
#ENV PORT 80
EXPOSE 8080

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build --prod
#RUN ng build --configuration production --output-path=/dist
#CMD ng serve --host 0.0.0.0 --port 4200

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/bcmphase2ear /usr/share/nginx/html

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
