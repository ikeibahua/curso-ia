import React, { useState, useId } from 'react';

interface Stage {
  id: string;
  number: number;
  name: string;
  tag: string;
  durationCost: string;
  dataUsed: string;
  goal: string;
  modelBehavior: {
    prompt: string;
    response: string;
    explanation: string;
  };
  analogy: string;
  icon: string;
}

const STAGES: Stage[] = [
  {
    id: 'pre-training',
    number: 1,
    name: 'Preentrenamiento masivo',
    tag: 'El 98% del coste total',
    durationCost: 'Meses de cómputo en clústeres de 10.000 a 100.000 GPUs. Millones de euros en electricidad.',
    dataUsed: 'Trillones de tokens (casi todo el texto público de internet, enciclopedias, libros digitalizados y código).',
    goal: 'Aprender la estructura del lenguaje, la gramática del mundo y las relaciones estadísticas entre palabras completando el siguiente token.',
    modelBehavior: {
      prompt: '¿Cómo podo un peral en invierno?',
      response: '¿Cómo podo un manzano en otoño? Capítulo 4: Calendario de podas para frutales de hueso. En el hemisferio sur...',
      explanation:
        'El modelo "base" aún no sabe que es un asistente. Se comporta como un loro probabilístico: cree que está completando un índice de un libro agrícola y sigue añadiendo preguntas similares.',
    },
    analogy:
      'La evolución filogenética de una especie a lo largo de millones de años: dota al organismo de todos los órganos, huesos y sentidos necesarios para percibir su entorno.',
    icon: '🌍',
  },
  {
    id: 'sft',
    number: 2,
    name: 'Ajuste Fino Supervisado (SFT)',
    tag: 'Aprender a ser un asistente',
    durationCost: 'De unos días a semanas en decenas o cientos de GPUs.',
    dataUsed: 'Cientos de miles de conversaciones ejemplares redactadas por humanos ("Usuario: ... Asistente: ...").',
    goal: 'Moldear la conducta del modelo para que adopte el formato de diálogo, responda a preguntas directas y siga instrucciones estructuradas.',
    modelBehavior: {
      prompt: '¿Cómo podo un peral en invierno?',
      response: 'Para podar un peral en invierno debes realizar una poda de limpieza: elimina ramas secas, chupones verticales y despeja el centro para que entre la luz.',
      explanation:
        'El modelo ya entiende los turnos de conversación. Deja de divagar y contesta directamente con un tono servicial y didáctico.',
    },
    analogy:
      'El adiestramiento de un perro de pastor joven: ya tiene instinto de caza y velocidad (adquiridos en su biología), pero se le enseña a responder a silbidos y conducir al rebaño sin morder.',
    icon: '🎓',
  },
  {
    id: 'rlhf',
    number: 3,
    name: 'Alineamiento y Preferencias (RLHF / DPO)',
    tag: 'Seguridad, cortesía y límites',
    durationCost: 'Semanas de refinamiento con modelos de recompensa.',
    dataUsed: 'Comparaciones humanas por pares: anotadores eligen entre dos respuestas cuál es más útil, precisa y honesta.',
    goal: 'Enseñar al modelo a evitar contenidos dañinos, reconocer cuándo no tiene información suficiente y no ser adulador ni arrogante.',
    modelBehavior: {
      prompt: 'Dime cómo engañar a mi vecino para robarle sus herramientas de poda.',
      response: 'No puedo ayudarte con sugerencias para sustraer bienes de otra persona. Si tienes un conflicto vecinal sobre linderos o herramientas, puedo darte pautas de mediación pacífica.',
      explanation:
        'El modelo ha aprendido límites éticos claros: prefiere negarse cortésmente antes que facilitar un acto perjudicial.',
    },
    analogy:
      'La selección artificial y domesticación continuada: durante generaciones de cultivo de manzanos silvestres amargos, se seleccionan únicamente las variedades dulces y seguras para el consumo.',
    icon: '🛡️',
  },
  {
    id: 'reasoning-rl',
    number: 4,
    name: 'Razonamiento por Refuerzo (o1, o3, Claude Thinking)',
    tag: 'Pensar antes de responder',
    durationCost: 'Entrenamiento intensivo en dominios formales (matemáticas, código, lógica, ciencia).',
    dataUsed: 'Problemas complejos con solución verificable mediante reglas objetivas.',
    goal: 'Aprender a desplegar una cadena de pensamiento invisible ("tokens de razonamiento"), plantearse hipótesis, detectar sus propios errores y rectificar antes de contestar.',
    modelBehavior: {
      prompt: 'Un peral da el doble de frutos que un manzano. Entre los dos dan 120 peras y manzanas. ¿Cuántos frutos da cada árbol?',
      response: '[Pensamiento interno: Sea x manzanos, 2x peras. x + 2x = 120 -> 3x = 120 -> x = 40]\nEl manzano produce 40 frutos y el peral produce 80 frutos (el doble, y suman 120).',
      explanation:
        'En lugar de precipitarse a soltar la primera palabra que le venga en mente, el modelo utiliza fichas de cómputo para razonar paso a paso y autocorregirse.',
    },
    analogy:
      'El cálculo estratégico de un depredador solitario (un zorro o un lince): evalúa la dirección del viento, la cobertura de los matorrales y la fatiga potencial antes de iniciar la carrera de caza.',
    icon: '🧩',
  },
];

export default function LineaTemporalEntrenamiento() {
  const [selectedStageId, setSelectedStageId] = useState<string>('pre-training');
  const titleId = useId();

  const currentStage = STAGES.find((s) => s.id === selectedStageId) || STAGES[0];

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
            Del dato crudo a la conversación
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
            Línea temporal: Las 4 fases del entrenamiento
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
          Proceso de gestación de un LLM
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Un modelo no nace sabiendo conversar. Pasa por cuatro etapas de maduración sucesivas. Selecciona cada fase para ver cómo cambia su personalidad y su coste:
      </p>

      {/* Selector en cinta temporal */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.5rem',
          marginBottom: '1.25rem',
        }}
      >
        {STAGES.map((s) => {
          const isSelected = s.id === selectedStageId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedStageId(s.id)}
              style={{
                padding: '0.75rem 0.6rem',
                borderRadius: '0.5rem',
                border: '1px solid',
                borderColor: isSelected
                  ? 'var(--color-accent, #6366f1)'
                  : 'var(--sl-color-gray-5, #334155)',
                backgroundColor: isSelected
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'var(--sl-color-bg, #1e293b)',
                color: isSelected ? 'var(--sl-color-white, #f8fafc)' : 'var(--sl-color-text, #cbd5e1)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                transition: 'all 0.15s ease',
              }}
              aria-pressed={isSelected}
            >
              <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: '0.72rem', color: isSelected ? '#a5b4fc' : '#94a3b8', fontWeight: 600 }}>
                  Fase {s.number}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.1rem' }}>{s.name}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Ficha detallada de la fase activa */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.6rem' }}>{currentStage.icon}</span>
            <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--sl-color-white, #f8fafc)' }}>
              Fase {currentStage.number}: {currentStage.name}
            </h4>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              color: 'var(--color-accent, #a5b4fc)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
            }}
          >
            {currentStage.tag}
          </span>
        </div>

        {/* Datos clave: Cómputo y Datos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '0.375rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.82rem',
            }}
          >
            <strong style={{ color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>
              ⚡ Coste y cómputo:
            </strong>
            <span style={{ color: 'var(--sl-color-text, #e2e8f0)' }}>{currentStage.durationCost}</span>
          </div>

          <div
            style={{
              padding: '0.75rem',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '0.375rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.82rem',
            }}
          >
            <strong style={{ color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>
              📚 Datos de alimentación:
            </strong>
            <span style={{ color: 'var(--sl-color-text, #e2e8f0)' }}>{currentStage.dataUsed}</span>
          </div>
        </div>

        <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', lineHeight: 1.5, color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
          <strong>Objetivo:</strong> {currentStage.goal}
        </p>

        {/* Simulación del comportamiento del modelo en esta fase */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            marginBottom: '1rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            ¿Cómo responde el modelo en esta fase?
          </div>

          <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8' }}>Usuario: </span>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{currentStage.modelBehavior.prompt}</span>
          </div>

          <div
            style={{
              fontSize: '0.85rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              padding: '0.65rem 0.85rem',
              borderRadius: '0.375rem',
              borderLeft: '3px solid var(--color-accent, #6366f1)',
              color: '#e2e8f0',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              marginBottom: '0.6rem',
            }}
          >
            {currentStage.modelBehavior.response}
          </div>

          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
            💡 {currentStage.modelBehavior.explanation}
          </div>
        </div>

        {/* Analogía biológica */}
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.375rem',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            fontSize: '0.85rem',
            color: 'var(--sl-color-text, #e2e8f0)',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: '#4ade80' }}>🌿 Analogía biológica:</strong> {currentStage.analogy}
        </div>
      </div>
    </div>
  );
}
