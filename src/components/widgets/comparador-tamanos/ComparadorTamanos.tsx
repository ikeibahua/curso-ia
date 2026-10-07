import React, { useState, useId } from 'react';

interface ModelScale {
  id: string;
  name: string;
  params: string;
  activeParams?: string;
  targetDevice: string;
  sweetSpot: string;
  isMoE?: boolean;
  barWidthPct: number;
}

const SCALES: ModelScale[] = [
  {
    id: '1b',
    name: '1B a 3B (Ultraligeros)',
    params: '1.000 a 3.000 millones',
    targetDevice: 'Móviles, relojes y dispositivos sin conexión a internet',
    sweetSpot: 'Autocompletado de texto, clasificación gramatical y respuestas simples instantáneas.',
    barWidthPct: 3,
  },
  {
    id: '8b',
    name: '7B a 9B (El rey doméstico)',
    params: '7.000 a 9.000 millones',
    targetDevice: 'Cualquier Mac con 8 GB o 16 GB de RAM',
    sweetSpot: 'El estándar de oro personal: conversación fluida, resúmenes, extracción de datos y asistencia en redacción.',
    barWidthPct: 10,
  },
  {
    id: '14b',
    name: '14B a 32B (Gama media alta)',
    params: '14.000 a 32.000 millones',
    targetDevice: 'Macs con 32 GB o más de memoria RAM',
    sweetSpot: 'Programación rigurosa, razonamiento lógico complejo y menor tasa de alucinaciones.',
    barWidthPct: 24,
  },
  {
    id: '70b',
    name: '70B (El estándar profesional)',
    params: '70.000 millones',
    targetDevice: 'Estaciones de trabajo (64 GB a 128 GB RAM) o servidores dedicados',
    sweetSpot: 'Capacidad deductiva de primer nivel, redacción con gran matiz de estilo y seguimiento estricto de directrices complejas.',
    barWidthPct: 52,
  },
  {
    id: 'moe',
    name: 'MoE: Mezcla de Expertos (ej. 671B total / 37B activos)',
    params: 'Cientos de miles de millones (MoE)',
    activeParams: 'Solo se activa un subconjunto de expertos por token',
    targetDevice: 'Servidores de alto rendimiento o clústeres optimizados',
    sweetSpot: 'Máxima eficiencia: tiene la enciclopedia de un gigante pero gasta la energía de un modelo mediano en cada palabra.',
    isMoE: true,
    barWidthPct: 75,
  },
  {
    id: '405b',
    name: '405B (Los colosos de frontera)',
    params: '405.000 millones',
    targetDevice: 'Bastidores completos de centros de datos industriales',
    sweetSpot: 'Generación de datos sintéticos para entrenar modelos más pequeños (destilación) e investigación de frontera.',
    barWidthPct: 100,
  },
];

export default function ComparadorTamanos() {
  const [selectedId, setSelectedId] = useState<string>('8b');
  const titleId = useId();

  const selected = SCALES.find((s) => s.id === selectedId) || SCALES[1];

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
            Escala y proporciones
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
            Comparador de Escalas: De 1B al Coloso 405B
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
          El espectro de tamaños
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Pulsa sobre cada escalón para examinar sus requisitos reales de hardware y para qué tareas concretas está indicado:
      </p>

      {/* Barras de escala relativa */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {SCALES.map((scale) => {
          const isSelected = scale.id === selectedId;

          return (
            <button
              key={scale.id}
              onClick={() => setSelectedId(scale.id)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '0.5rem',
                border: '1px solid',
                borderColor: isSelected ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'var(--sl-color-bg, #1e293b)',
                color: isSelected ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              aria-pressed={isSelected}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: isSelected ? 700 : 500 }}>{scale.name}</span>
                <span style={{ color: isSelected ? '#a5b4fc' : '#94a3b8', fontSize: '0.75rem' }}>{scale.params}</span>
              </div>

              {/* Barra horizontal proporcional */}
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
                    width: `${scale.barWidthPct}%`,
                    backgroundColor: isSelected
                      ? 'var(--color-accent, #6366f1)'
                      : scale.isMoE
                      ? '#38bdf8'
                      : 'rgba(99, 102, 241, 0.5)',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalle del tamaño seleccionado */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc' }}>
            {selected.name}
          </h4>
          <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(99, 102, 241, 0.25)', color: '#a5b4fc' }}>
            {selected.params}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <strong style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              🖥️ Dispositivo objetivo habitual:
            </strong>
            <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{selected.targetDevice}</span>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <strong style={{ fontSize: '0.75rem', color: '#4ade80', display: 'block', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              🎯 Su punto fuerte idóneo:
            </strong>
            <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{selected.sweetSpot}</span>
          </div>
        </div>

        {selected.isMoE && (
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '0.8rem',
              color: '#cbd5e1',
            }}
          >
            💡 <strong>La astucia del MoE (Mezcla de Expertos):</strong> En lugar de pasar cada palabra por todos los cientos de miles de millones de pesos, una pequeña «red de enrutamiento» envía la palabra solo a 2 o 4 sub-redes especialistas. Así consigues el vocabulario y conocimiento de un modelo de 600B consumiendo la electricidad de un modelo de 35B.
          </div>
        )}
      </div>
    </div>
  );
}
