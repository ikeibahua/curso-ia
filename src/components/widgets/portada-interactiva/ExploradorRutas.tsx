import React, { useState } from 'react';

interface LearningPath {
  id: string;
  badge: string;
  title: string;
  icon: string;
  themeColor: string;
  themeBg: string;
  duration: string;
  difficulty: string;
  lessonsRange: string;
  startUrl: string;
  startLessonLabel: string;
  summary: string;
  keyConcepts: string[];
  featuredWidgets: string[];
  idealFor: string;
}

const PATHS: LearningPath[] = [
  {
    id: 'fundamentos',
    badge: 'Senda 1 · Los Fundamentos',
    title: 'El Naturalista Curioso',
    icon: '🌿',
    themeColor: '#7FB08F', // musgo
    themeBg: 'rgba(127, 176, 143, 0.12)',
    duration: '~2 horas',
    difficulty: 'Suave y reflexiva',
    lessonsRange: 'Lecciones 01 a 07',
    startUrl: '/curso-ia/lecciones/01-que-es-un-llm/',
    startLessonLabel: 'Empezar Lección 01',
    summary:
      'Comprende con total claridad cómo piensa un modelo de lenguaje, qué son los tokens, cómo se mapea el significado en espacios multidimensionales y qué significa ejecutar un modelo cuantizado en tu propio Mac.',
    keyConcepts: [
      'Tokenización y probabilidades predictivas',
      'Embeddings: el mapa taxonómico del significado',
      'Atención del Transformer y temperatura',
      'Pesos, parámetros (70B) y cuantización local',
    ],
    featuredWidgets: ['Tokenizador BPE en vivo', 'Simulador de temperatura', 'Simulador de cuantización'],
    idealFor: 'Quienes quieren entender la lógica interna sin necesidad de matemáticas complejas ni programar.',
  },
  {
    id: 'terminal',
    badge: 'Senda 2 · La Terminal',
    title: 'El Explorador del Mac',
    icon: '💻',
    themeColor: '#7DB0CF', // agua
    themeBg: 'rgba(125, 176, 207, 0.12)',
    duration: '~1 hora',
    difficulty: 'Práctica guiada paso a paso',
    lessonsRange: 'Lecciones 08 y 09',
    startUrl: '/curso-ia/lecciones/07-terminal-i/',
    startLessonLabel: 'Empezar Lección 08',
    summary:
      'Desmitifica la ventana negra de macOS. Aprende a moverte por tus carpetas, crear archivos, instalar herramientas seguras con Homebrew y proteger tus claves privadas de API con total tranquilidad.',
    keyConcepts: [
      'Rutas absolutas y relativas en macOS',
      'Comandos seguros de lectura y manipulación',
      'Gestor de paquetes Homebrew',
      'Variables de entorno y seguridad de credenciales',
    ],
    featuredWidgets: ['Terminal simulada con misiones', 'Explicador de comandos parte a parte', 'Animación del PATH'],
    idealFor: 'Quienes nunca han usado la terminal o quieren perderle el miedo con una red de seguridad infalible.',
  },
  {
    id: 'agentes',
    badge: 'Senda 3 · Agentes y MCP',
    title: 'El Artesano de Agentes',
    icon: '🦾',
    themeColor: '#E08A62', // terracota
    themeBg: 'rgba(224, 138, 98, 0.12)',
    duration: '~3.5 horas',
    difficulty: 'Intermedia y creadora',
    lessonsRange: 'Lecciones 10 a 18',
    startUrl: '/curso-ia/lecciones/09-anatomia-de-un-agente/',
    startLessonLabel: 'Empezar Lección 10',
    summary:
      'Pasa de chatear con una IA a colaborar con ella. Conecta modelos a tus propios documentos (RAG), utiliza el protocolo estándar MCP, redacta instrucciones en Markdown y supervisa agentes de código.',
    keyConcepts: [
      'Bucle perceptivo: Observar → Razonar → Actuar',
      'Protocolo estándar MCP (Model Context Protocol)',
      'Memoria e instrucciones en archivos .md',
      'RAG privado sobre tus propios archivos y seguridad',
    ],
    featuredWidgets: ['Simulador del bucle del agente', 'Mochila de contexto', 'Simulador de permisos y diff'],
    idealFor: 'Quienes buscan automatizar tareas cotidianas, organizar archivos o investigar sobre su documentación.',
  },
  {
    id: 'diseno3d',
    badge: 'Senda 4 · Fabricación Física',
    title: 'El Fabricante 3D',
    icon: '📐',
    themeColor: '#E3B965', // ocre
    themeBg: 'rgba(227, 185, 101, 0.12)',
    duration: '~1.5 horas',
    difficulty: 'Creativa y visual',
    lessonsRange: 'Lecciones 17 y 21',
    startUrl: '/curso-ia/lecciones/21-ia-para-diseno-3d-freecad/',
    startLessonLabel: 'Empezar Lección 17 (FreeCAD)',
    summary:
      'Une la inteligencia artificial con el mundo físico. Aprende cómo un agente puede escribir código Python paramétrico para FreeCAD, ajustar cotas y tolerancias, y exportar piezas listas para laminar e imprimir en 3D.',
    keyConcepts: [
      'Modelado 3D paramétrico vs modelado manual',
      'El servidor MCP de FreeCAD en acción',
      'Tolerancias mecánicas, voladizos y soportes',
      'Exportación a STL/3MF y laminado seguro',
    ],
    featuredWidgets: ['Visor 3D paramétrico interactivo', 'Checklist de imprimibilidad', 'Flujo prompt→pieza FreeCAD'],
    idealFor: 'Aficionados a la impresión 3D, el modelado mecánico o los proyectos tangibles de taller.',
  },
];

export default function ExploradorRutas() {
  const [selectedId, setSelectedId] = useState(PATHS[0].id);
  const activePath = PATHS.find((p) => p.id === selectedId) || PATHS[0];

  return (
    <div className="explorador-rutas-card">
      <div className="explorador-header">
        <div className="header-badge">
          <span>🧭 Brújula de Campo</span>
        </div>
        <h3 className="explorador-heading">Elige tu sendero de aprendizaje</h3>
        <p className="explorador-sub">
          El curso es autodirigido y modular. Puedes seguir el orden cronológico o saltar directamente a la temática que más despierte tu curiosidad hoy:
        </p>
      </div>

      {/* Selector horizontal de las 4 sendas */}
      <div className="paths-tabs-grid" role="tablist" aria-label="Rutas temáticas del curso">
        {PATHS.map((path) => {
          const isSelected = path.id === selectedId;
          return (
            <button
              key={path.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`path-tab-card ${isSelected ? 'is-selected' : ''}`}
              style={
                isSelected
                  ? {
                      borderColor: path.themeColor,
                      backgroundColor: path.themeBg,
                      boxShadow: `0 4px 20px ${path.themeColor}1a`,
                    }
                  : undefined
              }
              onClick={() => setSelectedId(path.id)}
            >
              <div className="tab-top-row">
                <span className="tab-icon">{path.icon}</span>
                <span className="tab-badge" style={{ color: path.themeColor }}>
                  {path.duration}
                </span>
              </div>
              <h4 className="tab-title">{path.title}</h4>
              <span className="tab-range">{path.lessonsRange}</span>
            </button>
          );
        })}
      </div>

      {/* Detalle ampliado de la senda seleccionada */}
      <div className="path-detail-box" style={{ borderColor: `${activePath.themeColor}55` }}>
        <div className="detail-header-row">
          <div className="detail-meta">
            <span className="detail-badge" style={{ color: activePath.themeColor, borderColor: activePath.themeColor }}>
              {activePath.badge}
            </span>
            <h4 className="detail-title">
              {activePath.icon} {activePath.title}
            </h4>
          </div>
          <div className="detail-stats">
            <span className="stat-item">
              <strong>Tiempo:</strong> {activePath.duration}
            </span>
            <span className="stat-separator">·</span>
            <span className="stat-item">
              <strong>Dificultad:</strong> {activePath.difficulty}
            </span>
          </div>
        </div>

        <p className="detail-summary">{activePath.summary}</p>

        <div className="detail-two-cols">
          <div className="detail-col">
            <h5 className="col-heading">🌱 Lo que vas a dominar:</h5>
            <ul className="concepts-list">
              {activePath.keyConcepts.map((concept, idx) => (
                <li key={idx}>
                  <span className="check-bullet" style={{ color: activePath.themeColor }}>
                    ✓
                  </span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-col">
            <h5 className="col-heading">🧪 Widgets e interactivos incluidos:</h5>
            <div className="widgets-tags-list">
              {activePath.featuredWidgets.map((widget, idx) => (
                <span key={idx} className="widget-tag" style={{ borderColor: `${activePath.themeColor}44` }}>
                  <span>🔬</span> {widget}
                </span>
              ))}
            </div>

            <div className="ideal-for-box">
              <span className="ideal-label">Recomendado para:</span>
              <p className="ideal-text">{activePath.idealFor}</p>
            </div>
          </div>
        </div>

        <div className="detail-action-row">
          <span className="range-footnote">Cubre: {activePath.lessonsRange}</span>
          <a href={activePath.startUrl} className="start-path-btn" style={{ backgroundColor: activePath.themeColor }}>
            <span>{activePath.startLessonLabel}</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
