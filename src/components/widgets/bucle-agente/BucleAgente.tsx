import React, { useState, useEffect, useId, useRef } from 'react';

interface CycleStep {
  cycleNumber: number;
  phase: 'observar' | 'razonar' | 'actuar' | 'resultado';
  phaseTitle: string;
  phaseIcon: string;
  thought: string;
  jsonCall?: string;
  systemResponse?: string;
  explanation: string;
}

const CYCLE_STEPS: CycleStep[] = [
  // Ciclo 1
  {
    cycleNumber: 1,
    phase: 'observar',
    phaseTitle: '1. Observar la petición',
    phaseIcon: '👁️',
    thought: 'Usuario: "Por favor, organiza los archivos de botánica que están sueltos en la carpeta descargas".',
    explanation: 'El agente recibe el mensaje inicial en su ventana de contexto. Sabe cuál es su objetivo, pero desconoce qué archivos concretos existen.',
  },
  {
    cycleNumber: 1,
    phase: 'razonar',
    phaseTitle: '2. Razonar y planificar',
    phaseIcon: '🧠',
    thought: '"No puedo mover nada a ciegas. El primer paso lógico es inspeccionar el contenido de la carpeta descargas para ver qué tipos de archivos hay".',
    explanation: 'El modelo no se precipita a inventar nombres de archivo: decide que necesita invocar una herramienta de inspección.',
  },
  {
    cycleNumber: 1,
    phase: 'actuar',
    phaseTitle: '3. Actuar (Llamada de herramienta)',
    phaseIcon: '⚙️',
    thought: 'Genera una llamada estructurada en formato JSON solicitando acceso al sistema:',
    jsonCall: '{\n  "herramienta": "listar_archivos",\n  "parametros": {\n    "carpeta": "./descargas"\n  }\n}',
    explanation: 'El modelo no ejecuta el comando por sí mismo. Emite este bloque de texto técnico a la aplicación que lo hospeda.',
  },
  {
    cycleNumber: 1,
    phase: 'resultado',
    phaseTitle: '4. Recibir el resultado del entorno',
    phaseIcon: '📥',
    thought: 'El sistema operativo ejecuta la orden y devuelve los datos:',
    systemResponse: '["roble_albar.jpg", "catalogo_hayas.txt", "helecho_pirineos.jpg"]',
    explanation: 'La aplicación lee el disco y reinyecta esta lista en la conversación como un nuevo mensaje para el modelo.',
  },
  // Ciclo 2
  {
    cycleNumber: 2,
    phase: 'observar',
    phaseTitle: '5. Observar los datos recibidos',
    phaseIcon: '👁️',
    thought: 'Ve la lista: dos fotografías (.jpg) y un archivo de notas de texto (.txt).',
    explanation: 'El contexto del agente se ha actualizado: ahora tiene evidencia empírica real de qué archivos existen en el disco.',
  },
  {
    cycleNumber: 2,
    phase: 'razonar',
    phaseTitle: '6. Razonar el siguiente paso',
    phaseIcon: '🧠',
    thought: '"Debo crear dos carpetas organizadoras: \'imagenes\' y \'textos\', y mover cada archivo a su lugar correspondiente".',
    explanation: 'Diseña el plan de acción para clasificar los archivos por extensión.',
  },
  {
    cycleNumber: 2,
    phase: 'actuar',
    phaseTitle: '7. Actuar (Mover archivos)',
    phaseIcon: '⚙️',
    thought: 'Envía las órdenes de creación y traslado:',
    jsonCall: '[\n  { "herramienta": "crear_carpeta", "parametros": { "ruta": "./descargas/imagenes" } },\n  { "herramienta": "crear_carpeta", "parametros": { "ruta": "./descargas/textos" } },\n  { "herramienta": "mover_archivo", "parametros": { "origen": "roble_albar.jpg", "destino": "./imagenes/" } }\n]',
    explanation: 'El agente puede emitir una o varias acciones en paralelo para que el sistema las ejecute.',
  },
  {
    cycleNumber: 2,
    phase: 'resultado',
    phaseTitle: '8. Meta cumplida y reporte',
    phaseIcon: '🏁',
    thought: 'Respuesta final al usuario: "He creado las carpetas \'imagenes\' y \'textos\' y he organizado tus tres archivos botánicos con éxito".',
    explanation: 'El agente comprueba que el objetivo está completamente satisfecho y detiene el bucle autónomo.',
  },
];

export default function BucleAgente() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const titleId = useId();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = CYCLE_STEPS[currentStepIdx];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => (prev + 1) % CYCLE_STEPS.length);
      }, 4000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.min(CYCLE_STEPS.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
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
            Mecanismo autónomo
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
            El Bucle del Agente: Observar → Razonar → Actuar
          </h3>
        </div>

        {/* Controles de reproducción */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              backgroundColor: isPlaying ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)',
              color: isPlaying ? '#fca5a5' : '#a5b4fc',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            aria-label={isPlaying ? 'Pausar ciclo automático' : 'Reproducir ciclo paso a paso'}
          >
            {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '0.35rem 0.6rem',
              fontSize: '0.8rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              backgroundColor: 'transparent',
              color: 'var(--sl-color-gray-3, #94a3b8)',
              cursor: 'pointer',
            }}
            aria-label="Reiniciar al inicio"
          >
            ⏮️
          </button>
        </div>
      </div>

      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        A diferencia de un chat estático que solo habla, un agente vive en un bucle continuo de retroalimentación sensorial y ejecución de herramientas:
      </p>

      {/* Rueda de fases del bucle */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          marginBottom: '1.25rem',
        }}
      >
        {CYCLE_STEPS.map((s, idx) => {
          const isCurrent = idx === currentStepIdx;
          return (
            <button
              key={`${s.phaseTitle}-${idx}`}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIdx(idx);
              }}
              style={{
                padding: '0.5rem 0.35rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: isCurrent ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: isCurrent ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-bg, #1e293b)',
                color: isCurrent ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.15rem',
              }}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span style={{ fontSize: '1.1rem' }}>{s.phaseIcon}</span>
              <span style={{ fontWeight: isCurrent ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                Paso {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tarjeta de estado de la fase activa */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.8rem' }}>{step.phaseIcon}</span>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>
              Ciclo {step.cycleNumber} de 2
            </span>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--sl-color-white, #f8fafc)' }}>
              {step.phaseTitle}
            </h4>
          </div>
        </div>

        {/* Pensamiento / Diálogo */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            padding: '0.75rem 1rem',
            borderRadius: '0.375rem',
            borderLeft: '3px solid var(--color-accent, #6366f1)',
            marginBottom: '0.75rem',
            fontSize: '0.88rem',
            color: '#e2e8f0',
            lineHeight: 1.5,
          }}
        >
          {step.thought}
        </div>

        {/* Bloque de código si emite JSON o respuesta del sistema */}
        {step.jsonCall && (
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>
              📤 Lo que emite el modelo (Tool Call en JSON):
            </div>
            <pre
              style={{
                backgroundColor: '#0a0f1d',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.375rem',
                border: '1px solid #1e293b',
                color: '#38bdf8',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                margin: 0,
                overflowX: 'auto',
              }}
            >
              {step.jsonCall}
            </pre>
          </div>
        )}

        {step.systemResponse && (
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>
              📥 Lo que devuelve el entorno (Tool Result):
            </div>
            <pre
              style={{
                backgroundColor: '#0a0f1d',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.375rem',
                border: '1px solid #1e293b',
                color: '#4ade80',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                margin: 0,
                overflowX: 'auto',
              }}
            >
              {step.systemResponse}
            </pre>
          </div>
        )}

        <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          💡 {step.explanation}
        </div>
      </div>

      {/* Controles de avance */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handlePrev}
          disabled={currentStepIdx === 0}
          style={{
            padding: '0.45rem 1rem',
            fontSize: '0.85rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            backgroundColor: currentStepIdx === 0 ? 'rgba(255, 255, 255, 0.03)' : 'var(--sl-color-bg, #1e293b)',
            color: currentStepIdx === 0 ? 'var(--sl-color-gray-4, #64748b)' : 'var(--sl-color-white, #f8fafc)',
            cursor: currentStepIdx === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Paso anterior
        </button>

        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Paso {currentStepIdx + 1} de {CYCLE_STEPS.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentStepIdx === CYCLE_STEPS.length - 1}
          style={{
            padding: '0.45rem 1rem',
            fontSize: '0.85rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            backgroundColor:
              currentStepIdx === CYCLE_STEPS.length - 1
                ? 'rgba(255, 255, 255, 0.03)'
                : 'var(--color-accent, #6366f1)',
            color: currentStepIdx === CYCLE_STEPS.length - 1 ? 'var(--sl-color-gray-4, #64748b)' : '#ffffff',
            cursor: currentStepIdx === CYCLE_STEPS.length - 1 ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          Siguiente paso →
        </button>
      </div>
    </div>
  );
}
