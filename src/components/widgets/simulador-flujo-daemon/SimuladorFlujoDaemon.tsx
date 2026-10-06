import React, { useState, useId } from 'react';

interface DaemonState {
  step: number;
  name: string;
  badge: string;
  badgeColor: string;
  cpuRam: string;
  description: string;
}

const DAEMON_STATES: DaemonState[] = [
  {
    step: 1,
    name: '1. Reposo Silencioso (Idle)',
    badge: 'Consumo Mínimo',
    badgeColor: '#10b981',
    cpuRam: 'CPU: 0.1% · RAM: 85 MB',
    description: 'El servicio permanece en segundo plano escuchando la conexión de red sin consumir batería ni procesador.',
  },
  {
    step: 2,
    name: '2. Recepción de Evento (Trigger)',
    badge: 'Despertar',
    badgeColor: '#0ea5e9',
    cpuRam: 'CPU: 3.2% · RAM: 110 MB',
    description: 'Se activa por un mensaje entrante de Telegram o porque el reloj interno (Cron) marca la hora programada.',
  },
  {
    step: 3,
    name: '3. Filtro de Frontera (Whitelist)',
    badge: 'Seguridad',
    badgeColor: '#a855f7',
    cpuRam: 'CPU: 1.5% · RAM: 112 MB',
    description: 'Verifica la identidad criptográfica del remitente. Si no coincide con tu ID autorizado, aborta la petición.',
  },
  {
    step: 4,
    name: '4. Razonamiento y Herramientas',
    badge: 'Ejecución',
    badgeColor: '#f59e0b',
    cpuRam: 'CPU: 45.0% · RAM: 650 MB (con Ollama)',
    description: 'El modelo consulta la memoria persistente de días anteriores, llama a la API o script y redacta la solución.',
  },
  {
    step: 5,
    name: '5. Notificación y Persistencia',
    badge: 'Guardado',
    badgeColor: '#34d399',
    cpuRam: 'CPU: 5.0% · RAM: 120 MB',
    description: 'Escribe el nuevo apunte en el diario Markdown del Mac y envía la respuesta a tu aplicación de Telegram.',
  },
  {
    step: 6,
    name: '6. Retorno al Reposo',
    badge: 'Ciclo Cerrado',
    badgeColor: '#10b981',
    cpuRam: 'CPU: 0.1% · RAM: 88 MB',
    description: 'Limpia buffers temporales y vuelve a esperar el próximo evento sin gastar energía.',
  },
];

export default function SimuladorFlujoDaemon() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [scenarioType, setScenarioType] = useState<'cron' | 'telegram'>('telegram');
  const titleId = useId();

  const currentState = DAEMON_STATES[currentStepIndex];

  const handleNext = () => {
    setCurrentStepIndex((prev) => (prev + 1) % DAEMON_STATES.length);
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => (prev - 1 + DAEMON_STATES.length) % DAEMON_STATES.length);
  };

  const handleReset = (type: 'cron' | 'telegram') => {
    setScenarioType(type);
    setCurrentStepIndex(1); // Jump straight to trigger
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
            Servicios Siempre Activos · Ciclo de Vida
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Cómo Funciona un Agente en Segundo Plano (Daemon)
          </h4>
        </div>

        {/* Triggers buttons */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => handleReset('telegram')}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: scenarioType === 'telegram' ? '#0ea5e9' : '#334155',
              background: scenarioType === 'telegram' ? 'rgba(14, 165, 233, 0.15)' : '#090d16',
              color: scenarioType === 'telegram' ? '#38bdf8' : '#cbd5e1',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            💬 Disparar Telegram
          </button>
          <button
            onClick={() => handleReset('cron')}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: scenarioType === 'cron' ? '#10b981' : '#334155',
              background: scenarioType === 'cron' ? 'rgba(16, 185, 129, 0.15)' : '#090d16',
              color: scenarioType === 'cron' ? '#34d399' : '#cbd5e1',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            ⏰ Disparar Cron (08:00 AM)
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1rem' }}>
        Un servicio permanente no está "pensando todo el rato": duerme el 99.9% del tiempo y solo despierta unos segundos cuando ocurre un evento concreto. Observa su consumo de recursos en cada fase:
      </p>

      {/* Stepper bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        {DAEMON_STATES.map((st, idx) => {
          const isActive = idx === currentStepIndex;
          return (
            <button
              key={st.step}
              onClick={() => setCurrentStepIndex(idx)}
              style={{
                padding: '0.5rem 0.3rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: isActive ? st.badgeColor : '#1e293b',
                background: isActive ? 'rgba(15, 23, 42, 0.9)' : '#090d16',
                color: isActive ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: st.badgeColor }}>Paso {st.step}</div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.1rem' }}>{st.name.split('. ')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* State details card */}
      <div
        style={{
          background: '#020617',
          borderRadius: '8px',
          border: `1px solid ${currentState.badgeColor}`,
          padding: '1.25rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: currentState.badgeColor, textTransform: 'uppercase' }}>
              {currentState.badge}
            </span>
            <h5 style={{ margin: '0.15rem 0 0', color: '#f8fafc', fontSize: '1.05rem' }}>
              {currentState.name}
            </h5>
          </div>
          <div
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              background: '#090d16',
              border: '1px solid #1e293b',
              fontFamily: 'var(--sl-font-mono, monospace)',
              fontSize: '0.75rem',
              color: '#38bdf8',
            }}
          >
            {currentState.cpuRam}
          </div>
        </div>

        <p style={{ margin: '0 0 0.85rem', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          {currentState.description}
        </p>

        {/* Dynamic Context per scenario */}
        <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1e293b', fontSize: '0.8rem' }}>
          <span style={{ color: '#94a3b8' }}>
            {scenarioType === 'telegram'
              ? '📱 Escenario Telegram: El usuario envía desde el bosque: "Observado mirlo capiblanco en la ladera norte".'
              : '⏰ Escenario Cron: El temporizador del Mac cumple las 08:00 AM para la revisión de temperatura.'}
          </span>
        </div>
      </div>

      {/* Stepper controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handlePrev}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #334155',
            background: '#090d16',
            color: '#cbd5e1',
            fontSize: '0.78rem',
            cursor: 'pointer',
          }}
        >
          ← Paso anterior
        </button>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          Estado {currentStepIndex + 1} de {DAEMON_STATES.length}
        </span>
        <button
          onClick={handleNext}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            border: 'none',
            background: 'var(--sl-color-accent, #0ea5e9)',
            color: '#ffffff',
            fontSize: '0.78rem',
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
