import React, { useState, useEffect } from 'react';

interface Stage {
  id: string;
  name: string;
  biologyMetaphor: string;
  aiConcept: string;
  icon: string;
  color: string;
  accentBg: string;
  lessonNumber: string;
  lessonTitle: string;
  lessonUrl: string;
  description: string;
  analogyBoundary: string;
  macTool: string;
}

const STAGES: Stage[] = [
  {
    id: 'token',
    name: '1. El Token',
    biologyMetaphor: 'La Base Nitrogenada (ADN)',
    aiConcept: 'Unidad atómica de cómputo',
    icon: '🌿',
    color: '#7FB08F', // musgo
    accentBg: 'rgba(127, 176, 143, 0.12)',
    lessonNumber: '01',
    lessonTitle: '¿Qué es un LLM y qué son los tokens?',
    lessonUrl: '/curso-ia/lecciones/01-que-es-un-llm/',
    description:
      'Igual que toda la diversidad biológica de la Tierra se codifica combinando cuatro bases nitrogenadas (A, T, C, G), los grandes modelos de lenguaje descomponen cualquier texto en pequeños trozos numéricos llamados tokens. El modelo no ve ideas ni letras sueltas: procesa una secuencia numérica.',
    analogyBoundary:
      'Límite de la analogía: A diferencia del código genético, donde un triplete (codón) siempre traduce a un aminoácido concreto, en un LLM el tamaño del token varía y un mismo concepto puede fragmentarse en tokens distintos según el idioma o contexto.',
    macTool: 'Tokenizador interactivo y Ollama en terminal',
  },
  {
    id: 'embeddings',
    name: '2. Los Embeddings',
    biologyMetaphor: 'La Taxonomía Filogenética',
    aiConcept: 'El mapa del significado latente',
    icon: '🗺️',
    color: '#7DB0CF', // agua
    accentBg: 'rgba(125, 176, 207, 0.12)',
    lessonNumber: '02',
    lessonTitle: 'Embeddings: el mapa del significado',
    lessonUrl: '/curso-ia/lecciones/02-embeddings/',
    description:
      'En botánica, agrupamos especies según sus rasgos compartidos en un árbol filogenético. En inteligencia artificial, cada concepto se convierte en una lista de cientos de coordenadas numéricas (un vector). Las palabras con significado afín ("haya", "roble", "bosque") terminan situadas físicamente muy cerca en un mapa multidimensional.',
    analogyBoundary:
      'Límite de la analogía: La evolución biológica es estrictamente jerárquica y unidireccional en el tiempo; el espacio de embeddings es hiperdimensional y las distancias se miden con geometría espacial (similitud de coseno).',
    macTool: 'Buscador semántico y visualizador de vectores 2D',
  },
  {
    id: 'transformers',
    name: '3. La Atención',
    biologyMetaphor: 'Redes de Micorrizas en el Bosque',
    aiConcept: 'Mecanismo de atención selectiva',
    icon: '⚡',
    color: '#E3B965', // ocre
    accentBg: 'rgba(227, 185, 101, 0.12)',
    lessonNumber: '03',
    lessonTitle: 'Transformers y atención, sin miedo',
    lessonUrl: '/curso-ia/lecciones/03-transformers-atencion/',
    description:
      'Como las redes subterráneas de hongos que conectan árboles distantes para enviar nutrientes a los ejemplares que lo necesitan, el mecanismo de atención del Transformer evalúa qué palabras anteriores son cruciales para interpretar la palabra presente, sin importar cuántos párrafos las separen.',
    analogyBoundary:
      'Límite de la analogía: Las micorrizas obedecen a gradientes químicos reales y recursos finitos; en el modelo es una multiplicación matricial simultánea sobre toda la ventana de contexto.',
    macTool: 'Simulador de temperatura y mapa de atención multicabezal',
  },
  {
    id: 'agentes',
    name: '4. El Agente',
    biologyMetaphor: 'El Organismo en su Hábitat',
    aiConcept: 'Bucle Percepción → Razonamiento → Acción',
    icon: '🦾',
    color: '#E08A62', // terracota
    accentBg: 'rgba(224, 138, 98, 0.12)',
    lessonNumber: '10',
    lessonTitle: 'Anatomía de un agente',
    lessonUrl: '/curso-ia/lecciones/09-anatomia-de-un-agente/',
    description:
      'Un modelo aislado es solo una caja de resonancia predictiva. Al dotarlo de herramientas (lectura de archivos, ejecución de comandos en Mac, protocolo MCP), se convierte en un organismo interactivo: percibe una meta, razona un plan, actúa sobre tu entorno y aprende del resultado, con supervisión humana infalible.',
    analogyBoundary:
      'Límite de la analogía: Un ser vivo tiene instinto de supervivencia y homeostasis biológica propia; un agente de software no tiene conciencia ni iniciativa espontánea: solo ejecuta el bucle de instrucciones que tú le confías.',
    macTool: 'Servidores MCP locales, OpenCode y supervisor de permisos',
  },
];

export default function HeroAnimado() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeStage = STAGES[activeIndex];

  // Temporizador para auto-avance en modo reproducción
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const intervalTime = 60; // ms
    const totalDuration = 6000; // 6s por etapa
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % STAGES.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  const handleSelectStage = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? STAGES.length - 1 : current - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % STAGES.length);
    setProgress(0);
  };

  return (
    <div className="hero-animado-card">
      <div className="hero-animado-header">
        <div className="header-badge">
          <span className="badge-dot" style={{ backgroundColor: activeStage.color }} />
          <span>Ecosistema interactivo de la IA</span>
        </div>
        <div className="controls-group">
          <button
            type="button"
            className="control-btn"
            onClick={handlePrev}
            title="Etapa anterior"
            aria-label="Etapa anterior"
          >
            ←
          </button>
          <button
            type="button"
            className={`control-btn play-btn ${isPlaying ? 'is-playing' : ''}`}
            onClick={togglePlay}
            title={isPlaying ? 'Pausar recorrido' : 'Reproducir recorrido'}
            aria-label={isPlaying ? 'Pausar recorrido' : 'Reproducir recorrido'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            type="button"
            className="control-btn"
            onClick={handleNext}
            title="Etapa siguiente"
            aria-label="Etapa siguiente"
          >
            →
          </button>
        </div>
      </div>

      {/* Barra de progreso de la etapa activa */}
      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-bar"
          style={{
            width: isPlaying ? `${progress}%` : '100%',
            backgroundColor: activeStage.color,
          }}
        />
      </div>

      {/* Mapa interactivo de los 4 nodos biológicos/tecnológicos */}
      <div className="nodes-nav" role="tablist" aria-label="Etapas del ecosistema de la IA">
        {STAGES.map((stage, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-controls={`panel-${stage.id}`}
              id={`tab-${stage.id}`}
              className={`node-pill ${isCurrent ? 'is-active' : ''}`}
              style={
                isCurrent
                  ? {
                      borderColor: stage.color,
                      backgroundColor: stage.accentBg,
                      boxShadow: `0 0 16px ${stage.color}22`,
                    }
                  : undefined
              }
              onClick={() => handleSelectStage(idx)}
            >
              <span className="pill-icon">{stage.icon}</span>
              <span className="pill-info">
                <span className="pill-name">{stage.name}</span>
                <span className="pill-metaphor">{stage.biologyMetaphor}</span>
              </span>
              {isCurrent && <span className="pill-indicator" style={{ backgroundColor: stage.color }} />}
            </button>
          );
        })}
      </div>

      {/* Lienzo visual SVG interactivo */}
      <div className="visual-canvas" aria-hidden="true">
        <svg viewBox="0 0 800 130" className="canvas-svg">
          <defs>
            <linearGradient id="conn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7FB08F" />
              <stop offset="33%" stopColor="#7DB0CF" />
              <stop offset="66%" stopColor="#E3B965" />
              <stop offset="100%" stopColor="#E08A62" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Línea troncal conectora */}
          <path
            d="M 100 65 Q 250 35 300 65 T 500 65 T 700 65"
            fill="none"
            stroke="var(--linea-fuerte)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M 100 65 Q 250 35 300 65 T 500 65 T 700 65"
            fill="none"
            stroke="url(#conn-gradient)"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* 4 Nodos con pulso */}
          {[
            { cx: 100, cy: 65, color: '#7FB08F', label: 'ADN / Token' },
            { cx: 300, cy: 65, color: '#7DB0CF', label: 'Ecosistema / Embeddings' },
            { cx: 500, cy: 65, color: '#E3B965', label: 'Micorriza / Atención' },
            { cx: 700, cy: 65, color: '#E08A62', label: 'Organismo / Agente' },
          ].map((node, i) => {
            const isSelected = i === activeIndex;
            return (
              <g
                key={node.label}
                className={`svg-node-group ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelectStage(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Halo pulsante si está activo */}
                {isSelected && (
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="24"
                    fill={node.color}
                    opacity="0.2"
                    className="pulse-halo"
                  />
                )}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isSelected ? '14' : '9'}
                  fill="var(--superficie)"
                  stroke={node.color}
                  strokeWidth={isSelected ? '3.5' : '2'}
                  filter={isSelected ? 'url(#glow)' : undefined}
                />
                <circle cx={node.cx} cy={node.cy} r={isSelected ? '6' : '3.5'} fill={node.color} />
                <text
                  x={node.cx}
                  y="105"
                  textAnchor="middle"
                  fill={isSelected ? 'var(--tinta)' : 'var(--tinta-secundaria)'}
                  fontSize={isSelected ? '12' : '11'}
                  fontWeight={isSelected ? '600' : '400'}
                  fontFamily="var(--sl-font)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Ficha explicativa detallada de la etapa seleccionada */}
      <div
        className="stage-detail-panel"
        id={`panel-${activeStage.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeStage.id}`}
      >
        <div className="stage-top-meta">
          <div className="meta-identity">
            <span className="stage-num" style={{ color: activeStage.color }}>
              Fase {activeStage.name}
            </span>
            <h3 className="stage-heading">{activeStage.biologyMetaphor}</h3>
          </div>
          <div className="meta-tag" style={{ borderColor: `${activeStage.color}44`, color: activeStage.color }}>
            {activeStage.aiConcept}
          </div>
        </div>

        <p className="stage-description">{activeStage.description}</p>

        <div className="stage-boundary-box">
          <span className="boundary-icon">🔬</span>
          <p className="boundary-text">
            <strong>Frontera honesta:</strong> {activeStage.analogyBoundary}
          </p>
        </div>

        <div className="stage-action-footer">
          <div className="mac-tool-tag">
            <span className="mac-icon">🍎</span>
            <span>Práctica en tu Mac: {activeStage.macTool}</span>
          </div>

          <a href={activeStage.lessonUrl} className="jump-lesson-btn" style={{ backgroundColor: activeStage.color }}>
            <span>Explorar Lección {activeStage.lessonNumber}</span>
            <span className="arrow-right">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
