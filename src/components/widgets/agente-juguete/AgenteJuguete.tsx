import React, { useState, useId } from 'react';

interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const AVAILABLE_TOOLS: Tool[] = [
  { id: 'buscar_web', name: 'buscar_web', icon: '🔍', description: 'Consultar información actualizada en internet' },
  { id: 'listar_archivos', name: 'listar_archivos', icon: '📁', description: 'Ver qué archivos existen en una carpeta local' },
  { id: 'leer_documento', name: 'leer_documento', icon: '📄', description: 'Leer el contenido de un archivo TXT, CSV o PDF' },
  { id: 'calculadora', name: 'calculadora', icon: '🧮', description: 'Operaciones numéricas rigurosas sin errores' },
  { id: 'guardar_informe', name: 'guardar_informe', icon: '💾', description: 'Escribir un nuevo archivo de texto en el disco' },
];

interface MissionDef {
  id: string;
  title: string;
  prompt: string;
  requiredToolIds: string[];
  executionSteps: {
    toolId: string;
    description: string;
  }[];
  missingFeedback: Record<string, string>;
}

const MISSIONS: MissionDef[] = [
  {
    id: 'lluvias',
    title: 'Misión 1: Calcular pluviometría de campo',
    prompt: 'Lee el archivo de campo "lluvias_octubre.csv", suma los litros por metro cuadrado y guarda el resultado en "resumen_clima.txt".',
    requiredToolIds: ['leer_documento', 'calculadora', 'guardar_informe'],
    executionSteps: [
      { toolId: 'leer_documento', description: 'Invoca leer_documento("lluvias_octubre.csv") y extrae los registros de 12 días.' },
      { toolId: 'calculadora', description: 'Invoca calculadora("14.2 + 8.5 + 22.0 + ...") para obtener la suma exacta de 118.4 litros/m².' },
      { toolId: 'guardar_informe', description: 'Invoca guardar_informe("resumen_clima.txt", "Precipitación total: 118.4 l/m²").' },
    ],
    missingFeedback: {
      leer_documento: '❌ Bloqueado: El agente no tiene la herramienta "leer_documento". No puede ver los datos del archivo en el disco.',
      calculadora: '⚠️ Limitado: Al no tener "calculadora", el modelo intentará sumar de memoria probabilística, arriesgándose a cometer errores numéricos.',
      guardar_informe: '❌ Incompleto: El agente puede calcular el resultado, pero no puede escribir el archivo en tu disco duro.',
    },
  },
  {
    id: 'pino-negro',
    title: 'Misión 2: Ficha botánica de Pinus uncinata',
    prompt: 'Investiga la altitud óptima del pino negro en el Pirineo y guarda una ficha técnica en "pino_negro.txt".',
    requiredToolIds: ['buscar_web', 'guardar_informe'],
    executionSteps: [
      { toolId: 'buscar_web', description: 'Invoca buscar_web("Pinus uncinata altitud optima Pirineo") y encuentra cotas de 1.600 a 2.400 m.' },
      { toolId: 'guardar_informe', description: 'Invoca guardar_informe("pino_negro.txt", "Ficha técnica: Pinus uncinata...")' },
    ],
    missingFeedback: {
      buscar_web: '⚠️ Conocimiento congelado: Sin acceso a la web, recurrirá solo a su memoria de preentrenamiento sin contrastar fuentes.',
      guardar_informe: '❌ No puede guardar: Te mostrará la ficha en la pantalla, pero no creará ningún archivo en tu ordenador.',
    },
  },
];

export default function AgenteJuguete() {
  const [selectedMissionId, setSelectedMissionId] = useState<string>('lluvias');
  const [enabledTools, setEnabledTools] = useState<Record<string, boolean>>({
    buscar_web: true,
    listar_archivos: true,
    leer_documento: true,
    calculadora: true,
    guardar_informe: true,
  });
  const [executionLog, setExecutionLog] = useState<string[] | null>(null);

  const titleId = useId();
  const currentMission = MISSIONS.find((m) => m.id === selectedMissionId) || MISSIONS[0];

  const toggleTool = (toolId: string) => {
    setEnabledTools((prev) => ({ ...prev, [toolId]: !prev[toolId] }));
    setExecutionLog(null);
  };

  const handleRun = () => {
    const logs: string[] = [];
    logs.push(`🚀 Iniciando misión: "${currentMission.prompt}"`);

    let canComplete = true;

    // Check missing tools
    for (const req of currentMission.requiredToolIds) {
      if (!enabledTools[req]) {
        canComplete = false;
        logs.push(currentMission.missingFeedback[req]);
      }
    }

    if (canComplete) {
      logs.push('✅ Todas las herramientas necesarias están disponibles en la mochila del agente.');
      currentMission.executionSteps.forEach((step, idx) => {
        logs.push(`[Paso ${idx + 1}] ⚙️ ${step.description}`);
      });
      logs.push('🎉 ¡Misión completada con éxito!');
    } else {
      logs.push('🛑 El agente no ha podido completar la tarea de forma autónoma debido a las herramientas que le faltan.');
    }

    setExecutionLog(logs);
  };

  return (
    <div
      style={{
        border: '1px solid var(--sl-color-gray-5, #334155)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        backgroundColor: 'var(--sl-color-bg-sidebar, #0f172a)',
        margin: '1.5rem 0',
        fontFamily: 'inherit',
      }}
      role="region"
      aria-labelledby={titleId}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: '1px solid var(--sl-color-gray-5, #334155)',
          paddingBottom: '0.85rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-accent, #6366f1)',
              display: 'block',
              marginBottom: '0.2rem',
            }}
          >
            Laboratorio de capacidades
          </span>
          <h3
            id={titleId}
            style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--sl-color-white, #f8fafc)',
            }}
          >
            Agente de Juguete: Equipa las Herramientas
          </h3>
        </div>

        <div
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            color: 'var(--sl-color-text, #e2e8f0)',
          }}
        >
          Caja de herramientas
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Un agente sin herramientas solo puede hablar. Equípalo activando o desactivando herramientas en su mochila y comprueba cómo cambia su capacidad para resolver problemas reales:
      </p>

      {/* Selector de Misión */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.4rem' }}>
          Selecciona el encargo para el agente:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {MISSIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMissionId(m.id);
                setExecutionLog(null);
              }}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: selectedMissionId === m.id ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: selectedMissionId === m.id ? 'rgba(99, 102, 241, 0.25)' : 'var(--sl-color-bg, #1e293b)',
                color: selectedMissionId === m.id ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                fontWeight: selectedMissionId === m.id ? 600 : 400,
              }}
            >
              {m.title}
            </button>
          ))}
        </div>
      </div>

      {/* Petición textual */}
      <div
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          color: '#cbd5e1',
        }}
      >
        <span style={{ color: '#94a3b8', fontWeight: 600 }}>Petición del usuario: </span>
        <em style={{ color: '#f8fafc' }}>"{currentMission.prompt}"</em>
      </div>

      {/* Caja de herramientas (Toggles) */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
          Herramientas disponibles en la mochila del agente (activa o desactiva para probar fallos):
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
          {AVAILABLE_TOOLS.map((t) => {
            const isEnabled = !!enabledTools[t.id];

            return (
              <button
                key={t.id}
                onClick={() => toggleTool(t.id)}
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid',
                  borderColor: isEnabled ? 'rgba(34, 197, 94, 0.5)' : 'var(--sl-color-gray-5, #334155)',
                  backgroundColor: isEnabled ? 'rgba(34, 197, 94, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                  color: isEnabled ? '#ffffff' : '#64748b',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.15s ease',
                }}
                aria-pressed={isEnabled}
              >
                <span style={{ fontSize: '1.2rem', opacity: isEnabled ? 1 : 0.4 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: isEnabled ? 700 : 400, fontFamily: 'monospace' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: isEnabled ? '#86efac' : '#64748b' }}>
                    {isEnabled ? '✓ Activada' : '✗ Desactivada'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón de ejecución */}
      <button
        onClick={handleRun}
        style={{
          padding: '0.6rem 1.25rem',
          backgroundColor: 'var(--color-accent, #6366f1)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.375rem',
          fontWeight: 600,
          fontSize: '0.88rem',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        ▶️ Poner a prueba al agente con esta mochila
      </button>

      {/* Consola de ejecución */}
      {executionLog && (
        <div
          style={{
            backgroundColor: '#0a0f1d',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #1e293b',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            lineHeight: 1.6,
            color: '#e2e8f0',
          }}
        >
          {executionLog.map((line, idx) => (
            <div
              key={idx}
              style={{
                color: line.startsWith('❌') || line.startsWith('🛑')
                  ? '#f87171'
                  : line.startsWith('⚠️')
                  ? '#facc15'
                  : line.startsWith('✅') || line.startsWith('🎉')
                  ? '#4ade80'
                  : line.startsWith('[Paso')
                  ? '#38bdf8'
                  : '#cbd5e1',
                marginBottom: '0.25rem',
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
