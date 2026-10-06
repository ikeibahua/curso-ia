import React, { useState, useMemo } from 'react';

interface PuntoWord {
  palabra: string;
  categoria: 'botanica' | 'fauna' | 'sociedad' | 'tecnologia';
  x: number; // 0 a 100
  y: number; // 0 a 100
  descripcion: string;
}

const PUNTOS: PuntoWord[] = [
  // Botánica y ecología vegetal
  { palabra: 'roble', categoria: 'botanica', x: 22, y: 78, descripcion: 'Árbol caducifolio de gran porte (Quercus robur).' },
  { palabra: 'encina', categoria: 'botanica', x: 25, y: 74, descripcion: 'Árbol perennifolio mediterráneo del mismo género.' },
  { palabra: 'haya', categoria: 'botanica', x: 18, y: 82, descripcion: 'Árbol de corteza grisácea y densa masa foliar.' },
  { palabra: 'árbol', categoria: 'botanica', x: 28, y: 68, descripcion: 'Planta leñosa con tronco y copa.' },
  { palabra: 'bosque', categoria: 'botanica', x: 35, y: 64, descripcion: 'Ecosistema dominado por vegetación leñosa.' },
  { palabra: 'hoja', categoria: 'botanica', x: 15, y: 65, descripcion: 'Órgano vegetal fotosintético.' },
  { palabra: 'fotosíntesis', categoria: 'botanica', x: 12, y: 88, descripcion: 'Mecanismo biológico de conversión lumínica.' },
  { palabra: 'clorofila', categoria: 'botanica', x: 16, y: 92, descripcion: 'Pigmento fotorreceptor verde.' },

  // Fauna
  { palabra: 'lobo', categoria: 'fauna', x: 72, y: 76, descripcion: 'Cánido depredador gregario.' },
  { palabra: 'zorro', categoria: 'fauna', x: 68, y: 70, descripcion: 'Cánido oportunista de tamaño mediano.' },
  { palabra: 'ciervo', categoria: 'fauna', x: 65, y: 82, descripcion: 'Herbívoro rumiante de bosque.' },
  { palabra: 'pájaro', categoria: 'fauna', x: 55, y: 68, descripcion: 'Vertebrado bípedo y alado.' },
  { palabra: 'águila', categoria: 'fauna', x: 58, y: 60, descripcion: 'Rapaz de vuelo ágil y aguda visión.' },
  { palabra: 'animal', categoria: 'fauna', x: 62, y: 86, descripcion: 'Ser vivo heterótrofo pluricelular.' },

  // Sociedad y roles clásicos (analogía de género/título)
  { palabra: 'rey', categoria: 'sociedad', x: 78, y: 32, descripcion: 'Monarca soberano masculino.' },
  { palabra: 'reina', categoria: 'sociedad', x: 82, y: 20, descripcion: 'Monarca soberana femenina.' },
  { palabra: 'hombre', categoria: 'sociedad', x: 62, y: 32, descripcion: 'Individuo humano adulto masculino.' },
  { palabra: 'mujer', categoria: 'sociedad', x: 66, y: 20, descripcion: 'Individuo humano adulto femenino.' },
  { palabra: 'príncipe', categoria: 'sociedad', x: 85, y: 36, descripcion: 'Heredero nobiliario masculino.' },
  { palabra: 'princesa', categoria: 'sociedad', x: 89, y: 24, descripcion: 'Heredera nobiliaria femenina.' },

  // Tecnología
  { palabra: 'ordenador', categoria: 'tecnologia', x: 20, y: 22, descripcion: 'Dispositivo electrónico digital.' },
  { palabra: 'pantalla', categoria: 'tecnologia', x: 14, y: 26, descripcion: 'Superficie de visualización de datos.' },
  { palabra: 'teclado', categoria: 'tecnologia', x: 26, y: 24, descripcion: 'Periférico de entrada alfanumérico.' },
  { palabra: 'código', categoria: 'tecnologia', x: 30, y: 15, descripcion: 'Conjunto de instrucciones legibles por máquina.' },
  { palabra: 'algoritmo', categoria: 'tecnologia', x: 36, y: 18, descripcion: 'Secuencia lógica y finita de operaciones.' },
  { palabra: 'programa', categoria: 'tecnologia', x: 27, y: 18, descripcion: 'Software ejecutable para resolver una tarea.' },
];

const CATEGORIAS = {
  botanica: { label: 'Botánica y bosque', color: '#7FB08F', bg: 'rgba(127, 176, 143, 0.2)' },
  fauna: { label: 'Fauna', color: '#E3B965', bg: 'rgba(227, 185, 101, 0.2)' },
  sociedad: { label: 'Sociedad y roles', color: '#E08A62', bg: 'rgba(224, 138, 98, 0.2)' },
  tecnologia: { label: 'Tecnología', color: '#7DB0CF', bg: 'rgba(125, 176, 207, 0.2)' },
};

function calcularDistancia(p1: PuntoWord, p2: PuntoWord): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export default function MapaEmbeddings() {
  const [seleccionada, setSeleccionada] = useState<PuntoWord>(PUNTOS[0]); // 'roble'
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');
  const [operacionActiva, setOperacionActiva] = useState<string | null>(null);

  // Vecinos más cercanos
  const vecinos = useMemo(() => {
    return PUNTOS.filter((p) => p.palabra !== seleccionada.palabra)
      .map((p) => {
        const dist = calcularDistancia(seleccionada, p);
        // Similitud normalizada de 0 a 100%
        const similitud = Math.max(0, Math.round(100 - dist * 1.1));
        return { punto: p, dist, similitud };
      })
      .sort((a, b) => b.similitud - a.similitud);
  }, [seleccionada]);

  const puntosVisibles = useMemo(() => {
    if (categoriaFiltro === 'todas') return PUNTOS;
    return PUNTOS.filter((p) => p.categoria === categoriaFiltro);
  }, [categoriaFiltro]);

  const aplicarOperacion = (tipo: 'rey-reina') => {
    setOperacionActiva(tipo);
    const reina = PUNTOS.find((p) => p.palabra === 'reina');
    if (reina) setSeleccionada(reina);
  };

  const limpiarOperacion = () => {
    setOperacionActiva(null);
  };

  return (
    <div className="embeddings-widget" role="region" aria-label="Mapa interactivo de embeddings">
      <div className="widget-header">
        <div className="header-meta">
          <span className="instrument-badge" aria-hidden="true">🗺️ Mapa de coordenadas de significado</span>
          <h3 className="widget-title">El plano 2D de embeddings</h3>
          <p className="widget-subtitle">
            Haz clic en cualquier palabra para ver cómo las ideas afines se agrupan en islas de significado y observa sus vecinos más próximos.
          </p>
        </div>
      </div>

      <div className="toolbar">
        <div className="filter-group">
          <span className="filter-label">Filtrar por grupo:</span>
          <button
            type="button"
            className={`filter-btn ${categoriaFiltro === 'todas' ? 'is-active' : ''}`}
            onClick={() => setCategoriaFiltro('todas')}
          >
            Todos los reinos
          </button>
          {Object.entries(CATEGORIAS).map(([key, cat]) => (
            <button
              key={key}
              type="button"
              className={`filter-btn ${categoriaFiltro === key ? 'is-active' : ''}`}
              style={{
                borderColor: categoriaFiltro === key ? cat.color : undefined,
                color: categoriaFiltro === key ? cat.color : undefined,
              }}
              onClick={() => setCategoriaFiltro(key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="algebra-group">
          <span className="filter-label">Álgebra de vectores:</span>
          <button
            type="button"
            className={`algebra-btn ${operacionActiva === 'rey-reina' ? 'is-active' : ''}`}
            onClick={() => aplicarOperacion('rey-reina')}
            title="Calcular rey - hombre + mujer"
          >
            Rey − Hombre + Mujer ≈ Reina
          </button>
          {operacionActiva && (
            <button type="button" onClick={limpiarOperacion} className="clear-algebra-btn">
              Restablecer
            </button>
          )}
        </div>
      </div>

      <div className="map-and-details-grid">
        {/* Espacio gráfico 2D */}
        <div className="canvas-wrapper">
          <svg viewBox="0 0 100 100" className="map-svg" aria-label="Plano de coordenadas bidimensional">
            {/* Cuadrícula sutil de referencia */}
            <line x1="0" y1="50" x2="100" y2="50" stroke="var(--linea)" strokeWidth="0.4" strokeDasharray="1,1" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="var(--linea)" strokeWidth="0.4" strokeDasharray="1,1" />

            {/* Vectores de la operación Rey - Hombre + Mujer */}
            {operacionActiva === 'rey-reina' && (
              <g className="algebra-vectors" aria-hidden="true">
                {/* Flecha de Hombre a Mujer */}
                <line x1="62" y1="32" x2="66" y2="20" stroke="var(--ocre)" strokeWidth="1.2" strokeDasharray="1,1" />
                {/* Flecha proyectada desde Rey a Reina */}
                <line x1="78" y1="32" x2="82" y2="20" stroke="var(--musgo)" strokeWidth="1.6" />
                <circle cx="82" cy="20" r="3.5" fill="none" stroke="var(--musgo)" strokeWidth="0.8" />
              </g>
            )}

            {/* Puntos y etiquetas */}
            {puntosVisibles.map((p) => {
              const isSelected = p.palabra === seleccionada.palabra;
              const cat = CATEGORIAS[p.categoria];

              return (
                <g
                  key={p.palabra}
                  className={`map-node ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSeleccionada(p)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Palabra ${p.palabra}, categoría ${cat.label}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSeleccionada(p);
                    }
                  }}
                >
                  <circle
                    cx={p.x}
                    cy={100 - p.y} // Invertir eje Y para convención matemática
                    r={isSelected ? 4 : 2.5}
                    fill={cat.color}
                    stroke={isSelected ? '#FFFFFF' : 'none'}
                    strokeWidth={isSelected ? 1 : 0}
                  />
                  <text
                    x={p.x + (p.x > 80 ? -2 : 3.5)}
                    y={100 - p.y + 1.2}
                    textAnchor={p.x > 80 ? 'end' : 'start'}
                    className="node-label"
                    fill="var(--tinta)"
                  >
                    {p.palabra}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Panel lateral de ficha y vecinos */}
        <div className="neighbors-panel">
          <div className="current-specimen">
            <span className="specimen-tag" style={{ color: CATEGORIAS[seleccionada.categoria].color }}>
              Espécimen enfocado:
            </span>
            <h4 className="specimen-word">{seleccionada.palabra}</h4>
            <p className="specimen-desc">{seleccionada.descripcion}</p>
            <div className="specimen-coords">
              Coordenadas 2D aproximadas: <code>[{seleccionada.x}, {seleccionada.y}]</code>
            </div>
          </div>

          <div className="neighbors-list-box">
            <h5 className="neighbors-title">Vecinos más próximos en el espacio:</h5>
            <div className="neighbors-scroll">
              {vecinos.slice(0, 4).map(({ punto, similitud }) => (
                <div
                  key={punto.palabra}
                  className="neighbor-row"
                  onClick={() => setSeleccionada(punto)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="neighbor-info">
                    <span className="neighbor-dot" style={{ backgroundColor: CATEGORIAS[punto.categoria].color }} />
                    <span className="neighbor-name">{punto.palabra}</span>
                    <span className="neighbor-cat">({punto.categoria})</span>
                  </div>
                  <span className="neighbor-sim">{similitud}% similitud</span>
                </div>
              ))}
            </div>

            <h5 className="neighbors-title neighbors-distant-title">El más lejano (menor afinidad):</h5>
            {vecinos.length > 0 && (
              <div className="neighbor-row is-distant" onClick={() => setSeleccionada(vecinos[vecinos.length - 1].punto)}>
                <div className="neighbor-info">
                  <span className="neighbor-dot" style={{ backgroundColor: CATEGORIAS[vecinos[vecinos.length - 1].punto.categoria].color }} />
                  <span className="neighbor-name">{vecinos[vecinos.length - 1].punto.palabra}</span>
                </div>
                <span className="neighbor-sim">{vecinos[vecinos.length - 1].similitud}% similitud</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="widget-insight">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <span>
          En un modelo real, las coordenadas no son sólo dos (X e Y), sino entre <strong>1.536 y 4.096 dimensiones</strong>. Cada dimensión captura una propiedad sutil: si es vivo o inanimado, género gramatical, tamaño, temperatura o contexto de hábitat.
        </span>
      </div>

      <style>{`
        .embeddings-widget {
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
          margin-bottom: 1rem;
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

        .toolbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.5rem;
          padding: 0.65rem 1rem;
        }

        .filter-group,
        .algebra-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.45rem;
        }

        .filter-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--tinta-secundaria);
          margin-right: 0.25rem;
        }

        .filter-btn,
        .algebra-btn {
          background-color: var(--superficie);
          border: 1px solid var(--linea);
          color: var(--tinta);
          padding: 0.25rem 0.6rem;
          border-radius: 0.35rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .filter-btn:hover,
        .algebra-btn:hover {
          border-color: var(--musgo);
          color: var(--musgo);
        }

        .filter-btn.is-active,
        .algebra-btn.is-active {
          background-color: var(--musgo-suave);
          border-color: var(--musgo);
          font-weight: 600;
        }

        .clear-algebra-btn {
          background: none;
          border: none;
          color: var(--terracota);
          font-size: 0.775rem;
          cursor: pointer;
          text-decoration: underline;
        }

        .map-and-details-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .map-and-details-grid {
            grid-template-columns: 1fr;
          }
        }

        .canvas-wrapper {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.65rem;
          padding: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-svg {
          width: 100%;
          height: auto;
          max-height: 380px;
          user-select: none;
        }

        .map-node {
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .map-node:hover circle {
          filter: drop-shadow(0 0 3px rgba(127, 176, 143, 0.8));
        }

        .map-node.is-selected circle {
          filter: drop-shadow(0 0 4px var(--musgo));
        }

        .node-label {
          font-size: 2.8px;
          font-family: var(--sl-font);
          pointer-events: none;
          opacity: 0.85;
          font-weight: 500;
        }

        .map-node.is-selected .node-label {
          font-weight: 700;
          opacity: 1;
          fill: var(--musgo);
        }

        .neighbors-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .current-specimen {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .specimen-tag {
          font-size: 0.725rem;
          font-family: var(--sl-font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        .specimen-word {
          margin: 0.25rem 0 0.35rem 0;
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--tinta);
        }

        .specimen-desc {
          margin: 0 0 0.65rem 0;
          font-size: 0.875rem;
          color: var(--tinta);
          line-height: 1.45;
        }

        .specimen-coords {
          font-size: 0.775rem;
          color: var(--tinta-secundaria);
          font-family: var(--sl-font-mono);
        }

        .neighbors-list-box {
          background-color: var(--superficie-elevada);
          border: 1px solid var(--linea);
          border-radius: 0.5rem;
          padding: 1rem;
          flex-grow: 1;
        }

        .neighbors-title {
          margin: 0 0 0.65rem 0;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--tinta);
          font-family: var(--font-serif);
        }

        .neighbors-distant-title {
          margin-top: 1rem;
          color: var(--terracota);
        }

        .neighbors-scroll {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .neighbor-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 0.6rem;
          border-radius: 0.35rem;
          background-color: var(--superficie);
          border: 1px solid var(--linea);
          cursor: pointer;
          font-size: 0.825rem;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .neighbor-row:hover {
          border-color: var(--musgo);
          background-color: var(--musgo-suave);
        }

        .neighbor-row.is-distant {
          opacity: 0.85;
          border-style: dashed;
        }

        .neighbor-info {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .neighbor-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .neighbor-name {
          font-weight: 600;
          color: var(--tinta);
        }

        .neighbor-cat {
          color: var(--tinta-secundaria);
          font-size: 0.75rem;
        }

        .neighbor-sim {
          font-family: var(--sl-font-mono);
          font-weight: 600;
          color: var(--musgo);
        }

        .is-distant .neighbor-sim {
          color: var(--terracota);
        }

        .widget-insight {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--tinta);
          background-color: var(--musgo-suave);
          border-left: 3px solid var(--musgo);
          padding: 0.75rem 1rem;
          border-radius: 0.35rem;
          line-height: 1.45;
        }

        .widget-insight svg {
          flex-shrink: 0;
          color: var(--musgo);
        }
      `}</style>
    </div>
  );
}
