# Establecer la imagen base
FROM node:20.11.0-alpine AS build


# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar todo el código fuente
COPY . .

# Instalar las dependencias
RUN npm install -g npm@latest

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

# Construir la aplicación para producción
RUN npm run build

# Fase de producción: usar un servidor NGINX para servir la app
FROM nginx:alpine

# Copiar los archivos de la build de React al contenedor NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto donde NGINX estará escuchando
EXPOSE 8000

# Comando para iniciar el servidor NGINX
CMD ["nginx", "-g", "daemon off;"]
