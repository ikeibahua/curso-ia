import React, { useState, useEffect, useId } from 'react';

interface DeploymentStep {
  id: string;
  title: string;
  category: string;
  commandSnippet?: string;
  detail: string;
}

const STEPS: DeploymentStep[] = [
  {
    id: 'env_iso',
    title: '1. Aislamiento del entorno',
    category: 'Entorno',
    commandSnippet: 'mkdir -p ~/Agente-Hermes && cd ~/Agente-Hermes\npython3 -m venv .venv && source .venv/bin/activate',
    detail: 'Crea una carpeta de trabajo exclusiva y un entorno virtual de Python (.venv). Nunca instales dependencias de un agente en el entorno global del sistema.',
  },
  {
    id: 'install_agent',
    title: '2. Instalación de Hermes Agent',
    category: 'Instalación',
    commandSnippet: 'pip install hermes-agent\n# o clonar repositorio oficial:\ngit clone https://github.com/NousResearch/hermes-agent.git',
    detail: 'Descarga e instala el framework de código abierto de Nous Research con sus herramientas y bucle de memoria.',
  },
  {
    id: 'telegram_bot',
    title: '3. Creación del bot privado de Telegram',
    category: 'Canal',
    commandSnippet: '# En la app Telegram:\n# 1. Habla con @BotFather\n# 2. Envía /newbot y sigue los pasos\n# 3. Copia el token HTTP API',
    detail: 'Crea un bot privado exclusivo para ti. Guarda el token en un archivo secreto local .env que nunca compartirás.',
  },
  {
    id: 'security_whitelist',
    title: '4. Configuración de lista blanca (Whitelist)',
    category: 'Seguridad',
    commandSnippet: 'TELEGRAM_ALLOWED_USERS="tu_id_numerico_de_telegram"',
    detail: 'Configura la pasarela para que SÓLO responda a tu cuenta de Telegram personal. Cualquier mensaje de un tercero será descartado silenciosamente.',
  },
  {
    id: 'model_config',
    title: '5. Selección de motor de IA (Coste 0€)',
    category: 'Modelo',
    commandSnippet: 'MODEL_PROVIDER="ollama"\nMODEL_NAME="llama3.2"\nOLLAMA_BASE_URL="http://localhost:11434"',
    detail: 'Conéctalo a tu motor local de Ollama en tu Mac para tener coste 0€ garantizado y evitar sorpresas de consumo de tokens en bucle.',
  },
  {
    id: 'first_task',
    title: '6. Primera prueba y bucle de memoria',
    category: 'Prueba',
    commandSnippet: 'hermes run --interactive',
    detail: 'Lanza el agente, envíale una nota desde tu Telegram y comprueba que se guarda en su diario persistente de Markdown.',
  },
  {
    id: 'kill_switch',
    title: '7. Prueba del interruptor de apagado y limpieza',
    category: 'Control',
    commandSnippet: '# Para detener: pulsar Ctrl + C en Terminal\n# Para desinstalar completamente:\ndeactivate\nrm -rf ~/Agente-Hermes',
    detail: 'Verifica que puedes detener el proceso en 2 segundos y que una desinstalación limpia se reduce a borrar una única carpeta sin dejar rastros.',
  },
];

const STORAGE_KEY = 'curso_ia_l19_checklist_progress';

export default function ChecklistDespliegue() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeStepId, setActiveStepId] = useState<string>('env_iso');
  const [copied, setCopied] = useState<boolean>(false);
  const titleId = useId();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompletedIds(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save to localStorage
  const toggleStep = (id: string) => {
    const next = completedIds.includes(id)
      ? completedIds.filter((item) => item !== id)
      : [...completedIds, id];

    setCompletedIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore
    }
  };

  const handleReset = () => {
    setCompletedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const currentStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];
  const progressPercent = Math.round((completedIds.length / STEPS.length) * 100);

  const handleCopySnippet = (snippet?: string) => {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            Guía de Taller · Progreso Guardado en Local
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Checklist de Despliegue de Hermes Agent
          </h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: progressPercent === 100 ? '#34d399' : '#38bdf8' }}>
            {completedIds.length} de {STEPS.length} ({progressPercent}%)
          </span>
          <button
            onClick={handleReset}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid #334155',
              background: '#090d16',
              color: '#94a3b8',
              fontSize: '0.72rem',
              cursor: 'pointer',
            }}
            title="Reiniciar el progreso guardado en este navegador"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden', marginBottom: '1.25rem' }}>
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: progressPercent === 100 ? '#10b981' : 'var(--sl-color-accent, #0ea5e9)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1rem' }}>
        Marca cada paso a medida que lo completes. Tu progreso se conserva automáticamente en tu Mac aunque cierres el navegador:
      </p>

      {/* Split Grid: Steps List vs Step Details */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {STEPS.map((st) => {
            const isDone = completedIds.includes(st.id);
            const isSelected = activeStepId === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStepId(st.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--sl-color-accent, #0ea5e9)' : isDone ? '#059669' : '#1e293b',
                  background: isSelected ? 'rgba(14, 165, 233, 0.12)' : isDone ? 'rgba(16, 185, 129, 0.06)' : '#090d16',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleStep(st.id);
                    }}
                    style={{ transform: 'scale(1.15)', cursor: 'pointer' }}
                  />
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 600 : 400,
                      color: isDone ? '#a7f3d0' : isSelected ? '#ffffff' : '#cbd5e1',
                    }}
                  >
                    {st.title}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{st.category}</span>
              </div>
            );
          })}
        </div>

        {/* Step Detail Inspector */}
        <div
          style={{
            background: '#020617',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
              Paso Seleccionado · {currentStep.category}
            </span>
            <button
              onClick={() => toggleStep(currentStep.id)}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                border: 'none',
                background: completedIds.includes(currentStep.id) ? '#059669' : '#334155',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              {completedIds.includes(currentStep.id) ? '✓ Completado' : 'Marcar como hecho'}
            </button>
          </div>

          <h5 style={{ margin: '0 0 0.5rem', color: '#f8fafc', fontSize: '1rem' }}>
            {currentStep.title}
          </h5>

          <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
            {currentStep.detail}
          </p>

          {currentStep.commandSnippet && (
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Comando o ajuste recomendado:</span>
                <button
                  onClick={() => handleCopySnippet(currentStep.commandSnippet)}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    border: 'none',
                    background: copied ? '#10b981' : '#0ea5e9',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '0.65rem',
                  borderRadius: '6px',
                  background: '#090d16',
                  border: '1px solid #1e293b',
                  fontSize: '0.75rem',
                  color: '#38bdf8',
                  fontFamily: 'var(--sl-font-mono, monospace)',
                  lineHeight: 1.4,
                  overflowX: 'auto',
                }}
              >
                {currentStep.commandSnippet}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
