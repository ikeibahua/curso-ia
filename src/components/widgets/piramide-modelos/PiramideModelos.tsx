import React, { useState, useId } from 'react';

interface PyramidLevel {
  id: string;
  levelNumber: number;
  title: string;
  question: string;
  analogy: string;
  examples: {
    openai: string;
    anthropic: string;
    google: string;
    openSource: string;
  };
  commonMistake: string;
}

const LEVELS: PyramidLevel[] = [
  {
    id: 'empresa',
    levelNumber: 1,
    title: '1. La Empresa / Laboratorio',
    question: '¿Quién financia, entrena e investiga?',
    analogy: 'Como la editorial que publica una enciclopedia (ej. Planeta, Espasa-Calpe o Oxford University Press).',
    examples: {
      openai: 'OpenAI (EE. UU.)',
      anthropic: 'Anthropic (fundada por ex-investigadores de OpenAI)',
      google: 'Google DeepMind',
      openSource: 'Meta (Llama) / Mistral AI (Francia) / Qwen (Alibaba)',
    },
    commonMistake: 'Decir "hablo con OpenAI" como si fuera una app concreta; es la corporación dueña del servicio.',
  },
  {
    id: 'herramienta',
    levelNumber: 2,
    title: '2. La Herramienta / Producto',
    question: '¿A través de qué pantalla o aplicación interactúas?',
    analogy: 'Como la tienda o la biblioteca donde consultas el libro (una web, una app en el móvil, un lector de libros electrónicos).',
    examples: {
      openai: 'ChatGPT (web, app Mac/iPhone), Codex',
      anthropic: 'Claude.ai (web, app escritorio), Claude Code (terminal)',
      google: 'Gemini (app web), AI Studio',
      openSource: 'Ollama (en tu propia terminal), LM Studio, Open WebUI',
    },
    commonMistake: 'Confundir la herramienta con la inteligencia interna: ChatGPT es el contenedor; el cerebro que hay dentro cambia según el selector.',
  },
  {
    id: 'modelo',
    levelNumber: 3,
    title: '3. El Modelo y su Tamaño (El motor)',
    question: '¿Qué red neuronal exacta está procesando tus tokens?',
    analogy: 'El motor que lleva el vehículo: un utilitario eléctrico de 1.0 litros para ciudad vs un camión diésel de 500 CV para transportar toneladas.',
    examples: {
      openai: 'Luna (rápido y ligero) < Sol (equilibrado) < Astra (máxima potencia)',
      anthropic: 'Haiku (ágil) < Sonnet (equilibrio rey) < Opus (máxima capacidad) / Fable',
      google: 'Flash (ultrarrápido y económico) < Pro (profundo y multimodal)',
      openSource: 'Llama 8B (cabe en tu Mac) < 70B (requiere servidor potente) < 405B',
    },
    commonMistake: 'Creer que "el modelo más grande" siempre es el mejor. Para redactar un correo o resumir una nota, los modelos ligeros son 10 veces más rápidos y baratos.',
  },
  {
    id: 'esfuerzo',
    levelNumber: 4,
    title: '4. El Esfuerzo de Razonamiento (El dial)',
    question: '¿Cuánto tiempo y fichas internas de cálculo dedica a pensar antes de responder?',
    analogy: 'Como pedirle a un ajedrecista que juegue una partida relámpago de 1 minuto (respuesta instintiva) frente a darle 40 minutos para evaluar 10 jugadas por adelantado.',
    examples: {
      openai: 'Minimal / Low / Medium / High / Extra High',
      anthropic: 'Low / Medium / High / Extra High / Max',
      google: 'Thinking budget (en segundos o tokens)',
      openSource: 'Tokens de pensamiento generados en la etiqueta <think>',
    },
    commonMistake: 'Activar el esfuerzo máximo para tareas triviales de redacción: solo tardará 30 segundos más y consumirá memoria sin aportar ningún valor añadido.',
  },
];

export default function PiramideModelos() {
  const [activeLevelId, setActiveLevelId] = useState<string>('modelo');
  const titleId = useId();

  const activeLevel = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[2];

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
            Jerarquía conceptual
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
            La Pirámide: De la Empresa al Dial de Esfuerzo
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
          4 Niveles de abstracción
        </div>
      </div>

      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Pulsa en cada escalón de la pirámide para desarmar la confusión entre la empresa que lo crea, la web donde chateas, el modelo que piensa y el dial de esfuerzo:
      </p>

      {/* Visualización de la pirámide en bloques jerárquicos */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {LEVELS.map((lvl) => {
          const isSelected = lvl.id === activeLevelId;
          // Width decreases from base (4) to top (1)
          const widths = ['65%', '76%', '88%', '100%'];
          const widthPct = widths[lvl.levelNumber - 1];

          return (
            <button
              key={lvl.id}
              onClick={() => setActiveLevelId(lvl.id)}
              style={{
                width: widthPct,
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid',
                borderColor: isSelected
                  ? 'var(--color-accent, #6366f1)'
                  : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: isSelected
                  ? 'rgba(99, 102, 241, 0.25)'
                  : 'var(--sl-color-bg, #1e293b)',
                color: isSelected ? 'var(--sl-color-white, #f8fafc)' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 0 12px rgba(99, 102, 241, 0.25)' : 'none',
              }}
              aria-pressed={isSelected}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.6rem',
                    height: '1.6rem',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--color-accent, #6366f1)' : 'rgba(255, 255, 255, 0.08)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  {lvl.levelNumber}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: isSelected ? 700 : 500 }}>
                  {lvl.title}
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: isSelected ? '#a5b4fc' : '#94a3b8', fontStyle: 'italic' }}>
                {lvl.question}
              </span>
            </button>
          );
        })}
      </div>

      {/* Ficha explicativa del nivel seleccionado */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--sl-color-white, #f8fafc)' }}>
            {activeLevel.title}: <span style={{ color: 'var(--color-accent, #818cf8)' }}>{activeLevel.question}</span>
          </h4>
        </div>

        {/* Analogía */}
        <div
          style={{
            padding: '0.65rem 0.85rem',
            borderRadius: '0.375rem',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            fontSize: '0.85rem',
            color: 'var(--sl-color-text, #e2e8f0)',
            marginBottom: '1rem',
          }}
        >
          <strong style={{ color: '#4ade80' }}>🌿 Analogía:</strong> {activeLevel.analogy}
        </div>

        {/* Ejemplos de las familias principales */}
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
          Ejemplos en el panorama actual (verificados 2026):
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.6rem',
            marginBottom: '1rem',
          }}
        >
          <div style={{ padding: '0.6rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, display: 'block' }}>OPENAI</span>
            <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{activeLevel.examples.openai}</span>
          </div>

          <div style={{ padding: '0.6rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '0.72rem', color: '#fb923c', fontWeight: 700, display: 'block' }}>ANTHROPIC</span>
            <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{activeLevel.examples.anthropic}</span>
          </div>

          <div style={{ padding: '0.6rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 700, display: 'block' }}>GOOGLE</span>
            <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{activeLevel.examples.google}</span>
          </div>

          <div style={{ padding: '0.6rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 700, display: 'block' }}>MODELOS ABIERTOS</span>
            <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{activeLevel.examples.openSource}</span>
          </div>
        </div>

        {/* Error habitual */}
        <div
          style={{
            padding: '0.65rem 0.85rem',
            borderRadius: '0.375rem',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            fontSize: '0.82rem',
            color: 'var(--sl-color-text, #fca5a5)',
          }}
        >
          <strong>⚠️ Confusión habitual a evitar:</strong> {activeLevel.commonMistake}
        </div>
      </div>
    </div>
  );
}
