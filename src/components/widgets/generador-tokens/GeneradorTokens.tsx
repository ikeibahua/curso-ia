import React, { useState, useEffect, useRef } from 'react';

interface Candidato {
  token: string;
  prob: number; // Porcentaje 0 a 100
}

interface PasoGeneracion {
  seleccionado: string;
  candidatos: Candidato[];
  explicacion?: string;
}

interface Escenario {
  id: string;
  titulo: string;
  promptInicial: string;
  pasos: PasoGeneracion[];
}

const ESCENARIOS: Escenario[] = [
  {
    id: 'fotosintesis',
    titulo: 'Definición botánica',
    promptInicial: 'La fotosíntesis',
    pasos: [
      {
        seleccionado: ' es',
        candidatos: [
          { token: ' es', prob: 74 },
          { token: ' ocurre', prob: 14 },
          { token: ' permite', prob: 8 },
          { token: ' transforma', prob: 4 },
        ],
        explicacion: 'El verbo "es" tiene la máxima probabilidad tras el sustantivo en una definición.',
      },
      {
        seleccionado: ' el',
        candidatos: [
          { token: ' el', prob: 78 },
          { token: ' un', prob: 16 },
          { token: ' una', prob: 4 },
          { token: ' fundamental', prob: 2 },
        ],
        explicacion: 'El artículo determinado "el" suele preceder a "proceso".',
      },
      {
        seleccionado: ' proceso',
        candidatos: [
          { token: ' proceso', prob: 82 },
          { token: ' mecanismo', prob: 11 },
          { token: ' fenómeno', prob: 5 },
          { token: ' ciclo', prob: 2 },
        ],
        explicacion: '"Proceso" es el término científico canónico en los textos de entrenamiento.',
      },
      {
        seleccionado: ' biológico',
        candidatos: [
          { token: ' biológico', prob: 48 },
          { token: ' mediante', prob: 32 },
          { token: ' químico', prob: 14 },
          { token: ' por', prob: 6 },
        ],
        explicacion: 'Aquí compiten el adjetivo ("biológico") con el conector ("mediante el cual").',
      },
      {
        seleccionado: ' que',
        candidatos: [
          { token: ' que', prob: 86 },
          { token: ' mediante', prob: 8 },
          { token: ' en', prob: 4 },
          { token: ' capaz', prob: 2 },
        ],
        explicacion: 'La oración de relativo "que" conecta directamente con la acción vegetal.',
      },
      {
        seleccionado: ' convierte',
        candidatos: [
          { token: ' convierte', prob: 64 },
          { token: ' transforma', prob: 28 },
          { token: ' aprovecha', prob: 5 },
          { token: ' produce', prob: 3 },
        ],
        explicacion: 'Los dos verbos principales de conversión energética se reparten el 92% de la probabilidad.',
      },
      {
        seleccionado: ' la',
        candidatos: [
          { token: ' la', prob: 91 },
          { token: ' energía', prob: 6 },
          { token: ' radiación', prob: 2 },
          { token: ' luz', prob: 1 },
        ],
        explicacion: 'Suele seguir "la luz solar" o "la energía solar".',
      },
      {
        seleccionado: ' luz',
        candidatos: [
          { token: ' luz', prob: 88 },
          { token: ' energía', prob: 9 },
          { token: ' radiación', prob: 3 },
        ],
        explicacion: 'La colocación "la luz solar" domina ampliamente en la literatura científica.',
      },
      {
        seleccionado: ' solar.',
        candidatos: [
          { token: ' solar.', prob: 84 },
          { token: ' en', prob: 12 },
          { token: ' del', prob: 4 },
        ],
        explicacion: 'Cierre del sintagma con punto de finalización.',
      },
    ],
  },
  {
    id: 'roble',
    titulo: 'Inferencia de naturalista',
    promptInicial: 'Un árbol que pierde sus hojas cada otoño se llama',
    pasos: [
      {
        seleccionado: ' caducifolio.',
        candidatos: [
          { token: ' caducifolio.', prob: 93 },
          { token: ' de', prob: 4 },
          { token: ' caduco.', prob: 2 },
          { token: ' árbol', prob: 1 },
        ],
        explicacion: 'El conocimiento enciclopédico asocia directamente la pérdida de hojas con "caducifolio".',
      },
    ],
  },
];

export default function GeneradorTokens() {
  const [escenarioActual, setEscenarioActual] = useState<Escenario>(ESCENARIOS[0]);
  const [pasoIndex, setPasoIndex] = useState(0); // 0 = solo prompt
  const [reproduciendo, setReproduciendo] = useState(false);
  const [velocidad, setVelocidad] = useState<'lenta' | 'normal' | 'rapida'>('normal');
  const timerRef = useRef<number | null>(null);

  const delayMs = velocidad === 'lenta' ? 2200 : velocidad === 'normal' ? 1400 : 700;
  const totalPasos = escenarioActual.pasos.length;
  const haTerminado = pasoIndex >= totalPasos;

  // Paso actual que se está evaluando para añadir
  const pasoActual = !haTerminado ? escenarioActual.pasos[pasoIndex] : null;

  // Texto acumulado
  const tokensGenerados = escenarioActual.pasos.slice(0, pasoIndex).map((p) => p.seleccionado);

  const avanzarUnPaso = () => {
    if (pasoIndex < totalPasos) {
      setPasoIndex((prev) => prev + 1);
    } else {
      setReproduciendo(false);
    }
  };

  const pausar = () => {
    setReproduciendo(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reproducir = () => {
    if (haTerminado) {
      setPasoIndex(0);
    }
    setReproduciendo(true);
  };

  const reiniciar = () => {
    pausar();
    setPasoIndex(0);
  };

  // Temporizador para reproducción automática
  useEffect(() => {
    if (reproduciendo) {
      if (pasoIndex >= totalPasos) {
        setReproduciendo(false);
        return;
      }
      timerRef.current = window.setTimeout(() => {
        setPasoIndex((prev) => prev + 1);
      }, delayMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reproduciendo, pasoIndex, delayMs, totalPasos]);

  const cambiarEscenario = (esc: Escenario) => {
    pausar();
    setEscenarioActual(esc);
    setPasoIndex(0);
  };

  return (
    <div className="generator-widget" role="region" aria-label="Animación: Generación token a token">
      <div className="widget-header">
        <div className="header-meta">
          <span className="badge-illustrative" title="Simulación con fines didácticos">
            Animación · Ilustrativo
          </span>
          <h3 className="widget-title">¿Cómo genera texto un modelo de lenguaje?</h3>
          <p className="widget-subtitle">
            El modelo nunca piensa una frase entera: en cada turno calcula probabilidades matemáticas para decidir la siguiente pieza.
          </p>
        </div>

        <button type="button" onClick={reiniciar} className="btn-reset" title="Reiniciar al inicio">
          ↺ Reiniciar
        </button>
      </div>

      <div className="scenario-selector">
        <span className="scenario-label">Selecciona un ejemplo:</span>
        <div className="scenario-buttons">
          {ESCENARIOS.map((esc) => (
            <button
              key={esc.id}
              type="button"
              className={`scenario-btn ${escenarioActual.id === esc.id ? 'is-active' : ''}`}
              onClick={() => cambiarEscenario(esc)}
            >
              {esc.titulo}
            </button>
          ))}
        </div>
      </div>

      {/* Controles de reproducción requeridos */}
      <div className="controls-bar">
        <div className="playback-group">
          {reproduciendo ? (
            <button type="button" onClick={pausar} className="btn-control btn-pause">
              ⏸ Pausar
            </button>
          ) : (
            <button type="button" onClick={reproducir} className="btn-control btn-play">
              {haTerminado ? '↺ Repetir animación' : '▶ Reproducir'}
            </button>
          )}

          <button
            type="button"
            onClick={avanzarUnPaso}
            disabled={haTerminado || reproduciendo}
            className="btn-control btn-step"
            title="Avanzar un solo token de forma manual"
          >
            ⏭ Paso a paso
          </button>
        </div>

        <div className="speed-group">
          <span className="speed-label">Velocidad:</span>
          {(['lenta', 'normal', 'rapida'] as const).map((v) => (
            <button
              key={v}
              type="button"
              className={`speed-btn ${velocidad === v ? 'is-active' : ''}`}
              onClick={() => setVelocidad(v)}
            >
              {v === 'lenta' ? 'Lenta' : v === 'normal' ? 'Normal' : 'Rápida'}
            </button>
          ))}
        </div>
      </div>

      <div className="stage-grid">
        {/* Panel izquierdo: Contexto y generación */}
        <div className="context-card">
          <div className="card-top">
            <span className="card-badge">Texto generado hasta el momento:</span>
            <span className="token-counter">
              Token {pasoIndex} de {totalPasos}
            </span>
          </div>

          <div className="context-stream" aria-live="polite">
            <span className="prompt-text">{escenarioActual.promptInicial}</span>
            {tokensGenerados.map((tok, i) => (
              <span
                key={i}
                className={`generated-token ${i === pasoIndex - 1 ? 'is-latest' : ''}`}
              >
                {tok}
              </span>
            ))}
            {!haTerminado && <span className="cursor-blink" aria-hidden="true">▎</span>}
          </div>

          {haTerminado && (
            <div className="completion-badge">
              ✓ Secuencia completada. El modelo ha llegado al token de parada (punto final).
            </div>
          )}
        </div>

        {/* Panel derecho: Candidatos de probabilidad */}
        <div className="candidates-card">
          <div className="card-top">
            <span className="card-badge">
              {haTerminado ? 'Último cálculo realizado' : 'Candidatos para el siguiente token:'}
            </span>
          </div>

          {pasoActual ? (
            <div className="candidates-list" aria-live="polite">
              {pasoActual.candidatos.map((cand, idx) => {
                const isSelected = cand.token === pasoActual.seleccionado;
                return (
                  <div
                    key={idx}
                    className={`candidate-row ${isSelected ? 'is-winner' : ''}`}
                  >
                    <div className="candidate-info">
                      <span className="candidate-token">
                        <code>"{cand.token}"</code>
                        {isSelected && <span className="winner-tag">Seleccionado</span>}
                      </span>
                      <span className="candidate-prob">{cand.prob}%</span>
                    </div>

                    <div className="prob-bar-track">
                      <div
                        className="prob-bar-fill"
                        style={{
                          width: `${cand.prob}%`,
                          backgroundColor: isSelected ? 'var(--musgo)' : 'var(--tinta-secundaria)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {pasoActual.explicacion && (
                <div className="candidate-explanation">
                  <span className="expl-lead" aria-hidden="true">💡</span>
                  <span>{pasoActual.explicacion}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="candidates-finished">
              <p>El modelo no tiene más tokens pendientes de generar en este ejemplo.</p>
              <button type="button" onClick={reiniciar} className="btn-secondary">
                Ver de nuevo desde el inicio
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="widget-takeaway">
        <strong>Conclusión de campo:</strong> La máquina no "sabe" lo que es la fotosíntesis; simplemente calcula qué token tiene mayor afinidad estadística con todo el texto anterior.
      </div>

      <style>{`
        .generator-widget {
          margin: 2.25rem 0;
          padding: 1.5rem;
          border-radius: 0.85rem;
          background-color: var(--superficie);
          border: 1px solid var(--musgo-borde);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          border-bottom: 1px solid var(--linea);
          padding-bottom: 0.85rem;
          margin-bottom: 1rem;
        }

        .badge-illustrative {
          display: inline-block;
          font-size: 0.75rem;
          font-family: var(--sl-font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ocre);
          background-color: var(--ocre-suave);
          border: 1px solid var(--ocre-borde);
          padding: 0.15rem 0.45rem;
          border-radius: 999px;
          font-weight: 700;
          margin-bottom: 0.35rem;
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

        .btn-reset {
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

        .btn-reset:hover {
          background-color: var(--musgo-suave);
          border-color: var(--musgo);
          color: var(--musgo);
        }

        .scenario-selector {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.15rem;
        }

        .scenario-label {
          font-size: 0.825rem;
          color: var(--tinta-secundaria);
          font-weight: 600;
        }

        .scenario-buttons {
          display: flex;
          gap: 0.4rem;
        }

        .scenario-btn {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          color: var(--tinta);
          padding: 0.25rem 0.6rem;
          border-radius: 0.35rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .scenario-btn.is-active {
          border-color: var(--musgo);
          background-color: var(--musgo-suave);
          color: var(--musgo);
          font-weight: 600;
        }

        .controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.5rem;
          padding: 0.65rem 1rem;
          margin-bottom: 1.25rem;
        }

        .playback-group {
          display: flex;
          gap: 0.5rem;
        }

        .btn-control {
          font-family: var(--sl-font-mono);
          font-size: 0.825rem;
          padding: 0.35rem 0.85rem;
          border-radius: 0.35rem;
          cursor: pointer;
          font-weight: 600;
          border: 1px solid transparent;
          transition: background 0.15s ease;
        }

        .btn-play {
          background-color: var(--musgo);
          color: #FFFFFF;
        }

        .btn-play:hover {
          filter: brightness(1.1);
        }

        .btn-pause {
          background-color: var(--terracota);
          color: #FFFFFF;
        }

        .btn-step {
          background-color: var(--superficie);
          border-color: var(--linea-fuerte);
          color: var(--tinta);
        }

        .btn-step:hover:not(:disabled) {
          border-color: var(--musgo);
          color: var(--musgo);
        }

        .btn-step:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .speed-group {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .speed-label {
          font-size: 0.8rem;
          color: var(--tinta-secundaria);
          margin-right: 0.25rem;
        }

        .speed-btn {
          background: none;
          border: 1px solid var(--linea);
          color: var(--tinta);
          font-size: 0.75rem;
          padding: 0.2rem 0.45rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .speed-btn.is-active {
          background-color: var(--musgo-suave);
          border-color: var(--musgo);
          color: var(--musgo);
          font-weight: 600;
        }

        .stage-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .stage-grid {
            grid-template-columns: 1fr;
          }
        }

        .context-card,
        .candidates-card {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.65rem;
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px dashed var(--linea);
          padding-bottom: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .card-badge {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--tinta);
          font-family: var(--font-serif);
        }

        .token-counter {
          font-size: 0.75rem;
          font-family: var(--sl-font-mono);
          color: var(--musgo);
        }

        .context-stream {
          font-family: var(--sl-font);
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--tinta);
          min-height: 120px;
        }

        .prompt-text {
          color: var(--tinta-secundaria);
          background-color: var(--superficie);
          padding: 0.1rem 0.35rem;
          border-radius: 0.25rem;
          margin-right: 0.25rem;
        }

        .generated-token {
          display: inline-block;
          background-color: var(--musgo-suave);
          border-bottom: 2px solid var(--musgo);
          padding: 0 0.15rem;
          border-radius: 0.2rem;
          margin: 0 0.1rem;
          animation: popIn 0.25s ease-out;
        }

        .generated-token.is-latest {
          outline: 2px solid var(--terracota);
          background-color: var(--terracota-suave);
          border-bottom-color: var(--terracota);
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .generated-token {
            animation: none;
          }
        }

        .cursor-blink {
          color: var(--musgo);
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cursor-blink {
            animation: none;
          }
        }

        .completion-badge {
          margin-top: 1rem;
          font-size: 0.85rem;
          color: var(--musgo);
          background-color: var(--musgo-suave);
          padding: 0.5rem 0.75rem;
          border-radius: 0.35rem;
          border: 1px solid var(--musgo-borde);
        }

        .candidates-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .candidate-row {
          background-color: var(--superficie);
          border: 1px solid var(--linea);
          border-radius: 0.45rem;
          padding: 0.5rem 0.75rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .candidate-row.is-winner {
          border-color: var(--musgo);
          background-color: var(--musgo-suave);
        }

        .candidate-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
          font-size: 0.85rem;
        }

        .candidate-token {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .candidate-token code {
          font-family: var(--sl-font-mono);
          font-size: 0.9rem;
          color: var(--tinta);
        }

        .winner-tag {
          font-size: 0.7rem;
          font-family: var(--sl-font-mono);
          color: var(--musgo);
          background-color: rgba(127, 176, 143, 0.2);
          border: 1px solid var(--musgo);
          padding: 0.05rem 0.35rem;
          border-radius: 999px;
          text-transform: uppercase;
        }

        .candidate-prob {
          font-family: var(--sl-font-mono);
          font-weight: 700;
          color: var(--tinta);
        }

        .candidate-row.is-winner .candidate-prob {
          color: var(--musgo);
        }

        .prob-bar-track {
          width: 100%;
          height: 6px;
          background-color: var(--linea);
          border-radius: 999px;
          overflow: hidden;
        }

        .prob-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .prob-bar-fill {
            transition: none;
          }
        }

        .candidate-explanation {
          margin-top: 0.65rem;
          font-size: 0.825rem;
          color: var(--tinta-secundaria);
          background-color: var(--superficie);
          border-radius: 0.35rem;
          padding: 0.5rem 0.65rem;
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          line-height: 1.45;
        }

        .expl-lead {
          flex-shrink: 0;
        }

        .candidates-finished {
          padding: 1.5rem 0.5rem;
          text-align: center;
          color: var(--tinta-secundaria);
          font-size: 0.9rem;
        }

        .btn-secondary {
          margin-top: 0.75rem;
          background-color: var(--musgo-suave);
          border: 1px solid var(--musgo);
          color: var(--musgo);
          padding: 0.35rem 0.85rem;
          border-radius: 0.35rem;
          cursor: pointer;
          font-size: 0.825rem;
          font-family: var(--sl-font-mono);
        }

        .widget-takeaway {
          margin-top: 0.5rem;
          padding: 0.75rem 1rem;
          background-color: var(--musgo-suave);
          border-left: 3px solid var(--musgo);
          border-radius: 0.35rem;
          font-size: 0.9rem;
          color: var(--tinta);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
