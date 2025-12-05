FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

# Crear .env si no existe (necesario para el script)
RUN npm run create:secret-env || true

RUN npm run build
RUN rm -f .env

FROM nginx:alpine

COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]