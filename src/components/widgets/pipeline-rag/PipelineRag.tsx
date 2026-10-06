import React, { useState, useId } from 'react';

interface Stage {
  id: number;
  name: string;
  shortName: string;
  icon: string;
  description: string;
}

const STAGES: Stage[] = [
  {
    id: 1,
    name: '1. Documento Fuente',
    shortName: 'Documento',
    icon: '📄',
    description: 'Tus documentos privados (PDFs, cuadernos de campo, guías botánicas). El modelo no los leyó en su entrenamiento general.',
  },
  {
    id: 2,
    name: '2. Troceado (Chunking)',
    shortName: 'Troceado',
    icon: '✂️',
    description: 'El texto se divide en fragmentos coherentes (párrafos de 200–500 palabras) para que quepan en las búsquedas.',
  },
  {
    id: 3,
    name: '3. Vectorización (Embeddings)',
    shortName: 'Embeddings',
    icon: '🧭',
    description: 'Cada trozo se convierte en una lista de números (vector de significado, como vimos en la Lección 02) y se guarda en un índice.',
  },
  {
    id: 4,
    name: '4. Búsqueda por Similitud',
    shortName: 'Búsqueda',
    icon: '🔍',
    description: 'Cuando haces una pregunta, se vectoriza y la base de datos recupera sólo los 2 o 3 fragmentos matemáticamente más cercanos.',
  },
  {
    id: 5,
    name: '5. Respuesta con Citas',
    shortName: 'Respuesta',
    icon: '💡',
    description: 'El modelo recibe tu pregunta JUNTO a los fragmentos recuperados en su contexto y redacta una respuesta contrastable citando la fuente.',
  },
];

const SAMPLE_CHUNKS = [
  {
    id: 'c1',
    title: 'Trozo 1 (Pág. 1)',
    content: 'Quercus suber (alcornoque) es un árbol perennifolio propio del Mediterráneo occidental. Prospera en suelos silíceos descarbonatados y climas con inviernos suaves.',
    topic: 'suelo_clima',
  },
  {
    id: 'c2',
    title: 'Trozo 2 (Pág. 2)',
    content: 'La saca del corcho se efectúa cada 9–12 años durante los meses de verano (julio y agosto), cuando la actividad vegetativa del cambium facilita el descorche sin dañar el tronco.',
    topic: 'descorche',
  },
  {
    id: 'c3',
    title: 'Trozo 3 (Pág. 3)',
    content: 'Altitudinalmente se extiende desde el nivel del mar hasta los 1.000–1.200 metros en laderas umbrías o de media ladera, requiriendo precipitaciones superiores a 500 mm anuales.',
    topic: 'altitud',
  },
];

const SAMPLE_QUERIES = [
  {
    id: 'q1',
    query: '¿En qué época se descorcha el alcornoque y cada cuánto tiempo?',
    relevantChunkIds: ['c2'],
    answer: 'La saca del corcho se realiza cada 9 a 12 años durante los meses estivales (julio y agosto), momento en que el cambium facilita la separación sin herir el árbol vivo [Fuente: Trozo 2, Pág. 2].',
  },
  {
    id: 'q2',
    query: '¿Qué requerimientos de suelo y altitud presenta Quercus suber?',
    relevantChunkIds: ['c1', 'c3'],
    answer: 'Requiere suelos silíceos desprovistos de cal y habita desde el nivel del mar hasta los 1.000–1.200 metros de altitud con precipitaciones mínimas de 500 mm anuales [Fuente: Trozo 1 y Trozo 3].',
  },
];

export default function PipelineRag() {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [selectedQueryId, setSelectedQueryId] = useState<string>('q1');
  const titleId = useId();

  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];
  const currentQuery = SAMPLE_QUERIES.find((q) => q.id === selectedQueryId) || SAMPLE_QUERIES[0];

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
          Anatomía de RAG · Pipeline Animado
        </span>
        <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
          De tus Archivos a la Respuesta: Los 5 Eslabones
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0.35rem 0 0' }}>
          RAG significa <em>Generación Aumentada por Recuperación</em>. Es el equivalente a permitir que el modelo consulte tus apuntes a libro abierto antes de responder.
        </p>
      </div>

      {/* Stepper buttons bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        {STAGES.map((st) => {
          const isActive = st.id === activeStageId;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStageId(st.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.6rem 0.4rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isActive ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
                background: isActive ? 'rgba(14, 165, 233, 0.15)' : '#090d16',
                color: isActive ? '#f8fafc' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{st.icon}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: isActive ? 700 : 500 }}>{st.shortName}</span>
              <span style={{ fontSize: '0.68rem', color: isActive ? '#38bdf8' : '#64748b' }}>Paso {st.id}</span>
            </button>
          );
        })}
      </div>

      {/* Stage Explanatory Callout */}
      <div
        style={{
          background: '#090d16',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ color: 'var(--sl-color-accent-high, #38bdf8)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
          {currentStage.name}
        </div>
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
          {currentStage.description}
        </p>
      </div>

      {/* Interactive Demonstration Area */}
      <div
        style={{
          background: '#020617',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          padding: '1.25rem',
        }}
      >
        {/* Step 1: Raw doc */}
        {activeStageId === 1 && (
          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              Documento original completo (Tratado forestal sobre el alcornoque, 3 páginas):
            </div>
            <div
              style={{
                background: '#090d16',
                padding: '0.85rem',
                borderRadius: '6px',
                border: '1px solid #334155',
                fontSize: '0.82rem',
                color: '#e2e8f0',
                lineHeight: 1.6,
                fontFamily: 'serif',
              }}
            >
              <h5 style={{ margin: '0 0 0.5rem', fontFamily: 'sans-serif', color: '#38bdf8' }}>
                Monografía Silvícola: Quercus suber L.
              </h5>
              <p style={{ margin: '0 0 0.5rem' }}>
                {SAMPLE_CHUNKS[0].content}
              </p>
              <p style={{ margin: '0 0 0.5rem' }}>
                {SAMPLE_CHUNKS[1].content}
              </p>
              <p style={{ margin: 0 }}>
                {SAMPLE_CHUNKS[2].content}
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Chunks */}
        {activeStageId === 2 && (
          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              División en fragmentos (Chunks) con límites definidos:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SAMPLE_CHUNKS.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: '#090d16',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    borderLeft: '4px solid #38bdf8',
                    border: '1px solid #1e293b',
                    fontSize: '0.82rem',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '0.2rem', fontSize: '0.78rem' }}>
                    {c.title}
                  </div>
                  <div style={{ color: '#cbd5e1' }}>{c.content}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Embeddings */}
        {activeStageId === 3 && (
          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              Traducción a vectores de números en la base vectorial (SQLite-vec / Chroma):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontFamily: 'var(--sl-font-mono, monospace)', fontSize: '0.8rem' }}>
              {SAMPLE_CHUNKS.map((c, i) => {
                const fakeVectors = [
                  '[0.142, -0.891, 0.453, 0.012, ..., 1536 dims]',
                  '[0.789, 0.021, -0.634, 0.884, ..., 1536 dims]',
                  '[-0.221, -0.712, 0.399, -0.115, ..., 1536 dims]',
                ];
                return (
                  <div key={c.id} style={{ background: '#090d16', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #1e293b' }}>
                    <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.2rem' }}>
                      Vector({c.title})
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                      {fakeVectors[i]}
                    </div>
                    <div style={{ color: '#94a3b8', fontFamily: 'sans-serif', fontSize: '0.78rem' }}>
                      Tema semántico principal: <span style={{ color: '#f1f5f9' }}>{c.topic}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Search Retrieval */}
        {activeStageId === 4 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Selecciona una pregunta del alumno:</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {SAMPLE_QUERIES.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQueryId(q.id)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '5px',
                      border: '1px solid',
                      borderColor: selectedQueryId === q.id ? '#0ea5e9' : '#334155',
                      background: selectedQueryId === q.id ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
                      color: selectedQueryId === q.id ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                    }}
                  >
                    Pregunta {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '6px', border: '1px solid #334155', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#f8fafc' }}>
              💬 <strong>Pregunta:</strong> "{currentQuery.query}"
            </div>

            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Resultado del cálculo de similitud (se rescatan sólo los trozos relevantes):
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SAMPLE_CHUNKS.map((c) => {
                const isRelevant = currentQuery.relevantChunkIds.includes(c.id);
                return (
                  <div
                    key={c.id}
                    style={{
                      padding: '0.6rem 0.8rem',
                      borderRadius: '6px',
                      background: isRelevant ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 23, 42, 0.4)',
                      border: isRelevant ? '1px solid #10b981' : '1px solid #1e293b',
                      fontSize: '0.8rem',
                      opacity: isRelevant ? 1 : 0.45,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: isRelevant ? '#34d399' : '#64748b', fontWeight: 600 }}>
                      <span>{c.title}</span>
                      <span>{isRelevant ? '✓ Recuperado para contexto' : '✕ Descartado por baja afinidad'}</span>
                    </div>
                    <div style={{ color: isRelevant ? '#f1f5f9' : '#64748b', marginTop: '0.2rem' }}>
                      {c.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Answer */}
        {activeStageId === 5 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pregunta seleccionada:</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {SAMPLE_QUERIES.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQueryId(q.id)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '5px',
                      border: '1px solid',
                      borderColor: selectedQueryId === q.id ? '#10b981' : '#334155',
                      background: selectedQueryId === q.id ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                      color: selectedQueryId === q.id ? '#34d399' : '#94a3b8',
                      cursor: 'pointer',
                    }}
                  >
                    Pregunta {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <strong>Pregunta del usuario:</strong> "{currentQuery.query}"
            </div>

            {/* Injected Context Box */}
            <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '0.65rem 0.8rem', borderRadius: '6px', border: '1px solid #0284c7', marginBottom: '0.75rem', fontSize: '0.78rem' }}>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>Fragmentos inyectados en la ventana de contexto:</span>
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.2rem', color: '#94a3b8' }}>
                {currentQuery.relevantChunkIds.map((cid) => {
                  const chunk = SAMPLE_CHUNKS.find((c) => c.id === cid);
                  return <li key={cid}><strong>{chunk?.title}:</strong> "{chunk?.content}"</li>;
                })}
              </ul>
            </div>

            {/* Final Answer */}
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid #059669',
              }}
            >
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                💡 Respuesta del Modelo (Fundamentada y Verificable):
              </div>
              <p style={{ margin: 0, color: '#f8fafc', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {currentQuery.answer}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stepper Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <button
          onClick={() => setActiveStageId((prev) => Math.max(1, prev - 1))}
          disabled={activeStageId === 1}
          style={{
            padding: '0.4rem 0.8rem',
            background: activeStageId === 1 ? '#1e293b' : '#334155',
            color: activeStageId === 1 ? '#64748b' : '#f8fafc',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.8rem',
            cursor: activeStageId === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Paso anterior
        </button>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Paso {activeStageId} de {STAGES.length}
        </span>
        <button
          onClick={() => setActiveStageId((prev) => Math.min(STAGES.length, prev + 1))}
          disabled={activeStageId === STAGES.length}
          style={{
            padding: '0.4rem 0.8rem',
            background: activeStageId === STAGES.length ? '#1e293b' : 'var(--sl-color-accent, #0ea5e9)',
            color: activeStageId === STAGES.length ? '#64748b' : '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: activeStageId === STAGES.length ? 'not-allowed' : 'pointer',
          }}
        >
          Paso siguiente →
        </button>
      </div>
    </div>
  );
}
