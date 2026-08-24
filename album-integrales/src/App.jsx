import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './components/Home.jsx'
import TechniqueLayout from './components/TechniqueLayout.jsx'
import { techniques } from './data/techniques.js'

export default function App() {
  return (
    <>
      <div className="grid-underlay" />

      <header className="navbar">
        <NavLink to="/" className="brand">
          <span className="glyph">∫</span>
          <span>
            Álbum de Integrales
      
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
