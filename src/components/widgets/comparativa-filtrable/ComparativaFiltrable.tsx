import React, { useState, useId } from 'react';

interface AgentTool {
  id: string;
  name: string;
  creator: string;
  license: 'Abierto (Open Source)' | 'Comercial cerrado';
  costCategory: 'Gratuito / Local (0€)' | 'Suscripción o pago por token';
  costDetail: string;
  privacy: '100% Local opcional' | 'Solo Nube (servidores remotos)';
  privacyDetail: string;
  modelsSupported: string;
  keyStrength: string;
  installCommand: string;
  verifiedDate: string;
}

const AGENT_DATA: AgentTool[] = [
  {
    id: 'opencode',
    name: 'OpenCode',
    creator: 'Comunidad Open Source (anomalyco)',
    license: 'Abierto (Open Source)',
    costCategory: 'Gratuito / Local (0€)',
    costDetail: 'El software es libre y gratuito. Puedes conectarlo a Ollama local (0€) o usar claves API gratuitas/de bajo coste.',
    privacy: '100% Local opcional',
    privacyDetail: 'Si usas Ollama o un modelo local en tu Mac, ningún dato ni archivo sale jamás de tu ordenador.',
    modelsSupported: '75+ proveedores (Ollama, Anthropic, OpenAI, DeepSeek, OpenRouter, Gemini)',
    keyStrength: 'Interfaz visual en terminal (TUI), cambio de modelo al vuelo y máxima libertad sin permanencia.',
    installCommand: 'brew install anomalyco/tap/opencode',
    verifiedDate: '2026-03',
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    creator: 'Anthropic',
    license: 'Comercial cerrado',
    costCategory: 'Suscripción o pago por token',
    costDetail: 'Requiere suscripción Claude Pro/Max ($20/mes) o saldo activo en la API de Anthropic.',
    privacy: 'Solo Nube (servidores remotos)',
    privacyDetail: 'Tu código y peticiones viajan a los centros de datos de Anthropic (conforme a sus políticas de no entrenamiento de clientes de pago).',
    modelsSupported: 'Exclusivo modelos Claude (Claude 3.7 Sonnet con razonamiento híbrido, Claude 3.5 Haiku)',
    keyStrength: 'Capacidad de razonamiento puntera en programación, subagentes especializados y gestión de contexto masiva.',
    installCommand: 'curl -fsSL https://claude.ai/install.sh | bash',
    verifiedDate: '2026-03',
  },
  {
    id: 'aider',
    name: 'Aider',
    creator: 'Paul Gauthier & Comunidad',
    license: 'Abierto (Open Source)',
    costCategory: 'Gratuito / Local (0€)',
    costDetail: 'Software libre. Si usas modelos locales con Ollama el coste es 0€. También soporta cualquier API.',
    privacy: '100% Local opcional',
    privacyDetail: 'Compatible con modelos locales sin conexión a internet si configuras Ollama en tu Mac.',
    modelsSupported: 'Cualquier modelo (Ollama local, DeepSeek, Claude, GPT-4o, Groq, etc.)',
    keyStrength: 'Commits automáticos y descriptivos en Git tras cada paso, modo arquitecto/editor muy depurado.',
    installCommand: 'brew install aider',
    verifiedDate: '2026-03',
  },
  {
    id: 'goose',
    name: 'Goose',
    creator: 'Block / Square',
    license: 'Abierto (Open Source)',
    costCategory: 'Gratuito / Local (0€)',
    costDetail: 'Completamente gratuito y de código abierto. Tú eliges qué motor de IA utilizar.',
    privacy: '100% Local opcional',
    privacyDetail: 'Soporta configuración local o endpoints corporativos con control exhaustivo de telemetría.',
    modelsSupported: 'Ollama local, Databricks, OpenAI, Anthropic, etc.',
    keyStrength: 'Enfoque centrado en herramientas modulares y soporte directo para el protocolo MCP.',
    installCommand: 'curl -fsSL https://github.com/block/goose/releases/latest/download/goose-mac.sh | bash',
    verifiedDate: '2026-03',
  },
  {
    id: 'copilot-cli',
    name: 'GitHub Copilot CLI',
    creator: 'Microsoft / GitHub',
    license: 'Comercial cerrado',
    costCategory: 'Suscripción o pago por token',
    costDetail: 'Requiere suscripción a GitHub Copilot ($10/mes individual o plan de empresa).',
    privacy: 'Solo Nube (servidores remotos)',
    privacyDetail: 'Las peticiones se procesan en la nube de Microsoft Azure.',
    modelsSupported: 'Modelos preconfigurados en GitHub (GPT-4o, Claude Sonnet, o1)',
    keyStrength: 'Integración perfecta con el historial y repositorios de GitHub.',
    installCommand: 'gh extension install github/gh-copilot',
    verifiedDate: '2026-03',
  },
];

export default function ComparativaFiltrable() {
  const [filterLicense, setFilterLicense] = useState<string>('all');
  const [filterPrivacy, setFilterPrivacy] = useState<string>('all');
  const [filterCost, setFilterCost] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('opencode');
  const titleId = useId();

  const filtered = AGENT_DATA.filter((agent) => {
    if (filterLicense !== 'all' && agent.license !== filterLicense) return false;
    if (filterPrivacy !== 'all' && agent.privacy !== filterPrivacy) return false;
    if (filterCost !== 'all' && agent.costCategory !== filterCost) return false;
    return true;
  });

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
          Ecosistema Verificado · Comparativa Filtrable
        </span>
        <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
          Agentes de Terminal: Modelos, Costes y Privacidad
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0.35rem 0 0' }}>
          Filtra según tus preferencias: ¿buscas gasto 0€ en local o la máxima inteligencia en la nube?
        </p>
      </div>

      {/* Filter Bars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          padding: '0.85rem',
          background: '#090d16',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          marginBottom: '1rem',
        }}
      >
        {/* Filter License */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.3rem' }}>
            Licencia:
          </label>
          <select
            value={filterLicense}
            onChange={(e) => setFilterLicense(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.5rem',
              borderRadius: '5px',
              border: '1px solid #334155',
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '0.82rem',
            }}
          >
            <option value="all">Todas las licencias</option>
            <option value="Abierto (Open Source)">Abierto (Open Source)</option>
            <option value="Comercial cerrado">Comercial cerrado</option>
          </select>
        </div>

        {/* Filter Cost */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.3rem' }}>
            Coste:
          </label>
          <select
            value={filterCost}
            onChange={(e) => setFilterCost(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.5rem',
              borderRadius: '5px',
              border: '1px solid #334155',
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '0.82rem',
            }}
          >
            <option value="all">Cualquier coste</option>
            <option value="Gratuito / Local (0€)">Gratuito / Local (0€)</option>
            <option value="Suscripción o pago por token">Suscripción o pago por token</option>
          </select>
        </div>

        {/* Filter Privacy */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.3rem' }}>
            Privacidad:
          </label>
          <select
            value={filterPrivacy}
            onChange={(e) => setFilterPrivacy(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.5rem',
              borderRadius: '5px',
              border: '1px solid #334155',
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '0.82rem',
            }}
          >
            <option value="all">Cualquier privacidad</option>
            <option value="100% Local opcional">100% Local opcional</option>
            <option value="Solo Nube (servidores remotos)">Solo Nube</option>
          </select>
        </div>
      </div>

      {/* Agents Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
            No hay herramientas que coincidan con los filtros seleccionados. Prueba a restablecer los filtros.
          </div>
        ) : (
          filtered.map((tool) => {
            const isExpanded = expandedId === tool.id;
            const isOpenSource = tool.license === 'Abierto (Open Source)';
            const isFree = tool.costCategory === 'Gratuito / Local (0€)';

            return (
              <div
                key={tool.id}
                style={{
                  borderRadius: '8px',
                  border: isExpanded ? '1px solid var(--sl-color-accent, #0ea5e9)' : '1px solid #1e293b',
                  background: isExpanded ? 'rgba(15, 23, 42, 0.9)' : '#090d16',
                  overflow: 'hidden',
                  transition: 'border 0.2s',
                }}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>{tool.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({tool.creator})</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: isOpenSource ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                        color: isOpenSource ? '#34d399' : '#cbd5e1',
                        border: `1px solid ${isOpenSource ? '#059669' : '#475569'}`,
                      }}
                    >
                      {isOpenSource ? 'Código Abierto' : 'Comercial'}
                    </span>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: isFree ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: isFree ? '#38bdf8' : '#fbbf24',
                        border: `1px solid ${isFree ? '#0284c7' : '#d97706'}`,
                      }}
                    >
                      {isFree ? '0€ (Ollama/Free)' : 'Suscripción'}
                    </span>

                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '0.4rem' }}>
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0.85rem 1rem 1rem',
                      borderTop: '1px solid #1e293b',
                      fontSize: '0.85rem',
                      background: 'rgba(2, 6, 23, 0.4)',
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <strong style={{ color: '#38bdf8' }}>Modelos compatibles:</strong>
                        <p style={{ margin: '0.2rem 0 0', color: '#cbd5e1', fontSize: '0.82rem' }}>{tool.modelsSupported}</p>
                      </div>
                      <div>
                        <strong style={{ color: '#34d399' }}>Privacidad y datos:</strong>
                        <p style={{ margin: '0.2rem 0 0', color: '#cbd5e1', fontSize: '0.82rem' }}>{tool.privacyDetail}</p>
                      </div>
                      <div>
                        <strong style={{ color: '#fbbf24' }}>Punto fuerte:</strong>
                        <p style={{ margin: '0.2rem 0 0', color: '#cbd5e1', fontSize: '0.82rem' }}>{tool.keyStrength}</p>
                      </div>
                      <div>
                        <strong style={{ color: '#a78bfa' }}>Detalle de coste:</strong>
                        <p style={{ margin: '0.2rem 0 0', color: '#cbd5e1', fontSize: '0.82rem' }}>{tool.costDetail}</p>
                      </div>
                    </div>

                    {/* Installation command snippet */}
                    <div
                      style={{
                        background: '#020617',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #1e293b',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontFamily: 'var(--sl-font-mono, monospace)',
                        fontSize: '0.78rem',
                      }}
                    >
                      <span style={{ color: '#94a3b8' }}>Instalación: <code style={{ color: '#38bdf8' }}>{tool.installCommand}</code></span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Verificado: {tool.verifiedDate}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
