# 📱 Mobile Shop

Aplicación SPA para la compra de dispositivos móviles, desarrollada como prueba técnica frontend.

## Tecnologías

- **React 19** con Vite
- **React Router v7** para el enrutado en cliente
- **Vitest** + **React Testing Library** para los tests
- **ESLint** para el análisis estático de código
- **CSS** nativo con variables y media queries

## Requisitos previos

- Node.js >= 18
- pnpm >= 8

## Instalación

```bash
# Clona el repositorio
git clone https://github.com/JoseAntonioLeonLopez/itx-mobile-shop
cd itx-mobile-shop

# Instala las dependencias
pnpm install
```

## Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm start` | Arranca el servidor de desarrollo |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm test` | Lanza los tests con Vitest |
| `pnpm lint` | Comprueba el código con ESLint |

## Estructura del proyecto

```
src/
├── components/
│   ├── Header/          # Cabecera con breadcrumb y contador de carrito
│   ├── SearchBar/       # Buscador en tiempo real
│   └── ProductCard/     # Tarjeta de producto para el listado
├── pages/
│   ├── ProductList/     # Vista principal con grid de productos
│   └── ProductDetail/   # Vista de detalle con acciones de compra
├── services/
│   ├── api.js           # Integración con la API REST
│   └── cache.js         # Sistema de caché con expiración de 1 hora
├── context/
│   ├── CartContext.jsx  # Provider del estado global del carrito
│   └── cartContext.js   # Creación del contexto
├── hooks/
│   └── useCart.js       # Hook personalizado para el carrito
├── test/
│   └── setup.js         # Configuración global de tests
├── App.jsx
└── main.jsx
```

## Vistas

### PLP - Product List Page (`/`)
- Listado de todos los productos obtenidos de la API
- Buscador en tiempo real que filtra por marca y modelo
- Grid adaptativo: 4 columnas en desktop, 2 en tablet, 1 en móvil
- Navegación al detalle al hacer click en un producto

### PDP - Product Detail Page (`/product/:id`)
- Layout en dos columnas: imagen a la izquierda, detalles a la derecha
- Información completa del producto (CPU, RAM, SO, batería, cámaras, etc.)
- Selector de color y almacenamiento con opción por defecto preseleccionada
- Botón para añadir al carrito con feedback visual
- Link para volver al listado

## Sistema de caché

Los datos obtenidos de la API se almacenan en `localStorage` con un timestamp. Cada entrada tiene una **expiración de 1 hora**: si los datos han caducado, se eliminan y se realiza una nueva petición a la API. Esto aplica tanto al listado de productos como a cada detalle individual.

## API

La aplicación se integra con la siguiente API:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/product` | Listado de productos |
| GET | `/api/product/:id` | Detalle de un producto |
| POST | `/api/cart` | Añadir producto al carrito |

Base URL: `https://itx-frontend-test.onrender.com`

## Tests

Los tests cubren:

- **Servicios**: lógica de caché (expiración, guardado, recuperación) y llamadas a la API (uso de caché, fetch, POST al carrito)
- **Componentes**: SearchBar, ProductCard, Header (breadcrumb, contador)
- **Páginas**: ProductList (carga, filtrado, estados de error)

```bash
pnpm test
```