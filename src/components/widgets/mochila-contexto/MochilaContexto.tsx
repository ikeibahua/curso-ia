import React, { useState, useId, useMemo } from 'react';

interface ContextPiece {
  id: string;
  name: string;
  icon: string;
  category: 'esencial' | 'buena_practica' | 'mala_practica' | 'modular';
  tokens: number;
  description: string;
}

const CONTEXT_PIECES: ContextPiece[] = [
  {
    id: 'user-goal',
    name: 'Petición actual del usuario',
    icon: '🎯',
    category: 'esencial',
    tokens: 150,
    description: 'La orden directa que acabas de escribir en este turno ("Identifica las orquídeas de este inventario").',
  },
  {
    id: 'agents-md-clean',
    name: 'AGENTS.md conciso (15 líneas)',
    icon: '📜',
    category: 'buena_practica',
    tokens: 450,
    description: 'Reglas directas del proyecto: rol botánico, cursivas en latín y comprobación de sustrato.',
  },
  {
    id: 'agents-md-bloated',
    name: 'Manual gigante redundante (40 páginas)',
    icon: '📚',
    category: 'mala_practica',
    tokens: 12000,
    description: 'Reglamentos gigantescos llenos de obviedades, biografías y párrafos de relleno que diluyen la atención.',
  },
  {
    id: 'chat-recent',
    name: 'Historial reciente (últimos 3 mensajes)',
    icon: '💬',
    category: 'buena_practica',
    tokens: 650,
    description: 'El contexto conversacional inmediato imprescindible para entender a qué se refiere "ese árbol".',
  },
  {
    id: 'chat-infinite',
    name: 'Historial eterno (50 mensajes anteriores)',
    icon: '📜',
    category: 'mala_practica',
    tokens: 8500,
    description: 'Conversaciones acumuladas de hace horas que ya no tienen relación con el problema presente.',
  },
  {
    id: 'skill-modular',
    name: 'Skill modular bajo demanda (SKILL.md)',
    icon: '🧰',
    category: 'modular',
    tokens: 900,
    description: 'Instrucciones especializadas sobre claves dicotómicas de orquídeas cargadas solo cuando hacen falta.',
  },
  {
    id: 'doc-source',
    name: 'Documento botánico relevante de apoyo',
    icon: '📄',
    category: 'buena_practica',
    tokens: 1800,
    description: 'La tabla de datos de campo necesaria para que el modelo trabaje con hechos en lugar de conjeturas.',
  },
];

export default function MochilaContexto() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'user-goal',
    'agents-md-clean',
    'chat-recent',
    'skill-modular',
  ]);
  const titleId = useId();

  const togglePiece = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalTokens = useMemo(() => {
    return selectedIds.reduce((sum, id) => {
      const p = CONTEXT_PIECES.find((item) => item.id === id);
      return sum + (p ? p.tokens : 0);
    }, 0);
  }, [selectedIds]);

  // Context evaluation
  const evaluation = useMemo(() => {
    if (totalTokens <= 4000) {
      return {
        level: 'Óptimo y cristalino',
        color: '#4ade80',
        bgColor: 'rgba(34, 197, 94, 0.12)',
        borderColor: 'rgba(34, 197, 94, 0.4)',
        advice:
          '¡Excelente ingeniería de contexto! La ventana es ligera, las respuestas son rápidas y baratas, y el modelo tiene un foco nítido sin distracciones.',
      };
    }
    if (totalTokens <= 9000) {
      return {
        level: 'Carga moderada',
        color: '#facc15',
        bgColor: 'rgba(234, 179, 8, 0.12)',
        borderColor: 'rgba(234, 179, 8, 0.4)',
        advice:
          'El modelo trabajará bien, pero empieza a acumular ruido secundario. Vigila no meter documentos innecesarios.',
      };
    }
    return {
      level: '⚠️ Saturación y riesgo de "Lost in the Middle"',
      color: '#f87171',
      bgColor: 'rgba(239, 68, 68, 0.12)',
      borderColor: 'rgba(239, 68, 68, 0.4)',
      advice:
        '¡Alerta de sobrecarga! Cuando la mochila se satura con miles de palabras de relleno, el modelo sufre amnesia en el medio: olvida instrucciones críticas y tarda mucho más en responder.',
    };
  }, [totalTokens]);

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
            Context Engineering
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
            La Mochila de Contexto: Presupuesto de Tokens
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
          {totalTokens.toLocaleString()} tokens en mochila
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Aunque un modelo admita ventanas gigantescas, atiborrarlo de texto innecesario degrada su atención. Activa o desactiva elementos para ver cómo se gestiona el presupuesto:
      </p>

      {/* Indicador visual de llenado de la mochila */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
          <span style={{ fontWeight: 600, color: '#f8fafc' }}>
            Consumo de ventana de contexto: <strong style={{ color: evaluation.color }}>{totalTokens.toLocaleString()} tokens</strong>
          </span>
          <span style={{ fontSize: '0.78rem', color: evaluation.color, fontWeight: 700 }}>
            {evaluation.level}
          </span>
        </div>

        {/* Barra de progreso */}
        <div
          style={{
            height: '10px',
            borderRadius: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, (totalTokens / 16000) * 100)}%`,
              backgroundColor: evaluation.color,
              transition: 'all 0.3s ease',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.35rem' }}>
          <span>0 tokens (Vacío)</span>
          <span>4.000 (Zona dulce)</span>
          <span>8.000 (Límite ágil)</span>
          <span>16.000+ (Sobrecarga)</span>
        </div>
      </div>

      {/* Lista de piezas para meter o sacar de la mochila */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {CONTEXT_PIECES.map((piece) => {
          const isSelected = selectedIds.includes(piece.id);

          return (
            <button
              key={piece.id}
              onClick={() => togglePiece(piece.id)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: isSelected ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.15s ease',
              }}
              aria-pressed={isSelected}
            >
              <span style={{ fontSize: '1.25rem' }}>{piece.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 700 : 400, color: isSelected ? '#f8fafc' : '#cbd5e1' }}>
                    {piece.name}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      color: isSelected ? '#a5b4fc' : '#64748b',
                    }}
                  >
                    +{piece.tokens.toLocaleString()} tok
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: isSelected ? '#cbd5e1' : '#64748b', marginTop: '0.15rem' }}>
                  {piece.description}
                </div>
              </div>

              <span
                style={{
                  fontSize: '0.78rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: isSelected ? 'var(--color-accent, #6366f1)' : 'transparent',
                  color: isSelected ? '#ffffff' : '#64748b',
                  border: isSelected ? 'none' : '1px solid #334155',
                }}
              >
                {isSelected ? 'En mochila' : 'Fuera'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tarjeta de veredicto pedagógico */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: evaluation.bgColor,
          border: `1px solid ${evaluation.borderColor}`,
          fontSize: '0.82rem',
          color: '#e2e8f0',
          lineHeight: 1.5,
        }}
      >
        <strong>Diagnóstico de ingeniería:</strong> {evaluation.advice}
      </div>
    </div>
  );
}
