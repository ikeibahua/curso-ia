import React, { useState, useEffect, useId, useRef } from 'react';

export default function DescensoGradiente() {
  const [w, setW] = useState<number>(3.8); // Current parameter weight (target is approx 1.0)
  const [learningRate, setLearningRate] = useState<number>(0.18);
  const [stepCount, setStepCount] = useState<number>(0);
  const [isAutomating, setIsAutomating] = useState<boolean>(false);
  const [history, setHistory] = useState<{ step: number; w: number; loss: number }[]>([
    { step: 0, w: 3.8, loss: (3.8 - 1.0) ** 2 + 0.2 },
  ]);

  const titleId = useId();
  const animRef = useRef<NodeJS.Timeout | null>(null);

  // Theoretical optimal minimum is at w = 1.0
  // Loss function: L(w) = (w - 1.0)^2 + 0.2
  // Gradient: dL/dw = 2 * (w - 1.0)
  const computeLoss = (val: number) => Math.pow(val - 1.0, 2) + 0.2;
  const computeGrad = (val: number) => 2 * (val - 1.0);

  const currentLoss = computeLoss(w);

  // Take one gradient descent step: w_new = w_old - lr * grad
  const handleStep = () => {
    const grad = computeGrad(w);
    let newW = w - learningRate * grad;

    // Constrain within visible boundary [-2, 4.5] for UI sanity
    if (newW > 4.5) newW = 4.5;
    if (newW < -2.0) newW = -2.0;

    const newLoss = computeLoss(newW);
    const nextStep = stepCount + 1;

    setW(newW);
    setStepCount(nextStep);
    setHistory((prev) => [...prev.slice(-15), { step: nextStep, w: newW, loss: newLoss }]);
  };

  // Reset to initial hilltop
  const handleReset = () => {
    setIsAutomating(false);
    if (animRef.current) clearInterval(animRef.current);
    setW(3.8);
    setStepCount(0);
    setHistory([{ step: 0, w: 3.8, loss: computeLoss(3.8) }]);
  };

  // Automation / play toggle
  useEffect(() => {
    if (isAutomating) {
      animRef.current = setInterval(() => {
        setW((prevW) => {
          const grad = computeGrad(prevW);
          let newW = prevW - learningRate * grad;
          if (Math.abs(prevW - 1.0) < 0.02 && Math.abs(newW - 1.0) < 0.02) {
            // Already converged
            setIsAutomating(false);
            return 1.0;
          }
          if (newW > 4.5) newW = 4.5;
          if (newW < -2.0) newW = -2.0;
          return newW;
        });
        setStepCount((s) => s + 1);
      }, 400);
    } else {
      if (animRef.current) clearInterval(animRef.current);
    }
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [isAutomating, learningRate]);

  // Sync history when w updates via animation
  useEffect(() => {
    if (stepCount > 0 && isAutomating) {
      setHistory((prev) => [
        ...prev.slice(-15),
        { step: stepCount, w, loss: computeLoss(w) },
      ]);
    }
  }, [w, stepCount, isAutomating]);

  // Botanical sample points: Days vs shoot height (cm)
  // Expected ground truth relation: height = 1.0 * days + 0.5
  const botanicalPoints = [
    { x: 1, y: 1.4 },
    { x: 2, y: 2.6 },
    { x: 3, y: 3.3 },
    { x: 4, y: 4.7 },
    { x: 5, y: 5.4 },
  ];

  // SVG coordinate calculations for Loss Landscape curve
  // Domain of w: [-1.5, 4.0], range of Loss: [0, 9]
  // SVG viewbox: 0 0 360 180
  const svgWToX = (val: number) => ((val - (-1.5)) / (4.0 - (-1.5))) * 340 + 10;
  const svgLossToY = (loss: number) => 170 - (loss / 9.0) * 150;

  // Generate curve path
  const curvePoints: string[] = [];
  for (let curveW = -1.5; curveW <= 4.0; curveW += 0.1) {
    const l = computeLoss(curveW);
    curvePoints.push(`${svgWToX(curveW).toFixed(1)},${svgLossToY(l).toFixed(1)}`);
  }
  const curvePath = `M ${curvePoints.join(' L ')}`;

  const ballX = svgWToX(w);
  const ballY = svgLossToY(currentLoss);

  // Status diagnostics
  const isConverged = Math.abs(w - 1.0) < 0.05;
  const isOscillating = learningRate >= 0.85;

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
          marginBottom: '1rem',
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
            Optimización matemática
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
            Simulador de Descenso de Gradiente
          </h3>
        </div>

        <div
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            backgroundColor: isConverged
              ? 'rgba(34, 197, 94, 0.2)'
              : 'rgba(99, 102, 241, 0.15)',
            border: isConverged
              ? '1px solid rgba(34, 197, 94, 0.4)'
              : '1px solid rgba(99, 102, 241, 0.35)',
            color: isConverged ? '#4ade80' : 'var(--sl-color-text, #e2e8f0)',
            fontWeight: 600,
          }}
        >
          {isConverged ? '✓ Mínimo alcanzado' : `Paso: ${stepCount}`}
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        La función de pérdida mide el error del modelo. El descenso de gradiente es como soltar una bola en la ladera de una colina: en cada paso calcula la pendiente y rueda hacia el valle de mínimo error.
      </p>

      {/* Selector de Tasa de Aprendizaje (Learning Rate) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          backgroundColor: 'var(--sl-color-bg, #1e293b)',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <label htmlFor="lr-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sl-color-white, #f8fafc)' }}>
              Tasa de aprendizaje (Learning Rate $\eta$):
            </label>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent, #818cf8)', fontFamily: 'monospace' }}>
              {learningRate.toFixed(2)}
            </span>
          </div>
          <input
            id="lr-slider"
            type="range"
            min="0.04"
            max="1.1"
            step="0.02"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-accent, #6366f1)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--sl-color-gray-4, #64748b)' }}>
            <span>0.04 (Lenta pero segura)</span>
            <span>0.20 (Óptima)</span>
            <span>1.10 (Oscilación / Caos)</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleStep}
            disabled={isAutomating || isConverged}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--sl-color-bg-sidebar, #0f172a)',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              color: 'var(--sl-color-white, #f8fafc)',
              cursor: isAutomating || isConverged ? 'not-allowed' : 'pointer',
              fontWeight: 600,
            }}
          >
            👣 1 Paso manual
          </button>

          <button
            onClick={() => setIsAutomating(!isAutomating)}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              borderRadius: '0.375rem',
              backgroundColor: isAutomating ? 'rgba(239, 68, 68, 0.2)' : 'var(--color-accent, #6366f1)',
              border: '1px solid',
              borderColor: isAutomating ? '#f87171' : 'var(--color-accent, #6366f1)',
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {isAutomating ? '⏸️ Detener' : '▶️ Rodar cuesta abajo'}
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '0.45rem 0.75rem',
              fontSize: '0.82rem',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              color: 'var(--sl-color-gray-3, #94a3b8)',
              cursor: 'pointer',
            }}
          >
            ⏮️ Reiniciar bola
          </button>
        </div>
      </div>

      {/* Gráficos paralelos: Paisaje de Error y Ajuste a Datos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Gráfico 1: La colina y la bola rodando */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--sl-color-white, #f8fafc)' }}>
              1. Paisaje de pérdida (Loss Landscape)
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-accent, #a5b4fc)', fontFamily: 'monospace' }}>
              Error: {currentLoss.toFixed(2)}
            </span>
          </div>

          <svg
            viewBox="0 0 360 180"
            style={{
              width: '100%',
              height: 'auto',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '0.375rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
            aria-label="Gráfico de función cuadrática de pérdida mostrando la bola rodando al mínimo"
          >
            {/* Eje horizontal */}
            <line x1="10" y1="165" x2="350" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="180" y="177" fill="#64748b" fontSize="10" textAnchor="middle">
              Parámetro w (valor óptimo = 1.0)
            </text>

            {/* Curva de coste */}
            <path d={curvePath} fill="none" stroke="rgba(99, 102, 241, 0.5)" strokeWidth="2.5" />

            {/* Mínimo óptimo marcado */}
            <circle cx={svgWToX(1.0)} cy={svgLossToY(0.2)} r="4" fill="#22c55e" opacity="0.6" />
            <text x={svgWToX(1.0)} y={svgLossToY(0.2) + 14} fill="#4ade80" fontSize="9" textAnchor="middle">
              valle
            </text>

            {/* Bola en su posición actual */}
            <circle
              cx={ballX}
              cy={ballY}
              r="8"
              fill="var(--color-accent, #6366f1)"
              stroke="#ffffff"
              strokeWidth="2"
              style={{ transition: isAutomating ? 'all 0.3s ease' : 'none' }}
            />
          </svg>

          <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--sl-color-gray-3, #94a3b8)' }}>
            Valor actual del peso: <strong style={{ color: '#fff' }}>w = {w.toFixed(2)}</strong> (Objetivo ideal: 1.00)
            {history.length > 1 && (
              <span style={{ display: 'block', fontSize: '0.7rem', color: '#a5b4fc', marginTop: '0.2rem' }}>
                📉 Pérdida reciente: {history.slice(-4).map((h) => h.loss.toFixed(2)).join(' → ')}
              </span>
            )}
          </div>
        </div>

        {/* Gráfico 2: El ajuste del modelo a datos botánicos */}
        <div
          style={{
            backgroundColor: 'var(--sl-color-bg, #1e293b)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--sl-color-gray-5, #334155)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--sl-color-white, #f8fafc)' }}>
              2. Modelo ajustándose a los datos de campo
            </span>
            <span style={{ fontSize: '0.78rem', color: '#4ade80' }}>
              Brote de roble (días vs cm)
            </span>
          </div>

          <svg
            viewBox="0 0 360 180"
            style={{
              width: '100%',
              height: 'auto',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '0.375rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
            aria-label="Puntos de datos experimentales y línea de predicción del modelo convergiendo"
          >
            {/* Ejes */}
            <line x1="30" y1="150" x2="340" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="30" y1="10" x2="30" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="180" y="168" fill="#64748b" fontSize="10" textAnchor="middle">
              Días de germinación (X)
            </text>
            <text x="18" y="80" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90 18 80)">
              Altura cm (Y)
            </text>

            {/* Puntos de datos experimentales reales */}
            {botanicalPoints.map((pt, i) => {
              const cx = 30 + (pt.x / 5.5) * 300;
              const cy = 150 - (pt.y / 6.0) * 130;
              return (
                <circle key={i} cx={cx} cy={cy} r="5" fill="#4ade80" stroke="#166534" strokeWidth="1.5" />
              );
            })}

            {/* Línea del modelo: Y = w * X */}
            {(() => {
              const x1 = 0;
              const y1 = 0;
              const x2 = 5.2;
              const y2 = w * x2;
              const svgX1 = 30 + (x1 / 5.5) * 300;
              const svgY1 = 150 - (y1 / 6.0) * 130;
              const svgX2 = 30 + (x2 / 5.5) * 300;
              const svgY2 = 150 - (Math.min(6.5, Math.max(-0.5, y2)) / 6.0) * 130;

              return (
                <line
                  x1={svgX1}
                  y1={svgY1}
                  x2={svgX2}
                  y2={svgY2}
                  stroke="var(--color-accent, #6366f1)"
                  strokeWidth="2.5"
                  strokeDasharray={isConverged ? 'none' : '4 3'}
                />
              );
            })()}
          </svg>

          <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--sl-color-gray-3, #94a3b8)' }}>
            Línea morada = Predicción del modelo. Conforme la bola baja al valle, la recta clava la trayectoria de los puntos verdes.
          </div>
        </div>
      </div>

      {/* Diagnóstico pedagógico */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: isOscillating
            ? 'rgba(239, 68, 68, 0.08)'
            : isConverged
            ? 'rgba(34, 197, 94, 0.08)'
            : 'rgba(99, 102, 241, 0.08)',
          border: '1px solid',
          borderColor: isOscillating
            ? 'rgba(239, 68, 68, 0.3)'
            : isConverged
            ? 'rgba(34, 197, 94, 0.3)'
            : 'rgba(99, 102, 241, 0.3)',
          fontSize: '0.85rem',
          color: 'var(--sl-color-text, #e2e8f0)',
          lineHeight: 1.5,
        }}
      >
        {isOscillating ? (
          <span>
            ⚠️ <strong>¡Tasa de aprendizaje excesiva!</strong> La bola da saltos tan gigantescos que pasa de largo el fondo del valle y rebota violentamente entre las paredes de la colina. Esto es lo que provoca que un modelo no aprenda o "explote" durante el entrenamiento.
          </span>
        ) : isConverged ? (
          <span>
            🎉 <strong>¡Convergencia lograda!</strong> La bola ha llegado al punto más bajo de la cuenca. La derivada (pendiente) es prácticamente cero. La recta del modelo reproduce con máxima fidelidad los datos empíricos observados.
          </span>
        ) : (
          <span>
            💡 <strong>En marcha:</strong> En cada iteración, el algoritmo calcula cuánto se equivoca el modelo con los datos actuales y da un paso proporcional a la pendiente para recortar el error.
          </span>
        )}
      </div>
    </div>
  );
}
