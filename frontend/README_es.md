
# IContactX Core

## Descripción del proyecto

**IContactX Core** es un panel administrativo que sirve como la base para la creación de múltiples proyectos. Este panel inicial establece una estructura común que se utiliza para gestionar y desplegar proyectos derivados, facilitando el desarrollo y la gestión de aplicaciones.

El proyecto está diseñado para ser flexible y escalable, lo que permite que otros equipos de desarrollo lo utilicen como un punto de partida para crear nuevas aplicaciones con características compartidas.

## Requisitos

El proyecto utiliza **pnpm** en lugar de npm, por lo que se debe instalar este gestor de paquetes antes de continuar.

- **NodeJS**: v21.5.0
- **NPM**: v10.2.4
- **PNPM**: v8.15.1

Para instalar las dependencias necesarias del proyecto, ejecuta el siguiente comando:

```bash
pnpm install
```

## Despliegue

Para generar el build de la aplicación React, usa el siguiente comando:

```bash
pnpm run build
```

## Subida de archivos a AWS S3

El proyecto se puede desplegar en un bucket de AWS S3. Asegúrate de tener configurado el AWS CLI y sigue los siguientes pasos para subir los archivos generados.

### Instalación de AWS CLI y Make

Primero, instala las dependencias necesarias para gestionar el proyecto y configurar AWS:

```bash
brew install make
brew install awscli
```

### Configuración de AWS CLI

Configura AWS CLI con tus credenciales:

```bash
aws configure
aws sts get-caller-identity
```

### Subida a S3

Para subir los archivos generados al bucket de S3, simplemente ejecuta el siguiente comando:

```bash
make all
```

Este comando compilará los binarios, generará el build de React y subirá los archivos a S3.

---

## Descripción del Makefile

El **Makefile** de este proyecto contiene diferentes reglas para gestionar la compilación, ejecución y despliegue de la aplicación en múltiples plataformas.

### Variables

- `APP_NAME`: Nombre del binario principal.
- `BIN_DIR`: Directorio donde se generan los binarios.
- `AWS_S3_BUCKET`: Bucket de AWS S3 donde se suben los archivos.
- Binarios por plataforma: 
  - Linux (`LINUX_AMD64_BIN`, `LINUX_ARM64_BIN`)
  - macOS (`DARWIN_AMD64_BIN`, `DARWIN_ARM64_BIN`)
  - Windows (`WINDOWS_BIN`)

### Comandos

- **detect-os-arch**: Detecta el sistema operativo y la arquitectura de la máquina.
- **go-run**: Ejecuta el binario correcto según el sistema operativo y arquitectura detectados.
- **go-clean**: Limpia los binarios generados.
- **go-build**: Compila los binarios para todas las plataformas soportadas.
- **build-react**: Compila el proyecto React.
- **update**: Sube los archivos generados a un bucket S3.
- **aws-config**: Configura AWS CLI.
- **aws-identity**: Verifica la identidad de AWS.
- **all**: Ejecuta las reglas de `go-run`, `build-react` y `update` de forma secuencial.
- **dev**: Ejecuta el entorno de desarrollo tanto para Go como para React.

---

## Descripción del `env_generator`

El archivo `main.go` define un generador de archivos de entorno (`env_generator`), un binario que se encarga de crear y gestionar la versión de la aplicación basada en los commits de Git. 

### Funcionalidades clave

1. **Gestión de versiones**:
   - El `env_generator` examina el hash del último commit de Git y, si detecta un cambio en el repositorio, incrementa automáticamente el número de versión siguiendo el formato `MAJOR.MINOR.PATCH`.
   - La versión solo se incrementa si el hash de Git ha cambiado, garantizando que las versiones reflejan el estado actual del código.

2. **Actualización de `.env`**:
   - Si el archivo `.env` ya existe, se actualizan las variables relacionadas con la versión (`VITE_APP_VERSION`), el hash de Git (`VITE_APP_HASH`) y la fecha de construcción (`VITE_APP_BUILD_DATE`).
   - Si el archivo `.env` no existe, se crea uno nuevo con las variables necesarias para el entorno de desarrollo y producción.

3. **Archivos de control (`version.txt`)**:
   - El `env_generator` guarda información del último commit, la versión y la fecha de construcción en un archivo llamado `version.txt`, permitiendo una trazabilidad completa de las versiones del proyecto.

### Uso del `env_generator`

El generador se ejecuta automáticamente dentro del flujo de comandos del Makefile, pero también puedes ejecutarlo manualmente desde el directorio del proyecto usando:

```bash
go run main.go
```

Esto generará el archivo `.env` actualizado con la nueva versión y hash de Git.

---

Con estos pasos y explicaciones, deberías tener un panorama claro sobre cómo trabajar con el proyecto **IContactX Core**.
