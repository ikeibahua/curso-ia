import React, { useState, useId, useMemo } from 'react';

interface PresetModel {
  name: string;
  paramsBillions: number;
  family: string;
}

const PRESET_MODELS: PresetModel[] = [
  { name: 'Llama 3.2 1B', paramsBillions: 1, family: 'Meta' },
  { name: 'Llama 3.2 3B', paramsBillions: 3, family: 'Meta' },
  { name: 'Qwen 2.5 7B', paramsBillions: 7.6, family: 'Alibaba' },
  { name: 'Llama 3.1 8B', paramsBillions: 8.0, family: 'Meta' },
  { name: 'Qwen 2.5 14B', paramsBillions: 14.7, family: 'Alibaba' },
  { name: 'Command R+ 32B', paramsBillions: 32.5, family: 'Cohere' },
  { name: 'Llama 3.3 70B', paramsBillions: 70.6, family: 'Meta' },
  { name: 'Llama 3.1 405B', paramsBillions: 405.0, family: 'Meta' },
];

interface PrecisionOption {
  id: string;
  label: string;
  bits: number;
  bytesPerParam: number;
  description: string;
}

const PRECISIONS: PrecisionOption[] = [
  { id: 'fp16', label: '16 bits (FP16 / BF16)', bits: 16, bytesPerParam: 2.0, description: 'Precisión nativa estándar de entrenamiento.' },
  { id: 'int8', label: '8 bits (Q8)', bits: 8, bytesPerParam: 1.0, description: 'Cuantización intermedia sin pérdida perceptible.' },
  { id: 'int4', label: '4 bits (Q4 / Q4_K_M)', bits: 4, bytesPerParam: 0.5, description: 'Estándar de oro para ejecutar en Mac personal.' },
  { id: 'fp32', label: '32 bits (FP32)', bits: 32, bytesPerParam: 4.0, description: 'Precisión científica sin compresión.' },
];

export default function CalculadoraTamano() {
  const [params, setParams] = useState<number>(8.0); // in Billions
  const [selectedPrecision, setSelectedPrecision] = useState<string>('int4');
  const titleId = useId();

  const precision = PRECISIONS.find((p) => p.id === selectedPrecision) || PRECISIONS[2];

  // Raw weight size in Gigabytes: (params * 10^9 * bytes) / 10^9 = params * bytes
  const rawSizeGB = params * precision.bytesPerParam;

  // Recommended RAM including 20% overhead for context window and OS
  const recommendedRamGB = useMemo(() => {
    return rawSizeGB * 1.25;
  }, [rawSizeGB]);

  // Mac hardware evaluation
  const macVerdict = useMemo(() => {
    if (recommendedRamGB <= 6) {
      return {
        tier: 'Mac básico (8 GB RAM)',
        status: 'compatible',
        color: '#4ade80',
        message: '¡Excelente! Cabe holgadamente en cualquier Mac con 8 GB de memoria RAM.',
      };
    }
    if (recommendedRamGB <= 13) {
      return {
        tier: 'Mac estándar (16 GB RAM)',
        status: 'compatible',
        color: '#4ade80',
        message: '¡Perfecto! Cabe sin problemas en un Mac con 16 GB de RAM, dejando margen para el sistema operativo.',
      };
    }
    if (recommendedRamGB <= 28) {
      return {
        tier: 'Mac avanzado (32 GB RAM)',
        status: 'pro',
        color: '#38bdf8',
        message: 'Requiere un Mac con 32 GB de RAM. En equipos de 16 GB provocaría saturación de memoria (swap al disco).',
      };
    }
    if (recommendedRamGB <= 54) {
      return {
        tier: 'Mac profesional (64 GB RAM)',
        status: 'heavy',
        color: '#fb923c',
        message: 'Requiere un Mac con 64 GB de memoria RAM. No cabe en ordenadores portátiles estándar.',
      };
    }
    if (recommendedRamGB <= 110) {
      return {
        tier: 'Estación de trabajo (128 GB RAM)',
        status: 'workstation',
        color: '#f87171',
        message: 'Requiere una estación de trabajo con 128 GB de RAM o un servidor especializado con varias tarjetas aceleradoras.',
      };
    }
    return {
      tier: 'Supercomputador / Servidor empresarial',
      status: 'datacenter',
      color: '#ef4444',
      message: 'Imposible en un ordenador personal. Requiere un bastidor de centro de datos con 8 aceleradores NVIDIA H100/B200.',
    };
  }, [recommendedRamGB]);

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
            Física computacional
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
            Calculadora de Tamaño: Parámetros × Precisión
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
          GB = Parámetros × Bytes
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Elige un modelo popular o ajusta el número de parámetros y la precisión para saber cuántos gigabytes ocupará en tu disco y cuánta memoria RAM necesitarás:
      </p>

      {/* Modelos preconfigurados */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--sl-color-text, #e2e8f0)', marginBottom: '0.4rem' }}>
          Modelos abiertos de referencia:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {PRESET_MODELS.map((pm) => (
            <button
              key={pm.name}
              onClick={() => setParams(pm.paramsBillions)}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: params === pm.paramsBillions ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: params === pm.paramsBillions ? 'rgba(99, 102, 241, 0.2)' : 'var(--sl-color-bg, #1e293b)',
                color: params === pm.paramsBillions ? 'var(--color-accent, #a5b4fc)' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                fontWeight: params === pm.paramsBillions ? 600 : 400,
              }}
            >
              {pm.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de precisión */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--sl-color-text, #e2e8f0)', marginBottom: '0.4rem' }}>
          Precisión / Nivel de compresión:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
          {PRECISIONS.map((p) => {
            const isSelected = p.id === selectedPrecision;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPrecision(p.id)}
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                  backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'var(--sl-color-bg, #1e293b)',
                  color: isSelected ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: '0.72rem', color: isSelected ? '#a5b4fc' : '#94a3b8', marginTop: '0.2rem' }}>
                  {p.bytesPerParam} bytes/peso · {p.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control deslizante de parámetros libres */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <label htmlFor="param-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
            Número de parámetros (en miles de millones / Billions):
          </label>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-accent, #818cf8)', fontFamily: 'monospace' }}>
            {params.toFixed(1)}B ({params >= 1 ? `${params.toFixed(1)} mil millones` : `${(params * 1000).toFixed(0)} millones`})
          </span>
        </div>

        <input
          id="param-slider"
          type="range"
          min="1"
          max="120"
          step="1"
          value={params > 120 ? 120 : params}
          onChange={(e) => setParams(parseFloat(e.target.value))}
          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-accent, #6366f1)' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--sl-color-gray-4, #64748b)' }}>
          <span>1B (Ligero)</span>
          <span>8B (Estándar Mac)</span>
          <span>32B (Avanzado)</span>
          <span>70B (Potente)</span>
          <span>120B+ (Servidor)</span>
        </div>
      </div>

      {/* Resultados numéricos calculados */}
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
            padding: '1rem',
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
            💾 Tamaño de los pesos en disco
          </span>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', display: 'block', marginTop: '0.2rem', fontFamily: 'monospace' }}>
            {rawSizeGB.toFixed(1)} GB
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            {params} × {precision.bytesPerParam} bytes
          </span>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
            🧠 RAM recomendada para ejecutar
          </span>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-accent, #a5b4fc)', display: 'block', marginTop: '0.2rem', fontFamily: 'monospace' }}>
            ~{recommendedRamGB.toFixed(1)} GB
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            Incluye pesos + contexto de conversación (KV Cache)
          </span>
        </div>
      </div>

      {/* Veredicto de compatibilidad con Mac */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          border: `1px solid ${macVerdict.color}`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.3rem' }}>🍏</span>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: macVerdict.color, marginBottom: '0.2rem' }}>
            Veredicto: {macVerdict.tier}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--sl-color-text, #cbd5e1)', lineHeight: 1.45 }}>
            {macVerdict.message}
          </div>
        </div>
      </div>
    </div>
  );
}
