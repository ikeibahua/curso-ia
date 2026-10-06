import React, { useState, useId } from 'react';

interface ProjectTemplate {
  id: string;
  name: string;
  title: string;
  objective: string;
  inputs: string;
  outputs: string;
  modelAndTools: string;
  killSwitch: string;
}

const PRESET_PROJECTS: ProjectTemplate[] = [
  {
    id: 'fotos',
    name: 'Organizador de Fotos de Campo',
    title: 'Clasificador Automático de Fotografía Botánica',
    objective: 'Leer las fotos del móvil guardadas en Descargas y archivarlas en carpetas ordenadas por año, mes y especie reconocida.',
    inputs: 'Archivos JPG/HEIC en ~/Descargas/Fotos-Camara/',
    outputs: 'Estructura organizada en ~/Fotos/2026/03-Marzo/<especie>/ sin borrar originales.',
    modelAndTools: 'OpenCode en terminal local con modelo Llama 3.2 vía Ollama (0€ de coste).',
    killSwitch: 'Cerrar la ventana de Terminal o pulsar Ctrl + C en cualquier momento.',
  },
  {
    id: 'heladas',
    name: 'Alerta Matutina de Clima',
    title: 'Vigilante de Heladas para el Huerto y Plantones',
    objective: 'Consultar cada día a las 07:00 AM la previsión de temperatura mínima en AEMET y avisar por Telegram si bajará de 0°C.',
    inputs: 'API pública meteorológica de AEMET (formato JSON de temperatura diaria).',
    outputs: 'Mensaje de notificación en Telegram con la temperatura mínima y consejo de protección.',
    modelAndTools: 'Script de Python programado en macOS (launchd o cron) con Claude 3.5 Haiku o modelo local.',
    killSwitch: 'Ejecutar en terminal: launchctl unload ~/Library/LaunchAgents/alerta_heladas.plist',
  },
  {
    id: 'rag',
    name: 'Consultorio RAG de Flora',
    title: 'Biblioteca de Consulta Botánica sobre PDFs Históricos',
    objective: 'Permitir preguntas en lenguaje natural sobre 15 guías y artículos forestales sin enviar documentos a internet.',
    inputs: '15 archivos PDF guardados en ~/Documentos/Guias-Botanicas/',
    outputs: 'Respuestas con fragmentos textuales contrastados y número de página exacto.',
    modelAndTools: 'Base vectorial local Chroma con script Python y Ollama en el Mac.',
    killSwitch: 'El sistema sólo se ejecuta cuando tú lanzas la pregunta en Terminal; no se queda en segundo plano.',
  },
  {
    id: '3d',
    name: 'Soporte 3D de Viales',
    title: 'Gradilla Paramétrica a Medida para Muestras de Campo',
    objective: 'Diseñar un organizador rígido impreso en 3D para transportar viales de semillas de 18 mm sin holgura excesiva.',
    inputs: 'Medidas tomadas con calibre: 4 viales de 18 mm + 0.3 mm de tolerancia.',
    outputs: 'Archivo STL listo para laminar en Bambu Studio / PrusaSlicer e imprimir en PLA.',
    modelAndTools: 'Script paramétrico en FreeCAD 1.0 generado mediante chat web con Claude o local.',
    killSwitch: 'Cerrar FreeCAD. La pieza queda exportada como archivo inerte en disco.',
  },
];

export default function FichaProyecto() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('fotos');
  const [title, setTitle] = useState<string>(PRESET_PROJECTS[0].title);
  const [objective, setObjective] = useState<string>(PRESET_PROJECTS[0].objective);
  const [inputs, setInputs] = useState<string>(PRESET_PROJECTS[0].inputs);
  const [outputs, setOutputs] = useState<string>(PRESET_PROJECTS[0].outputs);
  const [modelAndTools, setModelAndTools] = useState<string>(PRESET_PROJECTS[0].modelAndTools);
  const [killSwitch, setKillSwitch] = useState<string>(PRESET_PROJECTS[0].killSwitch);
  const [copied, setCopied] = useState<boolean>(false);
  const titleId = useId();

  const handleSelectPreset = (pId: string) => {
    setSelectedPresetId(pId);
    const p = PRESET_PROJECTS.find((item) => item.id === pId);
    if (p) {
      setTitle(p.title);
      setObjective(p.objective);
      setInputs(p.inputs);
      setOutputs(p.outputs);
      setModelAndTools(p.modelAndTools);
      setKillSwitch(p.killSwitch);
    }
  };

  const markdownContent = `# FICHA DE PROYECTO: ${title}

## 1. Objetivo en una frase
${objective}

## 2. Entradas (Inputs)
${inputs}

## 3. Salidas Esperadas (Outputs)
${outputs}

## 4. Herramientas y Motor de Inteligencia Artificial
${modelAndTools}

## 5. Protocolo de Desconexión (Kill Switch)
${killSwitch}

---
*Generado desde el Curso de Inteligencia Artificial para macOS.*
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PROYECTO.md';
    link.click();
    URL.revokeObjectURL(url);
  };

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
            Taller Práctico · Ficha de Proyecto
          </span>
          <h4 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
            Diseñador de Proyecto Personal Descargable
          </h4>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopyMarkdown}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #334155',
              background: '#090d16',
              color: '#f8fafc',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            {copied ? '✓ Copiado' : '📋 Copiar Markdown'}
          </button>
          <button
            onClick={handleDownloadFile}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: 'var(--sl-color-accent, #0ea5e9)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            💾 Descargar PROYECTO.md
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--sl-color-gray-2, #cbd5e1)', marginBottom: '1rem' }}>
        Elige una plantilla inspiradora o personaliza cada campo con tu propia idea. Esta ficha servirá como tu hoja de ruta técnica antes de encargarle nada al agente.
      </p>

      {/* Preset selector bar */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {PRESET_PROJECTS.map((p) => {
          const isSelected = selectedPresetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.id)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: isSelected ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
                background: isSelected ? 'rgba(14, 165, 233, 0.15)' : '#090d16',
                color: isSelected ? '#38bdf8' : '#94a3b8',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: isSelected ? 600 : 400,
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Form Fields */}
      <div
        style={{
          background: '#020617',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* Title */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#38bdf8', marginBottom: '0.3rem' }}>
            Título del Proyecto:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #334155',
              background: '#090d16',
              color: '#f8fafc',
              fontSize: '0.85rem',
            }}
          />
        </div>

        {/* Objective */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#38bdf8', marginBottom: '0.3rem' }}>
            1. Objetivo en una frase (¿Qué problema resuelve?):
          </label>
          <textarea
            rows={2}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #334155',
              background: '#090d16',
              color: '#f8fafc',
              fontSize: '0.82rem',
              lineHeight: 1.4,
            }}
          />
        </div>

        {/* Inputs & Outputs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#a78bfa', marginBottom: '0.3rem' }}>
              2. Datos de Entrada (Archivos o APIs):
            </label>
            <input
              type="text"
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #334155',
                background: '#090d16',
                color: '#f8fafc',
                fontSize: '0.82rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#34d399', marginBottom: '0.3rem' }}>
              3. Salida Esperada (Resultado concreto):
            </label>
            <input
              type="text"
              value={outputs}
              onChange={(e) => setOutputs(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #334155',
                background: '#090d16',
                color: '#f8fafc',
                fontSize: '0.82rem',
              }}
            />
          </div>
        </div>

        {/* Tools and Kill Switch */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#fbbf24', marginBottom: '0.3rem' }}>
              4. Herramientas y Modelo Elegido:
            </label>
            <input
              type="text"
              value={modelAndTools}
              onChange={(e) => setModelAndTools(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #334155',
                background: '#090d16',
                color: '#f8fafc',
                fontSize: '0.82rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#f87171', marginBottom: '0.3rem' }}>
              5. Interruptor de Apagado (Kill Switch):
            </label>
            <input
              type="text"
              value={killSwitch}
              onChange={(e) => setKillSwitch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #334155',
                background: '#090d16',
                color: '#f8fafc',
                fontSize: '0.82rem',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
