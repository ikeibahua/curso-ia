import React, { useState, useId } from 'react';

interface McpServer {
  id: string;
  name: string;
  icon: string;
  category: string;
  tools: string[];
  description: string;
}

const MCP_SERVERS: McpServer[] = [
  {
    id: 'filesystem',
    name: 'Servidor Filesystem',
    icon: '📁',
    category: 'Local / Archivos',
    tools: ['read_file', 'write_file', 'list_directory'],
    description: 'Permite al agente leer y escribir únicamente dentro de carpetas autorizadas de tu disco.',
  },
  {
    id: 'sqlite',
    name: 'Servidor SQLite Herbario',
    icon: '🗄️',
    category: 'Base de datos',
    tools: ['query_species', 'get_flora_stats'],
    description: 'Consulta catálogos botánicos relacionales estructurados a máxima velocidad.',
  },
  {
    id: 'freecad',
    name: 'Servidor FreeCAD 3D',
    icon: '📐',
    category: 'Diseño paramétrico (L21)',
    tools: ['create_3d_box', 'export_stl', 'measure_volume'],
    description: 'Genera piezas mecánicas y macetas en 3D ejecutando scripts en FreeCAD (anticipo de la Lección 21).',
  },
  {
    id: 'fetch',
    name: 'Servidor WebFetch',
    icon: '🌐',
    category: 'Internet seguro',
    tools: ['fetch_markdown_url', 'download_pdf'],
    description: 'Descarga artículos científicos y páginas web limpiando la publicidad antes de entregarlos.',
  },
];

export default function DiagramaMcp() {
  const [selectedServerId, setSelectedServerId] = useState<string>('filesystem');
  const [activeAction, setActiveAction] = useState<'idle' | 'listing' | 'calling'>('idle');
  const titleId = useId();

  const selectedServer = MCP_SERVERS.find((s) => s.id === selectedServerId) || MCP_SERVERS[0];

  const handleSimulateList = () => {
    setActiveAction('listing');
  };

  const handleSimulateCall = () => {
    setActiveAction('calling');
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
            Estándar de conectividad
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
            Diagrama MCP: El USB-C de la Inteligencia Artificial
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
          Model Context Protocol
        </div>
      </div>

      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Antes de MCP, cada empresa inventaba su propio enchufe para conectar herramientas. MCP actúa como un cable USB universal: cualquier cliente de IA puede enchufarse a cualquier servidor de datos:
      </p>

      {/* Esquema interactivo: Cliente -> Cable MCP -> Servidores */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Columna Izquierda: Cliente MCP */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
              EL ANFITRIÓN / CLIENTE
            </div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#f8fafc' }}>
              🤖 Cliente MCP
            </h4>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              La aplicación donde chateas (ej. Claude Desktop, un agente en terminal o un editor de código).
            </div>

            <div
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                fontSize: '0.75rem',
                color: '#e2e8f0',
              }}
            >
              Envía peticiones y recibe resultados a través del protocolo estándar.
            </div>
          </div>

          {/* Botones de simulación */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
            <button
              onClick={handleSimulateList}
              style={{
                padding: '0.4rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: '0.375rem',
                backgroundColor: activeAction === 'listing' ? 'var(--color-accent, #6366f1)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--sl-color-gray-5, #334155)',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              1. Enviar handshake (tools/list)
            </button>
            <button
              onClick={handleSimulateCall}
              style={{
                padding: '0.4rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: '0.375rem',
                backgroundColor: activeAction === 'calling' ? '#22c55e' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--sl-color-gray-5, #334155)',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              2. Invocar herramienta (tools/call)
            </button>
          </div>
        </div>

        {/* Columna Derecha: Servidores MCP disponibles */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#4ade80', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            LOS PROVEEDORES DE CAPACIDADES
          </div>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#f8fafc' }}>
            🔌 Servidores MCP Enchufables
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {MCP_SERVERS.map((srv) => {
              const isSelected = srv.id === selectedServerId;

              return (
                <button
                  key={srv.id}
                  onClick={() => {
                    setSelectedServerId(srv.id);
                    setActiveAction('idle');
                  }}
                  style={{
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
                    backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                    color: isSelected ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'all 0.15s ease',
                  }}
                  aria-pressed={isSelected}
                >
                  <span style={{ fontSize: '1.25rem' }}>{srv.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500 }}>
                      {srv.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: isSelected ? '#a5b4fc' : '#94a3b8' }}>
                      {srv.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monitor del cable MCP (El tráfico de red JSON-RPC) */}
      <div
        style={{
          backgroundColor: '#0a0f1d',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid #1e293b',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}>
          <span>Tráfico JSON-RPC por el cable MCP:</span>
          <span style={{ color: '#4ade80' }}>Servidor conectado: {selectedServer.name}</span>
        </div>

        {activeAction === 'idle' && (
          <div style={{ color: '#64748b', fontStyle: 'italic', padding: '0.5rem 0' }}>
            (Cable listo en reposo. Pulsa en uno de los botones del cliente para simular el intercambio de datos).
          </div>
        )}

        {activeAction === 'listing' && (
          <div>
            <div style={{ color: '#60a5fa', marginBottom: '0.2rem' }}>
              → CLIENTE envia: {`{"method": "tools/list"}`}
            </div>
            <div style={{ color: '#4ade80' }}>
              ← SERVIDOR responde:{' '}
              {JSON.stringify({
                tools: selectedServer.tools.map((t) => ({ name: t })),
              })}
            </div>
            <div style={{ color: '#a5b4fc', marginTop: '0.35rem', fontSize: '0.75rem', fontFamily: 'sans-serif' }}>
              💡 El cliente acaba de aprender qué {selectedServer.tools.length} herramientas tiene este servidor sin reiniciar nada.
            </div>
          </div>
        )}

        {activeAction === 'calling' && (
          <div>
            <div style={{ color: '#60a5fa', marginBottom: '0.2rem' }}>
              → CLIENTE envia: {`{"method": "tools/call", "params": {"name": "${selectedServer.tools[0]}", "arguments": { ... }}}`}
            </div>
            <div style={{ color: '#4ade80' }}>
              ← SERVIDOR ejecuta y devuelve: {`{"result": "Éxito: Operación completada", "status": 200}`}
            </div>
            <div style={{ color: '#4ade80', marginTop: '0.35rem', fontSize: '0.75rem', fontFamily: 'sans-serif' }}>
              🎉 La herramienta se ejecutó de forma aislada en el servidor y el agente recibió el resultado.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
