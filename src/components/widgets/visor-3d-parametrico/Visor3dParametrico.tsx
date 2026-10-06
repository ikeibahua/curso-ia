import React, { useState, useId } from 'react';

export default function Visor3dParametrico() {
  const [width, setWidth] = useState<number>(90); // mm
  const [depth, setDepth] = useState<number>(40); // mm
  const [height, setHeight] = useState<number>(30); // mm
  const [holeDiameter, setHoleDiameter] = useState<number>(16); // mm
  const [holeCount, setHoleCount] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const titleId = useId();

  // Wall thickness calculation
  const totalHolesSpan = holeCount * holeDiameter;
  const remainingMargin = Math.max(0, width - totalHolesSpan);
  const sideMargin = (remainingMargin / (holeCount + 1)).toFixed(1);
  const isWallTooThin = Number(sideMargin) < 3.0;

  // Generate FreeCAD Python script
  const pythonScript = `# Script de FreeCAD para Soporte Paramétrico de Viales
# Generado automáticamente con medidas en milímetros
import FreeCAD as App
import Part

# 1. Crear documento
doc = App.newDocument("Soporte_Viales_Botanicos")

# 2. Parámetros principales (mm)
ANCHO = ${width}.0
PROFUNDIDAD = ${depth}.0
ALTURA = ${height}.0
RADIO_VIAL = ${holeDiameter / 2}.0
NUM_ORIFICIOS = ${holeCount}

# 3. Bloque base del soporte
bloque = Part.makeBox(ANCHO, PROFUNDIDAD, ALTURA)

# 4. Sustracción de alojamientos cilíndricos
espaciado = ANCHO / (NUM_ORIFICIOS + 1)
for i in range(1, NUM_ORIFICIOS + 1):
    centro_x = i * espaciado
    centro_y = PROFUNDIDAD / 2.0
    cilindro = Part.makeCylinder(RADIO_VIAL, ALTURA, App.Vector(centro_x, centro_y, 0))
    bloque = bloque.cut(cilindro)

# 5. Mostrar pieza en la vista 3D y recalcular
Part.show(bloque)
doc.recompute()
App.Gui.activeDocument().activeView().viewAxometric()
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Isometric projection math for SVG
  // Origin (center bottom):
  const originX = 180;
  const originY = 210;

  // Scaling factor to fit SVG 360x280
  const scale = 1.3;
  const isoAngle = Math.PI / 6; // 30 degrees
  const cos30 = Math.cos(isoAngle);
  const sin30 = Math.sin(isoAngle);

  // Projected vectors for unit width (X), depth (Y), and height (Z)
  // X axis: bottom-right
  const dxX = cos30 * scale;
  const dyX = sin30 * scale;
  // Y axis: bottom-left
  const dxY = -cos30 * scale;
  const dyY = sin30 * scale;
  // Z axis: straight up
  const dz = -1 * scale;

  // Corners of base:
  // p0: front-bottom (0,0,0)
  const p0 = { x: originX, y: originY };
  // p1: right-bottom (width, 0, 0)
  const p1 = { x: p0.x + width * dxX, y: p0.y + width * dyX };
  // p2: back-bottom (width, depth, 0)
  const p2 = { x: p1.x + depth * dxY, y: p1.y + depth * dyY };
  // p3: left-bottom (0, depth, 0)
  const p3 = { x: p0.x + depth * dxY, y: p0.y + depth * dyY };

  // Top corners (shifted by height * dz):
  const p0Top = { x: p0.x, y: p0.y + height * dz };
  const p1Top = { x: p1.x, y: p1.y + height * dz };
  const p2Top = { x: p2.x, y: p2.y + height * dz };
  const p3Top = { x: p3.x, y: p3.y + height * dz };

  // Calculate hole positions on top face
  const holeCenters = [];
  const holeSpacing = width / (holeCount + 1);
  for (let i = 1; i <= holeCount; i++) {
    const fracX = (i * holeSpacing) / width;
    const hx = p0Top.x + fracX * (p1Top.x - p0Top.x) + 0.5 * (p3Top.x - p0Top.x);
    const hy = p0Top.y + fracX * (p1Top.y - p0Top.y) + 0.5 * (p3Top.y - p0Top.y);
    holeCenters.push({ x: hx, y: hy });
  }

  const ellipseRx = (holeDiameter / 2) * scale * 0.9;
  const ellipseRy = (holeDiameter / 2) * scale * 0.45;

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
            Modelado Paramétrico · Visor en Vivo
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Gradilla de Campo: Modifica Parámetros en Tiempo Real
          </h4>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #334155',
            background: showCode ? 'var(--sl-color-accent, #0ea5e9)' : '#090d16',
            color: showCode ? '#fff' : '#cbd5e1',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          {showCode ? '👁️ Ver Vista 3D' : '🐍 Ver Script FreeCAD (Python)'}
        </button>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1rem' }}>
        En diseño paramétrico no dibujas líneas a mano: <strong>defines relaciones matemáticas</strong>. Cambia cualquier medida con los controles deslizantes y observa cómo la pieza y su código se recalculan automáticamente.
      </p>

      {/* Main View Grid: 3D SVG Canvas & Sliders */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Visual / Code View */}
        <div
          style={{
            background: '#020617',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            padding: '1rem',
            position: 'relative',
          }}
        >
          {showCode ? (
            <div style={{ width: '100%', height: '100%', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Código generado para FreeCAD:</span>
                <button
                  onClick={handleCopyCode}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    border: 'none',
                    background: copied ? '#10b981' : '#0ea5e9',
                    color: '#fff',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {copied ? '✓ Copiado' : 'Copiar script'}
                </button>
              </div>
              <pre
                style={{
                  margin: 0,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--sl-font-mono, monospace)',
                  color: '#e2e8f0',
                  lineHeight: 1.45,
                }}
              >
                {pythonScript}
              </pre>
            </div>
          ) : (
            <>
              {/* Isometric SVG Render */}
              <svg
                viewBox="0 0 360 270"
                style={{ width: '100%', maxWidth: '340px', height: 'auto', overflow: 'visible' }}
                aria-label="Proyección isométrica de la pieza paramétrica con alojamientos cilíndricos"
              >
                {/* Right / Side Face (XZ): p0 to p1 to p1Top to p0Top */}
                <polygon
                  points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p1Top.x},${p1Top.y} ${p0Top.x},${p0Top.y}`}
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />

                {/* Left / Front Face (YZ): p0 to p3 to p3Top to p0Top */}
                <polygon
                  points={`${p0.x},${p0.y} ${p3.x},${p3.y} ${p3Top.x},${p3Top.y} ${p0Top.x},${p0Top.y}`}
                  fill="#0369a1"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                />

                {/* Top Face (XY): p0Top, p1Top, p2Top, p3Top */}
                <polygon
                  points={`${p0Top.x},${p0Top.y} ${p1Top.x},${p1Top.y} ${p2Top.x},${p2Top.y} ${p3Top.x},${p3Top.y}`}
                  fill="#0ea5e9"
                  stroke="#7dd3fc"
                  strokeWidth="2"
                />

                {/* Holes rendered as projected ellipses */}
                {holeCenters.map((hc, idx) => (
                  <g key={idx}>
                    {/* Dark depth interior */}
                    <ellipse
                      cx={hc.x}
                      cy={hc.y + 4}
                      rx={ellipseRx * 0.95}
                      ry={ellipseRy * 0.95}
                      fill="#032541"
                    />
                    {/* Hole top rim */}
                    <ellipse
                      cx={hc.x}
                      cy={hc.y}
                      rx={ellipseRx}
                      ry={ellipseRy}
                      fill="#082f49"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />
                    <text
                      x={hc.x}
                      y={hc.y - ellipseRy - 3}
                      fill="#bae6fd"
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      ⌀{holeDiameter}
                    </text>
                  </g>
                ))}

                {/* Dimension callouts */}
                {/* Width dimension */}
                <line
                  x1={p0.x}
                  y1={p0.y + 12}
                  x2={p1.x}
                  y2={p1.y + 12}
                  stroke="#94a3b8"
                  strokeDasharray="2,2"
                />
                <text
                  x={(p0.x + p1.x) / 2 + 8}
                  y={(p0.y + p1.y) / 2 + 22}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  X: {width} mm
                </text>

                {/* Height dimension */}
                <line
                  x1={p0Top.x - 12}
                  y1={p0Top.y}
                  x2={p0.x - 12}
                  y2={p0.y}
                  stroke="#94a3b8"
                  strokeDasharray="2,2"
                />
                <text
                  x={p0.x - 22}
                  y={(p0Top.y + p0.y) / 2}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  Z: {height} mm
                </text>
              </svg>

              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                Vista isométrica paramétrica · Tolerancia estimada: ±0.2 mm
              </div>
            </>
          )}
        </div>

        {/* Sliders Control Panel */}
        <div
          style={{
            background: '#090d16',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Parámetros de la Pieza
          </div>

          {/* Ancho */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
              <label htmlFor="p-width" style={{ color: '#cbd5e1' }}>Ancho total (X):</label>
              <strong style={{ color: '#f8fafc' }}>{width} mm</strong>
            </div>
            <input
              id="p-width"
              type="range"
              min={60}
              max={130}
              step={5}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Profundidad */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
              <label htmlFor="p-depth" style={{ color: '#cbd5e1' }}>Profundidad (Y):</label>
              <strong style={{ color: '#f8fafc' }}>{depth} mm</strong>
            </div>
            <input
              id="p-depth"
              type="range"
              min={30}
              max={60}
              step={2}
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Altura */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
              <label htmlFor="p-height" style={{ color: '#cbd5e1' }}>Altura del soporte (Z):</label>
              <strong style={{ color: '#f8fafc' }}>{height} mm</strong>
            </div>
            <input
              id="p-height"
              type="range"
              min={20}
              max={50}
              step={2}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Diámetro del orificio */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
              <label htmlFor="p-dia" style={{ color: '#cbd5e1' }}>Diámetro del tubo/vial (⌀):</label>
              <strong style={{ color: '#fbbf24' }}>{holeDiameter} mm</strong>
            </div>
            <input
              id="p-dia"
              type="range"
              min={10}
              max={24}
              step={2}
              value={holeDiameter}
              onChange={(e) => setHoleDiameter(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Número de orificios */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
              <label htmlFor="p-count" style={{ color: '#cbd5e1' }}>Número de viales:</label>
              <strong style={{ color: '#34d399' }}>{holeCount} tubos</strong>
            </div>
            <input
              id="p-count"
              type="range"
              min={1}
              max={4}
              step={1}
              value={holeCount}
              onChange={(e) => setHoleCount(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Wall thickness safety diagnostic */}
          <div
            style={{
              padding: '0.6rem 0.8rem',
              borderRadius: '6px',
              background: isWallTooThin ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.1)',
              border: `1px solid ${isWallTooThin ? '#ef4444' : '#059669'}`,
              fontSize: '0.78rem',
              color: isWallTooThin ? '#fca5a5' : '#6ee7b7',
              lineHeight: 1.35,
            }}
          >
            <strong>Grosor entre paredes: {sideMargin} mm</strong>
            <br />
            {isWallTooThin
              ? '⚠️ Pared demasiado delgada para imprimir (mínimo aconsejable: 3 mm). Aumenta el ancho o reduce los viales.'
              : '✅ Pared sólida y resistente para impresión 3D (FDM).'}
          </div>
        </div>
      </div>
    </div>
  );
}
