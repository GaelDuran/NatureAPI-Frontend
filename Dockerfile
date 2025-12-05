FROM node:24-alpine AS build

ARG API_URL
ARG MAPBOX_TOKEN

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

# Pasar las variables directamente al comando
RUN API_URL=${API_URL} MAPBOX_TOKEN=${MAPBOX_TOKEN} npm run create:secret-env

RUN npm run build
RUN rm -f .env

FROM nginx:alpine

COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]