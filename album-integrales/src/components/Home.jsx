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

      <section className="card-grid">
        {techniques.map((t) => (
          <article className="tech-card" key={t.id} style={{ '--card-accent': t.accent }}>
            <div>
              <div className="num">{t.numero}</div>
              <h3>{t.titulo}</h3>
              <p>{t.resumenHome}</p>
            </div>
            <Link to={`/tecnica/${t.id}`} className="card-cta">
              Ver técnica →
            </Link>
          </article>
        ))}
      </section>

      <footer className="footer">Álbum de Técnicas de Integración — hecho con React + Vite + KaTeX</footer>
    </main>
  )
}
