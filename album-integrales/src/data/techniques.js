// Contenido matemático de las 5 técnicas de integración.
// Cada objeto alimenta a <TechniqueLayout /> a través de la ruta
// /tecnica/:id definida en App.jsx

export const techniques = [
  {
    id: 'sustitucion-simple',
    numero: '01',
    accent: '#00f0ff',
    titulo: 'Sustitución Simple',
    resumenHome: 'Cambio de variable para deshacer la regla de la cadena.',
    descripcion:
      'La sustitución (o cambio de variable) es la técnica más básica de integración. Consiste en identificar dentro del integrando una función interna g(x) y su derivada g\'(x), y reemplazarlas por una nueva variable u. Esto transforma una integral compuesta en una integral elemental en términos de u, la cual se resuelve y luego se devuelve a la variable original.',
    formulas: [
      { label: 'Regla general', tex: '\\int f\\big(g(x)\\big)\\,g\'(x)\\,dx \\;=\\; \\int f(u)\\,du, \\qquad u = g(x)' },
      { label: 'Diferencial', tex: 'du = g\'(x)\\,dx' },
    ],
    cuandoUsar: [
      'El integrando contiene una función compuesta f(g(x)) y también aparece (multiplicando) la derivada de la función interna g\'(x).',
      'Se puede "limpiar" la expresión reemplazando toda la parte complicada por una sola letra u.',
      'Es el primer método que se intenta probar antes de recurrir a técnicas más avanzadas.',
    ],
    ejemplo: {
      enunciado: '\\int 2x\\cos\\!\\left(x^{2}\\right)dx',
      pasos: [
        { texto: 'Se identifica la función interna y se define la sustitución.', math: 'u = x^{2}' },
        { texto: 'Se deriva u respecto de x para obtener el diferencial.', math: 'du = 2x\\,dx' },
        { texto: 'Se reemplaza en la integral original; 2x·dx es exactamente du.', math: '\\int 2x\\cos(x^{2})\\,dx = \\int \\cos(u)\\,du' },
        { texto: 'Se integra la expresión elemental en u.', math: '\\int \\cos(u)\\,du = \\sin(u) + C' },
        { texto: 'Se deshace la sustitución regresando a la variable x.', math: '\\sin(u) + C = \\sin\\!\\left(x^{2}\\right) + C' },
      ],
      resultado: '\\sin\\!\\left(x^{2}\\right) + C',
    },
    area: {
      enunciado:
        'Calcular el área encerrada entre las parábolas f(x) = 2 - x² y g(x) = x², que se cortan en x = -1 y x = 1.',
      f: (x) => 2 - x * x,
      g: (x) => x * x,
      fLabel: 'f(x)=2-x²',
      gLabel: 'g(x)=x²',
      xMin: -2.2,
      xMax: 2.2,
      a: -1,
      b: 1,
      integralTex: 'A = \\int_{-1}^{1}\\Big[(2-x^{2}) - x^{2}\\Big]dx = \\int_{-1}^{1}\\left(2-2x^{2}\\right)dx',
      pasos: [
        { texto: 'Se antideriva término a término.', math: '\\left[\\,2x - \\dfrac{2x^{3}}{3}\\,\\right]_{-1}^{1}' },
        { texto: 'Se evalúa en los límites y se resta.', math: '\\left(2-\\dfrac{2}{3}\\right) - \\left(-2+\\dfrac{2}{3}\\right) = \\dfrac{4}{3} + \\dfrac{4}{3}' },
      ],
      resultadoTex: 'A = \\dfrac{8}{3}\\ \\text{u}^2 \\approx 2.667\\ \\text{u}^2',
    },
  },

  {
    id: 'integracion-por-partes',
    numero: '02',
    accent: '#ff2d4d',
    titulo: 'Integración por Partes',
    resumenHome: 'La versión integral de la regla del producto.',
    descripcion:
      'La integración por partes se usa cuando el integrando es un producto de dos funciones de naturaleza distinta (por ejemplo, un polinomio y una exponencial, o un polinomio y un logaritmo) que no se relacionan por una derivada, como sí ocurría en la sustitución. Se basa en "deshacer" la regla del producto de la derivada.',
    formulas: [
      { label: 'Fórmula de partes', tex: '\\int u\\,dv \\;=\\; uv - \\int v\\,du' },
      { label: 'Criterio de elección (LIATE)', tex: '\\text{L}ogar. \\to \\text{I}nversas \\to \\text{A}lgebraicas \\to \\text{T}rig. \\to \\text{E}xp.' },
    ],
    cuandoUsar: [
      'El integrando es un producto de dos funciones de tipos distintos: xⁿ·eˣ, xⁿ·ln(x), xⁿ·sen(x), eˣ·cos(x), etc.',
      'Al derivar una de las funciones (u) esta se simplifica, y al integrar la otra (dv) no se complica.',
      'A veces debe aplicarse más de una vez, o de forma cíclica (como en ∫eˣ cos x dx).',
    ],
    ejemplo: {
      enunciado: '\\int x\\,e^{x}\\,dx',
      pasos: [
        { texto: 'Se eligen u y dv siguiendo el criterio LIATE: el polinomio se deriva, la exponencial se integra.', math: 'u = x \\quad\\Rightarrow\\quad du = dx \\qquad\\qquad dv = e^{x}dx \\quad\\Rightarrow\\quad v = e^{x}' },
        { texto: 'Se sustituye directamente en la fórmula de partes.', math: '\\int x\\,e^{x}dx = x\\,e^{x} - \\int e^{x}\\,dx' },
        { texto: 'Se resuelve la nueva integral, que ya es elemental.', math: 'x\\,e^{x} - e^{x} + C' },
        { texto: 'Se factoriza para presentar el resultado de forma compacta.', math: 'e^{x}(x-1) + C' },
      ],
      resultado: 'e^{x}(x-1) + C',
    },
    area: {
      enunciado:
        'Calcular el área entre la recta f(x) = x + 2 y la parábola g(x) = x², que se cortan en x = -1 y x = 2.',
      f: (x) => x + 2,
      g: (x) => x * x,
      fLabel: 'f(x)=x+2',
      gLabel: 'g(x)=x²',
      xMin: -2.4,
      xMax: 3,
      a: -1,
      b: 2,
      integralTex: 'A = \\int_{-1}^{2}\\Big[(x+2) - x^{2}\\Big]dx',
      pasos: [
        { texto: 'Se antideriva el integrando.', math: '\\left[\\,\\dfrac{x^{2}}{2} + 2x - \\dfrac{x^{3}}{3}\\,\\right]_{-1}^{2}' },
        { texto: 'Se evalúa en x = 2 y en x = -1, y se resta.', math: '\\left(2+4-\\dfrac{8}{3}\\right) - \\left(\\dfrac{1}{2}-2+\\dfrac{1}{3}\\right) = \\dfrac{10}{3} - \\left(-\\dfrac{7}{6}\\right)' },
      ],
      resultadoTex: 'A = \\dfrac{9}{2}\\ \\text{u}^2 = 4.5\\ \\text{u}^2',
    },
  },

  {
    id: 'integrales-trigonometricas',
    numero: '03',
    accent: '#39ff9d',
    titulo: 'Integrales Trigonométricas',
    resumenHome: 'Potencias de seno, coseno, tangente y secante.',
    descripcion:
      'Este grupo de técnicas resuelve integrales que involucran productos y potencias de funciones trigonométricas. La estrategia depende de la paridad de los exponentes: se aparta un factor para formar un diferencial y el resto se reescribe usando identidades pitagóricas (sen²x + cos²x = 1, 1+tan²x = sec²x) para dejar todo en términos de una sola función.',
    formulas: [
      { label: 'Identidad pitagórica', tex: '\\sin^{2}x + \\cos^{2}x = 1' },
      { label: 'Identidad de ángulo doble', tex: '\\cos^{2}x = \\dfrac{1+\\cos 2x}{2}, \\qquad \\sin^{2}x = \\dfrac{1-\\cos 2x}{2}' },
      { label: 'Secante-tangente', tex: '1 + \\tan^{2}x = \\sec^{2}x' },
    ],
    cuandoUsar: [
      'Aparece una potencia impar de seno o de coseno: se aparta un factor y se usa la identidad pitagórica.',
      'Aparecen solo potencias pares: se usan las identidades de ángulo doble para reducir el grado.',
      'Aparecen potencias de tangente y secante juntas: se aparta sec²x (o secx·tanx) para formar el diferencial.',
    ],
    ejemplo: {
      enunciado: '\\int \\sin^{3}x\\,\\cos^{2}x\\,dx',
      pasos: [
        { texto: 'La potencia del seno es impar: se separa un factor sen x para el diferencial.', math: '\\sin^{3}x = \\sin^{2}x \\cdot \\sin x = (1-\\cos^{2}x)\\sin x' },
        { texto: 'Se reescribe la integral por completo en términos de cos x.', math: '\\int (1-\\cos^{2}x)\\cos^{2}x\\,\\sin x\\,dx' },
        { texto: 'Se sustituye u = cos x, con du = -sen x dx.', math: 'u=\\cos x,\\ du=-\\sin x\\,dx \\ \\Rightarrow\\ -\\int (1-u^{2})u^{2}\\,du' },
        { texto: 'Se expande y se integra término a término.', math: '-\\int (u^{2}-u^{4})\\,du = -\\dfrac{u^{3}}{3} + \\dfrac{u^{5}}{5} + C' },
        { texto: 'Se deshace la sustitución.', math: '-\\dfrac{\\cos^{3}x}{3} + \\dfrac{\\cos^{5}x}{5} + C' },
      ],
      resultado: '\\dfrac{\\cos^{5}x}{5} - \\dfrac{\\cos^{3}x}{3} + C',
    },
    area: {
      enunciado:
        'Calcular el área entre f(x) = sen(x) y g(x) = cos(x) en el intervalo [π/4, 5π/4], donde ambas curvas se cruzan.',
      f: (x) => Math.sin(x),
      g: (x) => Math.cos(x),
      fLabel: 'f(x)=sen x',
      gLabel: 'g(x)=cos x',
      xMin: 0,
      xMax: 4.2,
      a: Math.PI / 4,
      b: (5 * Math.PI) / 4,
      integralTex: 'A = \\int_{\\pi/4}^{5\\pi/4}\\big(\\sin x - \\cos x\\big)\\,dx',
      pasos: [
        { texto: 'Se usan las antiderivadas básicas de seno y coseno.', math: '\\Big[-\\cos x - \\sin x\\Big]_{\\pi/4}^{5\\pi/4}' },
        { texto: 'Se evalúa en ambos límites (sen y cos valen ±√2/2) y se resta.', math: '\\left(\\tfrac{\\sqrt2}{2}+\\tfrac{\\sqrt2}{2}\\right) - \\left(-\\tfrac{\\sqrt2}{2}-\\tfrac{\\sqrt2}{2}\\right) = \\sqrt2-(-\\sqrt2)' },
      ],
      resultadoTex: 'A = 2\\sqrt{2}\\ \\text{u}^2 \\approx 2.828\\ \\text{u}^2',
    },
  },

  {
    id: 'sustitucion-trigonometrica',
    numero: '04',
    accent: '#ffb020',
    titulo: 'Sustitución Trigonométrica',
    resumenHome: 'Radicales del tipo a²-x², a²+x², x²-a².',
    descripcion:
      'Cuando el integrando contiene una raíz cuadrada de una suma o diferencia de cuadrados y no puede resolverse por sustitución simple, se reemplaza la variable x por una función trigonométrica de un ángulo θ. Gracias a las identidades pitagóricas, la raíz se simplifica por completo, dejando una integral trigonométrica ordinaria.',
    formulas: [
      { label: 'Caso a² - x²', tex: 'x = a\\sin\\theta \\quad\\Rightarrow\\quad \\sqrt{a^{2}-x^{2}} = a\\cos\\theta' },
      { label: 'Caso a² + x²', tex: 'x = a\\tan\\theta \\quad\\Rightarrow\\quad \\sqrt{a^{2}+x^{2}} = a\\sec\\theta' },
      { label: 'Caso x² - a²', tex: 'x = a\\sec\\theta \\quad\\Rightarrow\\quad \\sqrt{x^{2}-a^{2}} = a\\tan\\theta' },
    ],
    cuandoUsar: [
      'El integrando contiene √(a²-x²), √(a²+x²) o √(x²-a²) y la sustitución simple no elimina la raíz.',
      'Después de sustituir, la raíz se convierte en una función trigonométrica sin radical (usando 1-sen²=cos², 1+tan²=sec², sec²-1=tan²).',
      'Al final se regresa a x armando un triángulo rectángulo de referencia según el caso usado.',
    ],
    ejemplo: {
      enunciado: '\\int \\sqrt{4 - x^{2}}\\;dx',
      pasos: [
        { texto: 'Es el caso a²-x² con a=2: se sustituye x = 2·senθ.', math: 'x = 2\\sin\\theta,\\qquad dx = 2\\cos\\theta\\,d\\theta' },
        { texto: 'La raíz se simplifica usando la identidad pitagórica.', math: '\\sqrt{4-x^{2}} = \\sqrt{4-4\\sin^{2}\\theta} = 2\\cos\\theta' },
        { texto: 'Se reescribe la integral, ya sin radical.', math: '\\int (2\\cos\\theta)(2\\cos\\theta)\\,d\\theta = 4\\int \\cos^{2}\\theta\\,d\\theta' },
        { texto: 'Se aplica la identidad de ángulo doble e integra.', math: '4\\int \\dfrac{1+\\cos 2\\theta}{2}\\,d\\theta = 2\\theta + \\sin 2\\theta + C' },
        { texto: 'Se regresa a x: θ = arcsen(x/2), sen θ = x/2, cos θ = √(4-x²)/2.', math: '2\\arcsin\\!\\left(\\dfrac{x}{2}\\right) + \\dfrac{x\\sqrt{4-x^{2}}}{2} + C' },
      ],
      resultado: '2\\arcsin\\!\\left(\\dfrac{x}{2}\\right) + \\dfrac{x\\sqrt{4-x^{2}}}{2} + C',
    },
    area: {
      enunciado:
        'Calcular el área bajo la semicircunferencia f(x) = √(4-x²) (radio 2) y el eje x, para x ∈ [-2, 2]. Este es precisamente el radical que motiva la sustitución x = 2senθ.',
      f: (x) => Math.sqrt(Math.max(0, 4 - x * x)),
      g: () => 0,
      fLabel: 'f(x)=√(4-x²)',
      gLabel: 'g(x)=0',
      xMin: -3,
      xMax: 3,
      a: -2,
      b: 2,
      integralTex: 'A = \\int_{-2}^{2} \\sqrt{4-x^{2}}\\;dx',
      pasos: [
        { texto: 'Usando el resultado del ejemplo resuelto arriba (con x en vez de sustituir 0 a 2 aplicado dos veces por simetría).', math: '2\\arcsin\\!\\left(\\dfrac{x}{2}\\right) + \\dfrac{x\\sqrt{4-x^{2}}}{2}\\ \\bigg|_{-2}^{2}' },
        { texto: 'Se evalúa: en x=2 el término radical se anula y arcsen(1)=π/2; en x=-2, arcsen(-1)=-π/2.', math: '\\left(2\\cdot\\tfrac{\\pi}{2}+0\\right) - \\left(2\\cdot\\left(-\\tfrac{\\pi}{2}\\right)+0\\right) = \\pi-(-\\pi)' },
      ],
      resultadoTex: 'A = 2\\pi\\ \\text{u}^2 \\approx 6.283\\ \\text{u}^2\\quad\\left(\\text{= la mitad del área del círculo de radio 2}\\right)',
    },
  },

  {
    id: 'fracciones-parciales',
    numero: '05',
    accent: '#8b5cf6',
    titulo: 'Fracciones Parciales',
    resumenHome: 'Descomposición de funciones racionales.',
    descripcion:
      'Se usa para integrar funciones racionales P(x)/Q(x) cuando el grado del numerador es menor que el del denominador. El denominador se factoriza y la fracción se descompone en una suma de fracciones más simples (con factores lineales, cuadráticos irreducibles, o factores repetidos), cada una de las cuales se integra con técnicas elementales o logarítmicas.',
    formulas: [
      { label: 'Factores lineales distintos', tex: '\\dfrac{P(x)}{(x-r_1)(x-r_2)} = \\dfrac{A}{x-r_1} + \\dfrac{B}{x-r_2}' },
      { label: 'Factor lineal repetido', tex: '\\dfrac{P(x)}{(x-r)^{n}} = \\dfrac{A_1}{x-r} + \\dfrac{A_2}{(x-r)^{2}} + \\cdots + \\dfrac{A_n}{(x-r)^{n}}' },
      { label: 'Factor cuadrático irreducible', tex: '\\dfrac{P(x)}{x^{2}+px+q} \\;\\longrightarrow\\; \\dfrac{Bx+C}{x^{2}+px+q}' },
    ],
    cuandoUsar: [
      'El integrando es un cociente de polinomios (función racional) y el grado del numerador es menor que el del denominador.',
      'El denominador puede factorizarse en factores lineales y/o cuadráticos irreducibles (si no, primero se hace división larga).',
      'Tras descomponer, cada fracción simple se integra por separado, usualmente dando logaritmos y/o arcotangentes.',
    ],
    ejemplo: {
      enunciado: '\\int \\dfrac{3x+5}{x^{2}-x-2}\\,dx',
      pasos: [
        { texto: 'Se factoriza el denominador.', math: 'x^{2}-x-2 = (x-2)(x+1)' },
        { texto: 'Se plantea la descomposición en fracciones simples.', math: '\\dfrac{3x+5}{(x-2)(x+1)} = \\dfrac{A}{x-2} + \\dfrac{B}{x+1}' },
        { texto: 'Se igualan numeradores y se evalúa en las raíces para hallar A y B.', math: '3x+5 = A(x+1)+B(x-2)\\ \\Rightarrow\\ A=\\dfrac{11}{3},\\ \\ B=-\\dfrac{2}{3}' },
        { texto: 'Se integra cada fracción simple por separado (dan logaritmos naturales).', math: '\\dfrac{11}{3}\\int\\dfrac{dx}{x-2} - \\dfrac{2}{3}\\int\\dfrac{dx}{x+1}' },
        { texto: 'Se escribe el resultado final.', math: '\\dfrac{11}{3}\\ln|x-2| - \\dfrac{2}{3}\\ln|x+1| + C' },
      ],
      resultado: '\\dfrac{11}{3}\\ln|x-2| - \\dfrac{2}{3}\\ln|x+1| + C',
    },
    area: {
      enunciado:
        'Calcular el área entre la recta f(x) = x + 4 y la parábola g(x) = x² - 2x, que se cortan en x = -1 y x = 4.',
      f: (x) => x + 4,
      g: (x) => x * x - 2 * x,
      fLabel: 'f(x)=x+4',
      gLabel: 'g(x)=x²-2x',
      xMin: -2.6,
      xMax: 5,
      a: -1,
      b: 4,
      integralTex: 'A = \\int_{-1}^{4}\\Big[(x+4) - (x^{2}-2x)\\Big]dx = \\int_{-1}^{4}\\left(-x^{2}+3x+4\\right)dx',
      pasos: [
        { texto: 'Se antideriva término a término.', math: '\\left[\\,-\\dfrac{x^{3}}{3} + \\dfrac{3x^{2}}{2} + 4x\\,\\right]_{-1}^{4}' },
        { texto: 'Se evalúa en los límites y se resta.', math: '\\dfrac{56}{3} - \\left(-\\dfrac{13}{6}\\right) = \\dfrac{112}{6}+\\dfrac{13}{6}' },
      ],
      resultadoTex: 'A = \\dfrac{125}{6}\\ \\text{u}^2 \\approx 20.83\\ \\text{u}^2',
    },
  },
]

export const getTechniqueById = (id) => techniques.find((t) => t.id === id)
