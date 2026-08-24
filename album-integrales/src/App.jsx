import React, { useEffect } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './components/Home.jsx'
import TechniqueLayout from './components/TechniqueLayout.jsx'
import { techniques } from './data/techniques.js'

// React Router no reinicia el scroll al navegar entre rutas (a diferencia
// de una recarga normal de página). Sin esto, al cambiar de técnica el
// navegador conserva la posición vertical de la página anterior.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <div className="grid-underlay" />

      <header className="navbar">
        <NavLink to="/" className="brand">
          <span className="glyph">∫</span>
          <span>
            Álbum de Integrales
            <small>Técnicas · UI Cyberpunk</small>
          </span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Índice
          </NavLink>
          {techniques.map((t) => (
            <NavLink
              key={t.id}
              to={`/tecnica/${t.id}`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {t.numero}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        {techniques.map((t) => (
          <Route key={t.id} path={`/tecnica/${t.id}`} element={<TechniqueLayout tech={t} />} />
        ))}
      </Routes>
    </>
  )
}
