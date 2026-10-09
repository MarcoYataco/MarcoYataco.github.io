# Imagen base: Node 20 sobre Alpine (pequeña) con tag fijo, no "latest"
FROM node:24-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero SOLO los archivos de dependencias.
# Así, si luego cambiamos app.js pero no package.json,
# Docker reutiliza la capa de "npm install" desde la caché
# en vez de reinstalar todo de nuevo.
COPY package.json package-lock.json* ./

# Instalamos solo dependencias de producción (sin devDependencies)
RUN npm install --omit=dev

# Ahora sí copiamos el resto del código
COPY . .

# La imagen node:20-alpine ya trae un usuario sin privilegios llamado "node".
# Lo usamos en vez de dejar que el proceso corra como root.
USER node

# Puerto en el que escucha la API (documentación, no abre el puerto)
EXPOSE 3000

# Un solo proceso: la API de Node
CMD ["node", "app.js"]