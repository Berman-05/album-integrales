# Álbum de Técnicas de Integración

SPA en React + Vite con un álbum interactivo de 5 técnicas de integración
(Sustitución simple, Integración por partes, Integrales trigonométricas,
Sustitución trigonométrica y Fracciones parciales). Fórmulas renderizadas con
KaTeX y gráficas de área entre curvas en SVG puro, estilo GeoGebra.

## 1. Instalación

Requisitos: Node.js 18+ y npm.

```bash
npm install
```

Esto instala, entre otras, las dependencias clave del proyecto:

```bash
npm install react react-dom react-router-dom react-katex katex
npm install -D vite @vitejs/plugin-react gh-pages
```

## 2. Desarrollo local

```bash
npm run dev
```

Abre la URL que indica la terminal (por defecto `http://localhost:5173`).

## 3. Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para desplegar. Puedes previsualizarla con:

```bash
npm run preview
```

## 4. Despliegue en GitHub Pages (repo `album-integrales`)

El proyecto ya está configurado para publicarse en:

```
https://<TU-USUARIO>.github.io/album-integrales/
```

Pasos:

1. Crea el repositorio en GitHub con el nombre **exacto** `album-integrales`
   y sube este proyecto (`git init`, `git remote add origin ...`, `git push`).
2. Verifica que `vite.config.js` tenga `base: '/album-integrales/'` (ya viene
   configurado así — ver archivo incluido). Si alguna vez renombras el
   repositorio, actualiza este valor para que coincida.
3. Instala `gh-pages` si aún no está (ya está en `devDependencies`):
   ```bash
   npm install -D gh-pages
   ```
4. Publica con un solo comando (ejecuta build y sube `dist/` a la rama
   `gh-pages` automáticamente):
   ```bash
   npm run deploy
   ```
5. En GitHub, ve a **Settings → Pages** y selecciona como fuente la rama
   `gh-pages` (carpeta `/root`). Guarda los cambios.
6. Espera 1–2 minutos y visita
   `https://<TU-USUARIO>.github.io/album-integrales/`.

### Notas importantes

- La app usa `HashRouter` (rutas con `#/tecnica/...`) a propósito: GitHub
  Pages no reescribe rutas del lado del servidor, así que con `HashRouter`
  evitas el error 404 típico al recargar una subruta o compartir un enlace
  directo a una técnica.
- Cada vez que hagas cambios, vuelve a correr `npm run deploy` para
  republicar.

## 5. Estructura del proyecto

```
album-integrales/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Punto de entrada, monta <App /> con HashRouter
    ├── index.css             # Sistema de diseño (dark mode neón/cyberpunk)
    ├── App.jsx                # Navbar + definición de rutas
    ├── components/
    │   ├── Home.jsx           # Portada + grid de 5 tarjetas
    │   ├── TechniqueLayout.jsx# Layout base reutilizable por cada técnica
    │   └── AreaChart.jsx      # Gráfico SVG estilo GeoGebra (área entre curvas)
    └── data/
        └── techniques.js      # Contenido matemático de las 5 técnicas
```

Para añadir una sexta técnica, basta con agregar un nuevo objeto al arreglo
`techniques` en `src/data/techniques.js` — `App.jsx` genera sus rutas y
`Home.jsx` su tarjeta automáticamente.
