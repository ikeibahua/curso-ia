import React, { useState } from 'react';

interface ParPrecalculado {
  id: string;
  titulo: string;
  fraseA: string;
  fraseB: string;
  similitud: number; // 0 a 100
  explicacion: string;
  tipo: 'sinonimos' | 'trampa' | 'distinto';
}

const PARES_PRECALCULADOS: ParPrecalculado[] = [
  {
    id: 'bio-sinonimos',
    titulo: 'Mismo significado biológico con palabras distintas',
    fraseA: 'El roble pierde sus hojas con la llegada del otoño.',
    fraseB: 'Quercus robur es una especie leñosa de hoja caduca.',
    similitud: 88,
    explicacion: 'Aunque casi ninguna palabra coincide en su forma externa, ambos vectores apuntan a la misma región semántica de botánica y fenología estacional.',
    tipo: 'sinonimos',
  },
  {
    id: 'bio-trampa',
    titulo: 'Palabras casi idénticas pero significado inverso (El par trampa)',
    fraseA: 'El zorro cazó a la liebre en el claro del bosque.',
    fraseB: 'La liebre cazó al zorro en el claro del bosque.',
    similitud: 61,
    explicacion: 'Comparten el 90% de las palabras y el mismo vocabulario, pero el cambio de sujeto y objeto invierte la relación ecológica depredador-presa.',
    tipo: 'trampa',
  },
  {
    id: 'campo-distinto',
    titulo: 'Dominios completamente diferentes',
    fraseA: 'La fotosíntesis transforma el dióxido de carbono en glucosa.',
    fraseB: 'El sistema operativo del Mac gestiona la memoria del ordenador.',
    similitud: 16,
    explicacion: 'Los vectores apuntan a polos opuestos del espacio multidimensional: uno a bioquímica vegetal y otro a arquitectura de computadores.',
    tipo: 'distinto',
  },
  {
    id: 'cotidiano-sinonimos',
    titulo: 'Paráfrasis cotidiana',
    fraseA: 'El cuaderno de campo acabó mojado por la tormenta.',
    fraseB: 'La libreta de notas quedó empapada por el fuerte aguacero.',
    similitud: 92,
    explicacion: 'Casi todos los términos son sinónimos directos (cuaderno/libreta, mojado/empapada, tormenta/aguacero), lo que sitúa ambos vectores a escasa distancia angular.',
    tipo: 'sinonimos',
  },
];

export default function SimilitudSemantica() {
  const [parActivo, setParActivo] = useState<ParPrecalculado>(PARES_PRECALCULADOS[0]);
  const [fraseA, setFraseA] = useState(PARES_PRECALCULADOS[0].fraseA);
  const [fraseB, setFraseB] = useState(PARES_PRECALCULADOS[0].fraseB);
  const [esPersonalizado, setEsPersonalizado] = useState(false);

  const seleccionarPar = (par: ParPrecalculado) => {
    setParActivo(par);
    setFraseA(par.fraseA);
    setFraseB(par.fraseB);
    setEsPersonalizado(false);
  };

  // Cálculo heurístico si el usuario edita texto libremente
  const similitudCalculada = esPersonalizado
    ? (() => {
        const wordsA = new Set(fraseA.toLowerCase().split(/\s+/).filter(Boolean));
        const wordsB = new Set(fraseB.toLowerCase().split(/\s+/).filter(Boolean));
        if (wordsA.size === 0 || wordsB.size === 0) return 0;
        const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
        const union = new Set([...wordsA, ...wordsB]).size;
        const jaccard = (intersection / union) * 100;
        // Ajuste heurístico aproximado
        return Math.min(95, Math.round(jaccard * 0.8 + 20));
      })()
    : parActivo.similitud;

  const getInterpretacion = (val: number) => {
    if (val >= 85) return { texto: 'Significado prácticamente idéntico (Ángulo muy cerrado)', color: 'var(--musgo)' };
    if (val >= 60) return { texto: 'Temática muy relacionada o palabras compartidas', color: 'var(--ocre)' };
    if (val >= 35) return { texto: 'Relación débil o tangencial', color: 'var(--agua)' };
    return { texto: 'Sin afinidad semántica reconocible', color: 'var(--tinta-secundaria)' };
  };

  const inter = getInterpretacion(similitudCalculada);

  return (
    <div className="similitud-widget" role="region" aria-label="Comparador de similitud semántica">
      <div className="widget-header">
        <span className="instrument-badge" aria-hidden="true">📐 Goniómetro semántico</span>
        <h3 className="widget-title">Similitud coseno entre frases</h3>
        <p className="widget-subtitle">
          Descubre cómo dos frases se comparan midiendo el ángulo entre sus vectores de significado (de 0% a 100%).
        </p>
      </div>

      <div className="presets-section">
        <span className="presets-label">Pares de prueba recomendados:</span>
        <div className="presets-grid">
          {PARES_PRECALCULADOS.map((par) => (
            <button
              key={par.id}
              type="button"
              className={`preset-card ${parActivo.id === par.id && !esPersonalizado ? 'is-active' : ''}`}
              onClick={() => seleccionarPar(par)}
            >
              <span className="preset-card-title">{par.titulo}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="phrases-grid">
        <div className="phrase-box">
          <label className="phrase-label">Frase A:</label>
          <textarea
            value={fraseA}
            onChange={(e) => {
              setFraseA(e.target.value);
              setEsPersonalizado(true);
            }}
            rows={2}
            className="phrase-textarea"
          />
        </div>

        <div className="phrase-box">
          <label className="phrase-label">Frase B:</label>
          <textarea
            value={fraseB}
            onChange={(e) => {
              setFraseB(e.target.value);
              setEsPersonalizado(true);
            }}
            rows={2}
            className="phrase-textarea"
          />
        </div>
      </div>

      <div className="meter-card" aria-live="polite">
        <div className="meter-top">
          <span className="meter-label">Similitud semántica estimada:</span>
          <span className="meter-percent" style={{ color: inter.color }}>
            {similitudCalculada}%
          </span>
        </div>

        <div className="meter-track" role="progressbar" aria-valuenow={similitudCalculada} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="meter-fill"
            style={{
              width: `${similitudCalculada}%`,
              backgroundColor: inter.color,
            }}
          />
        </div>

        <div className="meter-inter" style={{ color: inter.color }}>
          ● {inter.texto}
        </div>

        {!esPersonalizado && (
          <div className="meter-explanation">
            <span className="expl-lead" aria-hidden="true">💡</span>
            <span>{parActivo.explicacion}</span>
          </div>
        )}
      </div>

      <div className="widget-note">
        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <span>
          <strong>Dato de campo:</strong> La similitud coseno no mide la longitud del texto, sino el ángulo angular entre los dos vectores. Cuando dos frases apuntan exactamente en la misma dirección, la similitud es del 100% (coseno = 1).
        </span>
      </div>

      <style>{`
        .similitud-widget {
          margin: 2.25rem 0;
          padding: 1.5rem;
          border-radius: 0.85rem;
          background-color: var(--superficie);
          border: 1px solid var(--musgo-borde);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .widget-header {
          border-bottom: 1px solid var(--linea);
          padding-bottom: 0.85rem;
          margin-bottom: 1.15rem;
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

        .widget-subtitle {
          margin: 0.35rem 0 0 0;
          font-size: 0.95rem;
          color: var(--tinta-secundaria);
          line-height: 1.45;
        }

        .presets-section {
          margin-bottom: 1.25rem;
        }

        .presets-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--tinta-secundaria);
          margin-bottom: 0.45rem;
        }

        .presets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.5rem;
        }

        .preset-card {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.4rem;
          padding: 0.5rem 0.65rem;
          text-align: left;
          cursor: pointer;
          font-size: 0.8rem;
          color: var(--tinta);
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .preset-card:hover {
          border-color: var(--musgo);
        }

        .preset-card.is-active {
          border-color: var(--musgo);
          background-color: var(--musgo-suave);
          font-weight: 600;
        }

        .phrases-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 640px) {
          .phrases-grid {
            grid-template-columns: 1fr;
          }
        }

        .phrase-label {
          display: block;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--tinta);
          margin-bottom: 0.35rem;
        }

        .phrase-textarea {
          width: 100%;
          padding: 0.65rem 0.75rem;
          border-radius: 0.45rem;
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea-fuerte);
          color: var(--tinta);
          font-family: var(--sl-font);
          font-size: 0.95rem;
          line-height: 1.45;
          box-sizing: border-box;
          resize: vertical;
        }

        .meter-card {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.6rem;
          padding: 1.15rem;
          margin-bottom: 1rem;
        }

        .meter-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }

        .meter-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--tinta);
          font-family: var(--font-serif);
        }

        .meter-percent {
          font-size: 1.6rem;
          font-weight: 700;
          font-family: var(--sl-font-mono);
          line-height: 1;
        }

        .meter-track {
          width: 100%;
          height: 10px;
          background-color: var(--linea);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 0.65rem;
        }

        .meter-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        .meter-inter {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .meter-explanation {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--tinta);
          background-color: var(--superficie);
          border: 1px solid var(--linea);
          border-radius: 0.35rem;
          padding: 0.6rem 0.75rem;
          line-height: 1.45;
        }

        .expl-lead {
          flex-shrink: 0;
        }

        .widget-note {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--tinta-secundaria);
          line-height: 1.45;
        }

        .widget-note svg {
          flex-shrink: 0;
          color: var(--musgo);
        }
      `}</style>
    </div>
  );
}
