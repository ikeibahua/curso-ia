import React, { useState, useId } from 'react';

const PARAGRAPHS = [
  'El haya común (Fagus sylvatica) es una especie forestal caducifolia de gran porte, dominante en bosques montanos y umbrías de la Cordillera Cantábrica y los Pirineos.',
  'Su sistema foliar proyecta una sombra sumamente densa, lo que condiciona de forma determinante la flora herbácea del sotobosque, impidiendo el crecimiento de especies heliófilas.',
  'La brotación de las hojas primaverales ocurre de forma sincrónica a mediados de mayo, coincidiendo con la máxima disponibilidad hídrica del deshielo.',
  'En años de vecería abundante, el hayedo produce millones de hayucos, constituyendo el recurso energético primario para aves forestales, roedores y el oso pardo cantábrico.',
  'Frente al calentamiento global, los hayedos situados en su límite meridional de distribución presentan estrés hídrico estival y desplazamiento altitudinal hacia cotas más elevadas.',
];

const FULL_TEXT = PARAGRAPHS.join(' ');

export default function ChunkingAjustable() {
  const [chunkSizeWords, setChunkSizeWords] = useState<number>(35);
  const [overlapWords, setOverlapWords] = useState<number>(10);
  const titleId = useId();

  const words = FULL_TEXT.split(' ');

  // Compute chunks with overlap
  const chunks: { id: number; words: string[]; overlapStartCount: number }[] = [];
  let currentIndex = 0;
  let chunkCount = 0;

  while (currentIndex < words.length && chunkCount < 20) {
    const end = Math.min(currentIndex + chunkSizeWords, words.length);
    const chunkWords = words.slice(currentIndex, end);
    const overlapStart = chunkCount > 0 ? Math.min(overlapWords, chunkWords.length) : 0;

    chunks.push({
      id: chunkCount + 1,
      words: chunkWords,
      overlapStartCount: overlapStart,
    });

    chunkCount++;
    if (end >= words.length) break;

    // Advance by chunkSizeWords - overlapWords (must advance by at least 1 word)
    const step = Math.max(1, chunkSizeWords - overlapWords);
    currentIndex += step;
  }

  // Diagnostic metrics
  let qualityDiagnosis = 'Equilibrado';
  let qualityColor = '#10b981';
  let qualityExplanation = 'Tamaño y solapamiento adecuados: las ideas conservan contexto sin sobrecargar la búsqueda.';

  if (chunkSizeWords < 25) {
    qualityDiagnosis = 'Fragmentación excesiva';
    qualityColor = '#f59e0b';
    qualityExplanation = 'Trozos demasiado cortos: corres el riesgo de partir oraciones a la mitad y perder la relación entre sujeto y predicado.';
  } else if (chunkSizeWords > 55) {
    qualityDiagnosis = 'Baja especificidad';
    qualityColor = '#38bdf8';
    qualityExplanation = 'Trozos muy largos: diluyen la precisión semántica al mezclar varios temas biológicos en un único vector.';
  }

  if (overlapWords === 0) {
    qualityDiagnosis += ' (Sin solapamiento)';
    qualityColor = '#ef4444';
    qualityExplanation += ' Al no haber solapamiento, las ideas que cruzan la frontera entre dos trozos quedarán desconectadas para el buscador.';
  }

  return (
    <div
      style={{
        border: '1px solid var(--sl-color-gray-5, #334155)',
        borderRadius: '12px',
        background: 'var(--sl-color-bg-sidebar, #0f172a)',
        padding: '1.25rem',
        margin: '1.5rem 0',
      }}
      aria-labelledby={titleId}
    >
      {/* Header */}
      <div style={{ marginBottom: '1rem' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--sl-color-accent, #0ea5e9)',
          }}
        >
          Laboratorio Interactivo · Estrategia de Partición
        </span>
        <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
          Chunking y Solapamiento (*Overlap*): Cortar sin Destruir el Sentido
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0.35rem 0 0' }}>
          Ajusta los controles deslizantes para ver en tiempo real cómo se divide un texto botánico sobre el haya cantábrica. Observa el texto repetido (solapamiento en ámbar) que sirve de puente entre trozos.
        </p>
      </div>

      {/* Sliders Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          background: '#090d16',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Slider 1: Chunk Size */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <label htmlFor="slider-chunk-size" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
              Tamaño de trozo (*Chunk Size*):
            </label>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
              {chunkSizeWords} palabras
            </span>
          </div>
          <input
            id="slider-chunk-size"
            type="range"
            min={15}
            max={70}
            step={5}
            value={chunkSizeWords}
            onChange={(e) => {
              const val = Number(e.target.value);
              setChunkSizeWords(val);
              if (overlapWords >= val) setOverlapWords(Math.max(0, val - 10));
            }}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
            <span>15 (muy pequeño)</span>
            <span>40 (estándar)</span>
            <span>70 (extenso)</span>
          </div>
        </div>

        {/* Slider 2: Overlap */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <label htmlFor="slider-overlap" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
              Solapamiento (*Overlap*):
            </label>
            <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>
              {overlapWords} palabras
            </span>
          </div>
          <input
            id="slider-overlap"
            type="range"
            min={0}
            max={Math.min(30, chunkSizeWords - 5)}
            step={5}
            value={overlapWords}
            onChange={(e) => setOverlapWords(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
            <span>0 (sin puente)</span>
            <span>10 (recomendado)</span>
            <span>25 (alto solapamiento)</span>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          background: 'rgba(15, 23, 42, 0.6)',
          borderLeft: `4px solid ${qualityColor}`,
          borderRadius: '6px',
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            Diagnóstico del particionado ({chunks.length} trozos generados):
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: qualityColor, marginTop: '0.1rem' }}>
            {qualityDiagnosis}
          </div>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
            {qualityExplanation}
          </p>
        </div>
      </div>

      {/* Visual Chunks Output */}
      <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
        Fragmentos resultantes listos para almacenar en la base de datos vectorial:
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {chunks.map((ch, idx) => {
          const overlapWordsList = ch.words.slice(0, ch.overlapStartCount);
          const uniqueWordsList = ch.words.slice(ch.overlapStartCount);

          return (
            <div
              key={ch.id}
              style={{
                background: idx % 2 === 0 ? '#090d16' : '#0d131f',
                borderRadius: '6px',
                border: '1px solid #1e293b',
                padding: '0.75rem',
                fontSize: '0.82rem',
                lineHeight: 1.5,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 600 }}>
                <span>Fragmento #{ch.id} ({ch.words.length} palabras)</span>
                {ch.overlapStartCount > 0 && (
                  <span style={{ color: '#fbbf24' }}>
                    🔗 {ch.overlapStartCount} palabras solapadas del trozo anterior
                  </span>
                )}
              </div>

              <div>
                {/* Overlapped words highlight */}
                {overlapWordsList.length > 0 && (
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      color: '#fef08a',
                      padding: '0.1rem 0.3rem',
                      borderRadius: '3px',
                      marginRight: '0.25rem',
                      borderBottom: '2px solid #f59e0b',
                    }}
                    title="Texto solapado con el trozo previo para no perder el contexto"
                  >
                    {overlapWordsList.join(' ')}{' '}
                  </span>
                )}
                <span style={{ color: '#e2e8f0' }}>{uniqueWordsList.join(' ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
