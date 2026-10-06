import React, { useState, useId } from 'react';

export default function MiniRedPesos() {
  // Input features: Sun hours (0 to 10), Humidity (0 to 100%)
  const [sunHours, setSunHours] = useState<number>(7);
  const [humidity, setHumidity] = useState<number>(60);

  // Synaptic weights (parameters)
  const [w1, setW1] = useState<number>(0.8); // Sun -> H1
  const [w2, setW2] = useState<number>(0.3); // Hum -> H1
  const [w3, setW3] = useState<number>(-0.4); // Sun -> H2
  const [w4, setW4] = useState<number>(0.9); // Hum -> H2
  const [w5, setW5] = useState<number>(1.1); // H1 -> Output
  const [w6, setW6] = useState<number>(0.7); // H2 -> Output

  const titleId = useId();

  // Normalized inputs (0 to 1)
  const x1 = sunHours / 10;
  const x2 = humidity / 100;

  // Hidden layer activations (ReLU)
  const h1Raw = x1 * w1 + x2 * w2;
  const h1 = Math.max(0, h1Raw);

  const h2Raw = x1 * w3 + x2 * w4;
  const h2 = Math.max(0, h2Raw);

  // Output activation (Sigmoid): 1 / (1 + exp(-z))
  const zOut = h1 * w5 + h2 * w6 - 0.5; // with slight bias
  const probBlooming = 1 / (1 + Math.exp(-zOut));

  const setPresetOptimal = () => {
    setSunHours(8);
    setHumidity(65);
    setW1(1.2);
    setW2(0.6);
    setW3(-0.2);
    setW4(1.0);
    setW5(1.4);
    setW6(0.8);
  };

  const setPresetDrought = () => {
    setSunHours(9);
    setHumidity(15);
    setW1(0.2);
    setW2(-1.2);
    setW3(0.1);
    setW4(-1.5);
    setW5(0.5);
    setW6(0.2);
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
            Mecánica interna
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
            Mini Red Neuronal: Pesos Sinápticos Editables
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
          6 parámetros ajustables
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Un parámetro no es más que una multiplicación matemática (un peso $w$). Modifica las condiciones ambientales y los pesos de las conexiones para ver cómo calculan la probabilidad de floración:
      </p>

      {/* Presets */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <button
          onClick={setPresetOptimal}
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.78rem',
            borderRadius: '0.375rem',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          🌸 Preset: Floración óptima en orquídeas
        </button>
        <button
          onClick={setPresetDrought}
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.78rem',
            borderRadius: '0.375rem',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#fca5a5',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          🍂 Preset: Estrés hídrico por sequía
        </button>
      </div>

      {/* Grid: Entradas (Izquierda) + Parámetros (Centro) + Salida (Derecha) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Entradas biológicas */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
            🌱 Entradas sensoriales (X)
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
              <label htmlFor="sun-slider" style={{ color: '#cbd5e1' }}>Luz solar diaria:</label>
              <span style={{ fontWeight: 700, color: '#facc15' }}>{sunHours} horas</span>
            </div>
            <input
              id="sun-slider"
              type="range"
              min="0"
              max="10"
              step="1"
              value={sunHours}
              onChange={(e) => setSunHours(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: '#eab308' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
              <label htmlFor="hum-slider" style={{ color: '#cbd5e1' }}>Humedad del sustrato:</label>
              <span style={{ fontWeight: 700, color: '#38bdf8' }}>{humidity}%</span>
            </div>
            <input
              id="hum-slider"
              type="range"
              min="0"
              max="100"
              step="5"
              value={humidity}
              onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: '#38bdf8' }}
            />
          </div>
        </div>

        {/* Parámetros / Pesos sinápticos */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
            ⚙️ Pesos de las capas (Parámetros w)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8' }}>w₁ (Sol → H₁): {w1.toFixed(1)}</label>
              <input type="range" min="-1.5" max="2.0" step="0.1" value={w1} onChange={(e) => setW1(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8' }}>w₂ (Hum → H₁): {w2.toFixed(1)}</label>
              <input type="range" min="-1.5" max="2.0" step="0.1" value={w2} onChange={(e) => setW2(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8' }}>w₃ (Sol → H₂): {w3.toFixed(1)}</label>
              <input type="range" min="-1.5" max="2.0" step="0.1" value={w3} onChange={(e) => setW3(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8' }}>w₄ (Hum → H₂): {w4.toFixed(1)}</label>
              <input type="range" min="-1.5" max="2.0" step="0.1" value={w4} onChange={(e) => setW4(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8' }}>w₅ (H₁ → Salida): {w5.toFixed(1)}</label>
              <input type="range" min="-1.5" max="2.0" step="0.1" value={w5} onChange={(e) => setW5(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8' }}>w₆ (H₂ → Salida): {w6.toFixed(1)}</label>
              <input type="range" min="-1.5" max="2.0" step="0.1" value={w6} onChange={(e) => setW6(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Salida calculada */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
              🎯 Predicción del modelo
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Capa intermedia: H₁ = {h1.toFixed(2)}, H₂ = {h2.toFixed(2)}
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: probBlooming > 0.5 ? '#4ade80' : '#f87171', fontFamily: 'monospace' }}>
              {(probBlooming * 100).toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              Probabilidad de floración exitosa
            </div>
          </div>

          <div
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: probBlooming > 0.6 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              fontSize: '0.75rem',
              color: probBlooming > 0.6 ? '#4ade80' : '#fca5a5',
              marginTop: '0.75rem',
            }}
          >
            {probBlooming > 0.6
              ? '🌺 Señal activada: La orquídea abrirá sus flores.'
              : '🌱 Señal inhibida: Las condiciones o pesos no alcanzan el umbral.'}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--sl-color-gray-3, #94a3b8)', fontStyle: 'italic' }}>
        En esta mini red hay 6 parámetros. En un modelo 7B hay <strong>7.000.000.000</strong> de estos mismos deslizadores ajustados para reconocer relaciones lingüísticas sutiles.
      </div>
    </div>
  );
}
