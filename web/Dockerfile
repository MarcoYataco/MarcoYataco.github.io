# Imagen oficial de nginx, variante alpine (pequeña), tag fijo
FROM nginx:1.31.6-alpine

# Reemplaza la configuración por defecto de nginx con la nuestra.
# Esta ruta es relativa al contexto de build (la raíz del repo),
# aunque este Dockerfile viva dentro de web/.
COPY web/nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos estáticos de tu perfil.
# También relativos al contexto (la raíz del repo).
COPY index.html estilos.css libro-de-visitas.js /usr/share/nginx/html/

EXPOSE 80

# La imagen oficial de nginx ya trae su propio CMD para arrancar
# el proceso en primer plano; no necesitamos sobreescribirlo.