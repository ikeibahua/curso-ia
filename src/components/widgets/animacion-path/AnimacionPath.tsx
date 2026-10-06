import React, { useState, useEffect, useId, useRef } from 'react';

interface PathDirectory {
  path: string;
  description: string;
  installedBinaries: string[];
}

const PATH_DIRECTORIES: PathDirectory[] = [
  {
    path: '/opt/homebrew/bin',
    description: '1. Programas instalados con Homebrew (Apple Silicon)',
    installedBinaries: ['brew', 'tree', 'ollama', 'node', 'htop'],
  },
  {
    path: '/usr/local/bin',
    description: '2. Herramientas tradicionales compartidas de usuario',
    installedBinaries: ['code', 'docker'],
  },
  {
    path: '/usr/bin',
    description: '3. Utilidades estándar de macOS incluidas por Apple',
    installedBinaries: ['git', 'python3', 'curl', 'ssh', 'tar', 'man', 'nano'],
  },
  {
    path: '/bin',
    description: '4. Comandos esenciales del sistema Unix (Darwin)',
    installedBinaries: ['ls', 'cd', 'pwd', 'mkdir', 'cp', 'mv', 'rm', 'cat', 'echo', 'zsh', 'bash'],
  },
];

interface CommandQuery {
  name: string;
  expectedDirIndex: number; // -1 if not found
}

const PRESET_QUERIES: CommandQuery[] = [
  { name: 'ls', expectedDirIndex: 3 }, // /bin/ls
  { name: 'brew', expectedDirIndex: 0 }, // /opt/homebrew/bin/brew
  { name: 'git', expectedDirIndex: 2 }, // /usr/bin/git
  { name: 'tree', expectedDirIndex: 0 }, // /opt/homebrew/bin/tree
  { name: 'botanica', expectedDirIndex: -1 }, // not found
];

export default function AnimacionPath() {
  const [selectedCmd, setSelectedCmd] = useState<string>('ls');
  const [currentScanningIndex, setCurrentScanningIndex] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchFinished, setSearchFinished] = useState<boolean>(false);
  const [foundIndex, setFoundIndex] = useState<number>(-1);

  const titleId = useId();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuery = PRESET_QUERIES.find((q) => q.name === selectedCmd) || PRESET_QUERIES[0];

  const handleStartSearch = () => {
    setIsSearching(true);
    setSearchFinished(false);
    setCurrentScanningIndex(0);
    setFoundIndex(-1);
  };

  const handleSelectCommand = (cmdName: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedCmd(cmdName);
    setIsSearching(false);
    setSearchFinished(false);
    setCurrentScanningIndex(-1);
    setFoundIndex(-1);
  };

  useEffect(() => {
    if (isSearching && currentScanningIndex >= 0) {
      timerRef.current = setTimeout(() => {
        const targetDirIdx = currentQuery.expectedDirIndex;

        if (currentScanningIndex === targetDirIdx) {
          // Found here!
          setFoundIndex(currentScanningIndex);
          setIsSearching(false);
          setSearchFinished(true);
        } else if (currentScanningIndex < PATH_DIRECTORIES.length - 1) {
          // Keep searching in next folder
          setCurrentScanningIndex((prev) => prev + 1);
        } else {
          // Reached end and not found
          setFoundIndex(-1);
          setIsSearching(false);
          setSearchFinished(true);
        }
      }, 700);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isSearching, currentScanningIndex, currentQuery]);

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
            Rastreo del sistema operativo
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
            ¿Cómo encuentra tu Mac un comando? (La variable $PATH)
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
          Búsqueda lineal en armarios
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Cuando escribes <code>ls</code> o <code>brew</code>, el sistema no tiene poderes mágicos: busca el programa de izquierda a derecha en las carpetas registradas dentro de la variable <code>$PATH</code>.
      </p>

      {/* Selector de comandos a probar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>
          Elige qué comando buscar:
        </span>
        {PRESET_QUERIES.map((q) => (
          <button
            key={q.name}
            onClick={() => handleSelectCommand(q.name)}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.82rem',
              borderRadius: '0.375rem',
              border: '1px solid',
              borderColor: selectedCmd === q.name ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
              backgroundColor: selectedCmd === q.name ? 'rgba(99, 102, 241, 0.25)' : 'var(--sl-color-bg, #1e293b)',
              color: selectedCmd === q.name ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: selectedCmd === q.name ? 700 : 400,
            }}
          >
            {q.name}
          </button>
        ))}

        <button
          onClick={handleStartSearch}
          disabled={isSearching}
          style={{
            marginLeft: 'auto',
            padding: '0.45rem 1rem',
            fontSize: '0.82rem',
            borderRadius: '0.375rem',
            backgroundColor: isSearching ? 'rgba(99, 102, 241, 0.4)' : 'var(--color-accent, #6366f1)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            cursor: isSearching ? 'not-allowed' : 'pointer',
          }}
        >
          {isSearching ? '🔍 Rastreando...' : '▶️ Iniciar rastreo del PATH'}
        </button>
      </div>

      {/* Los 4 armarios de carpetas del PATH */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
        {PATH_DIRECTORIES.map((dir, idx) => {
          const isScanningNow = currentScanningIndex === idx && isSearching;
          const wasScannedMissed = (currentScanningIndex > idx || (searchFinished && foundIndex !== idx)) && idx !== foundIndex;
          const isTargetFoundHere = searchFinished && foundIndex === idx;

          let borderColor = 'var(--sl-color-gray-5, #334155)';
          let bgColor = 'var(--sl-color-bg, #1e293b)';
          let statusBadge = 'Pendiente';
          let statusBadgeColor = '#94a3b8';

          if (isScanningNow) {
            borderColor = 'var(--color-accent, #818cf8)';
            bgColor = 'rgba(99, 102, 241, 0.15)';
            statusBadge = '🔍 Comprobando...';
            statusBadgeColor = '#818cf8';
          } else if (isTargetFoundHere) {
            borderColor = '#22c55e';
            bgColor = 'rgba(34, 197, 94, 0.15)';
            statusBadge = '✅ ¡ENCONTRADO AQUÍ!';
            statusBadgeColor = '#4ade80';
          } else if (wasScannedMissed) {
            borderColor = 'rgba(239, 68, 68, 0.3)';
            bgColor = 'rgba(15, 23, 42, 0.6)';
            statusBadge = '❌ No está en esta carpeta';
            statusBadgeColor = '#f87171';
          }

          return (
            <div
              key={dir.path}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid ${borderColor}`,
                backgroundColor: bgColor,
                transition: 'all 0.25s ease',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <code style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                    {dir.path}
                  </code>
                  <span style={{ fontSize: '0.72rem', color: statusBadgeColor, fontWeight: 600 }}>
                    {statusBadge}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  {dir.description}
                </div>
              </div>

              {/* Contenido representativo */}
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {dir.installedBinaries.slice(0, 5).map((bin) => {
                  const isMatch = isTargetFoundHere && bin === selectedCmd;
                  return (
                    <span
                      key={bin}
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '0.25rem',
                        backgroundColor: isMatch ? '#22c55e' : 'rgba(255, 255, 255, 0.05)',
                        color: isMatch ? '#ffffff' : '#cbd5e1',
                        fontFamily: 'monospace',
                        fontWeight: isMatch ? 700 : 400,
                      }}
                    >
                      {bin}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Veredicto de la terminal */}
      {searchFinished && (
        <div
          style={{
            padding: '0.85rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: foundIndex >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${foundIndex >= 0 ? 'rgba(34, 197, 94, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
            fontSize: '0.85rem',
            color: '#f8fafc',
            lineHeight: 1.5,
          }}
        >
          {foundIndex >= 0 ? (
            <div>
              🎉 <strong>¡Comando ejecutado con éxito!</strong> macOS encontró el ejecutable en{' '}
              <code style={{ color: '#4ade80' }}>
                {PATH_DIRECTORIES[foundIndex].path}/{selectedCmd}
              </code>{' '}
              y detuvo la búsqueda sin necesidad de revisar las carpetas restantes.
            </div>
          ) : (
            <div>
              ⚠️ <code style={{ color: '#f87171' }}>zsh: command not found: {selectedCmd}</code>
              <br />
              El sistema revisó todos los directorios del <code>$PATH</code> uno tras otro y no encontró ningún archivo ejecutable con ese nombre.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
