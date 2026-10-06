import React, { useState, useId } from 'react';

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  status?: 'original' | 'moved' | 'created' | 'deleted' | 'protected';
}

interface StepAction {
  id: number;
  agentMessage: string;
  toolCall: {
    tool: string;
    params: string;
    isDangerous?: boolean;
    description: string;
  };
  fileUpdate: {
    description: string;
    files: FileNode[];
  };
  explanationIfRejected: string;
  reflection: string;
}

const SCENARIOS = [
  {
    id: 'botanica',
    title: 'Clasificar fotos botánicas sueltas',
    initialFiles: [
      { name: 'IMG_20240501_orquidea.jpg', type: 'file', size: '3.2 MB', status: 'original' },
      { name: 'IMG_20240502_helecho.jpg', type: 'file', size: '2.8 MB', status: 'original' },
      { name: 'IMG_20240510_orquidea_2.jpg', type: 'file', size: '4.1 MB', status: 'original' },
      { name: 'notas_campo_borrador.tmp', type: 'file', size: '12 KB', status: 'original' },
    ] as FileNode[],
    prompt: 'Organiza las fotos de flores en carpetas por tipo de planta y limpia la carpeta.',
    steps: [
      {
        id: 1,
        agentMessage: 'He analizado los nombres de archivo. Propongo crear las carpetas "Orquideas" y "Helechos" y mover cada imagen a su carpeta correspondiente.',
        toolCall: {
          tool: 'crear_carpeta',
          params: 'mkdir -p "Orquideas" "Helechos"',
          description: 'Crea dos directorios limpios dentro de la carpeta actual.',
        },
        fileUpdate: {
          description: 'Se han creado las subcarpetas Orquideas/ y Helechos/.',
          files: [
            { name: '📁 Orquideas/', type: 'folder', status: 'created' },
            { name: '📁 Helechos/', type: 'folder', status: 'created' },
            { name: 'IMG_20240501_orquidea.jpg', type: 'file', size: '3.2 MB', status: 'original' },
            { name: 'IMG_20240502_helecho.jpg', type: 'file', size: '2.8 MB', status: 'original' },
            { name: 'IMG_20240510_orquidea_2.jpg', type: 'file', size: '4.1 MB', status: 'original' },
            { name: 'notas_campo_borrador.tmp', type: 'file', size: '12 KB', status: 'original' },
          ],
        },
        explanationIfRejected: 'Si no creamos las carpetas, los archivos tendrían que renombrarse uno a uno en el mismo sitio.',
        reflection: 'Las operaciones de creación de carpetas son seguras: no sobreescriben ni borran datos.',
      },
      {
        id: 2,
        agentMessage: 'Ahora voy a mover las 3 fotos botánicas a sus carpetas respectivas sin modificar su contenido.',
        toolCall: {
          tool: 'mover_archivos',
          params: 'mv *orquidea*.jpg Orquideas/ && mv *helecho*.jpg Helechos/',
          description: 'Reubica las 3 fotos en sus carpetas temáticas.',
        },
        fileUpdate: {
          description: 'Fotos organizadas en sus carpetas respectivas.',
          files: [
            { name: '📁 Orquideas/ (2 fotos)', type: 'folder', status: 'moved' },
            { name: '📁 Helechos/ (1 foto)', type: 'folder', status: 'moved' },
            { name: 'notas_campo_borrador.tmp', type: 'file', size: '12 KB', status: 'original' },
          ],
        },
        explanationIfRejected: 'Entendido, dejamos las fotos en la raíz y esperamos nuevas instrucciones.',
        reflection: 'Mover archivos es seguro si compruebas que el destino no sobreescribe archivos con el mismo nombre.',
      },
      {
        id: 3,
        agentMessage: 'Para cumplir tu orden de "limpiar la carpeta", detecto el archivo temporal "notas_campo_borrador.tmp". ¿Deseas eliminarlo definitivamente?',
        toolCall: {
          tool: 'eliminar_archivo',
          params: 'rm "notas_campo_borrador.tmp"',
          isDangerous: true,
          description: '⚠️ BORRADO PERMANENTE: no pasa por la papelera de macOS, se elimina de inmediato.',
        },
        fileUpdate: {
          description: 'El archivo notas_campo_borrador.tmp ha sido destruido.',
          files: [
            { name: '📁 Orquideas/ (2 fotos)', type: 'folder', status: 'moved' },
            { name: '📁 Helechos/ (1 foto)', type: 'folder', status: 'moved' },
          ],
        },
        explanationIfRejected: '¡Excelente decisión! En lugar de borrarlo, podemos moverlo a una subcarpeta "archivo_antiguo/" o conservarlo intacto.',
        reflection: '¡Atención biológica! Los comandos "rm" destruyen el archivo al instante. En un agente, ante la duda, SIEMPRE di que no o pide mover a la papelera.',
      },
    ] as StepAction[],
  },
  {
    id: 'avistamientos',
    title: 'Limpiar tabla de avistamientos de aves',
    initialFiles: [
      { name: 'avistamientos_2024.csv', type: 'file', size: '850 KB', status: 'original' },
      { name: 'guia_especies_referencia.xlsx', type: 'file', size: '1.4 MB', status: 'original' },
    ] as FileNode[],
    prompt: 'Corrige las tildes rotas y nombres erróneos en el CSV de avistamientos.',
    steps: [
      {
        id: 1,
        agentMessage: 'He examinado "avistamientos_2024.csv". Para no poner en riesgo tus datos originales, sugiero crear primero un duplicado de seguridad "avistamientos_2024_backup.csv".',
        toolCall: {
          tool: 'duplicar_archivo',
          params: 'cp avistamientos_2024.csv avistamientos_2024_backup.csv',
          description: 'Copia exacta de salvaguardia antes de cualquier modificación.',
        },
        fileUpdate: {
          description: 'Copia de seguridad creada correctamente.',
          files: [
            { name: 'avistamientos_2024.csv', type: 'file', size: '850 KB', status: 'original' },
            { name: 'avistamientos_2024_backup.csv', type: 'file', size: '850 KB', status: 'created' },
            { name: 'guia_especies_referencia.xlsx', type: 'file', size: '1.4 MB', status: 'original' },
          ],
        },
        explanationIfRejected: 'Es arriesgado editar el CSV directamente sin una copia previa.',
        reflection: 'Un agente disciplinado siempre sugiere o crea un duplicado de respaldo antes de alterar un fichero de datos.',
      },
      {
        id: 2,
        agentMessage: 'He detectado 14 nombres científicos con codificación defectuosa (ej: "Aguila imperial" sin tilde o caracteres extraños). Propongo generar un nuevo archivo limpio "avistamientos_corregido.csv".',
        toolCall: {
          tool: 'escribir_archivo',
          params: 'python3 -c "import pandas as pd..." -> avistamientos_corregido.csv',
          description: 'Genera el archivo corregido sin alterar el original.',
        },
        fileUpdate: {
          description: 'Nuevo archivo limpio generado con 14 especies corregidas.',
          files: [
            { name: 'avistamientos_2024.csv', type: 'file', size: '850 KB', status: 'protected' },
            { name: 'avistamientos_2024_backup.csv', type: 'file', size: '850 KB', status: 'created' },
            { name: 'avistamientos_corregido.csv', type: 'file', size: '852 KB', status: 'created' },
            { name: 'guia_especies_referencia.xlsx', type: 'file', size: '1.4 MB', status: 'original' },
          ],
        },
        explanationIfRejected: 'Si no generamos el archivo nuevo, te mostraré primero en pantalla la tabla con los cambios propuestos.',
        reflection: 'Al pedirle al agente que cree un archivo NUEVO en vez de sobreescribir el existente, nunca hay riesgo de perder datos.',
      },
    ] as StepAction[],
  },
];

export default function SimuladorSesion() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState<{ step: number; approved: boolean; note: string }[]>([]);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const titleId = useId();

  const currentScenario = SCENARIOS[scenarioIndex];
  const isFinished = currentStepIndex >= currentScenario.steps.length;
  const currentStep = !isFinished ? currentScenario.steps[currentStepIndex] : null;

  // Compute current visible files
  const currentFiles = history.length > 0 && history[history.length - 1].approved
    ? currentScenario.steps[history[history.length - 1].step].fileUpdate.files
    : currentScenario.initialFiles;

  const handleApprove = () => {
    if (!currentStep) return;
    const isDangerous = currentStep.toolCall.isDangerous;
    setHistory((prev) => [
      ...prev,
      {
        step: currentStepIndex,
        approved: true,
        note: isDangerous
          ? '⚠️ Aprobaste una acción destructiva (rm). El archivo fue eliminado sin pasar por la papelera.'
          : 'Aprobado: Acción ejecutada.',
      },
    ]);
    setLastFeedback(
      isDangerous
        ? '⚠️ Ojo de naturalista: Has permitido que el agente borre el archivo permanentemente. En la terminal de Mac, "rm" no tiene botón de Deshacer ni papelera. Es siempre más seguro pedirle: "Muévelo a una carpeta de descartes en lugar de borrarlo".'
        : `✅ ${currentStep.reflection}`
    );
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    if (!currentStep) return;
    setHistory((prev) => [
      ...prev,
      {
        step: currentStepIndex,
        approved: false,
        note: `Rechazado por el usuario. ${currentStep.explanationIfRejected}`,
      },
    ]);
    setLastFeedback(
      `🛡️ Has detenido la acción del agente. ${currentStep.explanationIfRejected} El control humano siempre manda.`
    );
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleReset = (idx = scenarioIndex) => {
    setScenarioIndex(idx);
    setCurrentStepIndex(0);
    setHistory([]);
    setLastFeedback(null);
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
      {/* Header */}
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
            Laboratorio Interactivo · Simulador de Sesión
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Supervisión y Aprobaciones: El Humano al Mando
          </h4>
        </div>

        {/* Scenario Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleReset(idx)}
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.7rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: scenarioIndex === idx ? 'var(--sl-color-accent, #0ea5e9)' : 'var(--sl-color-gray-5, #334155)',
                background: scenarioIndex === idx ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
                color: scenarioIndex === idx ? 'var(--sl-color-accent-high, #38bdf8)' : 'var(--sl-color-gray-2, #cbd5e1)',
                cursor: 'pointer',
                fontWeight: scenarioIndex === idx ? 600 : 400,
              }}
            >
              Caso {idx + 1}: {sc.id === 'botanica' ? 'Archivos y Fotos' : 'Datos CSV'}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1.25rem' }}>
        Un agente de programación nunca debería ejecutar comandos que modifiquen o borren tus archivos sin pedirte permiso explícito. Aquí tú eres el director: decide qué apruebas y qué detienes.
      </p>

      {/* Main Grid: Terminal vs Finder Tree */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Terminal column */}
        <div
          style={{
            background: '#090d16',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            padding: '1rem',
            fontFamily: 'var(--sl-font-mono, monospace)',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>terminal — agente opencode / claude</span>
          </div>

          <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>
            <span style={{ color: '#38bdf8' }}>tú &gt; </span>
            <span style={{ color: '#f8fafc' }}>{currentScenario.prompt}</span>
          </div>

          {/* Steps history */}
          {history.map((h, i) => (
            <div key={i} style={{ margin: '0.4rem 0', padding: '0.4rem', borderRadius: '4px', background: h.approved ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', fontSize: '0.8rem' }}>
              <div style={{ color: h.approved ? '#34d399' : '#f87171' }}>
                {h.approved ? '✓ Acción aprobada y ejecutada' : '✗ Acción rechazada por el usuario'}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{h.note}</div>
            </div>
          ))}

          {/* Current Pending Step */}
          {currentStep && (
            <div
              style={{
                marginTop: 'auto',
                padding: '0.75rem',
                borderRadius: '6px',
                background: currentStep.toolCall.isDangerous ? 'rgba(239, 68, 68, 0.12)' : 'rgba(14, 165, 233, 0.08)',
                border: `1px solid ${currentStep.toolCall.isDangerous ? '#dc2626' : '#0284c7'}`,
              }}
            >
              <div style={{ color: '#e2e8f0', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                🤖 <strong style={{ color: '#38bdf8' }}>Agente:</strong> {currentStep.agentMessage}
              </div>

              <div
                style={{
                  background: '#020617',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #1e293b',
                  fontSize: '0.75rem',
                  marginBottom: '0.75rem',
                }}
              >
                <div style={{ color: '#a78bfa', fontWeight: 600 }}>Herramienta solicitada: {currentStep.toolCall.tool}</div>
                <div style={{ color: '#f1f5f9', margin: '0.2rem 0' }}><code>{currentStep.toolCall.params}</code></div>
                <div style={{ color: '#94a3b8' }}>{currentStep.toolCall.description}</div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleApprove}
                  style={{
                    flex: '1 1 auto',
                    padding: '0.45rem 0.8rem',
                    background: currentStep.toolCall.isDangerous ? '#b91c1c' : '#059669',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  ✓ Aprobar acción
                </button>
                <button
                  onClick={handleReject}
                  style={{
                    flex: '1 1 auto',
                    padding: '0.45rem 0.8rem',
                    background: '#334155',
                    color: '#f8fafc',
                    border: '1px solid #475569',
                    borderRadius: '5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  ✕ Rechazar / Detener
                </button>
              </div>
            </div>
          )}

          {isFinished && (
            <div
              style={{
                marginTop: 'auto',
                padding: '0.75rem',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #059669',
                color: '#34d399',
                textAlign: 'center',
              }}
            >
              🎉 Sesión finalizada. Has supervisado todas las fases con éxito.
              <button
                onClick={() => handleReset()}
                style={{
                  display: 'block',
                  margin: '0.5rem auto 0',
                  padding: '0.35rem 0.75rem',
                  background: '#0f766e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                Repetir este caso
              </button>
            </div>
          )}
        </div>

        {/* Finder Virtual Tree column */}
        <div
          style={{
            background: 'var(--sl-color-gray-6, #1e293b)',
            borderRadius: '8px',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--sl-color-gray-5, #334155)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
              📁 Carpeta de trabajo (Finder)
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--sl-color-gray-3, #94a3b8)' }}>
              Paso {Math.min(currentStepIndex + 1, currentScenario.steps.length)} de {currentScenario.steps.length}
            </span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0 0 0.75rem' }}>
            Estado de los archivos en tu disco duro en tiempo real:
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
            {currentFiles.map((f, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '5px',
                  background: f.status === 'created'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : f.status === 'moved'
                    ? 'rgba(56, 189, 248, 0.15)'
                    : 'rgba(0, 0, 0, 0.2)',
                  border: f.status === 'created'
                    ? '1px solid #10b981'
                    : f.status === 'moved'
                    ? '1px solid #0ea5e9'
                    : '1px solid transparent',
                  color: 'var(--sl-color-gray-1, #f1f5f9)',
                }}
              >
                <span>{f.type === 'folder' ? '📁' : '📄'} {f.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--sl-color-gray-3, #94a3b8)' }}>
                  {f.status === 'created' ? '✨ Creado' : f.status === 'moved' ? '📦 Reubicado' : f.size || ''}
                </span>
              </li>
            ))}
          </ul>

          {/* Feedback banner */}
          {lastFeedback && (
            <div
              style={{
                marginTop: 'auto',
                padding: '0.75rem',
                borderRadius: '6px',
                background: 'rgba(15, 23, 42, 0.6)',
                borderLeft: '4px solid var(--sl-color-accent, #0ea5e9)',
                fontSize: '0.8rem',
                color: 'var(--sl-color-gray-2, #e2e8f0)',
                lineHeight: 1.4,
              }}
            >
              {lastFeedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

