# LAB-05: Infraestructura como Código con Terraform en Google Cloud

**Curso:** IF-1116 Tópicos de Tecnologías de Información  
**Universidad:** Universidad Ricardo Palma  
**Semestre:** 2026-II

- **Nombre:** Marco Gabriel Valentin Yataco Carrillo
- **Correo:** 202220068@urp.edu.pe
- **Perfil público de Google Skills:** [Ver perfil público](https://www.skills.google/public_profiles/7e12cf63-52ee-4568-baec-6c1c234fa157?locale=es)

## 1. Evidencias y resultados

Se completaron los tres laboratorios de Google Skills correspondientes al LAB-05, obteniendo el 100 % de progreso en cada uno.

| Laboratorio | Puntaje Google Skills | Captura | Carpeta |
|---|---|---|---|
| GSP233 | 100/100 | [Ver captura](capturas/puntaje-gsp233.png) | `gsp233/` |
| GSP497 | 100/100 | [Ver captura](capturas/puntaje-gsp497.png) | `gsp497/` |
| GSP345 | 100/100 | [Ver captura](capturas/puntaje-gsp345.png) | `gsp345/` |

Los archivos Terraform, planes de ejecución y capturas se encuentran organizados en las carpetas correspondientes.

## 2. Estructura del proyecto

| Carpeta | Contenido |
|---|---|
| `gsp233/` | Archivos Terraform del clúster GKE y Load Balancer con NGINX, además de la captura de funcionamiento |
| `gsp497/` | Archivos Terraform de GKE con Cloud Monitoring y capturas de las métricas y alertas de Prometheus |
| `gsp345/` | Archivos Terraform, módulos `instances` y `storage`, planes de ejecución y listados del estado |
| `capturas/` | Capturas de puntuación 100/100 de los tres laboratorios |

## 3. Bitácora

### GSP233: Deploy Kubernetes Load Balancer Service with Terraform

**Qué hice.**

Seguí las instrucciones de Google Skills para desplegar un clúster de Kubernetes mediante Terraform. La infraestructura incluyó el clúster `tf-gke-k8s` y un servicio NGINX de tipo LoadBalancer.

Terraform confirmó la creación de siete recursos mediante el mensaje:

`Apply complete! Resources: 7 added, 0 changed, 0 destroyed.`

Posteriormente, verifiqué el funcionamiento del servicio utilizando su dirección IP externa:

`http://136.90.99.241/`

Realicé una comprobación mediante `curl -I`, obteniendo una respuesta `HTTP/1.1 200 OK`, y guardé la captura correspondiente en `gsp233/nginx.png`.

**Qué me costó.**

La creación del clúster tardó aproximadamente cinco minutos y el servicio LoadBalancer necesitó tiempo adicional para quedar disponible. Inicialmente pensé que existía un problema con la consola de Kubernetes, pero posteriormente comprobé que Terraform todavía estaba completando la creación de los recursos.

**Qué cambiaría.**

Guardaría el resultado inicial de `terraform plan` antes de ejecutar `apply`, para conservar una evidencia adicional de los recursos que se iban a crear.

### GSP497: Cloud Operations for GKE

**Qué hice.**

Seguí las instrucciones del laboratorio para desplegar infraestructura de Kubernetes en Google Cloud utilizando Terraform y configurar el monitoreo de la aplicación mediante Cloud Monitoring.

Revisé la política de alertas `Prometheus mem alloc`, que utiliza métricas provenientes de Prometheus.

Después de esperar a que Cloud Monitoring recopilara y evaluara los datos, pude observar las métricas y las alertas generadas. Guardé las capturas correspondientes:

- `gsp497/monitoring-1.png`: política y métricas de Monitoring.
- `gsp497/monitoring-2.png`: alertas generadas.

Finalmente, ejecuté `make teardown` para eliminar la infraestructura. Terraform confirmó:

`Destroy complete! Resources: 5 destroyed.`

Google Skills validó correctamente el proceso de limpieza mediante el checkpoint `Teardown (Clean-up)`.

**Qué me costó.**

Las alertas de Prometheus no aparecieron inmediatamente. Tuve que esperar varios minutos y actualizar la página hasta que Cloud Monitoring registró los incidentes.

También encontré dificultades al intentar recuperar las salidas originales de Terraform, porque el laboratorio utilizaba comandos `make create` y `make teardown`, los cuales ejecutaban scripts internos.

**Qué cambiaría.**

Guardaría las salidas originales de los comandos de creación y destrucción en archivos de texto, además de conservar las capturas de Monitoring antes de eliminar la infraestructura.

### GSP345: Build Infrastructure with Terraform on Google Cloud — Challenge Lab

**Qué hice.**

Completé las siete tareas del Challenge Lab, creando y administrando infraestructura real en Google Cloud mediante Terraform.

Utilicé la región `us-west1`, la zona `us-west1-b` y el proyecto temporal asignado por Google Skills.

Las actividades fueron las siguientes:

**Tarea 1: Configuración inicial**

Creé los archivos `main.tf` y `variables.tf`, además de los módulos propios `instances` y `storage`.

Configuré el proveedor `hashicorp/google` con la versión `~> 6.0` e inicialicé Terraform correctamente.

**Tarea 2: Importación de infraestructura**

Importé las máquinas virtuales `tf-instance-1` y `tf-instance-2`, previamente creadas en Google Cloud.

El archivo `plan-2.txt` registró:

`Plan: 0 to add, 2 to change, 0 to destroy.`

Las máquinas se actualizaron sin necesidad de destruirlas y recrearlas.

**Tarea 3: Backend remoto**

Creé el bucket `tf-bucket-846696` mediante el módulo `storage`.

Posteriormente, configuré el backend `gcs` utilizando el prefijo `terraform/state` y migré el estado local al almacenamiento remoto.

**Tarea 4: Modificación de infraestructura**

Actualicé las dos máquinas virtuales al tipo `e2-standard-2` y creé una tercera máquina llamada `tf-instance-377334`.

El plan registró una instancia nueva y dos modificaciones.

**Tarea 5: Destrucción de recursos**

Eliminé la tercera instancia de la configuración Terraform y apliqué los cambios.

El plan registró:

`Plan: 0 to add, 0 to change, 1 to destroy.`

**Tarea 6: Módulo de Terraform Registry**

Implementé el módulo `terraform-google-modules/network/google`, versión `10.0.0`.

Creé la VPC `tf-vpc-806159` con las siguientes subredes:

| Subred | Rango IP | Región |
|---|---|---|
| subnet-01 | 10.10.10.0/24 | us-west1 |
| subnet-02 | 10.10.20.0/24 | us-west1 |

Después actualicé las interfaces de red para conectar `tf-instance-1` a `subnet-01` y `tf-instance-2` a `subnet-02`.

**Tarea 7: Configuración de firewall**

Creé la regla `tf-firewall`, asociada a `tf-vpc-806159`, permitiendo conexiones entrantes TCP por el puerto 80 desde `0.0.0.0/0`.

El plan registró:

`Plan: 1 to add, 0 to change, 0 to destroy.`

Todas las tareas fueron verificadas mediante la evaluación automática de Google Skills.

**Qué me costó.**

- **Importación de máquinas:** fue necesario identificar el tipo de máquina, la zona y la configuración de red de las instancias existentes antes de importarlas a Terraform.
- **Migración del backend:** tuve que crear primero el bucket de Cloud Storage y posteriormente configurar el backend remoto para migrar el estado existente.
- **Suspensión accidental de un proceso:** durante la ejecución de `terraform plan`, suspendí accidentalmente el proceso utilizando `Ctrl + Z`. Pude reanudarlo mediante el comando `fg %1`.
- **Error de autenticación 401:** durante la modificación de las interfaces de red, Google Cloud interrumpió mi sesión. Terraform mostró un error `401 Invalid Credentials`, por lo que tuve que volver a iniciar sesión, comprobar la cuenta activa, verificar el proyecto y obtener nuevamente un token de acceso. Después generé otro plan y repetí la operación correctamente.

**Qué cambiaría.**

- Prepararía los comandos y archivos Terraform antes de iniciar el cronómetro.
- Revisaría siempre los resultados de `terraform plan` antes de ejecutar `apply`, especialmente cuando existan cambios sobre recursos importados.
- Guardaría versiones de la configuración después de cada tarea para relacionar cada plan con los archivos que lo generaron.
- Comprobaría la autenticación de Cloud Shell antes de realizar operaciones importantes.
- Conservaría todos los archivos de evidencia durante el desarrollo y no únicamente al finalizar.

## 4. Evidencias técnicas del Challenge Lab

| Tarea | Archivo | Resultado del plan |
|---|---|---|
| 2. Importar instancias | `plan-2.txt` | 0 add, 2 change, 0 destroy |
| 3. Crear bucket | `plan-3.txt` | 1 add, 0 change, 0 destroy |
| 4. Modificar infraestructura | `plan-4.txt` | 1 add, 2 change, 0 destroy |
| 5. Destruir instancia | `plan-5.txt` | 0 add, 0 change, 1 destroy |
| 6. Crear VPC y subredes | `plan-6.txt` | 3 add, 0 change, 0 destroy |
| 6. Conectar instancias | `plan-6-red.txt` | 0 add, 2 change, 0 destroy |
| 6. Recuperación de sesión | `plan-6-recuperacion.txt` | 0 add, 2 change, 0 destroy |
| 7. Crear firewall | `plan-7.txt` | 1 add, 0 change, 0 destroy |

También se conservaron los siguientes archivos:

- `state-list-importacion.txt`: recursos administrados después de importar las instancias.
- `state-list.txt`: listado del estado registrado durante el laboratorio.
- `state-list-final.txt`: recursos administrados al finalizar las tareas.

Los archivos `.tf` corresponden a la configuración final del laboratorio. Los planes históricos documentan los cambios realizados durante las etapas anteriores.

## 5. Consideraciones sobre las evidencias

Los tres laboratorios fueron completados al **100 % en Google Skills**, tal como muestran las capturas de puntuación.

En GSP233 y GSP497 no se conservaron los archivos `plan-inicial.txt` durante la ejecución. En GSP497 tampoco se guardó la salida completa de `terraform destroy` en un archivo `destroy.txt`.

Como evidencia complementaria se incluyen las capturas del funcionamiento de NGINX, las métricas de Prometheus y la evaluación automática del proceso de destrucción de recursos.

En GSP345 sí se conservaron los archivos de configuración, los planes de las tareas y los listados del estado de Terraform.

## 6. Uso de inteligencia artificial

Utilicé **ChatGPT** como herramienta de apoyo durante los tres laboratorios, especialmente en el Challenge Lab GSP345.

**Qué le pedí.**

- Orientación para conservar las evidencias de los laboratorios guiados.
- Ayuda para crear y configurar los archivos Terraform.
- Instrucciones para importar las máquinas virtuales existentes.
- Apoyo para configurar el backend remoto de Cloud Storage.
- Ayuda para implementar el módulo de red y la regla de firewall.
- Interpretación de los planes y mensajes de error generados por Terraform.

**Qué me proporcionó.**

- Comandos para ejecutar en Cloud Shell.
- Configuraciones `.tf` adaptadas a los valores de mi laboratorio.
- Procedimientos de importación y administración del estado.
- Comandos para generar y revisar los archivos `plan-<n>.txt`.
- Orientación para diagnosticar problemas de autenticación y ejecución.

**Qué comprobé y corregí.**

- Verifiqué el Project ID y las características reales de las instancias mediante Google Cloud CLI.
- Revisé los planes de Terraform antes de aplicar modificaciones.
- Comprobé que las máquinas importadas no fueran destruidas y recreadas durante la Tarea 2.
- Ante el error de autenticación 401, comprobé las credenciales, recuperé el acceso y volví a generar el plan antes de aplicar los cambios.
- Validé las tareas individualmente mediante `Check my progress` en Google Skills.

**Qué aprendí.**

La inteligencia artificial puede facilitar la elaboración de configuraciones y la identificación de errores, pero sus indicaciones deben contrastarse con el estado real de la infraestructura.

El uso de `terraform plan` antes de aplicar cambios permite identificar modificaciones, creaciones y eliminaciones, reduciendo el riesgo de afectar recursos existentes.

## 7. Resultado final

Se completaron satisfactoriamente los tres laboratorios:

- **GSP233:** 100/100.
- **GSP497:** 100/100.
- **GSP345:** 100/100, con las siete tareas realizadas.

El laboratorio permitió practicar la creación, importación, modificación, monitoreo y destrucción de infraestructura mediante Terraform en Google Cloud, incluyendo la administración del estado remoto, el uso de módulos y la configuración de redes y firewall.