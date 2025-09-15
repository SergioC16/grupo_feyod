# Backend minimal para cotizaciones

Este pequeño backend expone el endpoint POST `/api/quote` que recibe un arreglo de productos y envía un correo con la lista.

Variables de entorno (usar `.env` o configurar en el host):

- `SMTP_HOST` (ej. smtp.hostinger.com)
- `SMTP_PORT` (ej. 587)
- `SMTP_SECURE` (`true` si usa SSL/TLS en puerto 465)
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL` (opcional)
- `TO_EMAIL` (opcional, por defecto `grupofeyodventas1@gmail.com`)

Instalación y ejecución:

1. Ir a `backend/node`:

   npm install

2. Configurar variables (crear `.env` a partir de `.env.example`).

3. Iniciar:

   npm start

El endpoint espera un body JSON: `[{id, name, category}, ...]` y responderá `{ success: true }` en caso de éxito.
