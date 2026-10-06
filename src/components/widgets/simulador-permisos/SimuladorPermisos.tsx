import React, { useState, useId } from 'react';

interface PermissionOption {
  id: string;
  label: string;
  description: string;
  riskWeight: number;
  category: 'datos_privados' | 'contenido_externo' | 'accion_hacia_fuera';
}

const PERMISSIONS: PermissionOption[] = [
  {
    id: 'leer_disco_personal',
    label: 'Acceso de lectura a tu disco personal (~/)',
    description: 'El agente puede leer tus carpetas personales, notas y documentos privados.',
    riskWeight: 20,
    category: 'datos_privados',
  },
  {
    id: 'ingesta_webs_externas',
    label: 'Procesar documentos o enlaces externos no fiables',
    description: 'El agente puede descargar webs de internet, PDFs adjuntos o correos de remitentes desconocidos.',
    riskWeight: 25,
    category: 'contenido_externo',
  },
  {
    id: 'enviar_datos_red',
    label: 'Peticiones HTTP salientes a internet',
    description: 'El agente puede conectar con servidores externos y enviar información fuera de tu Mac.',
    riskWeight: 30,
    category: 'accion_hacia_fuera',
  },
  {
    id: 'ejecutar_shell_libre',
    label: 'Ejecución libre de comandos en la Terminal (Shell)',
    description: 'El agente puede lanzar scripts, instalar paquetes o ejecutar comandos de sistema sin pedir confirmación.',
    riskWeight: 35,
    category: 'accion_hacia_fuera',
  },
  {
    id: 'modificar_archivos',
    label: 'Escritura y borrado de archivos en disco',
    description: 'El agente puede crear, sobreescribir y eliminar documentos en carpetas locales.',
    riskWeight: 15,
    category: 'accion_hacia_fuera',
  },
];

export default function SimuladorPermisos() {
  const [selectedPerms, setSelectedPerms] = useState<string[]>([
    'leer_disco_personal',
    'modificar_archivos',
  ]);
  const titleId = useId();

  const togglePerm = (id: string) => {
    setSelectedPerms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Determine deadly triad presence
  const hasPrivateData = selectedPerms.includes('leer_disco_personal');
  const hasExternalInput = selectedPerms.includes('ingesta_webs_externas');
  const hasOutwardAction =
    selectedPerms.includes('enviar_datos_red') ||
    selectedPerms.includes('ejecutar_shell_libre');

  const isDeadlyTriad = hasPrivateData && hasExternalInput && hasOutwardAction;

  // Calculate risk score
  const totalWeight = PERMISSIONS.filter((p) => selectedPerms.includes(p.id)).reduce(
    (acc, p) => acc + p.riskWeight,
    0
  );

  let riskLevel = 'Bajo (Entorno Seguro)';
  let riskColor = '#10b981';
  let badgeBg = 'rgba(16, 185, 129, 0.2)';

  if (isDeadlyTriad || totalWeight >= 70) {
    riskLevel = '🚨 CRÍTICO (La Tríada Mortal Activada)';
    riskColor = '#ef4444';
    badgeBg = 'rgba(239, 68, 68, 0.2)';
  } else if (totalWeight >= 40) {
    riskLevel = '⚠️ Medio / Precaución';
    riskColor = '#f59e0b';
    badgeBg = 'rgba(245, 158, 11, 0.2)';
  }

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
          Principio de Mínimo Privilegio · Simulador Interactivo
        </span>
        <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
          Configuración de Permisos y la "Tríada Mortal"
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--sl-color-gray-3, #94a3b8)', margin: '0.35rem 0 0' }}>
          Activa y desactiva permisos concedidos a un agente. Descubre cómo la combinación simultánea de datos privados, fuentes externas y acciones sin supervisión dispara el riesgo.
        </p>
      </div>

      {/* Permissions Toggles List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
        {PERMISSIONS.map((perm) => {
          const isChecked = selectedPerms.includes(perm.id);
          return (
            <label
              key={perm.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isChecked ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
                background: isChecked ? 'rgba(14, 165, 233, 0.08)' : '#090d16',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => togglePerm(perm.id)}
                style={{ marginTop: '0.25rem', cursor: 'pointer', transform: 'scale(1.15)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: isChecked ? '#f8fafc' : '#cbd5e1' }}>
                  {perm.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.15rem', lineHeight: 1.35 }}>
                  {perm.description}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Risk Assessment Box */}
      <div
        style={{
          background: '#020617',
          borderRadius: '8px',
          border: `1px solid ${riskColor}`,
          padding: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
            Nivel de Riesgo Evaluado:
          </span>
          <span
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: badgeBg,
              color: riskColor,
            }}
          >
            {riskLevel}
          </span>
        </div>

        {isDeadlyTriad ? (
          <div style={{ fontSize: '0.82rem', color: '#fca5a5', lineHeight: 1.5 }}>
            <strong>☠️ La Tríada Mortal está activa:</strong> Tu configuración combina a la vez:
            <ol style={{ margin: '0.3rem 0 0.5rem', paddingLeft: '1.2rem' }}>
              <li>Acceso a información privada local en tu Mac.</li>
              <li>Lectura de fuentes no verificadas de terceros (capaces de inyectar instrucciones).</li>
              <li>Capacidad de actuar hacia fuera (enviar información por internet o ejecutar comandos shell).</li>
            </ol>
            <em>Remedio inmediato:</em> Desactiva la conexión a internet saliente o bloquea la lectura de fuentes externas. Con romper un solo vértice de la tríada, el peligro se neutraliza.
          </div>
        ) : totalWeight >= 40 ? (
          <div style={{ fontSize: '0.82rem', color: '#fde68a', lineHeight: 1.5 }}>
            <strong>Cuidado con los excesos:</strong> Tienes permisos de acción que podrían alterar archivos en disco. Procura limitar la actividad del agente a una carpeta acotada (*sandbox*) y exige siempre aprobación previa en cada escritura.
          </div>
        ) : (
          <div style={{ fontSize: '0.82rem', color: '#a7f3d0', lineHeight: 1.5 }}>
            <strong>✅ Principio de Mínimo Privilegio respetado:</strong> El agente tiene sólo las herramientas indispensables para su cometido. Aunque procesara un texto con una trampa oculta, carece de las vías para filtrar datos o dañar tu sistema operativo.
          </div>
        )}
      </div>
    </div>
  );
}
