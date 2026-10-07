import React, { useState, useMemo } from 'react';

// Paleta de colores cálidos y accesibles para tokens
const TOKEN_COLORS = [
  { bg: 'rgba(127, 176, 143, 0.22)', border: '#7FB08F', text: 'var(--tinta)' }, // musgo
  { bg: 'rgba(224, 138, 98, 0.22)', border: '#E08A62', text: 'var(--tinta)' }, // terracota
  { bg: 'rgba(227, 185, 101, 0.22)', border: '#E3B965', text: 'var(--tinta)' }, // ocre
  { bg: 'rgba(125, 176, 207, 0.22)', border: '#7DB0CF', text: 'var(--tinta)' }, // agua
  { bg: 'rgba(168, 140, 219, 0.22)', border: '#B39DDB', text: 'var(--tinta)' }, // violeta suave
  { bg: 'rgba(129, 199, 132, 0.22)', border: '#81C784', text: 'var(--tinta)' }, // verde claro
];

const SAMPLE_TEXTS = [
  {
    label: 'Botánica: El roble albar',
    text: 'El roble albar (Quercus petraea) pierde su follaje en los otoños húmedos cantábricos.',
  },
  {
    label: 'Genética: El código ADN',
    text: 'El ADN codifica información combinando cuatro bases: adenina, timina, citosina y guanina.',
  },
  {
    label: 'El reto: Contar letras',
    text: '¿Cuántas letras "r" tiene la palabra ferrocarril?',
  },
];

// Tokenizador heurístico rápido para demostración visual interactiva
function segmentTokens(text: string): { text: string; id: number }[] {
  if (!text) return [];

  const chunks: string[] = [];
  const regex = /([A-ZÁÉÍÓÚÑ]?[a-záéíóúñ]+|\d+|[^\s\w]+|\s+)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const word = match[0];
    if (word.length > 5 && /^[a-záéíóúñ]+$/i.test(word)) {
      // Subtokenizar palabras largas para mostrar cómo opera un modelo BPE real
      const mid = Math.ceil(word.length / 2);
      chunks.push(word.slice(0, mid));
      chunks.push(word.slice(mid));
    } else {
      chunks.push(word);
    }
  }

  // Asignar IDs deterministas
  return chunks.map((chunk, idx) => {
    let hash = 1000 + idx * 47;
    for (let i = 0; i < chunk.length; i++) {
      hash = (hash * 31 + chunk.charCodeAt(i)) % 99999;
    }
    return { text: chunk, id: Math.abs(hash) };
  });
}

export default function ProbadorTokensMini() {
  const [inputText, setInputText] = useState(SAMPLE_TEXTS[0].text);

  const tokens = useMemo(() => segmentTokens(inputText), [inputText]);
  const wordCount = useMemo(() => (inputText.trim() ? inputText.trim().split(/\s+/).length : 0), [inputText]);
  const charCount = inputText.length;
  const tokenCount = tokens.length;
  const ratio = wordCount > 0 ? (tokenCount / wordCount).toFixed(2) : '0';

  return (
    <div className="probador-mini-card">
      <div className="probador-top-bar">
        <div className="probador-title-group">
          <span className="probador-badge">⚡ Experimento en 10 segundos</span>
          <h3 className="probador-heading">El Microscopio de Tokens</h3>
        </div>
        <span className="probador-tag">Interactúa sin instalar nada</span>
      </div>

      <p className="probador-lead">
        Un modelo de lenguaje nunca lee palabras ni letras: divide el texto en fragmentos llamados <strong>tokens</strong> y les asigna un número identificador único. Compruébalo tú mismo en vivo:
      </p>

      {/* Botones de muestra rápida */}
      <div className="samples-row">
        <span className="samples-label">Probar muestra:</span>
        {SAMPLE_TEXTS.map((sample) => (
          <button
            key={sample.label}
            type="button"
            className={`sample-chip ${inputText === sample.text ? 'is-active' : ''}`}
            onClick={() => setInputText(sample.text)}
          >
            {sample.label}
          </button>
        ))}
      </div>

      {/* Área de entrada de texto editable */}
      <div className="input-container">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe o pega cualquier texto para ver sus tokens..."
          rows={3}
          className="probador-textarea"
          aria-label="Texto para fragmentar en tokens"
        />
      </div>

      {/* Métricas en vivo */}
      <div className="metrics-grid">
        <div className="metric-box">
          <span className="metric-label">Tokens</span>
          <span className="metric-value token-highlight">{tokenCount}</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Palabras</span>
          <span className="metric-value">{wordCount}</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Caracteres</span>
          <span className="metric-value">{charCount}</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Tokens / Palabra</span>
          <span className="metric-value ratio-highlight">{ratio}</span>
        </div>
      </div>

      {/* Visualización de tokens en tiempo real */}
      <div className="tokens-display-area" aria-live="polite">
        <div className="tokens-container">
          {tokens.length === 0 ? (
            <span className="empty-hint">Escribe algo en el cuadro superior para observar la tokenización...</span>
          ) : (
            tokens.map((tok, i) => {
              const color = TOKEN_COLORS[i % TOKEN_COLORS.length];
              const isWhitespace = /^\s+$/.test(tok.text);
              return (
                <span
                  key={`${i}-${tok.text}`}
                  className="token-chip"
                  style={{
                    backgroundColor: isWhitespace ? 'transparent' : color.bg,
                    borderColor: isWhitespace ? 'transparent' : color.border,
                    color: color.text,
                  }}
                  title={`Token #${i + 1} | ID: ${tok.id} | "${tok.text}"`}
                >
                  <span className="token-text">{isWhitespace ? '␣' : tok.text}</span>
                  {!isWhitespace && <span className="token-id">{tok.id}</span>}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Conclusión didáctica y salto a la lección */}
      <div className="probador-footer">
        <div className="insight-note">
          <span className="insight-icon">💡</span>
          <p className="insight-text">
            <strong>¿Por qué tropieza al contar letras?</strong> Al trocear <em>"ferrocarril"</em> en tokens numéricos, el modelo no tiene acceso directo a la lista de letras individuales, igual que un botánico que mira una hoja desde lejos ve la morfología completa pero no cuenta sus estomas a simple vista.
          </p>
        </div>

        <a href="/curso-ia/lecciones/01-que-es-un-llm/" className="deep-dive-btn">
          <span>Profundizar en la Lección 01</span>
          <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}
