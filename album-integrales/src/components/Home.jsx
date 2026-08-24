import React from 'react'
import { Link } from 'react-router-dom'
import { techniques } from '../data/techniques.js'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <span className="eyebrow">
          <span className="dot" />
          Cálculo Integral · 5 módulos
        </span>
        <h1>Álbum de Técnicas de Integración</h1>
        <p className="lead">
          Una guía visual e interactiva con las cinco técnicas fundamentales para resolver integrales:
          fórmulas, criterios de uso, ejemplos resueltos paso a paso y aplicaciones al cálculo de áreas
          entre curvas.
        </p>
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

      <footer className="footer">Álbum de Técnicas de Integración </footer>
    </main>
  )
}
