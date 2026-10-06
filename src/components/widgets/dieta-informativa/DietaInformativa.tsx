import React, { useState, useId } from 'react';

type Tab = 'fuentes' | 'filtro' | 'ritual';

export default function DietaInformativa() {
  const [activeTab, setActiveTab] = useState<Tab>('fuentes');
  const titleId = useId();

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
            Higiene Mental · Guía de Recursos Curada
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Tu Dieta Informativa: Cómo Estar al Día sin Sobrecarga
          </h4>
        </div>

        {/* Tabs switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#090d16', padding: '0.25rem', borderRadius: '8px' }}>
          {[
            { id: 'fuentes', label: '📚 3 Fuentes Serias' },
            { id: 'filtro', label: '🛑 Filtro Anti-Hype' },
            { id: 'ritual', label: '🌿 El Ritual Mensual' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as Tab)}
              style={{
                border: 'none',
                background: activeTab === t.id ? 'var(--sl-color-accent, #0ea5e9)' : 'transparent',
                color: activeTab === t.id ? '#ffffff' : '#94a3b8',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: activeTab === t.id ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Fuentes */}
      {activeTab === 'fuentes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0 }}>
            Para no perder horas en tertulias alarmistas, te basta seguir tres fuentes de primera mano:
          </p>

          <div
            style={{
              background: '#090d16',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              padding: '0.85rem 1rem',
            }}
          >
            <div style={{ fontWeight: 600, color: '#38bdf8', fontSize: '0.88rem', marginBottom: '0.2rem' }}>
              1. Blogs de Investigación y Documentación Oficial
            </div>
            <p style={{ margin: '0 0 0.4rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Las notas técnicas de <em>Anthropic Research</em>, <em>Google DeepMind</em> y <em>Hugging Face</em>. Anuncian avances con datos experimentales, limitaciones admitidas y benchmarks reproducibles, sin adjetivos sensacionalistas.
            </p>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Frecuencia aconsejada: una vez al mes.</span>
          </div>

          <div
            style={{
              background: '#090d16',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              padding: '0.85rem 1rem',
            }}
          >
            <div style={{ fontWeight: 600, color: '#34d399', fontSize: '0.88rem', marginBottom: '0.2rem' }}>
              2. Divulgación Técnica Rigurosa (Prácticos del Código)
            </div>
            <p style={{ margin: '0 0 0.4rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Espacios como el cuaderno de notas de <em>Simon Willison</em> (pionero en probar agentes y ciberseguridad) o <em>DotCSV</em> (en español, centrado en explicaciones visuales de la matemática). No venden cursos milagrosos; enseñan lo que funciona y lo que falla.
            </p>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Frecuencia aconsejada: cada 2 o 3 semanas.</span>
          </div>

          <div
            style={{
              background: '#090d16',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              padding: '0.85rem 1rem',
            }}
          >
            <div style={{ fontWeight: 600, color: '#a78bfa', fontSize: '0.88rem', marginBottom: '0.2rem' }}>
              3. Noticias Oficiales de la Unión Europea (AI Office)
            </div>
            <p style={{ margin: '0 0 0.4rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              El portal oficial de la Oficina Europea de Inteligencia Artificial para seguir la aplicación de la <em>Ley de IA (AI Act)</em>: tus derechos como ciudadano, transparencia y prohibición de sistemas de vigilancia biométrica o manipulación cognitiva.
            </p>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Frecuencia aconsejada: consulta trimestral.</span>
          </div>
        </div>
      )}

      {/* Tab 2: Filtro */}
      {activeTab === 'filtro' && (
        <div>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.85rem' }}>
            Aplica este filtro mental cada vez que leas un titular en la prensa generalista o en redes:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                padding: '0.85rem',
              }}
            >
              <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                🛑 Señales de Humo / Desinformación
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#fca5a5', fontSize: '0.78rem', lineHeight: 1.5 }}>
                <li>"La IA ha alcanzado la consciencia humana."</li>
                <li>"Quedan 6 meses antes de que desaparezcan todos los empleos."</li>
                <li>"El truco definitivo de 3 palabras para que la IA haga tu trabajo."</li>
                <li>Noticias que no citan el nombre exacto del modelo ni el enlace a la prueba pública.</li>
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: '8px',
                padding: '0.85rem',
              }}
            >
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                ✅ Señales de Información Sustancial
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#a7f3d0', fontSize: '0.78rem', lineHeight: 1.5 }}>
                <li>Se publica un artículo en arXiv con código abierto y pesos descargables.</li>
                <li>Se reducen las necesidades de memoria RAM para ejecutar modelos en local.</li>
                <li>Se corrigen vulnerabilidades de seguridad documentadas o sesgos.</li>
                <li>Se anuncian herramientas con compatibilidad multiplataforma y estándares como MCP.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Ritual */}
      {activeTab === 'ritual' && (
        <div
          style={{
            background: '#090d16',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            padding: '1.25rem',
          }}
        >
          <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            El Ritual de los 30 Minutos (Primer Domingo de Mes)
          </div>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1rem' }}>
            No necesitas seguir el ritmo frenético de Silicon Valley todos los días. Para tener un criterio más sólido que el 99% de la población, te basta este sencillo ritual mensual:
          </p>

          <ol style={{ margin: 0, paddingLeft: '1.4rem', color: '#e2e8f0', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>
              <strong>15 minutos de lectura tranquila:</strong> Abre tu carpeta de marcadores en Safari y lee un solo artículo técnico reposado sobre las novedades del mes.
            </li>
            <li>
              <strong>15 minutos de mantenimiento en tu Mac:</strong> Abre la terminal y escribe <code>brew update && brew upgrade</code> o comprueba si hay un nuevo modelo ligero en Ollama con <code>ollama list</code>.
            </li>
            <li>
              <strong>Cierre incondicional:</strong> Cierra el ordenador, sal al campo, cuida tus bonsáis o disfruta de una buena lectura en papel. La inteligencia artificial es solo una herramienta útil a tu servicio, jamás el centro de tu vida.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
