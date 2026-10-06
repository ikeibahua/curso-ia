import React, { useState, useId } from 'react';

interface TaskItem {
  id: string;
  name: string;
  type: 'terminal' | 'generalista' | 'prohibido';
  verdict: 'Óptimo para Agente de Terminal' | 'Óptimo para Agente Generalista (24/7)' | '❌ Peligro: No delegar a un agente';
  color: string;
  toolExample: string;
  rationale: string;
  modelType: string;
}

const TASKS: TaskItem[] = [
  {
    id: 't1',
    name: 'Clasificar 200 fotos botánicas en carpetas por fecha y especie',
    type: 'terminal',
    verdict: 'Óptimo para Agente de Terminal',
    color: '#38bdf8',
    toolExample: 'OpenCode / Claude Code en carpeta acotada',
    rationale: 'Tarea puntual y finita: abres el agente, supervisas el plan, apruebas los movimientos con Git como red y lo cierras.',
    modelType: 'Modelo ligero local (Ollama) o rápido en la nube',
  },
  {
    id: 't2',
    name: 'Monitorizar cada mañana el clima y avisar a Telegram si hay helada en el huerto',
    type: 'generalista',
    verdict: 'Óptimo para Agente Generalista (24/7)',
    color: '#34d399',
    toolExample: 'Hermes Agent u OpenClaw con tarea Cron',
    rationale: 'Requiere ejecución desatendida y canal de mensajería para avisarte en el móvil sin que tengas que abrir el ordenador.',
    modelType: 'Modelo local o API ultrabarata (para evitar goteo de tokens)',
  },
  {
    id: 't3',
    name: 'Comprar automáticamente productos con tarjeta bancaria al bajar de precio',
    type: 'prohibido',
    verdict: '❌ Peligro: No delegar a un agente',
    color: '#ef4444',
    toolExample: 'Ninguno (Acción financiera irreversible)',
    rationale: 'Riesgo crítico de compras erróneas, alucinaciones en ofertas falsas o pérdida de control del gasto. El pago siempre debe ser manual.',
    modelType: 'No aplicable',
  },
  {
    id: 't4',
    name: 'Dictar notas botánicas por voz desde el móvil y archivarlas en el Mac',
    type: 'generalista',
    verdict: 'Óptimo para Agente Generalista (24/7)',
    color: '#34d399',
    toolExample: 'Hermes Agent conectado a bot de Telegram',
    rationale: 'Transforma notas dispersas del día a día en fichas Markdown estructuradas en tu diario sin fricción.',
    modelType: 'Modelo local (Ollama) o multimodal ligero',
  },
  {
    id: 't5',
    name: 'Responder correos de amigos y colegas simulando tu tono de voz',
    type: 'prohibido',
    verdict: '❌ Peligro: No delegar a un agente',
    color: '#ef4444',
    toolExample: 'Ninguno (Destrucción de confianza interpersonal)',
    rationale: 'La correspondencia personal exige empatía real y juicio propio. El agente puede alucinar compromisos o respuestas inapropiadas.',
    modelType: 'No aplicable',
  },
  {
    id: 't6',
    name: 'Convertir un archivo CSV de avistamientos a una tabla Markdown limpia',
    type: 'terminal',
    verdict: 'Óptimo para Agente de Terminal',
    color: '#38bdf8',
    toolExample: 'OpenCode / Aider en local',
    rationale: 'Se resuelve en 2 minutos en tu terminal bajo supervisión visual con diff antes de confirmar.',
    modelType: 'Modelo local en Mac (0€)',
  },
];

export default function MatrizAutonomia() {
  const [filterType, setFilterType] = useState<string>('all');
  const titleId = useId();

  const filteredTasks = TASKS.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

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
          Brújula de Decisión · Matriz de Autonomía
        </span>
        <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
          ¿Qué Tarea Delegar y en Qué Tipo de Agente?
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0.35rem 0 0' }}>
          No todas las tareas son aptas para la automatización desatendida. Distingue entre tareas de terminal supervisadas, automatizaciones de fondo y líneas rojas infranqueables:
        </p>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {[
          { id: 'all', label: 'Todas las tareas' },
          { id: 'terminal', label: '💻 Agente puntual de Terminal' },
          { id: 'generalista', label: '⏰ Agente Generalista 24/7' },
          { id: 'prohibido', label: '🛑 Líneas rojas (No delegar)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: filterType === f.id ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
              background: filterType === f.id ? 'rgba(14, 165, 233, 0.15)' : '#090d16',
              color: filterType === f.id ? '#f8fafc' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: filterType === f.id ? 600 : 400,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            style={{
              background: '#090d16',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              borderLeft: `4px solid ${t.color}`,
              padding: '0.85rem 1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#f8fafc' }}>
                {t.name}
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: t.color,
                  border: `1px solid ${t.color}`,
                }}
              >
                {t.verdict}
              </span>
            </div>

            <p style={{ margin: '0 0 0.4rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              {t.rationale}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.74rem', color: '#94a3b8' }}>
              <span>🛠️ <strong>Herramienta:</strong> {t.toolExample}</span>
              <span>🧠 <strong>Modelo:</strong> {t.modelType}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cost alert box: Token bleed */}
      <div
        style={{
          background: 'rgba(245, 158, 11, 0.08)',
          borderRadius: '8px',
          border: '1px solid #d97706',
          padding: '0.85rem 1rem',
          fontSize: '0.8rem',
          color: '#fef3c7',
          lineHeight: 1.45,
        }}
      >
        <strong>⚠️ Advertencia sobre el "Goteo de Tokens" (*Token Bleed*):</strong>
        <br />
        Si dejas un agente generalista encendido 24/7 comprobando páginas o tareas cada 10 minutos y usando un modelo comercial grande en la nube (como Claude Sonnet o GPT-4o), cada comprobación puede consumir 2.000 tokens. En un solo mes habrás consumido casi 9 millones de tokens (¡decenas o cientos de euros sin darte cuenta!).
        <br />
        <em>Solución de oro:</em> Para tareas desatendidas de fondo, usa siempre <strong>modelos locales en tu Mac con Ollama (0€)</strong> o modelos ultrabaratos (como Claude 3.5 Haiku o Gemini Flash).
      </div>
    </div>
  );
}
