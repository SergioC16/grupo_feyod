# Grupo Feyod Website

Sitio web del **Grupo Feyod** construido con **React + TailwindCSS** (configurado con **CRACO**) y desplegado en **Hostinger**.

> Este repositorio contiene el código fuente del _frontend_. Los artefactos de build y los archivos pesados (videos) **no** se versionan.

---

## 🧱 Estructura del proyecto

```
Feyod1/
├─ backend/                 # (si aplica)
├─ frontend/
│  ├─ public/
│  ├─ src/
│  ├─ tailwind.config.js
│  ├─ postcss.config.js
│  ├─ craco.config.js
│  ├─ package.json
│  └─ yarn.lock
├─ .gitignore
└─ README.md
```

---

## 🚀 Tecnologías
- **React** (SPA)
- **TailwindCSS** para estilos
- **CRACO** para personalizar configuración de CRA
- **Yarn** como gestor de paquetes

---

## ✅ Requisitos
- **Node.js 18+**
- **Yarn 1.x** (o NPM 8+)

> Verifica la versión: `node -v` y `yarn -v`.

---

## 🛠️ Instalación y ejecución local

```bash
# 1) Entrar al frontend
cd frontend

# 2) Instalar dependencias
yarn install

# 3) Ejecutar en modo desarrollo
yarn start
# Abre http://localhost:3000/
```

---

## 🧩 Variables de entorno
Si el proyecto consume APIs o URLs externas, crea un archivo `.env` en `frontend/`.

> **Create React App** requiere el prefijo `REACT_APP_`.

Ejemplo:
```env
# frontend/.env
REACT_APP_API_BASE_URL=https://api.midominio.com
REACT_APP_WHATSAPP_NUMBER=573001234567
```

Nunca subas `.env` al repositorio (ya está ignorado en `.gitignore`).

---

## 🏗️ Build de producción

```bash
cd frontend
yarn build
```

Esto genera la carpeta `frontend/build/` con archivos estáticos optimizados.

> **Nota:** `build/` **no** se versiona en Git. Úsala solo para desplegar.

---

## 🌐 Deploy en Hostinger (static hosting)
1. Ejecuta `yarn build` en local.
2. Sube el contenido de `frontend/build/` a `public_html/` (o al directorio raíz que use tu dominio) por **FTP** o **File Manager**.
3. Para soportar rutas de SPA (React Router), usa un `.htaccess` con redirección a `index.html`:

```apache
# public_html/.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

4. Limpia caché del navegador y prueba las rutas.

---

## 📜 Scripts disponibles (package.json)
- `yarn start` – Modo desarrollo
- `yarn build` – Compilación optimizada
- `yarn test` – (si aplica)
- `yarn lint` / `yarn format` – (si se configuran ESLint/Prettier)

---

## 📁 Buenas prácticas de repo
- Mantener `node_modules/`, `build/`, `dist/`, `*.mp4` fuera del control de versiones.
- Los videos pesados publícalos en el hosting/CDN y referencia su **URL** desde el código.
- Commits claros: `feat:`, `fix:`, `chore:`, `docs:`…

---

## 🤝 Contribuir
1. Crea una rama desde `main` (`feat/nueva-seccion`, `fix/bug-header`, etc.)
2. Haz commits pequeños y descriptivos.
3. Abre un Pull Request.

---

## 🔐 Licencia
Código **privado** – uso interno del Grupo Feyod.

---

## 🧭 Mantenimiento
- Revisar dependencias cada mes (`yarn upgrade-interactive --latest`).
- Probar el build antes de cada despliegue.
- Mantener `.env` fuera del repo.

