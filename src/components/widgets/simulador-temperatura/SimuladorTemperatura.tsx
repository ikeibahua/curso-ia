import React, { useState, useId, useMemo } from 'react';

interface CandidateToken {
  token: string;
  logit: number;
  category: 'botánica' | 'fauna' | 'abstracto' | 'inconexo';
}

const CANDIDATES: CandidateToken[] = [
  { token: 'seta', logit: 4.6, category: 'botánica' },
  { token: 'planta', logit: 4.1, category: 'botánica' },
  { token: 'orquídea', logit: 3.5, category: 'botánica' },
  { token: 'salamandra', logit: 3.0, category: 'fauna' },
  { token: 'mariposa', logit: 1.9, category: 'fauna' },
  { token: 'sombra', logit: 1.2, category: 'abstracto' },
  { token: 'furgoneta', logit: -1.2, category: 'inconexo' },
  { token: 'galaxia', logit: -2.8, category: 'inconexo' },
];

export default function SimuladorTemperatura() {
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(0.95);
  const [history, setHistory] = useState<string[]>([]);
  const [lastSelected, setLastSelected] = useState<string | null>(null);
  const titleId = useId();

  // 1. Calculate softmax with temperature: P_i = exp(z_i / T) / sum(exp(z_j / T))
  const calculatedTokens = useMemo(() => {
    const t = Math.max(0.05, temperature);

    // Subtract max logit for numerical stability
    const maxLogit = Math.max(...CANDIDATES.map((c) => c.logit));
    const expValues = CANDIDATES.map((c) => {
      const scaled = (c.logit - maxLogit) / t;
      return Math.exp(scaled);
    });
    const sumExp = expValues.reduce((acc, val) => acc + val, 0);

    const initial = CANDIDATES.map((c, i) => ({
      ...c,
      prob: expValues[i] / sumExp,
    }));

    // Sort descending to apply Top-P
    initial.sort((a, b) => b.prob - a.prob);

    // Apply Top-P cutoff
    let cumulative = 0;
    const withTopP = initial.map((item) => {
      cumulative += item.prob;
      const inNucleus = cumulative - item.prob < topP;
      return {
        ...item,
        cumulativeProb: cumulative,
        inNucleus,
      };
    });

    // Renormalize probabilities of tokens inside nucleus
    const nucleusSum = withTopP
      .filter((item) => item.inNucleus)
      .reduce((sum, item) => sum + item.prob, 0);

    return withTopP.map((item) => ({
      ...item,
      normalizedProb: item.inNucleus ? item.prob / nucleusSum : 0,
    }));
  }, [temperature, topP]);

  // Sample a token based on normalized probabilities
  const handleSample = () => {
    const activeCandidates = calculatedTokens.filter((c) => c.inNucleus);
    if (activeCandidates.length === 0) return;

    const rand = Math.random();
    let accumulated = 0;
    let chosen = activeCandidates[0].token;

    for (const cand of activeCandidates) {
      accumulated += cand.normalizedProb;
      if (rand <= accumulated) {
        chosen = cand.token;
        break;
      }
    }

    setLastSelected(chosen);
    setHistory((prev) => [chosen, ...prev.slice(0, 7)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setLastSelected(null);
  };

  const setPreset = (t: number, p: number) => {
    setTemperature(t);
    setTopP(p);
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
            Muestreo y aleatoriedad
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
            Simulador de Temperatura y Top-P (Softmax)
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
          P = Softmax(z / T)
        </div>
      </div>

      {/* Frase previa */}
      <div
        style={{
          padding: '0.85rem 1rem',
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
          fontSize: '0.95rem',
        }}
      >
        <span style={{ color: 'var(--sl-color-gray-3, #94a3b8)', marginRight: '0.4rem' }}>
          Frase de contexto:
        </span>
        <span style={{ color: 'var(--sl-color-white, #f8fafc)', fontStyle: 'italic' }}>
          "En el sotobosque húmedo apareció una extraña... "
        </span>
        <span
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.3)',
            padding: '0.15rem 0.45rem',
            borderRadius: '0.25rem',
            border: '1px dashed var(--color-accent, #6366f1)',
            marginLeft: '0.35rem',
            color: '#a5b4fc',
            fontWeight: 600,
          }}
        >
          {lastSelected ? `[ ${lastSelected} ]` : '[¿siguiente palabra?]'}
        </span>
      </div>

      {/* Presets rápidos */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--sl-color-text, #e2e8f0)' }}>
          Ajustes preconfigurados habituales:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          <button
            onClick={() => setPreset(0.1, 1.0)}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              borderRadius: '0.375rem',
              border: '1px solid',
              borderColor: temperature === 0.1 ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
              backgroundColor: temperature === 0.1 ? 'rgba(99, 102, 241, 0.2)' : 'var(--sl-color-bg, #1e293b)',
              color: 'var(--sl-color-white, #f8fafc)',
              cursor: 'pointer',
            }}
          >
            🎯 Precisión matemática ($T=0.1$)
          </button>
          <button
            onClick={() => setPreset(0.7, 0.95)}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              borderRadius: '0.375rem',
              border: '1px solid',
              borderColor: temperature === 0.7 ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
              backgroundColor: temperature === 0.7 ? 'rgba(99, 102, 241, 0.2)' : 'var(--sl-color-bg, #1e293b)',
              color: 'var(--sl-color-white, #f8fafc)',
              cursor: 'pointer',
            }}
          >
            ⚖️ Estándar conversacional ($T=0.7$)
          </button>
          <button
            onClick={() => setPreset(1.2, 0.95)}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              borderRadius: '0.375rem',
              border: '1px solid',
              borderColor: temperature === 1.2 ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
              backgroundColor: temperature === 1.2 ? 'rgba(99, 102, 241, 0.2)' : 'var(--sl-color-bg, #1e293b)',
              color: 'var(--sl-color-white, #f8fafc)',
              cursor: 'pointer',
            }}
          >
            🎨 Escritura creativa ($T=1.2$)
          </button>
          <button
            onClick={() => setPreset(1.8, 1.0)}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.78rem',
              borderRadius: '0.375rem',
              border: '1px solid',
              borderColor: temperature === 1.8 ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
              backgroundColor: temperature === 1.8 ? 'rgba(99, 102, 241, 0.2)' : 'var(--sl-color-bg, #1e293b)',
              color: 'var(--sl-color-white, #f8fafc)',
              cursor: 'pointer',
            }}
          >
            🎲 Ruidoso / Caótico ($T=1.8$)
          </button>
        </div>
      </div>

      {/* Controles: Sliders de Temperatura y Top-P */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        {/* Temperatura */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <label htmlFor="temp-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sl-color-white, #f8fafc)' }}>
              Temperatura ($T$):
            </label>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent, #818cf8)', fontFamily: 'monospace' }}>
              {temperature.toFixed(2)}
            </span>
          </div>
          <input
            id="temp-slider"
            type="range"
            min="0.1"
            max="2.0"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-accent, #6366f1)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--sl-color-gray-4, #64748b)' }}>
            <span>0.1 (Determinista)</span>
            <span>1.0 (Equilibrado)</span>
            <span>2.0 (Caos)</span>
          </div>
        </div>

        {/* Top-P */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <label htmlFor="topp-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sl-color-white, #f8fafc)' }}>
              Muestreo de Núcleo (Top-P):
            </label>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent, #818cf8)', fontFamily: 'monospace' }}>
              {topP.toFixed(2)}
            </span>
          </div>
          <input
            id="topp-slider"
            type="range"
            min="0.2"
            max="1.0"
            step="0.05"
            value={topP}
            onChange={(e) => setTopP(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-accent, #6366f1)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--sl-color-gray-4, #64748b)' }}>
            <span>0.2 (Solo el top)</span>
            <span>0.9 (Recomendado)</span>
            <span>1.0 (Sin filtro)</span>
          </div>
        </div>
      </div>

      {/* Visualización de la distribución Softmax */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sl-color-white, #f8fafc)' }}>
            Probabilidad de cada token tras Softmax y filtro Top-P:
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--sl-color-gray-3, #94a3b8)' }}>
            Gris = Descartado por Top-P
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {calculatedTokens.map((item) => {
            const isSelected = lastSelected === item.token;
            const pct = (item.normalizedProb * 100).toFixed(1);

            return (
              <div
                key={item.token}
                style={{
                  opacity: item.inNucleus ? 1 : 0.45,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    marginBottom: '0.15rem',
                    color: isSelected
                      ? 'var(--color-accent, #a5b4fc)'
                      : item.inNucleus
                      ? 'var(--sl-color-white, #f8fafc)'
                      : 'var(--sl-color-gray-4, #64748b)',
                    fontWeight: isSelected ? 700 : 400,
                  }}
                >
                  <span>
                    <strong>"{item.token}"</strong>{' '}
                    <span style={{ fontSize: '0.72rem', color: 'var(--sl-color-gray-4, #64748b)' }}>
                      (logit: {item.logit > 0 ? `+${item.logit}` : item.logit})
                    </span>{' '}
                    {isSelected && <span>👈 ¡Elegido!</span>}
                  </span>
                  <span style={{ fontFamily: 'monospace' }}>
                    {item.inNucleus ? `${pct}%` : '0.0% (filtrado)'}
                  </span>
                </div>

                <div
                  style={{
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(100, item.normalizedProb * 100)}%`,
                      backgroundColor: isSelected
                        ? 'var(--color-accent, #6366f1)'
                        : item.inNucleus
                        ? 'rgba(99, 102, 241, 0.7)'
                        : 'rgba(100, 116, 139, 0.3)',
                      transition: 'width 0.2s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón de muestreo e Historial */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={handleSample}
          style={{
            padding: '0.65rem 1.25rem',
            backgroundColor: 'var(--color-accent, #6366f1)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>🎲</span>
          <span>Tirar el dado probabilístico (Muestrear palabra)</span>
        </button>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.78rem',
              backgroundColor: 'transparent',
              color: 'var(--sl-color-gray-3, #94a3b8)',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Limpiar historial
          </button>
        )}
      </div>

      {/* Historial de palabras generadas */}
      {history.length > 0 && (
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            marginBottom: '1rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--sl-color-gray-3, #94a3b8)', marginBottom: '0.35rem' }}>
            Últimas palabras elegidas por el muestreador (prueba a tirar 10 veces con T=0.1 vs 10 veces con T=1.5):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {history.map((word, i) => (
              <span
                key={`${word}-${i}`}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: i === 0 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: i === 0 ? '1px solid var(--color-accent, #6366f1)' : '1px solid var(--sl-color-gray-5, #334155)',
                  color: i === 0 ? 'var(--color-accent, #a5b4fc)' : 'var(--sl-color-text, #cbd5e1)',
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nota sobre Modelos de Razonamiento Modernos (o1, o3, Claude 3.7 Thinking) */}
      <div
        style={{
          padding: '0.85rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          fontSize: '0.82rem',
          color: 'var(--sl-color-text, #cbd5e1)',
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: '#38bdf8' }}>💡 Novedad en modelos de razonamiento (2025–2026):</strong> En modelos que razonan antes de responder (como la familia <code>o1</code> y <code>o3</code> de OpenAI o <code>Claude 3.7 Sonnet</code> con pensamiento extendido), la temperatura suele estar bloqueada internamente a 1.0 y no se permite modificarla al usuario. Esto se debe a que una temperatura baja o alta degradaría la coherencia lógica interna de sus cadenas de pensamiento. El control de la creatividad y profundidad se traslada al nivel de <em>esfuerzo de razonamiento</em> (que veremos en la Lección 20).
      </div>
    </div>
  );
}

