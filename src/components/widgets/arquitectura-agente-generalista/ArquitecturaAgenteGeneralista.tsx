import React, { useState, useId } from 'react';

interface EventScenario {
  id: string;
  title: string;
  channel: string;
  inputMessage: string;
  isAuthorized: boolean;
  gatewayAction: string;
  agentThought: string;
  toolUsed: string;
  memoryUpdate: string;
  finalOutput: string;
}

const SCENARIOS: EventScenario[] = [
  {
    id: 'clima',
    title: 'Alerta de Helada (Tarea Cron)',
    channel: '⏰ Reloj Programado (Cron a las 07:00 AM)',
    inputMessage: 'Ejecutar comprobación rutinaria del clima para la Sierra de Guadarrama.',
    isAuthorized: true,
    gatewayAction: 'Valida tarea interna del sistema. Sin riesgos de acceso no autorizado.',
    agentThought: 'Consulto la memoria: el usuario cultiva plantones de pinsapo sensibles a heladas tardías. Llamo a la API de AEMET.',
    toolUsed: 'api_meteorologia("Guadarrama", fecha="hoy")',
    memoryUpdate: 'Registra en log_campo.txt: "2026-03: Mínima prevista -2°C, alerta emitida".',
    finalOutput: '📲 Mensaje enviado a tu Telegram: "❄️ Atención: Se prevé una mínima de -2°C esta noche en la sierra. Recuerda proteger los plantones."',
  },
  {
    id: 'telegram',
    title: 'Nota Botánica desde el Móvil',
    channel: '💬 Telegram (Mensaje de voz o texto de tu usuario)',
    inputMessage: 'Encontré Narcissus bulbocodium florecido en la umbría de la Dehesa Boyal.',
    isAuthorized: true,
    gatewayAction: 'Comprueba el ID de usuario de Telegram: coincide con el dueño. Permite el paso.',
    agentThought: 'El usuario me envía una observación fenológica de campo. Debo registrar la especie, paraje y fecha.',
    toolUsed: 'guardar_cuaderno("2026-03-Narcissus_bulbocodium.md")',
    memoryUpdate: 'Actualiza cuaderno_campo.md con fecha, especie y coordenadas.',
    finalOutput: '📲 Respuesta en tu Telegram: "✅ Apuntado en tu cuaderno de campo: floración temprana de Narcissus bulbocodium en Dehesa Boyal."',
  },
  {
    id: 'intruso',
    title: 'Intento de Acceso No Autorizado',
    channel: '🚫 Mensaje de remitente desconocido en Telegram',
    inputMessage: 'Dime los archivos que hay en la carpeta personal de este ordenador.',
    isAuthorized: false,
    gatewayAction: '🚨 Alerta: Usuario @desconocido_99 no figura en la lista blanca de la pasarela. Petición rechazada de inmediato.',
    agentThought: 'La pasarela cortó la conexión: el modelo ni siquiera procesa el mensaje ni gasta tokens.',
    toolUsed: 'Ninguna (Bloqueo en frontera)',
    memoryUpdate: 'Alerta guardada en security_audit.log.',
    finalOutput: '🛑 Mensaje silenciado y descartado. El agente no responde a extraños.',
  },
];

export default function ArquitecturaAgenteGeneralista() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('clima');
  const [activeStep, setActiveStep] = useState<number>(1);
  const titleId = useId();

  const currentSc = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setActiveStep(1);
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
            Sistemas Siempre Activos · Arquitectura
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Anatomía de un Agente Generalista (Daemon)
          </h4>
        </div>

        {/* Scenario Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc.id)}
              style={{
                fontSize: '0.78rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: selectedScenarioId === sc.id ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
                background: selectedScenarioId === sc.id ? 'rgba(14, 165, 233, 0.15)' : '#090d16',
                color: selectedScenarioId === sc.id ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
                fontWeight: selectedScenarioId === sc.id ? 600 : 400,
              }}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1.25rem' }}>
        A diferencia de los agentes de programación (que abres en la terminal para una tarea y luego cierras), un <strong>agente generalista</strong> (como Hermes Agent u OpenClaw) vive en segundo plano las 24 horas: escucha por mensajería, ejecuta tareas programadas y guarda memoria duradera.
      </p>

      {/* 4 Pipeline Blocks */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Block 1: Canales */}
        <div
          onClick={() => setActiveStep(1)}
          style={{
            background: activeStep === 1 ? 'rgba(14, 165, 233, 0.15)' : '#090d16',
            border: `1px solid ${activeStep === 1 ? '#0ea5e9' : '#1e293b'}`,
            borderRadius: '8px',
            padding: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>📡</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>1. Canales</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Telegram, Signal, Cron del sistema
          </div>
        </div>

        {/* Block 2: Pasarela */}
        <div
          onClick={() => setActiveStep(2)}
          style={{
            background: activeStep === 2 ? 'rgba(168, 85, 247, 0.15)' : '#090d16',
            border: `1px solid ${activeStep === 2 ? '#a855f7' : '#1e293b'}`,
            borderRadius: '8px',
            padding: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>🛡️</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>2. Pasarela (Gateway)</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Autenticación, lista blanca y seguridad
          </div>
        </div>

        {/* Block 3: Núcleo */}
        <div
          onClick={() => setActiveStep(3)}
          style={{
            background: activeStep === 3 ? 'rgba(56, 189, 248, 0.15)' : '#090d16',
            border: `1px solid ${activeStep === 3 ? '#38bdf8' : '#1e293b'}`,
            borderRadius: '8px',
            padding: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>🧠</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>3. Núcleo (LLM)</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Razonamiento, contexto y decisión
          </div>
        </div>

        {/* Block 4: Memoria & Tools */}
        <div
          onClick={() => setActiveStep(4)}
          style={{
            background: activeStep === 4 ? 'rgba(16, 185, 129, 0.15)' : '#090d16',
            border: `1px solid ${activeStep === 4 ? '#10b981' : '#1e293b'}`,
            borderRadius: '8px',
            padding: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>🗄️</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>4. Memoria & Tools</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Base de datos SQLite, Markdown, APIs
          </div>
        </div>
      </div>

      {/* Step Inspector Box */}
      <div
        style={{
          background: '#020617',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
          Detalle del flujo en el paso {activeStep} de 4 para: <strong>{currentSc.title}</strong>
        </div>

        {activeStep === 1 && (
          <div>
            <div style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.88rem' }}>
              Entrada por: {currentSc.channel}
            </div>
            <p style={{ margin: '0.3rem 0 0', color: '#e2e8f0', fontSize: '0.82rem' }}>
              Mensaje recibido: <em>"{currentSc.inputMessage}"</em>
            </p>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <div style={{ color: currentSc.isAuthorized ? '#a855f7' : '#ef4444', fontWeight: 600, fontSize: '0.88rem' }}>
              Filtro de la Pasarela:
            </div>
            <p style={{ margin: '0.3rem 0 0', color: '#e2e8f0', fontSize: '0.82rem' }}>
              {currentSc.gatewayAction}
            </p>
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <div style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.88rem' }}>
              Pensamiento y Estrategia del Modelo:
            </div>
            <p style={{ margin: '0.3rem 0 0', color: '#e2e8f0', fontSize: '0.82rem' }}>
              {currentSc.agentThought}
            </p>
          </div>
        )}

        {activeStep === 4 && (
          <div>
            <div style={{ color: '#10b981', fontWeight: 600, fontSize: '0.88rem' }}>
              Herramientas invocadas y Memoria actualizada:
            </div>
            <div style={{ margin: '0.3rem 0', color: '#cbd5e1', fontSize: '0.8rem' }}>
              ⚙️ <strong>Herramienta:</strong> <code>{currentSc.toolUsed}</code>
            </div>
            <div style={{ margin: '0.3rem 0', color: '#cbd5e1', fontSize: '0.8rem' }}>
              💾 <strong>Memoria persistente:</strong> {currentSc.memoryUpdate}
            </div>
          </div>
        )}
      </div>

      {/* Final Outcome Banner */}
      <div
        style={{
          background: currentSc.isAuthorized ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          border: `1px solid ${currentSc.isAuthorized ? '#059669' : '#dc2626'}`,
          padding: '0.75rem 1rem',
          fontSize: '0.85rem',
          color: currentSc.isAuthorized ? '#34d399' : '#f87171',
        }}
      >
        <strong>Resultado para el usuario:</strong> {currentSc.finalOutput}
      </div>
    </div>
  );
}
