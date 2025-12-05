# Etapa 1 – Build Angular
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

RUN npm run create:secret.env

RUN npm run build

RUN rm.env

FROM nginx:alpine

# Copiar el build (Angular 17+)
COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html


# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
