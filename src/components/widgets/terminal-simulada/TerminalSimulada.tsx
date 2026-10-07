import React, { useState, useRef, useEffect, useId } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  children?: Record<string, FileNode>;
}

const INITIAL_FS: FileNode = {
  name: 'alumno',
  type: 'dir',
  children: {
    Documentos: {
      name: 'Documentos',
      type: 'dir',
      children: {
        'informe-flora.txt': {
          name: 'informe-flora.txt',
          type: 'file',
          content: 'Inventario de especies arbóreas de la vertiente norte: Fagus sylvatica, Quercus robur, Betula pendula.',
        },
        'catalogo-arboles.csv': {
          name: 'catalogo-arboles.csv',
          type: 'file',
          content: 'Especie,NombreComun,Altitud\nFagus sylvatica,Haya,800-1600\nQuercus robur,Roble carballo,0-1000',
        },
      },
    },
    Fotos: {
      name: 'Fotos',
      type: 'dir',
      children: {
        'orquidea_pirineos.jpg': {
          name: 'orquidea_pirineos.jpg',
          type: 'file',
          content: '[Archivo de imagen JPEG: 2.4 MB - Orquídea Cypripedium calceolus]',
        },
      },
    },
    Descargas: {
      name: 'Descargas',
      type: 'dir',
      children: {
        'guia_botanica.pdf': {
          name: 'guia_botanica.pdf',
          type: 'file',
          content: '[Documento PDF: Clave dicotómica ilustrada de la Península Ibérica]',
        },
      },
    },
  },
};

interface Mission {
  id: number;
  title: string;
  instruction: string;
  hint: string;
  isComplete: (command: string, cwd: string[], fs: FileNode) => boolean;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: '1. Orientación',
    instruction: 'Averigua en qué ruta estás ubicado en este momento.',
    hint: 'Escribe: pwd y pulsa Enter',
    isComplete: (cmd) => cmd.trim() === 'pwd',
  },
  {
    id: 2,
    title: '2. Inspección',
    instruction: 'Observa qué carpetas y archivos tienes en tu carpeta de inicio.',
    hint: 'Escribe: ls',
    isComplete: (cmd) => cmd.trim().startsWith('ls'),
  },
  {
    id: 3,
    title: '3. Creación',
    instruction: 'Crea una nueva carpeta llamada "cuaderno-campo".',
    hint: 'Escribe: mkdir cuaderno-campo',
    isComplete: (_cmd, _cwd, fs) => {
      return !!fs.children && 'cuaderno-campo' in fs.children;
    },
  },
  {
    id: 4,
    title: '4. Navegación',
    instruction: 'Entra dentro de tu nueva carpeta "cuaderno-campo".',
    hint: 'Escribe: cd cuaderno-campo',
    isComplete: (_cmd, cwd) => cwd.length === 1 && cwd[0] === 'cuaderno-campo',
  },
  {
    id: 5,
    title: '5. Retorno',
    instruction: 'Vuelve hacia atrás a tu carpeta de inicio (home).',
    hint: 'Escribe: cd .. o cd ~',
    isComplete: (cmd, cwd) => cwd.length === 0 && (cmd.trim() === 'cd ..' || cmd.trim() === 'cd ~' || cmd.trim() === 'cd'),
  },
];

export default function TerminalSimulada() {
  const [fs, setFs] = useState<FileNode>(JSON.parse(JSON.stringify(INITIAL_FS)));
  const [cwd, setCwd] = useState<string[]>([]); // [] represents home (~ = /Users/alumno)
  const [history, setHistory] = useState<string[]>([
    'Bienvenido a la terminal interactiva zsh simulada de macOS.',
    'Escribe "help" para ver comandos y pulsa Tab (⇥) para autocompletar.',
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [activeMissionIdx, setActiveMissionIdx] = useState<number>(0);
  const [completedMissions, setCompletedMissions] = useState<boolean[]>([false, false, false, false, false]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Current folder node reference
  const getNodeAtPath = (path: string[], root: FileNode): FileNode | null => {
    let curr = root;
    for (const part of path) {
      if (!curr.children || !curr.children[part]) return null;
      curr = curr.children[part];
    }
    return curr;
  };

  const currentPathString = '~' + (cwd.length > 0 ? '/' + cwd.join('/') : '');

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, `alumno@Mac-de-Iker ${currentPathString} % ${trimmed}`];

    // Check mission completion
    MISSIONS.forEach((m, idx) => {
      if (!completedMissions[idx] && m.isComplete(trimmed, cwd, fs)) {
        setCompletedMissions((prev) => {
          const updated = [...prev];
          updated[idx] = true;
          return updated;
        });
        if (idx === activeMissionIdx && idx < MISSIONS.length - 1) {
          setActiveMissionIdx(idx + 1);
        }
      }
    });

    switch (cmd) {
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'pwd':
        newHistory.push(`/Users/alumno${cwd.length > 0 ? '/' + cwd.join('/') : ''}`);
        break;

      case 'help':
        newHistory.push(
          'Comandos disponibles en esta simulación:\n' +
            '  pwd       -> Muestra la ruta de la carpeta actual\n' +
            '  ls [-l]   -> Lista archivos y carpetas del directorio actual\n' +
            '  cd <dir>  -> Cambia de carpeta (ej. cd Documentos, cd .., cd ~)\n' +
            '  mkdir <d> -> Crea una nueva carpeta (ej. mkdir notas)\n' +
            '  cat <f>   -> Muestra el contenido de un archivo de texto\n' +
            '  rm <f>    -> Elimina un archivo (¡con precaución!)\n' +
            '  clear     -> Limpia la pantalla de la terminal'
        );
        break;

      case 'ls': {
        const currNode = getNodeAtPath(cwd, fs);
        if (!currNode || !currNode.children) {
          // empty
        } else {
          const isLong = args.includes('-l');
          const entries = Object.values(currNode.children);
          if (entries.length === 0) {
            newHistory.push('(directorio vacío)');
          } else if (isLong) {
            const lines = entries.map((e) => {
              const typeChar = e.type === 'dir' ? 'd' : '-';
              const size = e.type === 'dir' ? '128 B' : e.content ? `${e.content.length} B` : '0 B';
              return `${typeChar}rwxr-xr-x  1 alumno  staff  ${size.padStart(7)}  ${e.name}${e.type === 'dir' ? '/' : ''}`;
            });
            newHistory.push(lines.join('\n'));
          } else {
            const listStr = entries
              .map((e) => (e.type === 'dir' ? `${e.name}/` : e.name))
              .join('   ');
            newHistory.push(listStr);
          }
        }
        break;
      }

      case 'cd': {
        const target = args[0];
        if (!target || target === '~' || target === '') {
          setCwd([]);
        } else if (target === '..') {
          if (cwd.length > 0) {
            setCwd((prev) => prev.slice(0, -1));
          }
        } else if (target === '.') {
          // Stay
        } else {
          const currNode = getNodeAtPath(cwd, fs);
          if (currNode && currNode.children && currNode.children[target]) {
            if (currNode.children[target].type === 'dir') {
              setCwd((prev) => [...prev, target]);
            } else {
              newHistory.push(`cd: no es un directorio: ${target}`);
            }
          } else {
            newHistory.push(`cd: no existe el archivo o el directorio: ${target}`);
          }
        }
        break;
      }

      case 'mkdir': {
        const dirName = args[0];
        if (!dirName) {
          newHistory.push('mkdir: falta el nombre del directorio que deseas crear');
        } else {
          setFs((prevFs) => {
            const copy: FileNode = JSON.parse(JSON.stringify(prevFs));
            const node = getNodeAtPath(cwd, copy);
            if (node) {
              if (!node.children) node.children = {};
              if (node.children[dirName]) {
                newHistory.push(`mkdir: ${dirName}: el archivo o carpeta ya existe`);
              } else {
                node.children[dirName] = { name: dirName, type: 'dir', children: {} };
              }
            }
            return copy;
          });
        }
        break;
      }

      case 'cat': {
        const fileName = args[0];
        if (!fileName) {
          newHistory.push('cat: debes especificar el nombre del archivo a leer');
        } else {
          const currNode = getNodeAtPath(cwd, fs);
          if (currNode && currNode.children && currNode.children[fileName]) {
            const file = currNode.children[fileName];
            if (file.type === 'dir') {
              newHistory.push(`cat: ${fileName}: Es un directorio`);
            } else {
              newHistory.push(file.content || '(archivo vacío)');
            }
          } else {
            newHistory.push(`cat: ${fileName}: No existe el archivo o el directorio`);
          }
        }
        break;
      }

      case 'rm': {
        const target = args[0];
        if (!target) {
          newHistory.push('rm: falta el nombre del archivo a eliminar');
        } else {
          setFs((prevFs) => {
            const copy: FileNode = JSON.parse(JSON.stringify(prevFs));
            const node = getNodeAtPath(cwd, copy);
            if (node && node.children && node.children[target]) {
              if (node.children[target].type === 'dir' && !args.includes('-r')) {
                newHistory.push(`rm: ${target}: es un directorio (para borrar directorios se requiere rm -r)`);
              } else {
                delete node.children[target];
                newHistory.push(`(archivo "${target}" eliminado)`);
              }
            } else {
              newHistory.push(`rm: ${target}: No existe el archivo o el directorio`);
            }
            return copy;
          });
        }
        break;
      }

      default:
        newHistory.push(`zsh: comando no encontrado: ${cmd}. Escribe "help" para ver opciones.`);
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const findCommonPrefix = (strings: string[]): string => {
    if (strings.length === 0) return '';
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].toLowerCase().startsWith(prefix.toLowerCase())) {
        prefix = prefix.slice(0, -1);
        if (!prefix) return '';
      }
    }
    return prefix;
  };

  const handleAutocomplete = () => {
    const currentInput = inputVal;
    if (!currentInput.trim()) return;

    const hasSpace = currentInput.includes(' ');

    if (!hasSpace) {
      // Autocompletar comando principal
      const availableCommands = ['pwd', 'ls', 'cd', 'mkdir', 'cat', 'rm', 'clear', 'help'];
      const matches = availableCommands.filter((c) => c.startsWith(currentInput.toLowerCase()));

      if (matches.length === 1) {
        setInputVal(matches[0] + ' ');
      } else if (matches.length > 1) {
        const prefix = findCommonPrefix(matches);
        if (prefix.length > currentInput.length) {
          setInputVal(prefix);
        } else {
          // Mostrar opciones coincidentes en el historial
          setHistory((prev) => [
            ...prev,
            `alumno@Mac-de-Iker ${currentPathString} % ${currentInput}`,
            matches.join('   '),
          ]);
        }
      }
      return;
    }

    // Autocompletar argumento (archivo o carpeta según el directorio actual)
    const lastSpaceIdx = currentInput.lastIndexOf(' ');
    const commandPart = currentInput.slice(0, lastSpaceIdx + 1);
    const argPart = currentInput.slice(lastSpaceIdx + 1);
    const mainCommand = currentInput.trim().split(/\s+/)[0]?.toLowerCase();

    const currNode = getNodeAtPath(cwd, fs);
    if (!currNode || !currNode.children) return;

    const allEntries = Object.values(currNode.children);
    // Para 'cd', solo sugerir carpetas
    const candidateEntries = mainCommand === 'cd'
      ? allEntries.filter((e) => e.type === 'dir')
      : allEntries;

    const matches = candidateEntries.filter((e) =>
      e.name.toLowerCase().startsWith(argPart.toLowerCase())
    );

    if (matches.length === 1) {
      const match = matches[0];
      const suffix = match.type === 'dir' ? '/' : ' ';
      setInputVal(commandPart + match.name + suffix);
    } else if (matches.length > 1) {
      const names = matches.map((m) => m.name);
      const prefix = findCommonPrefix(names);
      if (prefix.length > argPart.length) {
        setInputVal(commandPart + prefix);
      } else {
        const displayList = matches
          .map((m) => (m.type === 'dir' ? `${m.name}/` : m.name))
          .join('   ');
        setHistory((prev) => [
          ...prev,
          `alumno@Mac-de-Iker ${currentPathString} % ${currentInput}`,
          displayList,
        ]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const handleResetFs = () => {
    setFs(JSON.parse(JSON.stringify(INITIAL_FS)));
    setCwd([]);
    setHistory([
      'Sistema de archivos simulado reiniciado al estado inicial.',
      'Escribe "pwd" o "ls" para empezar.',
    ]);
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
            Entorno de pruebas seguro
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
            Terminal macOS Simulada (zsh)
          </h3>
        </div>

        <button
          onClick={handleResetFs}
          style={{
            padding: '0.35rem 0.65rem',
            fontSize: '0.78rem',
            borderRadius: '0.375rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            color: 'var(--sl-color-gray-3, #94a3b8)',
            cursor: 'pointer',
          }}
        >
          ⏮️ Reiniciar archivos
        </button>
      </div>

      {/* Misiones guiadas */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '0.85rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
            🎯 Misión guiada activa: {MISSIONS[activeMissionIdx].title}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#a5b4fc', fontFamily: 'monospace' }}>
            {completedMissions.filter(Boolean).length} / {MISSIONS.length} completadas
          </span>
        </div>

        <p style={{ margin: '0 0 0.35rem 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
          {MISSIONS[activeMissionIdx].instruction}
        </p>

        <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
          💡 Pista: <code style={{ color: '#facc15' }}>{MISSIONS[activeMissionIdx].hint}</code>
        </div>
      </div>

      {/* Grid: Terminal a la izquierda + Árbol visual a la derecha */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Ventana de Terminal estilo macOS */}
        <div
          style={{
            backgroundColor: '#0a0f1d',
            borderRadius: '0.5rem',
            border: '1px solid #1e293b',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Barra de título con botones macOS */}
          <div
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: '#111827',
              borderBottom: '1px solid #1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#6b7280', fontFamily: 'monospace' }}>
              alumno@Mac-de-Iker: {currentPathString} (zsh)
            </span>
          </div>

          {/* Área de texto de la terminal */}
          <div
            ref={terminalBodyRef}
            style={{
              padding: '0.85rem',
              minHeight: '260px',
              maxHeight: '340px',
              overflowY: 'auto',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              color: '#f3f4f6',
              whiteSpace: 'pre-wrap',
            }}
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            {history.map((line, i) => (
              <div key={i} style={{ marginBottom: '0.2rem', color: line.startsWith('alumno@') ? '#60a5fa' : line.startsWith('zsh:') ? '#f87171' : '#e5e7eb' }}>
                {line}
              </div>
            ))}

            {/* Línea de entrada activa */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.4rem' }}>
              <span style={{ color: '#4ade80', marginRight: '0.4rem' }}>
                alumno@Mac-de-Iker {currentPathString} %
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  padding: 0,
                }}
                aria-label="Línea de comandos de la terminal simulada"
              />
            </div>
          </div>
        </div>

        {/* Árbol interactivo del sistema de archivos */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>📁</span> Tu disco simulado (Finder en vivo)
          </div>

          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
            Carpeta activa actual resaltada en <strong style={{ color: '#a5b4fc' }}>morado</strong>:
          </div>

          {/* Visualización del árbol */}
          <div
            style={{
              flex: 1,
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
            }}
          >
            <div
              style={{
                fontWeight: cwd.length === 0 ? 700 : 400,
                color: cwd.length === 0 ? 'var(--color-accent, #a5b4fc)' : '#f8fafc',
                padding: '0.15rem 0.35rem',
                borderRadius: '0.25rem',
                backgroundColor: cwd.length === 0 ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              }}
            >
              🏠 ~ (carpeta de inicio)
            </div>

            {fs.children &&
              Object.values(fs.children).map((child) => {
                const isCurrentDir = cwd.length === 1 && cwd[0] === child.name;

                return (
                  <div key={child.name} style={{ marginLeft: '1rem' }}>
                    <div
                      style={{
                        color: isCurrentDir ? 'var(--color-accent, #a5b4fc)' : child.type === 'dir' ? '#93c5fd' : '#cbd5e1',
                        fontWeight: isCurrentDir ? 700 : 400,
                        padding: '0.1rem 0.3rem',
                        borderRadius: '0.2rem',
                        backgroundColor: isCurrentDir ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      }}
                    >
                      {child.type === 'dir' ? '📁' : '📄'} {child.name}
                    </div>

                    {/* Subarchivos si es directorio */}
                    {child.children &&
                      Object.values(child.children).map((subChild) => (
                        <div
                          key={subChild.name}
                          style={{
                            marginLeft: '1.25rem',
                            color: subChild.type === 'dir' ? '#93c5fd' : '#94a3b8',
                            fontSize: '0.75rem',
                          }}
                        >
                          {subChild.type === 'dir' ? '📁' : '📄'} {subChild.name}
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>

          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: 'rgba(234, 179, 8, 0.08)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              fontSize: '0.74rem',
              color: '#fef08a',
            }}
          >
            ℹ️ <strong>Sin miedo:</strong> Esta simulación corre íntegramente en la memoria de tu navegador. Ningún comando aquí modificará los archivos reales de tu Mac.
          </div>
        </div>
      </div>
    </div>
  );
}
