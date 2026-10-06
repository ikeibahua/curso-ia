import React, { useState, useId } from 'react';

interface ToolQualityOption {
  id: string;
  label: string;
  descriptionText: string;
  isDetailed: boolean;
}

const QUALITY_OPTIONS: ToolQualityOption[] = [
  {
    id: 'poor',
    label: '❌ Descripción vaga o descuidada',
    descriptionText: 'Busca cosas sobre árboles y plantas.',
    isDetailed: false,
  },
  {
    id: 'good',
    label: '✅ Descripción precisa y rigurosa',
    descriptionText:
      'Identifica la especie botánica de un árbol a partir de sus caracteres morfológicos observables (tipo de hoja, disposición, nervadura o corteza) y la altitud geográfica.',
    isDetailed: true,
  },
];

interface TestPrompt {
  id: string;
  prompt: string;
  relevantToTool: boolean;
}

const TEST_PROMPTS: TestPrompt[] = [
  {
    id: 'tree-query',
    prompt: 'Encontré en el Pirineo a 1.400 m un árbol de hojas caducas con borde lobulado y bellotas.',
    relevantToTool: true,
  },
  {
    id: 'capital-query',
    prompt: '¿Cuál es la distancia en kilómetros entre Madrid y Zaragoza?',
    relevantToTool: false,
  },
];

export default function DisenadorTools() {
  const [selectedQualityId, setSelectedQualityId] = useState<string>('good');
  const [selectedPromptId, setSelectedPromptId] = useState<string>('tree-query');
  const titleId = useId();

  const quality = QUALITY_OPTIONS.find((q) => q.id === selectedQualityId) || QUALITY_OPTIONS[1];
  const testPrompt = TEST_PROMPTS.find((p) => p.id === selectedPromptId) || TEST_PROMPTS[0];

  // Simulation logic
  const isToolTriggered = testPrompt.relevantToTool && quality.isDetailed;
  const isAmbiguousFail = testPrompt.relevantToTool && !quality.isDetailed;

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
            Ingeniería de herramientas
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
            Diseñador de Tools: La fuerza de la descripción
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
          JSON Schema + Prompting
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        El modelo de lenguaje no sabe qué hace el código interno de una herramienta: <strong>solo lee su descripción en texto plano</strong> para decidir si la invoca o no. Cambia la calidad de la descripción y comprueba el efecto:
      </p>

      {/* Selector de Calidad de Descripción */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.4rem' }}>
          Calidad de la descripción configurada para la herramienta:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {QUALITY_OPTIONS.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQualityId(q.id)}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: selectedQualityId === q.id ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: selectedQualityId === q.id ? 'rgba(99, 102, 241, 0.25)' : 'var(--sl-color-bg, #1e293b)',
                color: selectedQualityId === q.id ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                fontWeight: selectedQualityId === q.id ? 700 : 400,
              }}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ficha JSON de la Tool tal y como la recibe el modelo */}
      <div
        style={{
          backgroundColor: '#0a0f1d',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
        }}
      >
        <div style={{ color: '#94a3b8', marginBottom: '0.35rem', fontSize: '0.72rem', textTransform: 'uppercase' }}>
          // Definición de la Tool (lo que se inyecta en el prompt del sistema)
        </div>
        <div style={{ color: '#38bdf8' }}>{'{'}</div>
        <div style={{ paddingLeft: '1rem' }}>
          <span style={{ color: '#94a3b8' }}>"name":</span> <span style={{ color: '#facc15' }}>"identificar_especie_arbol"</span>,
        </div>
        <div style={{ paddingLeft: '1rem' }}>
          <span style={{ color: '#94a3b8' }}>"description":</span>{' '}
          <span style={{ color: quality.isDetailed ? '#4ade80' : '#f87171' }}>"{quality.descriptionText}"</span>,
        </div>
        <div style={{ paddingLeft: '1rem' }}>
          <span style={{ color: '#94a3b8' }}>"parameters":</span> {'{ "type": "object", "properties": { "rasgos": { "type": "string" }, "altitud": { "type": "number" } } }'}
        </div>
        <div style={{ color: '#38bdf8' }}>{'}'}</div>
      </div>

      {/* Selector de Consulta de Prueba */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.4rem' }}>
          Mensaje de prueba del usuario:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {TEST_PROMPTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPromptId(p.id)}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: selectedPromptId === p.id ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: selectedPromptId === p.id ? 'rgba(99, 102, 241, 0.25)' : 'var(--sl-color-bg, #1e293b)',
                color: selectedPromptId === p.id ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                fontWeight: selectedPromptId === p.id ? 600 : 400,
              }}
            >
              {p.id === 'tree-query' ? '🌲 Consulta sobre árbol' : '🗺️ Consulta geográfica'}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.4rem', fontStyle: 'italic' }}>
          "{testPrompt.prompt}"
        </div>
      </div>

      {/* Veredicto de la decisión del modelo */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: isToolTriggered
            ? 'rgba(34, 197, 94, 0.1)'
            : isAmbiguousFail
            ? 'rgba(239, 68, 68, 0.1)'
            : 'rgba(56, 189, 248, 0.1)',
          border: `1px solid ${
            isToolTriggered
              ? 'rgba(34, 197, 94, 0.4)'
              : isAmbiguousFail
              ? 'rgba(239, 68, 68, 0.4)'
              : 'rgba(56, 189, 248, 0.4)'
          }`,
        }}
      >
        {isToolTriggered ? (
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4ade80', marginBottom: '0.3rem' }}>
              🎯 ¡Herramienta activada con éxito!
            </div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
              Gracias a la descripción rica en detalles morfológicos, el modelo reconoció inmediatamente que la consulta encajaba con el propósito de la función y emitió:
              <br />
              <code style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
                identificar_especie_arbol(rasgos="hojas caducas, borde lobulado, bellotas", altitud=1400)
              </code>
            </div>
          </div>
        ) : isAmbiguousFail ? (
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171', marginBottom: '0.3rem' }}>
              ⚠️ Fallo por descripción ambigua
            </div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
              Al decir simplemente <em>"Busca cosas sobre árboles"</em>, el modelo no está seguro de si la herramienta sirve para identificación morfológica, para precios de madera o para poda. Prefiere no arriesgarse y responde con texto genérico sin usar la herramienta.
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.3rem' }}>
              ℹ️ Herramienta descartada correctamente
            </div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
              La consulta trataba sobre distancias geográficas, así que el modelo descartó la herramienta de botánica y respondió directamente con su conocimiento geográfico general.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
