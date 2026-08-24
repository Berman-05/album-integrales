import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import 'katex/dist/katex.min.css'
import './index.css'

// Usamos HashRouter (rutas tipo #/tecnica/sustitucion-simple) a propósito:
// GitHub Pages sirve archivos estáticos y no reescribe rutas del lado del
// servidor. Con HashRouter evitamos el clásico error 404 al refrescar una
// subruta o al compartir un enlace directo a una técnica.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
