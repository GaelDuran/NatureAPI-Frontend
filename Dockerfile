# Etapa 1 – Build Angular
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

# Generar archivo secret.env.ts
RUN node setup-env.js

# Build de producción
RUN npm run build

# Etapa 2 – Servir con Nginx
FROM nginx:alpine

# Copiar el build (Angular 17+)
COPY --from=build /app/nature-api/dist/nature-api/browser /usr/share/nginx/html


# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
