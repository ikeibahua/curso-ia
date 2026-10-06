import React, { useState, useId } from 'react';

type PhaseType = 'plan' | 'acciones' | 'diff';

interface PlanItem {
  id: number;
  text: string;
  status: 'done' | 'active' | 'pending';
}

interface ActionItem {
  timestamp: string;
  tool: string;
  details: string;
  status: 'completado' | 'en_curso';
}

interface DiffLine {
  type: 'unchanged' | 'removed' | 'added';
  lineNumOld?: number;
  lineNumNew?: number;
  text: string;
}

export default function PlanAccionesDiff() {
  const [currentPhase, setCurrentPhase] = useState<PhaseType>('plan');
  const titleId = useId();

  const planSteps: PlanItem[] = [
    { id: 1, text: 'Leer las primeras 20 filas de "campo_mariposas.csv" para detectar variantes de fecha', status: currentPhase === 'plan' ? 'active' : 'done' },
    { id: 2, text: 'Identificar formatos discordantes (ej: "14/05/2023", "May 14, 2023", "14-V-2023")', status: currentPhase === 'acciones' || currentPhase === 'diff' ? 'done' : 'pending' },
    { id: 3, text: 'Convertir todas las fechas al estándar internacional ISO 8601 (AAAA-MM-DD)', status: currentPhase === 'acciones' || currentPhase === 'diff' ? 'done' : 'pending' },
    { id: 4, text: 'Mostrar las diferencias (diff) antes de escribir el archivo definitivo', status: currentPhase === 'diff' ? 'active' : 'pending' },
  ];

  const actionsLog: ActionItem[] = [
    { timestamp: '10:14:02', tool: 'inspect_file("campo_mariposas.csv")', details: 'Lectura de cabeceras y muestra de datos (32 filas encontradas).', status: 'completado' },
    { timestamp: '10:14:05', tool: 'run_analysis(dates_column)', details: 'Detectados 3 formatos heterogéneos en columna "fecha_avistamiento".', status: 'completado' },
    { timestamp: '10:14:08', tool: 'propose_patch(campo_mariposas.csv)', details: 'Parche de edición preparado. Esperando confirmación de diff.', status: currentPhase === 'diff' ? 'completado' : 'en_curso' },
  ];

  const diffLines: DiffLine[] = [
    { type: 'unchanged', lineNumOld: 1, lineNumNew: 1, text: 'id,especie,paraje,fecha_avistamiento,ejemplares' },
    { type: 'unchanged', lineNumOld: 2, lineNumNew: 2, text: '1,Papilio machaon,Soto del Real,2023-05-12,3' },
    { type: 'removed', lineNumOld: 3, text: '2,Parnassius apollo,Puerto de Navacerrada,14/05/2023,1' },
    { type: 'added', lineNumNew: 3, text: '2,Parnassius apollo,Puerto de Navacerrada,2023-05-14,1' },
    { type: 'unchanged', lineNumOld: 4, lineNumNew: 4, text: '3,Vanessa atalanta,Dehesa Boyal,2023-05-18,5' },
    { type: 'removed', lineNumOld: 5, text: '4,Iphiclides feisthamelii,Valle de Lozoya,21-V-2023,2' },
    { type: 'added', lineNumNew: 5, text: '4,Iphiclides feisthamelii,Valle de Lozoya,2023-05-21,2' },
    { type: 'removed', lineNumOld: 6, text: '5,Colias croceus,Montejo,Jun 02, 2023,4' },
    { type: 'added', lineNumNew: 6, text: '5,Colias croceus,Montejo,2023-06-02,4' },
    { type: 'unchanged', lineNumOld: 7, lineNumNew: 7, text: '6,Lycaena phlaeas,Rascafría,2023-06-05,2' },
  ];

  const handleNextPhase = () => {
    if (currentPhase === 'plan') setCurrentPhase('acciones');
    else if (currentPhase === 'acciones') setCurrentPhase('diff');
    else setCurrentPhase('plan');
  };

  const handlePrevPhase = () => {
    if (currentPhase === 'diff') setCurrentPhase('acciones');
    else if (currentPhase === 'acciones') setCurrentPhase('plan');
    else setCurrentPhase('diff');
  };

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
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--sl-color-accent, #0ea5e9)',
            }}
          >
            Secuencia de Trabajo · Plan → Acciones → Diff
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Las Tres Fases de una Tarea de Código
          </h4>
        </div>

        {/* Phase switcher pills */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#090d16', padding: '0.25rem', borderRadius: '8px' }}>
          {(['plan', 'acciones', 'diff'] as PhaseType[]).map((phase, idx) => {
            const labels = ['1. Plan', '2. Acciones', '3. Diff'];
            const isSelected = currentPhase === phase;
            return (
              <button
                key={phase}
                onClick={() => setCurrentPhase(phase)}
                style={{
                  border: 'none',
                  background: isSelected ? 'var(--sl-color-accent, #0ea5e9)' : 'transparent',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {labels[idx]}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1.25rem' }}>
        Un buen agente no salta a modificar archivos a ciegas. Sigue tres fases estrictas: primero <strong>diseña un plan</strong> explicable, luego <strong>ejecuta herramientas</strong> paso a paso y finalmente <strong>te muestra las diferencias exactas (diff)</strong> para que tú des el visto bueno.
      </p>

      {/* Main Content Area */}
      <div
        style={{
          background: '#090d16',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          padding: '1.25rem',
          minHeight: '260px',
          marginBottom: '1rem',
        }}
      >
        {/* PHASE 1: PLAN */}
        {currentPhase === 'plan' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
              <span>📋 Fase 1: Plan de Trabajo del Agente</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Antes de tocar una sola coma, el agente te presenta su hoja de ruta. Puedes decirle <em>"cambia el paso 3"</em> o <em>"adelante"</em>.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {planSteps.map((step) => (
                <li
                  key={step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    background: step.status === 'active' ? 'rgba(14, 165, 233, 0.12)' : 'rgba(30, 41, 59, 0.5)',
                    border: step.status === 'active' ? '1px solid #0284c7' : '1px solid #1e293b',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>
                    {step.status === 'done' ? '✅' : step.status === 'active' ? '🔄' : '⏳'}
                  </span>
                  <span style={{ color: step.status === 'active' ? '#f8fafc' : '#cbd5e1' }}>
                    <strong>Paso {step.id}:</strong> {step.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PHASE 2: ACCIONES */}
        {currentPhase === 'acciones' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#a78bfa', fontWeight: 600 }}>
              <span>⚙️ Fase 2: Ejecución de Herramientas y Consulta</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              El agente llama a herramientas especializadas para inspeccionar archivos y calcular cambios sin alterar el disco hasta tener permiso:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--sl-font-mono, monospace)', fontSize: '0.8rem' }}>
              {actionsLog.map((act, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    background: '#020617',
                    border: '1px solid #1e293b',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                    <span>{act.timestamp}</span>
                    <span style={{ color: act.status === 'completado' ? '#34d399' : '#f59e0b' }}>
                      {act.status === 'completado' ? '● Completado' : '◐ En curso'}
                    </span>
                  </div>
                  <div style={{ color: '#c084fc', fontWeight: 600 }}>{act.tool}</div>
                  <div style={{ color: '#94a3b8', marginTop: '0.2rem', fontFamily: 'sans-serif', fontSize: '0.8rem' }}>
                    {act.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 3: DIFF */}
        {currentPhase === 'diff' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ color: '#10b981', fontWeight: 600 }}>
                🔍 Fase 3: Radiografía de Cambios (Diff)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                <span style={{ color: '#ef4444' }}>- Rojo: lo que se quita</span> · <span style={{ color: '#10b981' }}>+ Verde: lo que se añade</span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
              Así se lee una diferencia en Git o en Claude Code. Te garantiza que ninguna fila buena se pierde por error:
            </p>
            <div
              style={{
                background: '#020617',
                borderRadius: '6px',
                border: '1px solid #1e293b',
                padding: '0.6rem',
                fontFamily: 'var(--sl-font-mono, monospace)',
                fontSize: '0.78rem',
                overflowX: 'auto',
                lineHeight: 1.5,
              }}
            >
              {diffLines.map((line, idx) => {
                const isAdd = line.type === 'added';
                const isRem = line.type === 'removed';
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      background: isAdd ? 'rgba(16, 185, 129, 0.15)' : isRem ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                      color: isAdd ? '#34d399' : isRem ? '#f87171' : '#94a3b8',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '2px',
                    }}
                  >
                    <span style={{ width: '2rem', userSelect: 'none', color: '#475569', textAlign: 'right', marginRight: '0.75rem' }}>
                      {line.lineNumOld || ''}
                    </span>
                    <span style={{ width: '2rem', userSelect: 'none', color: '#475569', textAlign: 'right', marginRight: '0.75rem' }}>
                      {line.lineNumNew || ''}
                    </span>
                    <span style={{ width: '1.2rem', userSelect: 'none', fontWeight: 700 }}>
                      {isAdd ? '+' : isRem ? '-' : ' '}
                    </span>
                    <span>{line.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handlePrevPhase}
          style={{
            padding: '0.4rem 0.8rem',
            background: '#1e293b',
            color: '#cbd5e1',
            border: '1px solid #334155',
            borderRadius: '6px',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          ← Fase anterior
        </button>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          {currentPhase === 'plan' && '1 de 3: El agente formula el plan'}
          {currentPhase === 'acciones' && '2 de 3: El agente ejecuta herramientas'}
          {currentPhase === 'diff' && '3 de 3: Tú inspeccionas el diff final'}
        </span>
        <button
          onClick={handleNextPhase}
          style={{
            padding: '0.4rem 0.8rem',
            background: 'var(--sl-color-accent, #0ea5e9)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Siguiente fase →
        </button>
      </div>
    </div>
  );
}

