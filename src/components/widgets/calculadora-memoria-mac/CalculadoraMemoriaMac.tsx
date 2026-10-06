import React, { useState, useId, useMemo } from 'react';

interface LocalModel {
  name: string;
  sizeGb: number;
  params: string;
  recommendedRole: string;
}

const LOCAL_MODELS: LocalModel[] = [
  { name: 'Llama 3.2 1B (Q4_K_M)', sizeGb: 0.9, params: '1B', recommendedRole: 'Respuestas instantáneas y clasificación ultraligera' },
  { name: 'Llama 3.2 3B (Q4_K_M)', sizeGb: 2.1, params: '3B', recommendedRole: 'Excelente en portátiles con 8 GB; redacta con agilidad' },
  { name: 'Qwen 2.5 7B (Q4_K_M)', sizeGb: 4.6, params: '7B', recommendedRole: 'Gran comprensión del español, resúmenes y matemáticas' },
  { name: 'Llama 3.1 8B (Q4_K_M)', sizeGb: 5.1, params: '8B', recommendedRole: 'El rey indiscutible: equilibrio perfecto en 16 GB de RAM' },
  { name: 'Qwen 2.5 14B (Q4_K_M)', sizeGb: 9.3, params: '14B', recommendedRole: 'Redacción más matizada y lógica formal avanzada' },
  { name: 'Mistral Small 24B (Q4_K_M)', sizeGb: 14.8, params: '24B', recommendedRole: 'Nivel semiprofesional en razonamiento' },
  { name: 'Qwen 2.5 32B (Q4_K_M)', sizeGb: 20.2, params: '32B', recommendedRole: 'Casi indistinguible de modelos gigantescos en precisión' },
  { name: 'Llama 3.3 70B (Q4_K_M)', sizeGb: 43.0, params: '70B', recommendedRole: 'Máxima potencia local para Macs con 64 GB o 128 GB' },
];

const RAM_OPTIONS = [8, 16, 24, 32, 36, 48, 64, 128];
const CHIP_OPTIONS = ['M1 / M2 / M3 / M4 (Base)', 'M Pro', 'M Max', 'M Ultra'];

export default function CalculadoraMemoriaMac() {
  const [ram, setRam] = useState<number>(16);
  const [chip, setChip] = useState<string>('M1 / M2 / M3 / M4 (Base)');
  const titleId = useId();

  // macOS system overhead (OS + Finder + basic browser): ~3.5 GB
  const osReserveGb = 3.5;
  const availableVram = Math.max(0, ram - osReserveGb);

  // Speed estimates based on chip family and model size
  const speedEstimate = useMemo(() => {
    if (chip.includes('Ultra')) {
      return 'Velocidad extraordinaria (40 a 70 tok/s en 8B; ~30 tok/s en 70B).';
    }
    if (chip.includes('Max')) {
      return 'Velocidad muy alta (35 a 55 tok/s en 8B; ~18 tok/s en 70B).';
    }
    if (chip.includes('Pro')) {
      return 'Velocidad ágil y fluida (25 a 35 tok/s en 8B; ~14 tok/s en 14B).';
    }
    // Base chip
    return 'Velocidad cómoda para lectura (20 a 30 tok/s en 3B; 14 a 18 tok/s en 8B).';
  }, [chip]);

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
            Tu hardware personal
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
            ¿Qué modelo cabe en mi Mac? (Apple Silicon)
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
          Memoria Unificada
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Selecciona la memoria RAM y el chip de tu Mac para comprobar qué modelos en formato GGUF (4 bits) podrás ejecutar con total soltura:
      </p>

      {/* Selectores de RAM y Chip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        {/* Selector de RAM */}
        <div>
          <label
            htmlFor="ram-select"
            style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.4rem' }}
          >
            Memoria RAM de tu Mac:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {RAM_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRam(r)}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8rem',
                  borderRadius: '0.375rem',
                  border: '1px solid',
                  borderColor: ram === r ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                  backgroundColor: ram === r ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: ram === r ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                  cursor: 'pointer',
                  fontWeight: ram === r ? 700 : 400,
                }}
              >
                {r} GB
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Chip */}
        <div>
          <label
            htmlFor="chip-select"
            style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.4rem' }}
          >
            Gama de procesador Apple:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {CHIP_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setChip(c)}
                style={{
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.78rem',
                  borderRadius: '0.375rem',
                  border: '1px solid',
                  borderColor: chip === c ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                  backgroundColor: chip === c ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: chip === c ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                  cursor: 'pointer',
                  fontWeight: chip === c ? 700 : 400,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de presupuesto de memoria */}
      <div
        style={{
          padding: '0.85rem 1rem',
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
          <span style={{ color: '#cbd5e1' }}>
            Presupuesto útil: <strong>{availableVram.toFixed(1)} GB disponibles</strong> para la IA (de {ram} GB totales)
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
            ~{osReserveGb} GB reservados para macOS
          </span>
        </div>

        {/* Barra de progreso */}
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
              width: `${Math.min(100, (availableVram / ram) * 100)}%`,
              backgroundColor: 'var(--color-accent, #6366f1)',
            }}
          />
        </div>

        <div style={{ fontSize: '0.75rem', color: '#a5b4fc', marginTop: '0.4rem' }}>
          ⚡ {speedEstimate}
        </div>
      </div>

      {/* Lista de modelos y compatibilidad */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1rem' }}>
        {LOCAL_MODELS.map((model) => {
          const fitsWell = model.sizeGb <= availableVram * 0.85;
          const fitsTight = !fitsWell && model.sizeGb <= availableVram;
          const statusText = fitsWell ? '🟢 Cabe con holgura' : fitsTight ? '🟡 Justo (cierra otras apps)' : '🔴 Demasiado grande';
          const borderColor = fitsWell ? 'rgba(34, 197, 94, 0.4)' : fitsTight ? 'rgba(234, 179, 8, 0.4)' : 'rgba(239, 68, 68, 0.2)';
          const bgColor = fitsWell ? 'rgba(34, 197, 94, 0.04)' : fitsTight ? 'rgba(234, 179, 8, 0.04)' : 'rgba(15, 23, 42, 0.4)';

          return (
            <div
              key={model.name}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '0.375rem',
                border: `1px solid ${borderColor}`,
                backgroundColor: bgColor,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: fitsWell || fitsTight ? 1 : 0.6,
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                  {model.name} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({model.sizeGb} GB)</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {model.recommendedRole}
                </div>
              </div>

              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: fitsWell ? '#4ade80' : fitsTight ? '#facc15' : '#f87171',
                }}
              >
                {statusText}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
        * Tamaños calculados en formato GGUF con cuantización estándar Q4_K_M (4 bits), dejando margen para la ventana de contexto de la conversación.
      </div>
    </div>
  );
}
