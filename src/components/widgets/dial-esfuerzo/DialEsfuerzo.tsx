import React, { useState, useId } from 'react';

interface EffortLevel {
  level: number;
  label: string;
  internalName: string;
  estimatedTime: string;
  thinkingTokens: string;
  recommendedUse: string;
  wasteOfResources: string;
  sampleThinking: string;
  sampleOutput: string;
  costIndicator: string;
}

const EFFORT_LEVELS: EffortLevel[] = [
  {
    level: 0,
    label: 'Desactivado / Mínimo',
    internalName: 'none / minimal',
    estimatedTime: '1 a 2 segundos',
    thinkingTokens: '0 tokens internos',
    recommendedUse: 'Respuestas instantáneas, resúmenes de texto, redacción de correos, traducción y charla informal.',
    wasteOfResources: 'No gasta recursos extra, pero fallará con frecuencia en acertijos lógicos o problemas matemáticos de varios pasos.',
    sampleThinking: '(Ningún pensamiento interno. Emite directamente la primera palabra por reflejo probabilístico).',
    sampleOutput: 'En la palabra "ferrocarrilero" hay 4 letras "r". [Nota: ¡Se ha equivocado por precipitación, en realidad tiene 5!]',
    costIndicator: '⚡ Mínimo coste y máxima velocidad',
  },
  {
    level: 1,
    label: 'Bajo (Low)',
    internalName: 'low',
    estimatedTime: '4 a 8 segundos',
    thinkingTokens: '~800 a 1.500 tokens',
    recommendedUse: 'Comprobaciones sencillas, ordenación de listas con criterios múltiples, aclaraciones de ambigüedad.',
    wasteOfResources: 'Sobredimensionado para peticiones de un solo renglón o consultas factuales directas.',
    sampleThinking: 'El usuario pregunta por la letra r en ferrocarrilero. Voy a deletrear: f-e-r-r-o-c-a-r-r-i-l-e-r-o. Contemos: posición 3, 4, 8, 9, 13. Son 5.',
    sampleOutput: 'La palabra "ferrocarrilero" contiene exactamente 5 letras "r": fe[rr]oca[rr]ile[r]o.',
    costIndicator: '🟢 Muy económico y ágil',
  },
  {
    level: 2,
    label: 'Medio (Medium)',
    internalName: 'medium',
    estimatedTime: '12 a 25 segundos',
    thinkingTokens: '~3.000 a 6.000 tokens',
    recommendedUse: 'El estándar recomendado para problemas técnicos: programación, deducciones lógicas, análisis de datos botánicos cruzados.',
    wasteOfResources: 'Innecesario si solo buscas inspiración poética o lluvia de ideas creativas.',
    sampleThinking: 'Analicemos la secuencia de letras con cuidado. Deletreo fonético y ortográfico: f-e-r-r-o-c-a-r-r-i-l-e-r-o. Doble erre en posición 3 y 4. Doble erre en 8 y 9. Erre simple en 13. Total = 2 + 2 + 1 = 5. Comprobemos que no confundo l con r. Todo correcto.',
    sampleOutput: 'La palabra "ferrocarrilero" tiene un total de 5 letras "r":\n- Dos en la primera doble "rr" (fe-rr-o)\n- Dos en la segunda doble "rr" (ca-rr-i)\n- Una en la terminación "-ero".',
    costIndicator: '🟡 Equilibrio óptimo entre rigor y tiempo',
  },
  {
    level: 3,
    label: 'Alto (High)',
    internalName: 'high',
    estimatedTime: '30 a 60 segundos',
    thinkingTokens: '~10.000 a 20.000 tokens',
    recommendedUse: 'Demostraciones matemáticas, refactorización de programas con dependencias complejas, análisis de contradicciones en documentos largos.',
    wasteOfResources: 'Provoca frustración si esperas una conversación rápida. Consume rápidamente los límites por hora de tu plan.',
    sampleThinking: 'Despleguemos un plan de verificación formal. Paso 1: índice canónico de caracteres de 0 a 14. Paso 2: búsqueda de patrones ortográficos en castellano. Paso 3: comprobación de casos límite... Paso 4: contrastar con hipótesis alternativas...',
    sampleOutput: 'Tras análisis exhaustivo de la cadena de caracteres en lengua española:\n- Longitud total: 15 caracteres.\n- Letras "r" identificadas: 5 (posiciones ortográficas 3, 4, 8, 9 y 14).\nConclusión: 5 ocurrencias.',
    costIndicator: '🟠 Alto consumo de cuota y espera prolongada',
  },
  {
    level: 4,
    label: 'Máximo / Extra High (xhigh)',
    internalName: 'xhigh / max',
    estimatedTime: '1 a 3 minutos',
    thinkingTokens: '~30.000 a 64.000 tokens',
    recommendedUse: 'Investigación teórica de frontera, teoremas, resolución de bugs esquivos de software que han resistido otros intentos.',
    wasteOfResources: 'Desaconsejado para el 99% de las situaciones diarias. Puede atascarse sobreanalizando peticiones simples.',
    sampleThinking: 'Generando árbol de exploración de hipótesis. Camino A: derivación lógica formal... Camino B: verificación por reducción al absurdo... Camino C: validación semántica cruzada... Descartando ramificaciones inconsistentes...',
    sampleOutput: 'Resolución rigurosa completa verificada mediante tres métodos independientes de análisis estructural.',
    costIndicator: '🔴 Máximo consumo: reserva este nivel para problemas realmente difíciles',
  },
];

export default function DialEsfuerzo() {
  const [effortIndex, setEffortIndex] = useState<number>(2); // Default to Medium
  const titleId = useId();

  const current = EFFORT_LEVELS[effortIndex];

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
            Pensamiento en tiempo de inferencia
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
            El Dial de Esfuerzo de Razonamiento
          </h3>
        </div>

        <div
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            color: 'var(--sl-color-text, #e2e8f0)',
          }}
        >
          Reasoning Effort
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Mueve el dial para ver cómo cambia el tiempo de respuesta, el gasto invisible de tokens de pensamiento y la profundidad analítica del modelo:
      </p>

      {/* Control deslizante continuo / por pasos */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '1rem 1.25rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
          <label htmlFor="effort-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sl-color-white, #f8fafc)' }}>
            Nivel de esfuerzo seleccionado:
          </label>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-accent, #818cf8)' }}>
            {current.label} <code style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({current.internalName})</code>
          </span>
        </div>

        <input
          id="effort-slider"
          type="range"
          min="0"
          max="4"
          step="1"
          value={effortIndex}
          onChange={(e) => setEffortIndex(parseInt(e.target.value, 10))}
          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-accent, #6366f1)', marginBottom: '0.5rem' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--sl-color-gray-3, #94a3b8)' }}>
          <span>0. Mínimo</span>
          <span>1. Bajo</span>
          <span>2. Medio</span>
          <span>3. Alto</span>
          <span>4. Máx</span>
        </div>
      </div>

      {/* Indicadores de métricas en paralelo */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
            ⏱️ Tiempo de espera
          </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', display: 'block', marginTop: '0.2rem' }}>
            {current.estimatedTime}
          </span>
        </div>

        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
            🧠 Tokens de razonamiento
          </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a5b4fc', display: 'block', marginTop: '0.2rem' }}>
            {current.thinkingTokens}
          </span>
        </div>

        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
            📊 Impacto de cuota
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', display: 'block', marginTop: '0.35rem' }}>
            {current.costIndicator}
          </span>
        </div>
      </div>

      {/* Demostración: ¿Qué piensa el modelo internamente? */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a5b4fc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>💭</span> Proceso mental frente a la pregunta trampa: <em>"¿Cuántas letras 'r' tiene ferrocarrilero?"</em>
        </div>

        {/* Pensamiento interno (Thinking tokens) */}
        <div
          style={{
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderLeft: '3px solid #64748b',
            padding: '0.65rem 0.85rem',
            borderRadius: '0.25rem',
            color: '#94a3b8',
            fontStyle: 'italic',
            marginBottom: '0.65rem',
            lineHeight: 1.5,
          }}
        >
          <strong>Cadena interna de pensamiento (oculta al usuario en chat):</strong><br />
          {current.sampleThinking}
        </div>

        {/* Respuesta visible emitida */}
        <div
          style={{
            fontSize: '0.85rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderLeft: '3px solid var(--color-accent, #6366f1)',
            padding: '0.65rem 0.85rem',
            borderRadius: '0.25rem',
            color: '#f8fafc',
            lineHeight: 1.5,
          }}
        >
          <strong>Respuesta final entregada al usuario:</strong><br />
          {current.sampleOutput}
        </div>
      </div>

      {/* Criterio de uso: Cuándo conviene y cuándo es un desperdicio */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            padding: '0.75rem',
            borderRadius: '0.375rem',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            fontSize: '0.82rem',
            color: 'var(--sl-color-text, #e2e8f0)',
            lineHeight: 1.45,
          }}
        >
          <strong style={{ color: '#4ade80', display: 'block', marginBottom: '0.25rem' }}>
            ✅ Cuándo conviene usarlo:
          </strong>
          {current.recommendedUse}
        </div>

        <div
          style={{
            padding: '0.75rem',
            borderRadius: '0.375rem',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            fontSize: '0.82rem',
            color: 'var(--sl-color-text, #fca5a5)',
            lineHeight: 1.45,
          }}
        >
          <strong style={{ color: '#f87171', display: 'block', marginBottom: '0.25rem' }}>
            ⚠️ Cuándo es un desperdicio:
          </strong>
          {current.wasteOfResources}
        </div>
      </div>
    </div>
  );
}
