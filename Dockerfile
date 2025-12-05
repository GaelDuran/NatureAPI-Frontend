FROM node:24-alpine AS build

ARG API_URL
ARG MAPBOX_TOKEN

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

# Debug: mostrar variables y contenido
RUN echo "API_URL=${API_URL}" && echo "MAPBOX_TOKEN=${MAPBOX_TOKEN}"
RUN ls -la src/environments/ || echo "Directorio no existe"
RUN cat package.json | grep "create:secret"

# Crear .env explícitamente
RUN printf "API_URL=${API_URL}\nMAPBOX_TOKEN=${MAPBOX_TOKEN}\n" > .env

# Ejecutar script con output
RUN npm run create:secret-env 2>&1

RUN npm run build
RUN rm -f .env

FROM nginx:alpine

COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]