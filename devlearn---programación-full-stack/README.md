# CodeLearn — Plataforma de Programación Full Stack

Landing page educativa construida con **React + Vite + TailwindCSS v4** y un backend **Express** opcional para integración con Gemini AI.

---

## 🛠️ Requisitos

- **Node.js** v18 o superior

---

## 🚀 Ejecutar en local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y edítalo:

```bash
copy .env.example .env
```

Reemplaza los valores en `.env`:

```env
APP_URL="http://localhost:3000"
DATABASE_URL="postgresql://prisma:554154@localhost:5432/CodeLearn?schema=public"
```

> **Nota:** Si no tienes clave de Gemini, el frontend funciona igual. Solo el endpoint `/api/chat` quedará deshabilitado.

### 3. Arrancar frontend + backend juntos

```bash
npm run dev:all
```

| Servicio   | URL                            |
|------------|--------------------------------|
| Frontend   | http://localhost:3000          |
| Backend API| http://localhost:3001          |
| Health     | http://localhost:3001/api/health |
| Chat AI    | POST http://localhost:3001/api/chat |

---

## 📁 Estructura del proyecto

```
├── src/
│   ├── App.tsx       # Landing page principal (React)
│   ├── main.tsx      # Punto de entrada
│   └── index.css     # Estilos globales + TailwindCSS v4
├── server.ts         # Backend Express (API routes)
├── vite.config.ts    # Config Vite (proxy /api → :3001)
├── .env              # Variables de entorno (no subir a git)
└── package.json
```

---

## 📡 API Endpoints

### `GET /api/health`
Verifica que el backend esté activo.

### `POST /api/chat`
Envía un mensaje al modelo Gemini 2.0 Flash.

**Body:**
```json
{ "message": "¿Qué es React?" }
```

**Respuesta:**
```json
{ "reply": "React es una biblioteca de JavaScript..." }
```

---

## 🔑 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev:all` | Inicia frontend (`:3000`) + backend (`:3001`) |
| `npm run dev` | Solo el frontend |
| `npm run server` | Solo el backend |
| `npm run build` | Build de producción |
| `npm run lint` | Verificación de tipos TypeScript |

## utilizacion de prisma y postgresql
¿Cómo lo vamos a conectar?
Genera automáticamente el código para interactuar con la base de datos.
Se lleva de maravilla con TypeScript (que es lo que estamos usando).
Facilita la creación de tablas.
Lo que haré a continuación una vez me des los datos:
Crearé un archivo .env con la cadena de conexión.
Instalaré las dependencias necesarias (prisma, @prisma/client, pg).
Diseñaré el Esquema (Schema) para crear las tablas de Usuarios y Progreso automáticamente.