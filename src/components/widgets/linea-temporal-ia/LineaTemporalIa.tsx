import React, { useState, useId } from 'react';

interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  userImpact: string;
  biologicalAnalogy: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    year: '2017',
    title: 'El Mecanismo de Atención',
    subtitle: 'Nace la arquitectura Transformer',
    badge: 'Fundación Matemática',
    badgeColor: '#0ea5e9',
    description: 'Investigadores de Google publican "Attention is All You Need". Se abandona el análisis secuencial lento y las máquinas aprenden a relacionar cualquier palabra con el resto de la frase simultáneamente.',
    userImpact: 'Permitió que los traductores automáticos dejasen de traducir palabra a palabra de forma tosca y empezasen a captar el sentido global.',
    biologicalAnalogy: 'La aparición de los primeros ojos compuestos en el Cámbrico: en lugar de sentir el entorno por contacto químico ciego, el organismo capta todo el campo visual a la vez.',
  },
  {
    id: 'm2',
    year: '2020–2022',
    title: 'Escala y Diálogo Natural',
    subtitle: 'De GPT-3 al lanzamiento de ChatGPT',
    badge: 'Democratización',
    badgeColor: '#38bdf8',
    description: 'Se descubre que al aumentar los parámetros a cientos de miles de millones emergen capacidades inesperadas. La IA sale de los laboratorios y cualquier persona puede dialogar con ella en su navegador.',
    userImpact: 'La informática deja de exigir sintaxis de programación para tareas de redacción, traducción y síntesis.',
    biologicalAnalogy: 'El salto evolutivo hacia la neocorteza cerebral en mamíferos: una gran expansión de tejido neuronal indiferenciado que permite plasticidad y aprendizaje adaptativo.',
  },
  {
    id: 'm3',
    year: '2023–2024',
    title: 'Multimodalidad y Modelos Locales',
    subtitle: 'Ojos, voz y modelos que caben en tu Mac',
    badge: 'Eficiencia y Sentidos',
    badgeColor: '#10b981',
    description: 'Los modelos integran imágenes, audio y texto en la misma red. A la vez, técnicas de cuantización (L06) permiten que modelos pequeños (Llama, Qwen) corran a gran velocidad en la memoria unificada de un Mac sin internet.',
    userImpact: 'Puedes enseñar fotos de una flor desconocida al modelo y ejecutar agentes privados sin pagar cuotas mensuales ni depender de la nube.',
    biologicalAnalogy: 'La integración sensorial del tálamo: vista, oído y tacto convergen en una misma representación del mundo físico.',
  },
  {
    id: 'm4',
    year: '2024–2025',
    title: 'El Razonamiento Deliberado',
    subtitle: 'Modelos con cadena de pensamiento (*Thinking*)',
    badge: 'Pensamiento Crítico',
    badgeColor: '#a855f7',
    description: 'Modelos como OpenAI o1, DeepSeek-R1 y Claude 3.7 Sonnet. En lugar de responder por impulso probabilístico inmediato, dedican segundos a trazar hipótesis, contrastar fuentes y corregir sus propios errores antes de emitir la respuesta.',
    userImpact: 'Salto cuántico en fiabilidad lógica, matemáticas, resolución de taxonomías complejas y depuración de código.',
    biologicalAnalogy: 'La deliberación consciente prefrontal: el animal no reacciona por reflejo instintivo inmediato; se detiene a sopesar opciones antes de dar el salto.',
  },
  {
    id: 'm5',
    year: '2025–2026',
    title: 'Agentes, Protocolo MCP y Fabricación',
    subtitle: 'La IA sale de la pantalla y actúa en el mundo',
    badge: 'Autonomía Práctica',
    badgeColor: '#f59e0b',
    description: 'Con el protocolo estándar MCP y herramientas CLI (Claude Code, OpenCode, FreeCAD), los modelos dejan de ser "oráculos que responden" y pasan a ser "colaboradores que ejecutan": leen carpetas, modifican archivos y diseñan piezas 3D reales.',
    userImpact: 'Tú te conviertes en el director o investigador principal: defines objetivos y supervisas acciones, mientras la máquina asume el trabajo mecánico.',
    biologicalAnalogy: 'El desarrollo de las extremidades articuladas y el pulgar oponible: la mente ya no solo contempla el entorno, ahora puede fabricar herramientas y transformar la materia.',
  },
];

export default function LineaTemporalIa() {
  const [selectedId, setSelectedId] = useState<string>('m5');
  const titleId = useId();

  const currentMilestone = MILESTONES.find((m) => m.id === selectedId) || MILESTONES[4];

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
          Perspectiva Histórica · Línea Temporal Interactiva
        </span>
        <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
          La Gran Evolución: Del Transformer al Agente de Escritorio
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0.35rem 0 0' }}>
          Selecciona cada hito para comprender cómo hemos llegado desde una fórmula matemática en 2017 hasta imprimir piezas reales en 3D hoy:
        </p>
      </div>

      {/* Horizontal timeline selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          marginBottom: '1.25rem',
        }}
      >
        {MILESTONES.map((m) => {
          const isSelected = selectedId === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.65rem 0.4rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isSelected ? m.badgeColor : '#1e293b',
                background: isSelected ? 'rgba(15, 23, 42, 0.9)' : '#090d16',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: m.badgeColor }}>
                {m.year}
              </span>
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  marginTop: '0.15rem',
                  textAlign: 'center',
                  lineHeight: 1.25,
                }}
              >
                {m.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Card */}
      <div
        style={{
          background: '#020617',
          borderRadius: '8px',
          border: `1px solid ${currentMilestone.badgeColor}`,
          padding: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: currentMilestone.badgeColor, textTransform: 'uppercase' }}>
              Hito {currentMilestone.year} · {currentMilestone.badge}
            </span>
            <h5 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', color: '#f8fafc' }}>
              {currentMilestone.title}
            </h5>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              {currentMilestone.subtitle}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.85rem' }}>
          {currentMilestone.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', display: 'block', marginBottom: '0.2rem' }}>
              Impacto directo en tu día a día:
            </span>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.4 }}>
              {currentMilestone.userImpact}
            </p>
          </div>

          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', display: 'block', marginBottom: '0.2rem' }}>
              Paralelismo biológico:
            </span>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.4 }}>
              {currentMilestone.biologicalAnalogy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
