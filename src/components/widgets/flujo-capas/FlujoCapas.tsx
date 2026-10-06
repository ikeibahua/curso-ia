import React, { useState, useEffect, useId, useRef } from 'react';

interface TransformerStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  description: string;
  biologyAnalogy: string;
  technicalDetail: string;
  visualHighlight: string;
}

const STEPS: TransformerStep[] = [
  {
    id: 1,
    title: 'Entrada y Tokenización',
    subtitle: 'De texto a números enteros',
    icon: '🔤',
    badge: 'Paso 1 de 5',
    description:
      'La frase que escribes ("Los robles centenarios...") se corta en piezas mínimas (tokens) y cada una recibe un identificador numérico según el vocabulario fijo del modelo.',
    biologyAnalogy:
      'Como transcribir una secuencia de aminoácidos en letras químicas individuales (A, C, G, T) antes de analizar su estructura proteica.',
    technicalDetail:
      'No viajan letras por la red; viaja un vector de enteros: ej. [1823, 49201, 1104, ...].',
    visualHighlight: 'tokens',
  },
  {
    id: 2,
    title: 'Embeddings + Posición (RoPE)',
    subtitle: 'Puntos en el espacio y orden temporal',
    icon: '🧭',
    badge: 'Paso 2 de 5',
    description:
      'Cada número se transforma en un vector de miles de dimensiones (Embedding). A este vector se le suma una marca matemática de orden (codificación posicional como RoPE) para que la red sepa cuál va primero y cuál va después.',
    biologyAnalogy:
      'Un organismo no solo necesita saber qué nutrientes tiene en el suelo, sino su orientación espacial: las raíces van hacia abajo y los tallos hacia la luz.',
    technicalDetail:
      'Sin posición, un transformer vería "El perro mordió al gato" exactamente igual que "El gato mordió al perro".',
    visualHighlight: 'embeddings',
  },
  {
    id: 3,
    title: 'Capas de Atención Multicabeza (MHA)',
    subtitle: 'El diálogo entre todas las palabras',
    icon: '🕸️',
    badge: 'Paso 3 de 5',
    description:
      'El corazón del modelo. Cada token proyecta tres vectores: Consulta (Query), Clave (Key) y Valor (Value). Las palabras comparan sus claves y consultas para calcular cuánta atención prestarse mutuamente y enriquecer sus significados.',
    biologyAnalogy:
      'Una bandada de estorninos en vuelo sincronizado: ningún pájaro sigue a un líder único; cada uno observa continuamente la posición y velocidad de sus vecinos más cercanos para modular su trayectoria.',
    technicalDetail:
      'Fórmula clásica: Attention(Q, K, V) = softmax(Q · Kᵀ / √d) · V. Ocurre en paralelo a través de 32 a 128 cabezas simultáneas.',
    visualHighlight: 'attention',
  },
  {
    id: 4,
    title: 'Redes Densa (MLP) y Conexiones Residuales',
    subtitle: 'La enciclopedia de conocimiento fáctico',
    icon: '🧠',
    badge: 'Paso 4 de 5',
    description:
      'Tras dialogar con las demás palabras, cada token pasa por una red neuronal densa (Feed-Forward / MLP). Aquí se almacenan la mayoría de los hechos memorizados. Además, una "conexión residual" (un atajo) suma la entrada original para no perder información.',
    biologyAnalogy:
      'Como las vías circulatorias principales de una hoja: la savia corre por canales directos (conexión residual) mientras que los cloroplastos microscópicos sintetizan azúcares en las células adyacentes.',
    technicalDetail:
      'Las conexiones residuales (x + F(x)) son las que permiten apilar 80 o 120 capas en profundidad sin que el gradiente desaparezca.',
    visualHighlight: 'mlp',
  },
  {
    id: 5,
    title: 'Capa Lineal Final y Generación de Token',
    subtitle: 'El colofón probabilístico autorregresivo',
    icon: '🎯',
    badge: 'Paso 5 de 5',
    description:
      'El vector resultante del último token se proyecta sobre el vocabulario entero (128.000 palabras) mediante una capa lineal, generando un "logit" para cada una. Softmax los transforma en porcentajes y se muestrea el ganador.',
    biologyAnalogy:
      'El proceso de polinización anemófila: millones de granos de polen flotan con probabilidades distintas, pero solo uno fecunda el óvulo floral en cada instante.',
    technicalDetail:
      'La nueva palabra se concatena al final del texto y el bucle entero vuelve a ejecutarse desde el paso 1 (generación autorregresiva token a token).',
    visualHighlight: 'output',
  },
];

export default function FlujoCapas() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const titleId = useId();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = STEPS[currentStepIndex];

  // Auto-play logic with respect to timer cleanup
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % STEPS.length);
      }, 4500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSelectStep = (idx: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(idx);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        border: '1px solid var(--sl-color-gray-5, #334155)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        backgroundColor: 'var(--sl-color-bg-sidebar, #0f172a)',
        margin: '1.5rem 0',
        fontFamily: 'inherit',
      }}
      role="region"
      aria-labelledby={titleId}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: '1px solid var(--sl-color-gray-5, #334155)',
          paddingBottom: '0.85rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-accent, #6366f1)',
              display: 'block',
              marginBottom: '0.2rem',
            }}
          >
            Arquitectura paso a paso
          </span>
          <h3
            id={titleId}
            style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--sl-color-white, #f8fafc)',
            }}
          >
            El viaje del dato dentro de un Transformer
          </h3>
        </div>

        {/* Controles de reproducción */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={togglePlay}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              backgroundColor: isPlaying ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)',
              color: isPlaying ? '#fca5a5' : '#a5b4fc',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            aria-label={isPlaying ? 'Pausar animación automática' : 'Reproducir animación paso a paso'}
          >
            {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '0.35rem 0.6rem',
              fontSize: '0.8rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              backgroundColor: 'transparent',
              color: 'var(--sl-color-gray-3, #94a3b8)',
              cursor: 'pointer',
            }}
            aria-label="Reiniciar al paso 1"
          >
            ⏮️
          </button>
        </div>
      </div>

      {/* Barra de progreso de fases (1 al 5) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.35rem',
          marginBottom: '1.25rem',
        }}
      >
        {STEPS.map((s, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isPast = idx < currentStepIndex;

          return (
            <button
              key={s.id}
              onClick={() => handleSelectStep(idx)}
              style={{
                padding: '0.5rem 0.25rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: isCurrent
                  ? 'var(--color-accent, #6366f1)'
                  : isPast
                  ? 'rgba(99, 102, 241, 0.4)'
                  : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: isCurrent
                  ? 'var(--color-accent, #6366f1)'
                  : isPast
                  ? 'rgba(99, 102, 241, 0.15)'
                  : 'var(--sl-color-bg, #1e293b)',
                color: isCurrent
                  ? '#ffffff'
                  : isPast
                  ? 'var(--sl-color-white, #f8fafc)'
                  : 'var(--sl-color-gray-3, #94a3b8)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.15rem',
                transition: 'all 0.15s ease',
              }}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span style={{ fontSize: '1rem' }}>{s.icon}</span>
              <span style={{ fontWeight: isCurrent ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                {s.id}. {s.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Diagrama esquemático interactivo */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>{step.icon}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(99, 102, 241, 0.25)',
                  color: 'var(--color-accent, #a5b4fc)',
                }}
              >
                {step.badge}
              </span>
              <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--sl-color-white, #f8fafc)' }}>
                {step.title}
              </h4>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--sl-color-gray-3, #94a3b8)', marginTop: '0.2rem' }}>
              {step.subtitle}
            </div>
          </div>
        </div>

        <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--sl-color-text, #cbd5e1)' }}>
          {step.description}
        </p>

        {/* Dos tarjetas: analogía biológica y detalle técnico */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {/* Analogía de biología */}
          <div
            style={{
              padding: '0.85rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              color: 'var(--sl-color-text, #e2e8f0)',
            }}
          >
            <div style={{ fontWeight: 600, color: '#4ade80', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>🌿</span> Analogía con el mundo natural:
            </div>
            <div>{step.biologyAnalogy}</div>
          </div>

          {/* Detalle técnico */}
          <div
            style={{
              padding: '0.85rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              color: 'var(--sl-color-text, #e2e8f0)',
            }}
          >
            <div style={{ fontWeight: 600, color: '#a5b4fc', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>⚙️</span> Qué calcula la máquina:
            </div>
            <div>{step.technicalDetail}</div>
          </div>
        </div>
      </div>

      {/* Controles de navegación de pie */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          style={{
            padding: '0.45rem 1rem',
            fontSize: '0.85rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            backgroundColor: currentStepIndex === 0 ? 'rgba(255, 255, 255, 0.03)' : 'var(--sl-color-bg, #1e293b)',
            color: currentStepIndex === 0 ? 'var(--sl-color-gray-4, #64748b)' : 'var(--sl-color-white, #f8fafc)',
            cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 500,
          }}
        >
          ← Paso anterior
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--sl-color-gray-3, #94a3b8)' }}>
          Paso {currentStepIndex + 1} de {STEPS.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentStepIndex === STEPS.length - 1}
          style={{
            padding: '0.45rem 1rem',
            fontSize: '0.85rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            backgroundColor:
              currentStepIndex === STEPS.length - 1
                ? 'rgba(255, 255, 255, 0.03)'
                : 'var(--color-accent, #6366f1)',
            color: currentStepIndex === STEPS.length - 1 ? 'var(--sl-color-gray-4, #64748b)' : '#ffffff',
            cursor: currentStepIndex === STEPS.length - 1 ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          Siguiente paso →
        </button>
      </div>
    </div>
  );
}

