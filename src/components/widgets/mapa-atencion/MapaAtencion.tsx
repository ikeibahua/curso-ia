import React, { useState, useId, useMemo } from 'react';

interface AttentionSentence {
  id: string;
  label: string;
  tokens: string[];
  // attentionMatrix[headIndex][fromTokenIndex][toTokenIndex]
  heads: {
    name: string;
    description: string;
    // Map of token index -> array of weights to other tokens
    weights: number[][];
  }[];
  defaultSelectedToken: number;
  explanation: Record<number, string>;
}

const PRESET_SENTENCES: AttentionSentence[] = [
  {
    id: 'banco-dinero',
    label: '1. Desambiguación: Banco financiero',
    tokens: ['Fui', 'al', 'banco', 'a', 'ingresar', 'mi', 'pensión', 'antes', 'del', 'cierre'],
    defaultSelectedToken: 2, // "banco"
    heads: [
      {
        name: 'Cabeza Semántica (Significado y contexto)',
        description: 'Detecta palabras de contexto que definen qué tipo de "banco" es este.',
        weights: [
          // Fui, al, banco, a, ingresar, mi, pensión, antes, del, cierre
          [0.3, 0.1, 0.2, 0.05, 0.2, 0.05, 0.05, 0.02, 0.01, 0.02], // Fui
          [0.1, 0.4, 0.3, 0.05, 0.05, 0.02, 0.03, 0.02, 0.01, 0.02], // al
          [0.05, 0.05, 0.15, 0.05, 0.42, 0.03, 0.22, 0.01, 0.01, 0.01], // banco -> mira a ingresar (42%) y pensión (22%)
          [0.05, 0.05, 0.2, 0.3, 0.3, 0.02, 0.04, 0.02, 0.01, 0.01], // a
          [0.08, 0.02, 0.25, 0.05, 0.2, 0.05, 0.32, 0.01, 0.01, 0.01], // ingresar -> banco (25%), pensión (32%)
          [0.02, 0.01, 0.02, 0.01, 0.1, 0.34, 0.45, 0.02, 0.01, 0.02], // mi
          [0.03, 0.01, 0.2, 0.02, 0.35, 0.05, 0.25, 0.03, 0.02, 0.04], // pensión
          [0.02, 0.01, 0.02, 0.01, 0.05, 0.02, 0.05, 0.4, 0.12, 0.3], // antes
          [0.01, 0.01, 0.01, 0.01, 0.02, 0.01, 0.02, 0.2, 0.4, 0.32], // del
          [0.02, 0.01, 0.15, 0.01, 0.1, 0.01, 0.05, 0.2, 0.1, 0.35], // cierre
        ],
      },
      {
        name: 'Cabeza Sintáctica (Estructura de la oración)',
        description: 'Conecta verbos con sus complementos y preposiciones con sustantivos.',
        weights: [
          [0.2, 0.35, 0.25, 0.1, 0.05, 0.01, 0.02, 0.01, 0.0, 0.01],
          [0.1, 0.2, 0.6, 0.02, 0.02, 0.01, 0.02, 0.01, 0.01, 0.01],
          [0.2, 0.25, 0.2, 0.15, 0.1, 0.02, 0.03, 0.02, 0.01, 0.02],
          [0.05, 0.02, 0.1, 0.2, 0.55, 0.02, 0.03, 0.01, 0.01, 0.01],
          [0.15, 0.02, 0.1, 0.1, 0.2, 0.08, 0.3, 0.02, 0.01, 0.02],
          [0.01, 0.01, 0.01, 0.01, 0.05, 0.25, 0.62, 0.02, 0.01, 0.01],
          [0.02, 0.01, 0.02, 0.01, 0.3, 0.2, 0.25, 0.05, 0.04, 0.1],
          [0.05, 0.02, 0.02, 0.02, 0.05, 0.02, 0.05, 0.2, 0.25, 0.32],
          [0.01, 0.01, 0.01, 0.01, 0.02, 0.01, 0.02, 0.2, 0.2, 0.52],
          [0.02, 0.01, 0.02, 0.01, 0.05, 0.01, 0.05, 0.25, 0.25, 0.34],
        ],
      },
    ],
    explanation: {
      2: 'Al pulsar en "banco", la cabeza semántica vuelca su atención hacia "ingresar" (42%) y "pensión" (22%). Gracias a estas dos palabras, el vector de "banco" muta en el espacio latente hacia el concepto de entidad financiera y descarta el asiento de jardín.',
      4: 'Al pulsar en "ingresar", el modelo atiende fuertemente a "pensión" (32%) y a "banco" (25%), asociando la acción con su destino y objeto.',
    },
  },
  {
    id: 'banco-parque',
    label: '2. Desambiguación: Banco de parque',
    tokens: ['Me', 'senté', 'en', 'el', 'banco', 'de', 'piedra', 'a', 'escuchar', 'los', 'mirlos'],
    defaultSelectedToken: 4, // "banco"
    heads: [
      {
        name: 'Cabeza Semántica (Significado y contexto)',
        description: 'Detecta palabras del entorno físico y natural para orientar el significado.',
        weights: [
          [0.3, 0.45, 0.05, 0.02, 0.1, 0.01, 0.02, 0.01, 0.02, 0.01, 0.01],
          [0.2, 0.2, 0.1, 0.05, 0.35, 0.02, 0.05, 0.01, 0.01, 0.0, 0.01],
          [0.02, 0.15, 0.3, 0.2, 0.3, 0.01, 0.01, 0.0, 0.0, 0.0, 0.01],
          [0.01, 0.02, 0.1, 0.25, 0.58, 0.01, 0.01, 0.0, 0.01, 0.0, 0.01],
          [0.02, 0.38, 0.04, 0.04, 0.12, 0.04, 0.32, 0.01, 0.02, 0.01, 0.0], // banco -> senté (38%), piedra (32%)
          [0.01, 0.02, 0.02, 0.02, 0.35, 0.2, 0.35, 0.01, 0.01, 0.0, 0.01],
          [0.01, 0.05, 0.02, 0.02, 0.48, 0.1, 0.25, 0.02, 0.02, 0.01, 0.02],
          [0.02, 0.05, 0.02, 0.02, 0.05, 0.02, 0.02, 0.25, 0.45, 0.05, 0.05],
          [0.05, 0.1, 0.02, 0.02, 0.05, 0.01, 0.02, 0.1, 0.2, 0.1, 0.33],
          [0.01, 0.01, 0.01, 0.02, 0.02, 0.01, 0.02, 0.05, 0.1, 0.25, 0.5],
          [0.02, 0.02, 0.01, 0.01, 0.05, 0.01, 0.02, 0.05, 0.35, 0.15, 0.31],
        ],
      },
      {
        name: 'Cabeza Sintáctica (Estructura de la oración)',
        description: 'Vínculos entre sujeto elíptico, verbo de acción y sintagmas preposicionales.',
        weights: [
          [0.2, 0.65, 0.02, 0.01, 0.05, 0.01, 0.02, 0.01, 0.01, 0.01, 0.01],
          [0.35, 0.2, 0.15, 0.05, 0.2, 0.01, 0.02, 0.01, 0.01, 0.0, 0.0],
          [0.02, 0.1, 0.2, 0.2, 0.45, 0.01, 0.01, 0.0, 0.0, 0.0, 0.01],
          [0.01, 0.01, 0.05, 0.25, 0.65, 0.01, 0.01, 0.0, 0.0, 0.0, 0.01],
          [0.02, 0.3, 0.15, 0.15, 0.2, 0.08, 0.08, 0.01, 0.01, 0.0, 0.0],
          [0.01, 0.01, 0.01, 0.02, 0.4, 0.2, 0.34, 0.01, 0.0, 0.0, 0.01],
          [0.01, 0.02, 0.01, 0.01, 0.35, 0.25, 0.3, 0.02, 0.01, 0.01, 0.01],
          [0.01, 0.05, 0.02, 0.02, 0.05, 0.01, 0.02, 0.2, 0.55, 0.03, 0.04],
          [0.02, 0.1, 0.01, 0.01, 0.02, 0.01, 0.01, 0.1, 0.2, 0.15, 0.37],
          [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.12, 0.25, 0.55],
          [0.01, 0.02, 0.01, 0.01, 0.02, 0.01, 0.01, 0.05, 0.38, 0.2, 0.28],
        ],
      },
    ],
    explanation: {
      4: 'Ahora "banco" fija su atención en "senté" (38%) y "piedra" (32%). Es exactamente la misma secuencia de letras "b-a-n-c-o", pero su vector enriquecido por la atención pasa a significar asiento exterior de piedra.',
      10: '"Mirlos" presta atención a "escuchar" (35%) y "senté", ligando la observación ornitológica a la quietud del observador.',
    },
  },
  {
    id: 'correferencia-animal',
    label: '3. Correferencia: ¿Quién tenía hambre?',
    tokens: ['El', 'lince', 'ibérico', 'acechó', 'al', 'conejo', 'porque', 'tenía', 'mucha', 'hambre'],
    defaultSelectedToken: 7, // "tenía"
    heads: [
      {
        name: 'Cabeza de Correferencia (Sujeto y motivación)',
        description: 'Resuelve a cuál de los dos animales se refiere la necesidad biológica.',
        weights: [
          [0.2, 0.65, 0.05, 0.05, 0.01, 0.02, 0.01, 0.01, 0.0, 0.0],
          [0.1, 0.3, 0.25, 0.25, 0.02, 0.03, 0.01, 0.02, 0.01, 0.01],
          [0.05, 0.45, 0.3, 0.1, 0.02, 0.03, 0.01, 0.02, 0.01, 0.01],
          [0.02, 0.4, 0.08, 0.2, 0.05, 0.2, 0.02, 0.02, 0.0, 0.01],
          [0.01, 0.02, 0.01, 0.05, 0.2, 0.68, 0.01, 0.01, 0.0, 0.01],
          [0.01, 0.05, 0.01, 0.35, 0.15, 0.35, 0.02, 0.03, 0.01, 0.02],
          [0.01, 0.05, 0.02, 0.15, 0.02, 0.05, 0.3, 0.35, 0.02, 0.03],
          [0.02, 0.52, 0.1, 0.1, 0.01, 0.08, 0.05, 0.08, 0.02, 0.02], // tenía -> lince (52%), conejo (8%)
          [0.01, 0.02, 0.01, 0.02, 0.01, 0.01, 0.02, 0.15, 0.35, 0.4],
          [0.02, 0.2, 0.02, 0.1, 0.01, 0.05, 0.02, 0.25, 0.2, 0.13],
        ],
      },
      {
        name: 'Cabeza de Relación Depredador-Presa',
        description: 'Asocia el verbo de caza con el objetivo trófico.',
        weights: [
          [0.1, 0.7, 0.05, 0.1, 0.01, 0.02, 0.01, 0.0, 0.0, 0.01],
          [0.05, 0.25, 0.15, 0.35, 0.02, 0.15, 0.01, 0.01, 0.0, 0.01],
          [0.02, 0.4, 0.3, 0.15, 0.02, 0.08, 0.01, 0.01, 0.0, 0.01],
          [0.01, 0.3, 0.04, 0.15, 0.1, 0.36, 0.01, 0.02, 0.0, 0.01], // acechó -> lince (30%), conejo (36%)
          [0.01, 0.02, 0.01, 0.15, 0.2, 0.6, 0.01, 0.0, 0.0, 0.01],
          [0.01, 0.25, 0.02, 0.35, 0.1, 0.2, 0.01, 0.02, 0.01, 0.03],
          [0.01, 0.05, 0.01, 0.2, 0.02, 0.05, 0.3, 0.3, 0.02, 0.04],
          [0.02, 0.44, 0.06, 0.18, 0.01, 0.1, 0.04, 0.1, 0.02, 0.03],
          [0.01, 0.02, 0.01, 0.02, 0.01, 0.01, 0.02, 0.2, 0.3, 0.4],
          [0.01, 0.22, 0.02, 0.15, 0.01, 0.06, 0.02, 0.2, 0.15, 0.16],
        ],
      },
    ],
    explanation: {
      7: 'El pronombre elíptico de "tenía" debe decidir quién tiene hambre: ¿el lince o el conejo? El transformer atiende con un 52% a "lince" y solo un 8% a "conejo". El depredador que acecha es quien está motivado por el hambre.',
      3: '"Acechó" reparte atención casi idéntica entre "lince" (30%) y "conejo" (36%), conectando al cazador con su presa.',
    },
  },
];

export default function MapaAtencion() {
  const [selectedSentenceId, setSelectedSentenceId] = useState<string>('banco-dinero');
  const [selectedHeadIndex, setSelectedHeadIndex] = useState<number>(0);
  const titleId = useId();

  const currentSentence = useMemo(() => {
    return PRESET_SENTENCES.find((s) => s.id === selectedSentenceId) || PRESET_SENTENCES[0];
  }, [selectedSentenceId]);

  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(
    currentSentence.defaultSelectedToken
  );

  // When changing sentence, reset selected token to that sentence's default
  const handleSentenceChange = (id: string) => {
    setSelectedSentenceId(id);
    const found = PRESET_SENTENCES.find((s) => s.id === id);
    if (found) {
      setSelectedTokenIndex(found.defaultSelectedToken);
      setSelectedHeadIndex(0);
    }
  };

  const currentHead = currentSentence.heads[selectedHeadIndex] || currentSentence.heads[0];

  // Attention weights from the currently selected token to all other tokens
  const tokenWeights = useMemo(() => {
    const rawWeights = currentHead.weights[selectedTokenIndex] || [];
    return currentSentence.tokens.map((token, idx) => ({
      index: idx,
      token,
      weight: rawWeights[idx] ?? 0.01,
      isSelf: idx === selectedTokenIndex,
    }));
  }, [currentHead, selectedTokenIndex, currentSentence]);

  // Sort by weight descending for the ranked list
  const rankedTokens = useMemo(() => {
    return [...tokenWeights].sort((a, b) => b.weight - a.weight);
  }, [tokenWeights]);

  const explanationText =
    currentSentence.explanation[selectedTokenIndex] ||
    `El token "${currentSentence.tokens[selectedTokenIndex]}" distribuye su foco en toda la secuencia para enriquecer su significado con el contexto.`;

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
      {/* Encabezado */}
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
            Mecanismo interno
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
            Mapa interactivo de atención
          </h3>
        </div>

        <div
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.6rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            color: 'var(--sl-color-text, #e2e8f0)',
          }}
        >
          Autoatención (Self-Attention)
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Elige un ejemplo, selecciona una palabra y observa cómo calcula a qué otras palabras debe prestar atención para comprender su significado concreto:
      </p>

      {/* Selector de oraciones */}
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="sentence-select"
          style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '0.35rem',
            color: 'var(--sl-color-text, #e2e8f0)',
          }}
        >
          Ejemplo de oración:
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {PRESET_SENTENCES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSentenceChange(s.id)}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                borderRadius: '0.5rem',
                border: '1px solid',
                borderColor:
                  selectedSentenceId === s.id
                    ? 'var(--color-accent, #6366f1)'
                    : 'var(--sl-color-gray-5, #334155)',
                backgroundColor:
                  selectedSentenceId === s.id
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'var(--sl-color-bg, #1e293b)',
                color:
                  selectedSentenceId === s.id
                    ? 'var(--color-accent, #a5b4fc)'
                    : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                fontWeight: selectedSentenceId === s.id ? 600 : 400,
                transition: 'all 0.15s ease',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de Cabezas de atención */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          marginBottom: '1.25rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--sl-color-white, #f8fafc)' }}>
          Cabeza de atención activa:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {currentSentence.heads.map((head, idx) => (
            <button
              key={head.name}
              onClick={() => setSelectedHeadIndex(idx)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor:
                  selectedHeadIndex === idx
                    ? 'var(--color-accent, #6366f1)'
                    : 'var(--sl-color-gray-5, #334155)',
                backgroundColor:
                  selectedHeadIndex === idx
                    ? 'var(--color-accent, #6366f1)'
                    : 'transparent',
                color: selectedHeadIndex === idx ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                fontWeight: selectedHeadIndex === idx ? 600 : 400,
              }}
            >
              {head.name}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--sl-color-gray-3, #94a3b8)', fontStyle: 'italic' }}>
          ℹ️ {currentHead.description}
        </div>
      </div>

      {/* Tira de tokens interactiva */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--sl-color-text, #e2e8f0)' }}>
          Pulsa sobre una palabra para examinar su vector de atención:
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            padding: '1rem',
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            alignItems: 'center',
          }}
        >
          {currentSentence.tokens.map((token, idx) => {
            const isSelected = idx === selectedTokenIndex;
            const weightObj = tokenWeights.find((w) => w.index === idx);
            const weight = weightObj ? weightObj.weight : 0;
            const intensity = Math.min(1, Math.max(0, weight));

            // Background based on attention received from the selected token
            const bgColor = isSelected
              ? 'var(--color-accent, #6366f1)'
              : intensity > 0.25
              ? `rgba(99, 102, 241, ${0.15 + intensity * 0.6})`
              : intensity > 0.1
              ? `rgba(99, 102, 241, 0.2)`
              : 'rgba(255, 255, 255, 0.04)';

            const textColor = isSelected
              ? '#ffffff'
              : intensity > 0.2
              ? 'var(--sl-color-white, #f8fafc)'
              : 'var(--sl-color-text, #cbd5e1)';

            return (
              <button
                key={`${token}-${idx}`}
                onClick={() => setSelectedTokenIndex(idx)}
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.95rem',
                  fontWeight: isSelected ? 700 : intensity > 0.2 ? 600 : 400,
                  backgroundColor: bgColor,
                  color: textColor,
                  border: isSelected
                    ? '2px solid #ffffff'
                    : intensity > 0.2
                    ? '1px solid rgba(165, 180, 252, 0.6)'
                    : '1px solid var(--sl-color-gray-5, #334155)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.15rem',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
                aria-pressed={isSelected}
                title={`Token ${idx}: "${token}" (Atención recibida: ${(weight * 100).toFixed(0)}%)`}
              >
                <span>{token}</span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    color: isSelected ? '#e0e7ff' : intensity > 0.2 ? '#a5b4fc' : 'var(--sl-color-gray-4, #64748b)',
                    fontFamily: 'monospace',
                  }}
                >
                  {(weight * 100).toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desglose visual de atención y pesos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Gráfico de barras de atención */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--sl-color-white, #f8fafc)',
              marginBottom: '0.75rem',
            }}
          >
            Distribución de atención desde: <span style={{ color: 'var(--color-accent, #818cf8)' }}>"{currentSentence.tokens[selectedTokenIndex]}"</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {rankedTokens.map((item) => {
              const pct = (item.weight * 100).toFixed(1);
              const isHighlight = item.weight >= 0.15 && !item.isSelf;

              return (
                <div key={item.index} style={{ fontSize: '0.8rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.15rem',
                      color: item.isSelf
                        ? 'var(--sl-color-gray-3, #94a3b8)'
                        : isHighlight
                        ? 'var(--sl-color-white, #f8fafc)'
                        : 'var(--sl-color-text, #cbd5e1)',
                      fontWeight: isHighlight ? 600 : 400,
                    }}
                  >
                    <span>
                      {item.token}{' '}
                      {item.isSelf && <em style={{ fontSize: '0.72rem' }}>(palabra activa)</em>}
                    </span>
                    <span style={{ fontFamily: 'monospace' }}>{pct}%</span>
                  </div>
                  <div
                    style={{
                      height: '6px',
                      borderRadius: '3px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(100, item.weight * 100)}%`,
                        backgroundColor: item.isSelf
                          ? 'var(--sl-color-gray-4, #64748b)'
                          : isHighlight
                          ? 'var(--color-accent, #6366f1)'
                          : 'rgba(99, 102, 241, 0.4)',
                        transition: 'width 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explicación didáctica del enlace */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--sl-color-white, #f8fafc)',
                marginBottom: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>🔍</span> ¿Qué está ocurriendo aquí?
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.5,
                color: 'var(--sl-color-text, #cbd5e1)',
                margin: '0 0 1rem 0',
              }}
            >
              {explanationText}
            </p>
          </div>

          <div
            style={{
              padding: '0.65rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(234, 179, 8, 0.08)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              fontSize: '0.78rem',
              color: 'var(--sl-color-text, #fef08a)',
              lineHeight: 1.4,
            }}
          >
            <strong>Aviso didáctico de rigor:</strong> Este simulador ilustra con pesos calculados didácticamente cómo la atención pondera las palabras. Un modelo real no tiene una sola cabeza intuitiva, sino miles de matrices numéricas abstractas operando en paralelo que aprendieron estos patrones sin reglas humanas fijas.
          </div>
        </div>
      </div>
    </div>
  );
}

