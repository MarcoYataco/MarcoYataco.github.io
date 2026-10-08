#!/usr/bin/env bash
# Arma _site/ solo con lo que se publica. Lo usan build y test.
set -euo pipefail

rm -rf _site
mkdir _site

cp index.html estilos.css libro-de-visitas.js _site/

# Si más adelante agregas imágenes, descomenta y ajusta:
# cp -r imagenes _site/

echo "Contenido de _site:"
ls -la _site