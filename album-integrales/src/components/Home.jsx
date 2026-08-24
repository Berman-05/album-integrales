import React from 'react'
import { Link } from 'react-router-dom'
import { techniques } from '../data/techniques.js'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Álbum de Técnicas de Integración</h1>
      </section>

      <section className="tech-list">
        {techniques.map((t) => (
          <Link
            to={`/tecnica/${t.id}`}
            className="tech-row"
            key={t.id}
            style={{ '--card-accent': t.accent }}
          >
            <span className="row-num">{t.numero}</span>
            <span className="row-body">
              <span className="row-title">{t.titulo}</span>
              <span className="row-desc">{t.resumenHome}</span>
            </span>
            <span className="row-cta">Ver técnica →</span>
          </Link>
        ))}
      </section>

      <footer className="footer">Álbum de Técnicas de Integración</footer>
    </main>
  )
}
