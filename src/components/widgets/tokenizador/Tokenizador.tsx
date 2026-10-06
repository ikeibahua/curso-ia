import React, { useState, useId, useMemo } from 'react';
import { encode, decode } from 'gpt-tokenizer';

interface TokenItem {
  id: number;
  text: string;
}

const PRESETS = [
  {
    label: 'Prueba de conteo (ferrocarril)',
    text: 'El ferrocarril transportaba muestras botánicas.',
  },
  {
    label: 'Español (Biología)',
    text: 'La clorofila absorbe la luz solar durante la fotosíntesis.',
  },
  {
    label: 'Inglés equivalente',
    text: 'Chlorophyll absorbs sunlight during photosynthesis.',
  },
  {
    label: 'Línea de código',
    text: 'def contar_especies(muestra): return len(set(muestra))',
  },
];

// Paleta de colores suaves contrastados con bordes claros
const TOKEN_COLORS = [
  { bg: 'rgba(127, 176, 143, 0.22)', border: 'rgba(127, 176, 143, 0.8)', text: 'inherit' },
  { bg: 'rgba(125, 176, 207, 0.22)', border: 'rgba(125, 176, 207, 0.8)', text: 'inherit' },
  { bg: 'rgba(227, 185, 101, 0.22)', border: 'rgba(227, 185, 101, 0.8)', text: 'inherit' },
  { bg: 'rgba(224, 138, 98, 0.22)', border: 'rgba(224, 138, 98, 0.8)', text: 'inherit' },
  { bg: 'rgba(163, 142, 219, 0.22)', border: 'rgba(163, 142, 219, 0.8)', text: 'inherit' },
];

export default function Tokenizador() {
  const [texto, setTexto] = useState('El ferrocarril transportaba muestras botánicas.');
  const [tokenSeleccionado, setTokenSeleccionado] = useState<TokenItem | null>(null);
  const textareaId = useId();

  // Calcular tokens
  const tokens = useMemo<TokenItem[]>(() => {
    if (!texto) return [];
    try {
      const ids = encode(texto);
      return ids.map((id) => ({
        id,
        text: decode([id]),
      }));
    } catch {
      return [];
    }
  }, [texto]);

  const numCaracteres = texto.length;
  const numTokens = tokens.length;
  const ratio = numTokens > 0 ? (numCaracteres / numTokens).toFixed(1) : '0';

  const reiniciar = () => {
    setTexto('El ferrocarril transportaba muestras botánicas.');
    setTokenSeleccionado(null);
  };

  const limpiar = () => {
    setTexto('');
    setTokenSeleccionado(null);
  };

  return (
    <div className="lab-widget" role="region" aria-label="Instrumento: Visor de tokens">
      <div className="widget-topbar">
        <div className="widget-title-wrap">
          <span className="instrument-badge" aria-hidden="true">🔬 Instrumento de laboratorio</span>
          <h3 className="widget-title">El visor de tokens interactivo</h3>
          <p className="widget-instructions">
            Escribe o pega cualquier frase para observar en directo cómo el algoritmo fragmenta el texto en unidades numéricas.
          </p>
        </div>
        <div className="widget-actions">
          <button type="button" onClick={reiniciar} className="btn-widget-reset" title="Restablecer ejemplo inicial">
            Reiniciar
          </button>
        </div>
      </div>

      <div className="presets-bar">
        <span className="presets-label">Ejemplos para probar:</span>
        <div className="presets-buttons">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              className="preset-btn"
              onClick={() => {
                setTexto(p.text);
                setTokenSeleccionado(null);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor={textareaId} className="input-label">
          Texto a inspeccionar:
        </label>
        <div className="textarea-wrap">
          <textarea
            id={textareaId}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={3}
            className="widget-textarea"
            placeholder="Escribe aquí cualquier frase en español, inglés o código..."
          />
          {texto && (
            <button type="button" onClick={limpiar} className="clear-text-btn" aria-label="Borrar texto">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="stats-row" aria-live="polite">
        <div className="stat-card">
          <span className="stat-num">{numTokens}</span>
          <span className="stat-label">Tokens</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{numCaracteres}</span>
          <span className="stat-label">Caracteres</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{ratio}</span>
          <span className="stat-label">Caract. / token</span>
        </div>
      </div>

      <div className="tokens-display-box">
        <div className="display-header">
          <span className="display-title">Desglose de tokens (cada color y recuadro es un token distinto):</span>
          <span className="display-hint">Pasa el ratón o pulsa sobre un token para ver su ID</span>
        </div>

        {tokens.length === 0 ? (
          <div className="empty-state">
            <em>El campo de texto está vacío. Escribe algo arriba para ver sus tokens.</em>
          </div>
        ) : (
          <div className="tokens-stream" tabIndex={0} aria-label="Secuencia de tokens resultante">
            {tokens.map((tok, index) => {
              const color = TOKEN_COLORS[index % TOKEN_COLORS.length];
              const isSelected = tokenSeleccionado === tok;

              // Reemplazar espacios por símbolo visible para entender el espacio inicial
              const formattedText = tok.text.replace(/ /g, '␣');

              return (
                <button
                  key={index}
                  type="button"
                  className={`token-chip ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    backgroundColor: color.bg,
                    borderColor: color.border,
                  }}
                  onClick={() => setTokenSeleccionado(tok)}
                  title={`Token #${index + 1} | ID: ${tok.id} | Contenido: "${tok.text}"`}
                  aria-label={`Token ${index + 1}: ${tok.text}, identificador numérico ${tok.id}`}
                >
                  <span className="token-text">{formattedText}</span>
                  <span className="token-id-pill" aria-hidden="true">{tok.id}</span>
                </button>
              );
            })}
          </div>
        )}

        {tokenSeleccionado && (
          <div className="token-detail-card" role="status">
            <span className="detail-tag">Ficha de espécimen:</span>
            <div className="detail-grid">
              <div>
                <strong>Fragmento:</strong> <code className="detail-code">"{tokenSeleccionado.text}"</code>
              </div>
              <div>
                <strong>ID numérico en vocabulario:</strong> <code className="detail-code">{tokenSeleccionado.id}</code>
              </div>
              <div>
                <strong>Longitud:</strong> {tokenSeleccionado.text.length} caracteres
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="widget-footer-note">
        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <span>
          Este visor utiliza el algoritmo real de tokenización BPE estándar (OpenAI <code>o200k_base</code>) ejecutado 100% en tu navegador de forma privada. Cada familia de modelos (Claude, Llama, Gemini) tiene su propio diccionario, pero todos aplican la misma lógica.
        </span>
      </div>

      <style>{`
        .lab-widget {
          margin: 2.25rem 0;
          padding: 1.5rem;
          border-radius: 0.85rem;
          background-color: var(--superficie);
          border: 1px solid var(--musgo-borde);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .widget-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          border-bottom: 1px solid var(--linea);
          padding-bottom: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .instrument-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-family: var(--sl-font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--musgo);
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .widget-title {
          margin: 0;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--tinta);
        }

        .widget-instructions {
          margin: 0.35rem 0 0 0;
          font-size: 0.95rem;
          color: var(--tinta-secundaria);
          line-height: 1.45;
        }

        .btn-widget-reset {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea-fuerte);
          color: var(--tinta);
          padding: 0.35rem 0.75rem;
          border-radius: 0.35rem;
          font-size: 0.8rem;
          font-family: var(--sl-font-mono);
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .btn-widget-reset:hover {
          background-color: var(--musgo-suave);
          border-color: var(--musgo);
          color: var(--musgo);
        }

        .presets-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .presets-label {
          font-size: 0.8rem;
          color: var(--tinta-secundaria);
          font-weight: 600;
        }

        .presets-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .preset-btn {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          color: var(--tinta);
          padding: 0.25rem 0.55rem;
          border-radius: 0.35rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .preset-btn:hover {
          border-color: var(--musgo);
          color: var(--musgo);
        }

        .input-group {
          margin-bottom: 1.25rem;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--tinta);
          margin-bottom: 0.4rem;
        }

        .textarea-wrap {
          position: relative;
        }

        .widget-textarea {
          width: 100%;
          padding: 0.75rem 2.25rem 0.75rem 0.85rem;
          border-radius: 0.5rem;
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea-fuerte);
          color: var(--tinta);
          font-family: var(--sl-font);
          font-size: 1rem;
          line-height: 1.5;
          resize: vertical;
          box-sizing: border-box;
        }

        .widget-textarea:focus {
          border-color: var(--musgo);
          outline: 2px solid var(--musgo);
        }

        .clear-text-btn {
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          background: none;
          border: none;
          color: var(--tinta-secundaria);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0.25rem;
          border-radius: 0.25rem;
        }

        .clear-text-btn:hover {
          color: var(--terracota);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .stat-card {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          text-align: center;
        }

        .stat-num {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          font-family: var(--sl-font-mono);
          color: var(--musgo);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.785rem;
          color: var(--tinta-secundaria);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .tokens-display-box {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.6rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .display-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
          font-size: 0.85rem;
        }

        .display-title {
          font-weight: 600;
          color: var(--tinta);
        }

        .display-hint {
          color: var(--tinta-secundaria);
          font-size: 0.8rem;
        }

        .empty-state {
          padding: 2rem 1rem;
          text-align: center;
          color: var(--tinta-secundaria);
          font-size: 0.95rem;
        }

        .tokens-stream {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding: 0.5rem 0;
          max-height: 280px;
          overflow-y: auto;
          line-height: 1.8;
        }

        .token-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.2rem 0.55rem;
          border-radius: 0.35rem;
          border: 1.5px solid transparent;
          font-family: var(--sl-font-mono);
          font-size: 0.95rem;
          color: var(--tinta);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          background: none;
        }

        .token-chip:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .token-chip.is-selected {
          outline: 2px solid var(--terracota);
          box-shadow: 0 0 0 3px var(--terracota-suave);
        }

        .token-text {
          white-space: pre;
        }

        .token-id-pill {
          font-size: 0.7rem;
          opacity: 0.75;
          background-color: rgba(0, 0, 0, 0.15);
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
        }

        .token-detail-card {
          margin-top: 1rem;
          background-color: var(--superficie);
          border: 1px solid var(--musgo-borde);
          border-radius: 0.5rem;
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
        }

        .detail-tag {
          display: block;
          font-size: 0.75rem;
          font-family: var(--sl-font-mono);
          text-transform: uppercase;
          color: var(--musgo);
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .detail-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          color: var(--tinta);
        }

        .detail-code {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          padding: 0.1rem 0.4rem;
          border-radius: 0.25rem;
          font-family: var(--sl-font-mono);
          color: var(--musgo);
        }

        .widget-footer-note {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--tinta-secundaria);
          line-height: 1.45;
          margin-top: 0.5rem;
        }

        .widget-footer-note svg {
          flex-shrink: 0;
          color: var(--musgo);
        }
      `}</style>
    </div>
  );
}

