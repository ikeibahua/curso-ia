import React, { useState, useId } from 'react';

interface CheckItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const CHECKS: CheckItem[] = [
  {
    id: 'backup',
    title: '1. Red de seguridad previa (Git o duplicado)',
    description: 'Has sacado una foto fija inmutable con Git (git add . && git commit) o duplicado la carpeta en Finder con Cmd + D.',
    icon: '💾',
  },
  {
    id: 'sandbox',
    title: '2. Carpeta de trabajo estrictamente acotada',
    description: 'El agente sólo tiene permisos dentro de ~/Mi-Proyecto/; nunca en la carpeta de inicio (~) ni en carpetas del sistema.',
    icon: '📦',
  },
  {
    id: 'test_sample',
    title: '3. Prueba previa con datos simulados',
    description: 'Has probado el script con 2 o 3 archivos de prueba inocuos antes de lanzarlo sobre tu colección real de fotos o documentos.',
    icon: '🧪',
  },
  {
    id: 'cost_cap',
    title: '4. Presupuesto y coste bajo control',
    description: 'Usas un modelo local en tu Mac con Ollama (0€) o tienes un límite estricto de gasto mensual (hard limit) fijado en tu cuenta de API.',
    icon: '💰',
  },
  {
    id: 'kill_switch',
    title: '5. Interruptor de apagado verificado',
    description: 'Sabes con qué comando o atajo de teclado (Ctrl + C, launchctl unload o matar proceso) detienes la tarea inmediatamente.',
    icon: '🛑',
  },
  {
    id: 'docs',
    title: '6. Instrucciones escritas (AGENTS.md y README.md)',
    description: 'Has dejado un archivo de texto con las reglas claras ("no borrar originales, crear copias") para que cualquier agente las respete.',
    icon: '📝',
  },
];

export default function ChecklistSeguridadProyecto() {
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'backup',
    'sandbox',
    'kill_switch',
  ]);
  const titleId = useId();

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const count = checkedIds.length;
  const isComplete = count === CHECKS.length;

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
            Protocolo de Calidad · Checklist de Puesta en Marcha
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Checklist de Seguridad Previa al Lanzamiento
          </h4>
        </div>

        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '0.25rem 0.6rem',
            borderRadius: '6px',
            background: isComplete ? 'rgba(16, 185, 129, 0.2)' : 'rgba(14, 165, 233, 0.2)',
            color: isComplete ? '#34d399' : '#38bdf8',
            border: `1px solid ${isComplete ? '#059669' : '#0ea5e9'}`,
          }}
        >
          {count} de {CHECKS.length} salvaguardas activas
        </span>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1.25rem' }}>
        Antes de dejar un proceso funcionando de forma autónoma o delegar un lote grande de documentos, marca cada salvaguarda verificada:
      </p>

      {/* Checklist items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
        {CHECKS.map((chk) => {
          const isChecked = checkedIds.includes(chk.id);
          return (
            <label
              key={chk.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isChecked ? '#059669' : '#1e293b',
                background: isChecked ? 'rgba(16, 185, 129, 0.08)' : '#090d16',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleCheck(chk.id)}
                style={{ marginTop: '0.25rem', transform: 'scale(1.2)', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.85rem', color: isChecked ? '#34d399' : '#f8fafc' }}>
                  <span>{chk.icon}</span>
                  <span>{chk.title}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem', lineHeight: 1.35 }}>
                  {chk.description}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Verdict banner */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          background: isComplete ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.12)',
          border: `1px solid ${isComplete ? '#10b981' : '#d97706'}`,
          fontSize: '0.85rem',
          color: isComplete ? '#a7f3d0' : '#fef3c7',
        }}
      >
        {isComplete ? (
          <div>
            <strong>🎉 ¡Proyecto blindado con matrícula de honor!</strong>
            <br />
            Tu proyecto cuenta con aislamiento, red de seguridad para deshacer, coste predecible e interruptor de parada. Puedes ponerlo en marcha con absoluta tranquilidad.
          </div>
        ) : (
          <div>
            <strong>⚠️ Faltan {CHECKS.length - count} comprobaciones recomendadas:</strong>
            <br />
            Asegúrate de completar los puntos pendientes (especialmente la copia de seguridad previa y la verificación del interruptor de apagado) antes de ejecutar el encargo sobre archivos importantes.
          </div>
        )}
      </div>
    </div>
  );
}
