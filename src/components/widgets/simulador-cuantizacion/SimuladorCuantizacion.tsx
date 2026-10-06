import React, { useState, useId, useMemo } from 'react';

interface QuantLevel {
  bits: number;
  name: string;
  levels: number;
  memoryRatio: number; // relative to 16-bit
  size8b: string;
  qualityPct: number;
  sampleOutput: string;
  description: string;
}

const QUANT_LEVELS: QuantLevel[] = [
  {
    bits: 16,
    name: '16 bits (FP16 / BF16)',
    levels: 65536,
    memoryRatio: 1.0,
    size8b: '16,0 GB',
    qualityPct: 100,
    sampleOutput:
      'El tilo de hoja ancha (Tilia platyphyllos) es un árbol caducifolio de copa densa que prospera en laderas umbrías con suelos calizos y ricos en nutrientes.',
    description: 'Precisión original sin compresión. Curva matemática continua e imperceptiblemente suave.',
  },
  {
    bits: 8,
    name: '8 bits (Q8 / INT8)',
    levels: 256,
    memoryRatio: 0.5,
    size8b: '8,0 GB',
    qualityPct: 99.4,
    sampleOutput:
      'El tilo de hoja ancha (Tilia platyphyllos) es un árbol caducifolio de copa densa que prospera en laderas umbrías con suelos calizos y ricos en nutrientes.',
    description: 'Ahorro del 50% de memoria. La pérdida de precisión matemática es prácticamente indetectable para el ser humano.',
  },
  {
    bits: 4,
    name: '4 bits (Q4_K_M / INT4)',
    levels: 16,
    memoryRatio: 0.25,
    size8b: '4,5 GB',
    qualityPct: 96.8,
    sampleOutput:
      'El tilo de hoja ancha (Tilia platyphyllos) es un árbol caducifolio de copa densa que crece en laderas umbrías sobre suelos calizos fértiles.',
    description: 'El estándar de oro para Mac doméstico: reduce el peso a una cuarta parte con una fluidez lingüística idéntica.',
  },
  {
    bits: 2,
    name: '2 bits (Q2_K / INT2)',
    levels: 4,
    memoryRatio: 0.125,
    size8b: '2,2 GB',
    qualityPct: 62.0,
    sampleOutput:
      'El tilo... árbol hojas caducifolio... copa sombra calizo nutrientes crece bosque verde.',
    description: 'Compresión excesiva. Los escalones numéricos son tan toscos que la red empieza a balbucear y pierde coherencia gramatical.',
  },
];

export default function SimuladorCuantizacion() {
  const [selectedBits, setSelectedBits] = useState<number>(4);
  const titleId = useId();

  const current = QUANT_LEVELS.find((q) => q.bits === selectedBits) || QUANT_LEVELS[2];

  // SVG coordinates: continuous biological curve (Photosynthesis rate vs Light intensity)
  // Domain: x in [0, 10], y = 1 - exp(-0.4 * x)
  const svgWidth = 360;
  const svgHeight = 160;

  // Calculate points for the smooth original curve (FP16)
  const smoothPoints = useMemo(() => {
    const pts: string[] = [];
    for (let x = 0; x <= 10; x += 0.2) {
      const yNorm = 1 - Math.exp(-0.45 * x); // normalized [0, 1]
      const svgX = 35 + (x / 10) * (svgWidth - 55);
      const svgY = svgHeight - 25 - yNorm * (svgHeight - 45);
      pts.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, []);

  // Calculate quantized stepped path based on number of discrete levels
  const quantizedPath = useMemo(() => {
    const levels = current.levels;
    const pts: string[] = [];

    for (let x = 0; x <= 10; x += 0.15) {
      const yNorm = 1 - Math.exp(-0.45 * x);
      // Quantize: snap to nearest discrete step in [0, levels - 1]
      const stepIndex = Math.round(yNorm * (levels - 1));
      const quantizedYNorm = stepIndex / (levels - 1);

      const svgX = 35 + (x / 10) * (svgWidth - 55);
      const svgY = svgHeight - 25 - quantizedYNorm * (svgHeight - 45);
      pts.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, [current.levels]);

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
            Compresión de precisión
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
            Simulador de Cuantización (De 16 a 4 bits)
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
          {current.levels} escalones discretos
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        La cuantización redondea los números decimales exactos a una regla con menos peldaños. Selecciona la resolución en bits para ver el escalonamiento de la curva y su impacto en la memoria:
      </p>

      {/* Selector de bits */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          marginBottom: '1.25rem',
        }}
      >
        {QUANT_LEVELS.map((q) => {
          const isSelected = q.bits === selectedBits;

          return (
            <button
              key={q.bits}
              onClick={() => setSelectedBits(q.bits)}
              style={{
                padding: '0.65rem 0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid',
                borderColor: isSelected ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'var(--sl-color-bg, #1e293b)',
                color: isSelected ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
              aria-pressed={isSelected}
            >
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{q.bits} bits</div>
              <div style={{ fontSize: '0.72rem', color: isSelected ? '#a5b4fc' : '#94a3b8', marginTop: '0.15rem' }}>
                {q.levels >= 1000 ? `${(q.levels / 1000).toFixed(0)}k niveles` : `${q.levels} niveles`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Gráfico SVG de la curva continua vs cuantizada */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--sl-color-white, #f8fafc)', fontWeight: 600 }}>
            Curva de fotosíntesis frente a insolación (señal original vs cuantizada)
          </span>
          <span style={{ color: '#a5b4fc' }}>
            {selectedBits === 16 ? 'Curva suave 16-bit' : `Escalones de ${selectedBits} bits`}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{
            width: '100%',
            height: 'auto',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '0.375rem',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          aria-label={`Gráfico de curva cuantizada a ${selectedBits} bits`}
        >
          {/* Ejes */}
          <line x1="35" y1={svgHeight - 25} x2={svgWidth - 15} y2={svgHeight - 25} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="35" y1="15" x2="35" y2={svgHeight - 25} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x={svgWidth / 2} y={svgHeight - 8} fill="#64748b" fontSize="10" textAnchor="middle">
            Intensidad de luz solar (Lux)
          </text>
          <text x="18" y="70" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90 18 70)">
            Tasa fotosintética
          </text>

          {/* Curva original de referencia tenue */}
          <path d={smoothPoints} fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Curva cuantizada activa */}
          <path
            d={quantizedPath}
            fill="none"
            stroke={selectedBits === 2 ? '#ef4444' : selectedBits === 4 ? '#4ade80' : 'var(--color-accent, #6366f1)'}
            strokeWidth={selectedBits === 2 ? '3' : '2'}
          />
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.4rem' }}>
          <span>Línea de puntos gris: Señal perfecta teórica</span>
          <span style={{ color: selectedBits === 4 ? '#4ade80' : '#cbd5e1' }}>
            Línea de color: Representación en memoria de la red ({selectedBits} bits)
          </span>
        </div>
      </div>

      {/* Métricas: Memoria y Calidad */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ padding: '0.75rem', backgroundColor: 'var(--sl-color-bg, #1e293b)', borderRadius: '0.5rem', border: '1px solid var(--sl-color-gray-5, #334155)' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
            💾 Espacio en RAM para modelo 8B
          </span>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', display: 'block', marginTop: '0.2rem', fontFamily: 'monospace' }}>
            {current.size8b}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#4ade80' }}>
            {current.bits === 16 ? 'Tamaño original completo' : `Ahorro del ${(100 - current.memoryRatio * 100).toFixed(0)}% de memoria`}
          </span>
        </div>

        <div style={{ padding: '0.75rem', backgroundColor: 'var(--sl-color-bg, #1e293b)', borderRadius: '0.5rem', border: '1px solid var(--sl-color-gray-5, #334155)' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
            🎯 Calidad / Retención lingüística
          </span>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: current.qualityPct > 90 ? '#4ade80' : '#f87171', display: 'block', marginTop: '0.2rem', fontFamily: 'monospace' }}>
            ~{current.qualityPct.toFixed(1)}%
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            {current.qualityPct > 95 ? 'Pérdida inapreciable en uso real' : 'Pérdida severa de coherencia'}
          </span>
        </div>
      </div>

      {/* Ejemplo de salida de texto generada con este nivel */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
        }}
      >
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          Muestra de respuesta del modelo a {current.bits} bits:
        </div>
        <div
          style={{
            fontSize: '0.85rem',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '0.65rem 0.85rem',
            borderRadius: '0.375rem',
            borderLeft: `3px solid ${current.bits === 2 ? '#ef4444' : current.bits === 4 ? '#4ade80' : 'var(--color-accent, #6366f1)'}`,
            color: '#e2e8f0',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}
        >
          "{current.sampleOutput}"
        </div>
        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.4rem' }}>
          {current.description}
        </div>
      </div>
    </div>
  );
}
