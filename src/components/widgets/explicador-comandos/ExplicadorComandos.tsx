import React, { useState, useId } from 'react';

interface CommandPart {
  token: string;
  role: string;
  explanation: string;
  isDangerous?: boolean;
}

interface CommandExample {
  id: string;
  title: string;
  category: string;
  parts: CommandPart[];
  generalWarning?: string;
}

const COMMANDS: CommandExample[] = [
  {
    id: 'curl-bash',
    title: '1. El instalador de Homebrew (curl | bash)',
    category: 'Instalación de software',
    generalWarning:
      'Descargar y ejecutar scripts directamente desde la web (curl ... | bash) es una práctica habitual en desarrolladores, pero SOLO debe hacerse desde URLs oficiales de confianza absoluta verificadas.',
    parts: [
      {
        token: '/bin/bash',
        role: 'El intérprete',
        explanation: 'El programa intérprete de la shell Bash de tu Mac que ejecutará las órdenes del script.',
      },
      {
        token: '-c',
        role: 'Opción comando',
        explanation: 'Indica a bash: "No abras una sesión interactiva; ejecuta el texto que viene a continuación entre comillas".',
      },
      {
        token: '$( ... )',
        role: 'Sustitución',
        explanation: 'Una tubería interna: evalúa todo lo que está dentro de los paréntesis y entrega el resultado a bash.',
      },
      {
        token: 'curl',
        role: 'Cliente web',
        explanation: 'Herramienta de terminal para descargar contenidos desde servidores de internet (Client URL).',
      },
      {
        token: '-f',
        role: '--fail',
        explanation: 'Falla silenciosamente si la web responde con un error HTTP (ej. página 404 no encontrada), evitando ejecutar páginas de error.',
      },
      {
        token: '-s',
        role: '--silent',
        explanation: 'Modo silencioso: oculta la barra de progreso y las estadísticas de descarga para no ensuciar la pantalla.',
      },
      {
        token: '-S',
        role: '--show-error',
        explanation: 'Si ocurre un error grave de red, fuerza a curl a mostrar el mensaje de error aunque esté en modo silencioso.',
      },
      {
        token: '-L',
        role: '--location',
        explanation: 'Sigue automáticamente las redirecciones si la página web ha cambiado de dirección a otra URL.',
      },
      {
        token: 'https://raw.github.../install.sh',
        role: 'URL de origen',
        explanation: 'La dirección exacta donde reside el script de código abierto oficial del equipo de Homebrew en GitHub.',
      },
    ],
  },
  {
    id: 'export-api-key',
    title: '2. Configurar una clave de API secreta',
    category: 'Seguridad y credenciales',
    generalWarning:
      'Las claves de API son como la contraseña de tu tarjeta bancaria: nunca las compartas, no las pegues en foros y jamás las subas a repositorios públicos de GitHub.',
    parts: [
      {
        token: 'export',
        role: 'Comando de entorno',
        explanation: 'Registra la variable en el entorno de la terminal para que cualquier programa o script que abras después pueda leerla.',
      },
      {
        token: 'OPENAI_API_KEY=',
        role: 'Nombre convenido',
        explanation: 'El nombre exacto en mayúsculas que las librerías oficiales de Python y Node.js buscan de forma automática en el sistema.',
      },
      {
        token: '"sk-proj-abc123xyz..."',
        role: 'Valor secreto',
        explanation: 'Tu clave alfanumérica personal única generada en la web del proveedor. Las comillas evitan errores si hay caracteres especiales.',
        isDangerous: true,
      },
    ],
  },
  {
    id: 'brew-install',
    title: '3. Instalar un paquete con Homebrew',
    category: 'Gestor de paquetes',
    parts: [
      {
        token: 'brew',
        role: 'Gestor Homebrew',
        explanation: 'El programa principal de Homebrew, encargado de gestionar descargas, compilaciones y dependencias en macOS.',
      },
      {
        token: 'install',
        role: 'Acción / Verbo',
        explanation: 'La instrucción que indica a Homebrew que descargue, verifique y configure una nueva herramienta.',
      },
      {
        token: 'tree',
        role: 'Nombre del paquete',
        explanation: 'La utilidad concreta que deseamos instalar (en este caso, tree, un programa que dibuja árboles de carpetas visuales en la consola).',
      },
    ],
  },
];

export default function ExplicadorComandos() {
  const [selectedCommandId, setSelectedCommandId] = useState<string>('curl-bash');
  const [selectedPartIndex, setSelectedPartIndex] = useState<number>(0);
  const titleId = useId();

  const currentCommand = COMMANDS.find((c) => c.id === selectedCommandId) || COMMANDS[0];
  const currentPart = currentCommand.parts[selectedPartIndex] || currentCommand.parts[0];

  const handleCommandChange = (id: string) => {
    setSelectedCommandId(id);
    setSelectedPartIndex(0);
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
            Anatomía de instrucciones
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
            Explicador de Comandos por Partes
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
          Desglose interactivo
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Los comandos largos intimidan si los miras en bloque. Elige un ejemplo y pulsa sobre cada trozo para ver qué función cumple cada letra o bandera:
      </p>

      {/* Selector de comando */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {COMMANDS.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => handleCommandChange(cmd.id)}
            style={{
              padding: '0.45rem 0.75rem',
              fontSize: '0.82rem',
              borderRadius: '0.375rem',
              border: '1px solid',
              borderColor: selectedCommandId === cmd.id ? 'var(--color-accent, #6366f1)' : 'var(--sl-color-gray-5, #334155)',
              backgroundColor: selectedCommandId === cmd.id ? 'rgba(99, 102, 241, 0.25)' : 'var(--sl-color-bg, #1e293b)',
              color: selectedCommandId === cmd.id ? '#ffffff' : 'var(--sl-color-text, #cbd5e1)',
              cursor: 'pointer',
              fontWeight: selectedCommandId === cmd.id ? 600 : 400,
            }}
          >
            {cmd.title}
          </button>
        ))}
      </div>

      {/* Visualización del comando en piezas interactivas */}
      <div
        style={{
          backgroundColor: '#0a0f1d',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          alignItems: 'center',
        }}
      >
        {currentCommand.parts.map((part, idx) => {
          const isSelected = idx === selectedPartIndex;

          return (
            <button
              key={`${part.token}-${idx}`}
              onClick={() => setSelectedPartIndex(idx)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: isSelected
                  ? 'var(--color-accent, #6366f1)'
                  : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: isSelected
                  ? 'var(--color-accent, #6366f1)'
                  : part.isDangerous
                  ? 'rgba(239, 68, 68, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: isSelected ? '#ffffff' : part.isDangerous ? '#fca5a5' : '#e2e8f0',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: isSelected ? 700 : 500,
                transition: 'all 0.15s ease',
              }}
              aria-pressed={isSelected}
            >
              {part.token}
            </button>
          );
        })}
      </div>

      {/* Ficha explicativa del fragmento seleccionado */}
      <div
        style={{
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: currentCommand.generalWarning ? '1rem' : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
          <code
            style={{
              padding: '0.2rem 0.5rem',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '0.25rem',
              color: 'var(--color-accent, #a5b4fc)',
              fontSize: '0.95rem',
              fontWeight: 700,
            }}
          >
            {currentPart.token}
          </code>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#94a3b8',
              letterSpacing: '0.05em',
            }}
          >
            {currentPart.role}
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--sl-color-text, #cbd5e1)' }}>
          {currentPart.explanation}
        </p>
      </div>

      {/* Advertencia de seguridad si procede */}
      {currentCommand.generalWarning && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.375rem',
            backgroundColor: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(234, 179, 8, 0.25)',
            fontSize: '0.82rem',
            color: '#fef08a',
            lineHeight: 1.45,
          }}
        >
          🛡️ <strong>Regla de seguridad:</strong> {currentCommand.generalWarning}
        </div>
      )}
    </div>
  );
}
