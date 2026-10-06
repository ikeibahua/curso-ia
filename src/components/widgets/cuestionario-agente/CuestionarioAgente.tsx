import React, { useState, useId } from 'react';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    hint: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'budget',
    title: '1. Presupuesto y costes',
    subtitle: '¿Cuánto quieres invertir en las herramientas de IA para tu terminal?',
    options: [
      {
        id: 'zero',
        label: 'Presupuesto cero (0€ exactos)',
        hint: 'Quiero usar herramientas de código abierto con modelos locales o niveles gratuitos.',
      },
      {
        id: 'api',
        label: 'Pago por uso mínimo (unos céntimos al mes)',
        hint: 'Tengo o puedo crear una cuenta con saldo de API para pagar fracciones de céntimo por tarea.',
      },
      {
        id: 'subscription',
        label: 'Suscripción fija mensual (aprox. 20€/mes)',
        hint: 'Busco la máxima comodidad y ya cuento con un plan comercial como Claude Pro.',
      },
    ],
  },
  {
    id: 'privacy',
    title: '2. Privacidad y confidencialidad',
    subtitle: '¿Dónde deben procesarse los archivos de tu Mac?',
    options: [
      {
        id: 'local',
        label: 'Privacidad absoluta (100% en local)',
        hint: 'Mis notas de campo, borradores y datos personales no deben viajar jamás a ningún servidor externo.',
      },
      {
        id: 'cloud_safe',
        label: 'Nube con garantías comerciales',
        hint: 'Pueden procesarse en centros de datos seguros siempre que los proveedores no entrenen con mis datos.',
      },
    ],
  },
  {
    id: 'complexity',
    title: '3. Complejidad de las tareas',
    subtitle: '¿Qué tipo de trabajos le vas a encomendar principalmente?',
    options: [
      {
        id: 'simple',
        label: 'Tareas organizativas y directas',
        hint: 'Ordenar archivos en carpetas, convertir tablas CSV a Markdown, renombrar fotos según fecha.',
      },
      {
        id: 'hard',
        label: 'Tareas analíticas y reconciliación de datos',
        hint: 'Resolver discrepancias taxonómicas, analizar relaciones en grafos o depurar scripts largos.',
      },
    ],
  },
];

export default function CuestionarioAgente() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    budget: 'zero',
    privacy: 'local',
    complexity: 'simple',
  });
  const titleId = useId();

  const handleSelect = (qId: string, optId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  // Determine recommendation logic
  const getRecommendation = () => {
    const { budget, privacy, complexity } = answers;

    if (privacy === 'local' || budget === 'zero') {
      if (complexity === 'hard') {
        return {
          agent: 'OpenCode + Ollama (o Aider)',
          model: 'DeepSeek-R1 (7B/8B) o Qwen 2.5 Coder (7B) vía Ollama',
          cost: '0 € (Completamente gratuito)',
          privacyNote: '100% Local en tu Mac. Sin conexión a internet.',
          why: 'Al priorizar coste cero o privacidad total, la combinación de OpenCode con Ollama en tu Mac te ofrece un entorno cerrado sin enviar un solo byte fuera de tu ordenador. Para tareas complejas, un modelo con razonamiento local (como DeepSeek-R1 cuantizado) analiza el problema con rigor.',
          command: 'opencode --model ollama/deepseek-r1:8b',
        };
      }
      return {
        agent: 'OpenCode con Ollama (o Aider)',
        model: 'Llama 3.2 (3B) o Qwen 2.5 Coder (3B) vía Ollama',
        cost: '0 € (Completamente gratuito)',
        privacyNote: '100% Local en tu Mac. Sin conexión a internet.',
        why: 'Para organizar archivos, renombrar y tareas de escritorio cotidianas sin gastar nada y sin conexión a internet, un modelo ligero local en tu Mac Apple Silicon vuela en velocidad y consume un mínimo de memoria RAM unificada.',
        command: 'opencode --model ollama/llama3.2',
      };
    }

    if (budget === 'subscription' && complexity === 'hard') {
      return {
        agent: 'Claude Code',
        model: 'Claude 3.7 Sonnet (con modo de razonamiento extendido)',
        cost: 'Suscripción Claude Pro/Max (aprox. 20$/mes)',
        privacyNote: 'Nube Anthropic (con política de no entrenamiento para cuentas de pago).',
        why: 'Si dispones de suscripción y buscas el máximo nivel de inteligencia para resolver problemas intrincados o refactorizaciones complejas, Claude Code es el agente de terminal más potente y pulido en la actualidad.',
        command: 'claude',
      };
    }

    // Default API / balanced choice
    return {
      agent: 'OpenCode o Aider con API de bajo coste',
      model: 'Claude 3.5 Haiku o Gemini Flash vía OpenRouter / API directa',
      cost: 'Unos céntimos por sesión (pago por token)',
      privacyNote: 'Nube comercial rápida.',
      why: 'La opción más equilibrada: aprovechas la ligereza de una interfaz abierta sin ataduras y sólo pagas fracciones de céntimo cuando realmente necesitas procesar lotes de documentos con gran velocidad.',
      command: 'opencode --model openrouter/anthropic/claude-3.5-haiku',
    };
  };

  const rec = getRecommendation();

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
          Asesor Personal · Brújula de Decisión
        </span>
        <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
          ¿Qué combinación de Agente y Modelo se adapta mejor a ti?
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0.35rem 0 0' }}>
          Responde a estas tres preguntas sobre tus necesidades reales en el Mac y obtendrás la configuración recomendada:
        </p>
      </div>

      {/* Questions Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            style={{
              background: '#090d16',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              padding: '1rem',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc', marginBottom: '0.2rem' }}>
              {q.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
              {q.subtitle}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(q.id, opt.id)}
                    style={{
                      textAlign: 'left',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
                      background: isSelected ? 'rgba(14, 165, 233, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        color: isSelected ? 'var(--sl-color-accent-high, #38bdf8)' : '#e2e8f0',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {isSelected ? '● ' : '○ '} {opt.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.3 }}>
                      {opt.hint}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Box */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)',
          borderRadius: '8px',
          border: '1px solid var(--sl-color-accent, #0ea5e9)',
          padding: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.05em' }}>
              Tu Configuración Recomendada
            </span>
            <h5 style={{ margin: '0.15rem 0 0', fontSize: '1.1rem', color: '#ffffff' }}>
              🎯 {rec.agent}
            </h5>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', background: 'rgba(16, 185, 129, 0.2)', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
              {rec.cost}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5, margin: '0 0 0.85rem' }}>
          {rec.why}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', fontSize: '0.8rem', marginBottom: '0.85rem' }}>
          <div style={{ background: '#090d16', padding: '0.5rem 0.7rem', borderRadius: '5px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.72rem' }}>Motor de IA sugerido:</span>
            <strong style={{ color: '#f1f5f9' }}>{rec.model}</strong>
          </div>
          <div style={{ background: '#090d16', padding: '0.5rem 0.7rem', borderRadius: '5px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.72rem' }}>Privacidad:</span>
            <strong style={{ color: '#34d399' }}>{rec.privacyNote}</strong>
          </div>
        </div>

        <div
          style={{
            background: '#020617',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #1e293b',
            fontFamily: 'var(--sl-font-mono, monospace)',
            fontSize: '0.8rem',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <span>Comando para iniciar: <code>{rec.command}</code></span>
        </div>
      </div>
    </div>
  );
}
