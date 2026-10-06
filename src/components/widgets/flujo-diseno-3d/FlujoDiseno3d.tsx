import React, { useState, useId } from 'react';

type TabType = 'flujo' | 'checklist' | 'comparativa';

export default function FlujoDiseno3d() {
  const [activeTab, setActiveTab] = useState<TabType>('flujo');
  const [activeFlowStep, setActiveFlowStep] = useState<number>(1);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({
    voladizos: true,
    paredes: true,
    tolerancias: false,
    orientacion: true,
    relleno: false,
  });
  const titleId = useId();

  const toggleCheck = (id: string) => {
    setChecklistState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedChecks = Object.values(checklistState).filter(Boolean).length;
  const isPrintReady = completedChecks === 5;

  const flowSteps = [
    {
      num: 1,
      title: '1. Medición con Calibre (Pie de Rey)',
      detail: 'Mide el objeto real (vial, tubo, cable, lente) con precisión de décimas de milímetro. La IA no sabe cuánto mide tu tubo a menos que se lo digas tú.',
      icon: '📏',
    },
    {
      num: 2,
      title: '2. Prompt Estructurado al Modelo',
      detail: 'Pide una pieza paramétrica con medidas explícitas: ancho, profundidad, altura, diámetro del orificio y holgura de tolerancia (+0.3 mm).',
      icon: '💬',
    },
    {
      num: 3,
      title: '3. Modelo en FreeCAD (Ruta A o B)',
      detail: 'Pega el script Python en la consola de FreeCAD (Ruta A) o deja que el agente ejecute los comandos vía MCP (Ruta B). Revisa visualmente la pieza.',
      icon: '⚙️',
    },
    {
      num: 4,
      title: '4. Exportación (STL o 3MF)',
      detail: 'Selecciona la pieza en el árbol de FreeCAD y expórtala a formato STL (o 3MF). Este es el archivo geométrico estándar que entiende cualquier impresora.',
      icon: '📦',
    },
    {
      num: 5,
      title: '5. Laminador e Impresión (Slicer)',
      detail: 'Abre el archivo en tu laminador (Bambu Studio, PrusaSlicer u OrcaSlicer), corta en capas, envía a imprimir y observa la pieza física real.',
      icon: '🖨️',
    },
  ];

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
            Guía de Taller · Flujo, Verificación y Herramientas
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            El Ciclo de Fabricación: De la Idea a la Cama de Impresión
          </h4>
        </div>

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#090d16', padding: '0.25rem', borderRadius: '8px' }}>
          {[
            { id: 'flujo', label: '🔄 El Ciclo en 5 Fases' },
            { id: 'checklist', label: '📋 Checklist Imprimibilidad' },
            { id: 'comparativa', label: '⚖️ Tinkercad vs FreeCAD' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              style={{
                border: 'none',
                background: activeTab === tab.id ? 'var(--sl-color-accent, #0ea5e9)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: FLUJO */}
      {activeTab === 'flujo' && (
        <div>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
            Un diseño exitoso con IA no nace de un botón mágico: requiere un protocolo de ingeniería ordenado. Haz clic en cada fase para explorar su cometido:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
            {flowSteps.map((s) => (
              <button
                key={s.num}
                onClick={() => setActiveFlowStep(s.num)}
                style={{
                  padding: '0.6rem 0.4rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: activeFlowStep === s.num ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
                  background: activeFlowStep === s.num ? 'rgba(14, 165, 233, 0.15)' : '#090d16',
                  color: activeFlowStep === s.num ? '#f8fafc' : '#94a3b8',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{s.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: activeFlowStep === s.num ? 700 : 500 }}>Fase {s.num}</div>
              </button>
            ))}
          </div>

          <div
            style={{
              background: '#020617',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              padding: '1rem',
            }}
          >
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.35rem' }}>
              {flowSteps[activeFlowStep - 1].title}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
              {flowSteps[activeFlowStep - 1].detail}
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: CHECKLIST DE IMPRIMIBILIDAD */}
      {activeTab === 'checklist' && (
        <div>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
            Antes de gastar filamento y horas de máquina, pasa siempre esta lista de control. La IA suele olvidar tolerancias y voladizos:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {[
              {
                id: 'voladizos',
                label: 'Regla de los 45° (Voladizos / Overhangs)',
                desc: 'Las paredes que sobresalen en ángulo mayor a 45° respecto a la vertical se descolgarán en el aire salvo que actives soportes en el laminador.',
              },
              {
                id: 'paredes',
                label: 'Grosor mínimo de pared (≥ 1.6–2.0 mm)',
                desc: 'Las boquillas estándar tienen 0.4 mm. Una pared necesita al menos 3 o 4 pasadas de boquilla para no doblarse ni rajarse.',
              },
              {
                id: 'tolerancias',
                label: 'Holgura de tolerancia (+0.2 a +0.4 mm)',
                desc: 'El plástico fundido se ensancha al enfriarse. Si tu tubo mide 16 mm exactos, el agujero del soporte debe modelarse a 16.3 o 16.4 mm para que encaje.',
              },
              {
                id: 'orientacion',
                label: 'Superficie de apoyo plana contra la cama',
                desc: 'La pieza debe orientarse de modo que su cara más ancha y plana esté pegada a la base calefactada para evitar que se despegue (warping).',
              },
              {
                id: 'relleno',
                label: 'Relleno estructural adecuado (15–20% Giroidal)',
                desc: 'No necesitas imprimir piezas 100% macizas. Un 15% con patrón giroidal ahorra un 70% de plástico y resiste esfuerzos mecánicos multidireccionales.',
              },
            ].map((chk) => (
              <label
                key={chk.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  background: checklistState[chk.id] ? 'rgba(16, 185, 129, 0.08)' : '#090d16',
                  border: `1px solid ${checklistState[chk.id] ? '#059669' : '#1e293b'}`,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={checklistState[chk.id]}
                  onChange={() => toggleCheck(chk.id)}
                  style={{ marginTop: '0.25rem', transform: 'scale(1.15)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: checklistState[chk.id] ? '#34d399' : '#e2e8f0' }}>
                    {chk.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    {chk.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              background: isPrintReady ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              border: `1px solid ${isPrintReady ? '#10b981' : '#d97706'}`,
              color: isPrintReady ? '#6ee7b7' : '#fde68a',
              fontSize: '0.85rem',
            }}
          >
            {isPrintReady
              ? '🎉 ¡Comprobaciones completas! La pieza cumple los estándares para laminar con garantía de éxito.'
              : `⚠️ Has verificado ${completedChecks} de 5 puntos. Revisa los apartados pendientes antes de enviar a la impresora.`}
          </div>
        </div>
      )}

      {/* TAB 3: COMPARATIVA TINKERCAD VS FREECAD */}
      {activeTab === 'comparativa' && (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.82rem',
              textAlign: 'left',
              color: '#cbd5e1',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #334155', color: '#f8fafc' }}>
                <th style={{ padding: '0.6rem 0.5rem' }}>Aspecto</th>
                <th style={{ padding: '0.6rem 0.5rem', color: '#fbbf24' }}>Tinkercad</th>
                <th style={{ padding: '0.6rem 0.5rem', color: '#38bdf8' }}>FreeCAD</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Filosofía de diseño</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Modelado por bloques (CSG): arrastrar cubos y cilindros y agrupar.</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Modelado paramétrico: boceto 2D con cotas numéricas y restricciones.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Cambiar una medida</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Hay que desagrupar, estirar piezas y reubicar orificios a mano.</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Basta cambiar un número en la hoja de cálculo/parámetros y todo se actualiza.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Sinergia con la IA</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Baja: interfaz web cerrada sin API de comandos sencilla.</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Excepcional: cuenta con una API completa en Python y soporte de MCP.</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Curva de aprendizaje</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Inmediata (10 minutos).</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Media-alta, pero la IA elimina la fricción escribiendo el código por ti.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
