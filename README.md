# Perfil — Marco Yataco

Sitio personal publicado en https://marcoyataco.github.io

## Cómo se publica
Cada push a `main` ejecuta el pipeline de CI/CD (`.github/workflows/ci-cd.yml`). Si todas las etapas pasan, el despliegue a GitHub Pages **espera la aprobación manual** de un revisor antes de publicar. Solo se publica la carpeta `_site/`, con los archivos públicos del sitio.

## Pipeline CI/CD
Seis jobs encadenados con `needs`: si uno falla, los siguientes no corren.

| Job | Qué hace |
|---|---|
| `build` | Lint de `index.html` (HTMLHint), de los Dockerfiles (Hadolint) y de la API (ESLint). Arma `_site/` y lo sube como artefacto |
| `test` | Descarga el artefacto de `build` y corre Vitest con jsdom sobre ese mismo `_site/` |
| `package` | Construye `perfil-web` y `perfil-api` y los publica en ghcr.io con el tag `sha-<commit>` |
| `security` | Trivy escanea ambas imágenes y falla ante vulnerabilidades CRITICAL con corrección disponible |
| `smoke` | Descarga la imagen `perfil-web` ya escaneada, la levanta y comprueba que `GET /` responde 200 y trae mi nombre |
| `deploy-prod` | Publica en GitHub Pages, solo con push a `main` y tras la aprobación del environment `github-pages` |

Un pull request corre hasta `smoke`; nunca despliega.

## Flujo de trabajo
- `main` protegida con un ruleset que exige los checks del pipeline
- Una rama por cambio: `feature/*`, `fix/*`, `docs/*`
- Mensajes de commit en imperativo, ≤ 50 caracteres

## Delivery o deployment
Este pipeline implementa **Continuous Delivery**: de `build` a `smoke` todo es automático, pero el paso a producción lo decide una persona mediante *Required reviewers* en el environment `github-pages`.

**Qué cambiaría para pasar a Continuous Deployment:** quitar la regla *Required reviewers* del environment. Es un cambio de configuración en Settings, no de código: `deploy-prod` correría apenas termine `smoke`.

**Por qué mi perfil podría hacerlo:** es un sitio estático de bajo riesgo, y antes de publicar ya pasa linters, pruebas, escaneo de vulnerabilidades y una prueba de humo sobre la imagen real.

**En qué casos no lo haría:**
- Si un fallo en producción tuviera un costo alto (datos de usuarios, dinero, seguridad).
- Si la cobertura de pruebas no fuera confiable: Continuous Deployment solo es tan seguro como sus pruebas.
- Si el cambio necesitara coordinarse con otras personas, fechas o sistemas.
- Si no hubiera una forma probada y rápida de volver a la versión anterior.

## Historial del curso
- **S02** — Sitio inicial, ramas y pull requests
- **S03** — Aplicación con web, API y base de datos en contenedores (LAB-02)
- **S05** — Pipeline CI/CD con GitHub Actions (LAB-03)