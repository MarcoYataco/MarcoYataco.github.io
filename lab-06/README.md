# LAB-06: Modernizar un sitio web con IA generativa en Google Cloud

**Curso:** IF-1116 – Tópicos de Tecnologías de Información  
**Semestre:** 2026-II  
**Estudiante:** Marco Gabriel Yataco Carrillo

## Puntos de control

| Punto de control | Estado | Evidencia |
|---|---|---|
| Agent Platform API habilitada | Completado | Puntaje de Google Skills |
| Agent Search creada | Completado | [Ver captura](evidencia/agent-search-preview.png) |
| Sitio desplegado en Cloud Run | Completado | [Ver captura](evidencia/cloud-run.png) |
| Edición de contenido con Gemini | No completado por restricción de Google Cloud | [Ver error](evidencia/error-gemini.png) |

## Incidencia técnica

Durante la Tarea 6, las solicitudes a Gemini fueron rechazadas con el error:

`400 FAILED_PRECONDITION`

La política de organización `constraints/vertexai.allowedModels` impidió utilizar los siguientes modelos indicados por la guía del laboratorio:

- `gemini-3.1-flash-image`: generación de imágenes.
- `gemini-3.8-flash`: traducción y refinamiento de texto.

El problema se presentó en dos intentos del laboratorio, con proyectos temporales distintos.

Se adjunta evidencia del bloqueo, que impidió completar la última actividad.

## Puntaje obtenido

[Ver captura del puntaje de Google Skills](evidencia/puntaje.png)
