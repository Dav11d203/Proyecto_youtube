Instrucciones Generales del Proyecto
Herramientas y Tecnologías Utilizadas
🚀 Antigravity

Antigravity
 — Sistema de codificación y programación asistida por IA.

Muchos de los procedimientos técnicos de este proyecto pueden realizarse directamente con el asistente de Antigravity, incluyendo:

Configuración automática del proyecto.
Instalación de dependencias.
Conexión y configuración de PostgreSQL.
Generación y modificación de código.
Configuración del archivo .env.
Creación de rutas, componentes y APIs.
Corrección de errores y optimización del código.
Ejecución de comandos de Prisma.
Automatización de tareas repetitivas.

En varios casos, basta con indicarle a Antigravity el nombre de tu base de datos, usuario y contraseña para que adapte automáticamente el código y la configuración necesaria.

Frontend (Interfaz de Usuario)
⚛️ React 19

Biblioteca principal utilizada para construir toda la interfaz del sistema.

⚡ Vite

Entorno de desarrollo ultrarrápido que permite iniciar y compilar el proyecto de manera eficiente.

🎨 Tailwind CSS 4

Framework de estilos utilizado para:

Diseño visual
Espaciados
Responsive Design
Colores y componentes premium
🧩 Lucide React

Librería de iconos modernos utilizada en toda la interfaz.

🎬 Framer Motion

Sistema de animaciones fluidas y efectos visuales avanzados.

Backend (Servidor y Lógica)
🟢 Node.js + Express

Responsables de:

Manejo de APIs
Lógica del servidor
Rutas backend
Comunicación entre frontend y base de datos
🔷 TypeScript

Utilizado para mejorar la estabilidad del código y evitar errores de tipado.

⚙️ TSX

Herramienta que permite ejecutar TypeScript directamente sin necesidad de compilar manualmente.

📧 Nodemailer

Sistema encargado del envío automático de correos desde formularios y notificaciones.

Base de Datos
🐘 PostgreSQL

Base de datos principal donde se almacenan:

Usuarios
Progreso de alumnos
Perfiles
Información del sistema
🔺 Prisma ORM

ORM utilizado para interactuar con PostgreSQL mediante TypeScript en lugar de SQL puro.

Prisma facilita:

Migraciones
Generación automática de modelos
Consultas tipadas
Sincronización de tablas
Optimización del Peso del Proyecto
📦 Carpeta node_modules

La carpeta node_modules suele ser la parte más pesada de cualquier proyecto moderno, pudiendo ocupar entre 300MB y más de 1GB.

✅ ¿Se puede borrar?

Sí, completamente seguro.

🔄 ¿Cómo se recupera?

Simplemente abre una terminal dentro del proyecto y ejecuta:
npm install
Esto volverá a descargar automáticamente todas las dependencias basándose en el archivo package.json.

Antigravity también puede ayudarte a reinstalar dependencias, detectar errores de instalación y reparar paquetes automáticamente.

Guía de Ejecución — CodeLearn Academy
1. Requisitos Previos

Asegúrate de tener instalado:

Node.js (versión 18 o superior)
PostgreSQL (activo y configurado)
Git (opcional)
2. Configuración del Entorno (.env)

Crea un archivo llamado .env en la raíz del proyecto:
# Conexión PostgreSQL
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/NOMBRE_DB?schema=public"

# Configuración de correo
EMAIL_USER="tu_correo@gmail.com"
EMAIL_PASS="tu_contraseña_de_aplicacion_google"

💡 También puedes proporcionarle estos datos al asistente de Antigravity para que configure automáticamente la conexión y adapte el proyecto sin hacerlo manualmente.

3. Instalación del Proyecto

Abre una terminal dentro de la carpeta del proyecto y ejecuta:
npm install
Este comando instalará todas las dependencias necesarias.

4. Preparación de la Base de Datos

Sincroniza Prisma con PostgreSQL ejecutando:
# Genera el cliente Prisma
npx prisma generate

# Sincroniza las tablas con PostgreSQL
npx prisma db push
Antigravity también puede ejecutar y automatizar estos procesos, además de ayudarte a solucionar errores relacionados con Prisma o PostgreSQL.

5. Ejecución del Proyecto

Para iniciar simultáneamente el frontend y el backend:
npm run dev:all

Puertos utilizados:
Frontend → http://localhost:3000
Backend → http://localhost:3001
Recomendación

Si no tienes experiencia técnica avanzada, puedes utilizar el asistente de Antigravity para realizar gran parte de la configuración automáticamente. Esto reduce errores, acelera la instalación y facilita el mantenimiento del proyecto.
