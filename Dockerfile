FROM node:24-alpine as build
 
WORKDIR /app
 
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run create:secret-env
RUN npm run build
RUN rm .env
FROM nginx:alpine
 
COPY --from=build /app/dist/nature-app/browser /usr/share/nginx/html
 
COPY nginx.conf /etc/nginx/nginx.conf
 
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]