import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//
// IMPORTANTE (GitHub Pages):
// El repositorio se llama "album-integrales", por lo que el sitio final
// quedará publicado en: https://<tu-usuario-de-github>.github.io/album-integrales/
// Vite necesita saber esa ruta base para que los assets (JS, CSS, fuentes)
// se resuelvan correctamente en producción. Si cambias el nombre del repo,
// actualiza este valor (siempre con "/" al inicio y al final).
export default defineConfig({
  plugins: [react()],
  base: '/album-integrales/',
})
