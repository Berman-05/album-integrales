import React, { useMemo } from 'react'

/**
 * AreaChart
 * Graficador 2D en SVG puro (sin librerías) estilo GeoGebra:
 * ejes X/Y marcados, retícula, dos curvas y el área sombreada entre
 * ellas en el intervalo [a, b].
 *
 * Props:
 *  - f, g:        funciones JS (x) => y  a graficar (f = curva 1, g = curva 2)
 *  - xMin, xMax:  dominio visible en el eje X
 *  - a, b:        intervalo [a, b] donde se sombrea el área entre f y g
 *  - fColor, gColor: colores de cada curva
 *  - fLabel, gLabel: etiquetas mostradas junto a cada curva
 *  - width, height: tamaño del viewBox (se escala responsivamente)
 *  - samples: nº de muestras usadas para dibujar cada curva
 */
export default function AreaChart({
  f,
  g,
  xMin,
  xMax,
  a,
  b,
  fColor = '#00f0ff',
  gColor = '#ff3df0',
  fLabel = 'f(x)',
  gLabel = 'g(x)',
  width = 520,
  height = 380,
  samples = 140,
}) {
  const margin = { top: 20, right: 20, bottom: 34, left: 40 }
  const plotW = width - margin.left - margin.right
  const plotH = height - margin.top - margin.bottom

  const { yMin, yMax, fPath, gPath, areaPath, xTicks, yTicks, sx, sy } = useMemo(() => {
    const xs = []
    for (let i = 0; i <= samples; i++) xs.push(xMin + ((xMax - xMin) * i) / samples)

    const fs = xs.map((x) => safe(f, x))
    const gs = xs.map((x) => safe(g, x))
    const allY = [...fs, ...gs].filter((v) => Number.isFinite(v))
    let yLo = Math.min(...allY, 0)
    let yHi = Math.max(...allY, 0)
    const pad = (yHi - yLo) * 0.15 || 1
    yLo -= pad
    yHi += pad

    const sxFn = (x) => margin.left + ((x - xMin) / (xMax - xMin)) * plotW
    const syFn = (y) => margin.top + plotH - ((y - yLo) / (yHi - yLo)) * plotH

    const buildPath = (values) =>
      values
        .map((y, i) => `${i === 0 ? 'M' : 'L'} ${sxFn(xs[i]).toFixed(2)} ${syFn(y).toFixed(2)}`)
        .join(' ')

    // Región sombreada entre a y b: recorre f hacia adelante y g hacia atrás
    const nArea = 60
    const areaXs = []
    for (let i = 0; i <= nArea; i++) areaXs.push(a + ((b - a) * i) / nArea)
    const top = areaXs.map((x) => [sxFn(x), syFn(safe(f, x))])
    const bottom = areaXs.map((x) => [sxFn(x), syFn(safe(g, x))]).reverse()
    const areaPts = [...top, ...bottom]
    const areaD =
      areaPts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`).join(' ') + ' Z'

    const niceStep = (range) => {
      const raw = range / 8
      const pow = Math.pow(10, Math.floor(Math.log10(raw)))
      const n = raw / pow
      const step = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10
      return step * pow
    }

    const xStep = niceStep(xMax - xMin)
    const yStep = niceStep(yHi - yLo)

    const xt = []
    for (let v = Math.ceil(xMin / xStep) * xStep; v <= xMax + 1e-9; v += xStep) xt.push(round(v))
    const yt = []
    for (let v = Math.ceil(yLo / yStep) * yStep; v <= yHi + 1e-9; v += yStep) yt.push(round(v))

    return {
      yMin: yLo,
      yMax: yHi,
      fPath: buildPath(fs),
      gPath: buildPath(gs),
      areaPath: areaD,
      xTicks: xt,
      yTicks: yt,
      sx: sxFn,
      sy: syFn,
    }
  }, [f, g, xMin, xMax, a, b, samples, plotW, plotH, margin.left, margin.top])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" aria-label="Gráfica de área entre curvas">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Retícula menor */}
      {xTicks.map((t) => (
        <line key={`gx-${t}`} x1={sx(t)} x2={sx(t)} y1={margin.top} y2={margin.top + plotH} stroke="#1c2444" strokeWidth="1" />
      ))}
      {yTicks.map((t) => (
        <line key={`gy-${t}`} x1={margin.left} x2={margin.left + plotW} y1={sy(t)} y2={sy(t)} stroke="#1c2444" strokeWidth="1" />
      ))}

      {/* Área sombreada */}
      <path d={areaPath} fill="url(#areaFill)" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.8" />

      {/* Ejes */}
      <line x1={margin.left} x2={margin.left + plotW} y1={sy(0)} y2={sy(0)} stroke="#4a5583" strokeWidth="1.4" />
      <line x1={sx(0)} x2={sx(0)} y1={margin.top} y2={margin.top + plotH} stroke="#4a5583" strokeWidth="1.4" />

      {/* Ticks numéricos */}
      {xTicks.map((t) =>
        t !== 0 ? (
          <text key={`xt-${t}`} x={sx(t)} y={sy(0) + 14} fontSize="10" fill="#7c88ad" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
            {t}
          </text>
        ) : null
      )}
      {yTicks.map((t) =>
        t !== 0 ? (
          <text key={`yt-${t}`} x={margin.left - 8} y={sy(t) + 3} fontSize="10" fill="#7c88ad" textAnchor="end" fontFamily="JetBrains Mono, monospace">
            {t}
          </text>
        ) : null
      )}

      {/* Curvas */}
      <path d={fPath} fill="none" stroke={fColor} strokeWidth="2.4" strokeLinecap="round" />
      <path d={gPath} fill="none" stroke={gColor} strokeWidth="2.4" strokeLinecap="round" strokeDasharray={gLabel === 'eje x' ? '0' : '0'} />

      {/* Etiquetas de curvas al final del trazo */}
      <text x={sx(xMax) - 4} y={sy(safe(f, xMax)) - 8} fontSize="11" fill={fColor} textAnchor="end" fontFamily="JetBrains Mono, monospace">
        {fLabel}
      </text>
      <text x={sx(xMax) - 4} y={sy(safe(g, xMax)) + 14} fontSize="11" fill={gColor} textAnchor="end" fontFamily="JetBrains Mono, monospace">
        {gLabel}
      </text>
    </svg>
  )
}

function safe(fn, x) {
  try {
    const v = fn(x)
    return Number.isFinite(v) ? v : 0
  } catch {
    return 0
  }
}

function round(v) {
  return Math.round(v * 100) / 100
}
