import React from 'react'
import { Link } from 'react-router-dom'
import { BlockMath, InlineMath } from 'react-katex'
import AreaChart from './AreaChart.jsx'
import { techniques } from '../data/techniques.js'

export default function TechniqueLayout({ tech }) {
  const index = techniques.findIndex((t) => t.id === tech.id)
  const prev = techniques[(index - 1 + techniques.length) % techniques.length]
  const next = techniques[(index + 1) % techniques.length]

  const accentStyle = { '--accent': tech.accent }

  return (
    <main className="tech-page" style={accentStyle}>
      <Link to="/" className="back-link">← Volver al índice</Link>

      <header className="tech-header">
        <span className="big-num">{tech.numero}</span>
        <div>
          <div className="subtitle">Técnica {tech.numero} / 05</div>
          <h1>{tech.titulo}</h1>
        </div>
      </header>

      {/* 1. Descripción conceptual */}
      <section className="section">
        <div className="section-title">Descripción conceptual</div>
        <p className="prose">{tech.descripcion}</p>
      </section>

      {/* 2. Fórmulas clave */}
      <section className="section">
        <div className="section-title">Fórmulas clave</div>
        <div className="formula-panel">
          {tech.formulas.map((f, i) => (
            <div key={i}>
              <div className="formula-label">{f.label}</div>
              <BlockMath math={f.tex} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Cuándo utilizar la técnica */}
      <section className="section">
        <div className="section-title">¿Cuándo utilizar esta técnica?</div>
        <ul className="chip-list">
          {tech.cuandoUsar.map((c, i) => (
            <li key={i}>
              <span className="icon">{i + 1}</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Ejemplo resuelto paso a paso */}
      <section className="section">
        <div className="section-title">Ejemplo resuelto paso a paso</div>
        <div className="formula-panel" style={{ marginBottom: 18 }}>
          <div className="formula-label">Integral a resolver</div>
          <BlockMath math={tech.ejemplo.enunciado} />
        </div>
        <ol className="steps">
          {tech.ejemplo.pasos.map((p, i) => (
            <li className="step" data-n={i + 1} key={i}>
              <div className="step-text">{p.texto}</div>
              <div className="step-math">
                <InlineMath math={p.math} />
              </div>
            </li>
          ))}
        </ol>
        <div className="result-box">
          <span className="tag">Resultado</span>
          <InlineMath math={tech.ejemplo.resultado} />
        </div>
      </section>

      {/* 5. Área entre curvas */}
      <section className="section">
        <div className="section-title">Ejemplo: área entre curvas</div>
        <div className="area-block">
          <p className="prose" style={{ marginTop: 0 }}>{tech.area.enunciado}</p>
          <div className="area-grid">
            <div>
              <div className="area-chart-wrap">
                <AreaChart
                  f={tech.area.f}
                  g={tech.area.g}
                  fLabel={tech.area.fLabel}
                  gLabel={tech.area.gLabel}
                  xMin={tech.area.xMin}
                  xMax={tech.area.xMax}
                  a={tech.area.a}
                  b={tech.area.b}
                  fColor={tech.accent}
                  gColor="#ff2d4d"
                />
              </div>
              <div className="legend">
                <span className="swatch"><i style={{ background: tech.accent }} />{tech.area.fLabel}</span>
                <span className="swatch"><i style={{ background: '#ff2d4d' }} />{tech.area.gLabel}</span>
                <span className="swatch"><i style={{ background: '#8b5cf6' }} />Área [a, b]</span>
              </div>
            </div>
            <div>
              <div className="formula-panel">
                <div className="formula-label">Integral definida</div>
                <BlockMath math={tech.area.integralTex} />
              </div>
              <ol className="steps" style={{ marginTop: 18 }}>
                {tech.area.pasos.map((p, i) => (
                  <li className="step" data-n={i + 1} key={i}>
                    <div className="step-text">{p.texto}</div>
                    <div className="step-math">
                      <InlineMath math={p.math} />
                    </div>
                  </li>
                ))}
              </ol>
              <div className="result-box">
                <span className="tag">Área</span>
                <InlineMath math={tech.area.resultadoTex} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="pagination">
        <Link to={`/tecnica/${prev.id}`}>← {prev.titulo}</Link>
        <Link to={`/tecnica/${next.id}`}>{next.titulo} →</Link>
      </nav>
    </main>
  )
}
