# CatálogoBulk — Backend

Sistema de importación masiva de productos con procesamiento asíncrono.
Fase actual: **Fase 1 — Auth + CRUD de Productos, Proveedores, Categorías y Usuarios**, conectado a MongoDB Atlas y Redis Cloud.

## Stack
- Node.js 20 + Express
- MongoDB Atlas (Mongoose)
- Redis Cloud (ioredis)
- JWT + bcrypt

## Instalación

```bash
npm install
cp .env.example .env
# completa tus credenciales de Atlas y Redis Cloud en .env
npm run dev
```

Verifica que todo esté arriba:
```bash
curl http://localhost:3000/health
```

## Endpoints

### Auth
- `POST /api/auth/register` — público. `{ email, password, rol? }`
- `POST /api/auth/login` — público. Responde `{ token, rol, email }`

### Productos (`/api/productos`) — lectura pública, escritura solo admin
- `GET /` — lista paginada, filtros: `page`, `limit`, `categoria`, `proveedor`, `disponible`, `activo`
- `GET /stats` — totales, activos/inactivos, precio promedio, conteo por categoría
- `GET /:id`
- `POST /`, `PUT /:id`, `DELETE /:id` — solo admin
- `PATCH /:id/estado` — solo admin. Body: `{ "activo": true|false }`. Activa/desactiva el
  producto sin tener que reenviar todos sus datos. Un producto inactivo nunca se muestra
  en el catálogo público, sin importar su stock.

### Proveedores (`/api/proveedores`) — requiere JWT
- `GET /`, `GET /:id`
- `POST /`, `PUT /:id`, `DELETE /:id` — solo admin (no borra si tiene productos asociados)

### Categorías (`/api/categorias`) — requiere JWT
- `GET /`, `GET /:slug`
- `PUT /:id` — solo admin
- `POST /`, `DELETE /:id` — solo admin. **Fuera del contrato original** (el PDF dice que solo se crean vía import); se agregaron para poder probar el CRUD antes de construir la Fase de imports.

### Usuarios (`/api/usuarios`) — solo admin
- `GET /`, `PUT /:id`, `DELETE /:id`. **Módulo fuera del contrato original**, agregado para gestión de cuentas desde el panel.

## Variables de entorno
Ver `.env.example`.
