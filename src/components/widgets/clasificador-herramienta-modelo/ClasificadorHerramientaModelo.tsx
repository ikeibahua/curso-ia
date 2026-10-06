import React, { useState, useId } from 'react';

type Category = 'empresa' | 'herramienta' | 'modelo';

interface QuizItem {
  id: string;
  name: string;
  correctCategory: Category;
  explanation: string;
}

const ITEMS: QuizItem[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    correctCategory: 'herramienta',
    explanation: 'ChatGPT es el servicio web y la app (el producto) desarrollado por OpenAI. Dentro de ChatGPT puedes seleccionar distintos modelos según tu plan.',
  },
  {
    id: 'sonnet',
    name: 'Sonnet',
    correctCategory: 'modelo',
    explanation: 'Sonnet es el modelo neuronal intermedio y más equilibrado de Anthropic (actualmente Sonnet 3.7 / 5.5). No es una aplicación por sí misma, sino el motor de cómputo.',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    correctCategory: 'empresa',
    explanation: 'Anthropic es la empresa tecnológica con sede en San Francisco creadora de la familia Claude.',
  },
  {
    id: 'claude-ai',
    name: 'Claude.ai',
    correctCategory: 'herramienta',
    explanation: 'Claude.ai es la interfaz web y aplicación donde los usuarios chatean con los modelos de Anthropic.',
  },
  {
    id: 'opus',
    name: 'Opus',
    correctCategory: 'modelo',
    explanation: 'Opus es el modelo de mayor escala y máxima potencia de la familia Claude de Anthropic.',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    correctCategory: 'empresa',
    explanation: 'OpenAI es la corporación de inteligencia artificial que desarrolla ChatGPT, Astra, Sol y Codex.',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    correctCategory: 'herramienta',
    explanation: 'Ollama es una herramienta y programa que se instala en tu Mac para ejecutar modelos abiertos en local.',
  },
  {
    id: 'haiku',
    name: 'Haiku',
    correctCategory: 'modelo',
    explanation: 'Haiku es el modelo ultrarrápido y ligero de Anthropic, ideal para tareas cotidianas sin retardo.',
  },
];

export default function ClasificadorHerramientaModelo() {
  const [userAssignments, setUserAssignments] = useState<Record<string, Category | null>>({
    chatgpt: null,
    sonnet: null,
    anthropic: null,
    'claude-ai': null,
    opus: null,
    openai: null,
    ollama: null,
    haiku: null,
  });

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const titleId = useId();

  const handleSelect = (itemId: string, category: Category) => {
    setUserAssignments((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === category ? null : category,
    }));
    setHasSubmitted(false);
  };

  const handleReset = () => {
    setUserAssignments({
      chatgpt: null,
      sonnet: null,
      anthropic: null,
      'claude-ai': null,
      opus: null,
      openai: null,
      ollama: null,
      haiku: null,
    });
    setHasSubmitted(false);
  };

  const correctCount = ITEMS.filter(
    (item) => userAssignments[item.id] === item.correctCategory
  ).length;

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
          marginBottom: '1rem',
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
            Mini-juego de discriminación
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
            ¿Es Empresa, Herramienta o Modelo?
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
          {hasSubmitted ? `${correctCount} de ${ITEMS.length} aciertos` : '8 conceptos clave'}
        </div>
      </div>

      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Asigna cada término a su categoría correcta pulsando uno de los tres botones correspondientes:
      </p>

      {/* Lista de tarjetas para clasificar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {ITEMS.map((item) => {
          const selected = userAssignments[item.id];
          const isCorrect = selected === item.correctCategory;

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--sl-color-bg, #1e293b)',
                borderRadius: '0.5rem',
                padding: '0.85rem 1rem',
                border: '1px solid',
                borderColor: hasSubmitted
                  ? isCorrect
                    ? 'rgba(34, 197, 94, 0.5)'
                    : 'rgba(239, 68, 68, 0.5)'
                  : 'var(--sl-color-gray-5, #334155)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                  {item.name}
                </span>
                {hasSubmitted && (
                  <span style={{ fontSize: '1rem' }}>{isCorrect ? '✅' : '❌'}</span>
                )}
              </div>

              {/* Botones de categoría */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleSelect(item.id, 'empresa')}
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.375rem',
                    border: '1px solid',
                    borderColor: selected === 'empresa' ? '#38bdf8' : 'var(--sl-color-gray-5, #334155)',
                    backgroundColor: selected === 'empresa' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: selected === 'empresa' ? '#38bdf8' : 'var(--sl-color-text, #cbd5e1)',
                    cursor: 'pointer',
                    fontWeight: selected === 'empresa' ? 700 : 400,
                  }}
                >
                  🏢 Empresa
                </button>

                <button
                  onClick={() => handleSelect(item.id, 'herramienta')}
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.375rem',
                    border: '1px solid',
                    borderColor: selected === 'herramienta' ? '#fb923c' : 'var(--sl-color-gray-5, #334155)',
                    backgroundColor: selected === 'herramienta' ? 'rgba(251, 146, 60, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: selected === 'herramienta' ? '#fb923c' : 'var(--sl-color-text, #cbd5e1)',
                    cursor: 'pointer',
                    fontWeight: selected === 'herramienta' ? 700 : 400,
                  }}
                >
                  💻 Herramienta
                </button>

                <button
                  onClick={() => handleSelect(item.id, 'modelo')}
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.375rem',
                    border: '1px solid',
                    borderColor: selected === 'modelo' ? 'var(--color-accent, #818cf8)' : 'var(--sl-color-gray-5, #334155)',
                    backgroundColor: selected === 'modelo' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: selected === 'modelo' ? 'var(--color-accent, #a5b4fc)' : 'var(--sl-color-text, #cbd5e1)',
                    cursor: 'pointer',
                    fontWeight: selected === 'modelo' ? 700 : 400,
                  }}
                >
                  🧠 Modelo
                </button>
              </div>

              {/* Explicación si ya se comprobó */}
              {hasSubmitted && (
                <div
                  style={{
                    width: '100%',
                    fontSize: '0.8rem',
                    color: isCorrect ? '#bbf7d0' : '#fecaca',
                    paddingTop: '0.35rem',
                    borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {item.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botones de acción inferior */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={() => setHasSubmitted(true)}
          style={{
            padding: '0.55rem 1.25rem',
            backgroundColor: 'var(--color-accent, #6366f1)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
          }}
        >
          ✅ Comprobar clasificación
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: '0.55rem 0.85rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            color: 'var(--sl-color-gray-3, #94a3b8)',
            borderRadius: '0.375rem',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
