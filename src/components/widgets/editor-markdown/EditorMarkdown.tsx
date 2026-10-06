import React, { useState, useId } from 'react';

const PRESET_AGENTS_MD = `# Instrucciones del Proyecto: Cuaderno Botánico

## Rol y Tono
Eres un asistente botánico riguroso y conciso. 
- Utiliza español de España y tuteo respetuoso.
- Escribe siempre los nombres científicos en latín en cursiva (ej. *Quercus robur*).
- Explica los términos técnicos la primera vez que aparezcan.

## Reglas de Trabajo
1. Verifica siempre la altitud y tipo de sustrato antes de proponer especies.
2. Si un dato no es seguro, indícalo expresamente como hipótesis.
3. No modifiques archivos sin confirmación previa.
`;

const PRESET_FIELD_NOTE = `# Cuaderno de Campo: Hayedo de Montejo
**Fecha:** 14 de octubre · **Altitud:** 1.250 m

## Observaciones del rodal
- Dominancia clara de *Fagus sylvatica* en estrato arbóreo.
- Sotobosque con ejemplares dispersos de acebo (*Ilex aquifolium*).
- Humedad edáfica alta tras las lluvias de la semana pasada.

> "El límite altitudinal superior muestra transición hacia matorral de piornal."
`;

export default function EditorMarkdown() {
  const [content, setContent] = useState<string>(PRESET_AGENTS_MD);
  const titleId = useId();

  // Simple client-side markdown to HTML renderer for the preview pane
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const htmlLines: string[] = [];

    lines.forEach((line) => {
      let l = line;
      // Headings
      if (l.startsWith('### ')) {
        htmlLines.push(`<h4 style="margin: 0.6rem 0 0.2rem 0; font-size: 0.95rem; color: #a5b4fc;">${l.slice(4)}</h4>`);
        return;
      }
      if (l.startsWith('## ')) {
        htmlLines.push(`<h3 style="margin: 0.8rem 0 0.3rem 0; font-size: 1.05rem; color: #f8fafc; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.2rem;">${l.slice(3)}</h3>`);
        return;
      }
      if (l.startsWith('# ')) {
        htmlLines.push(`<h2 style="margin: 0 0 0.5rem 0; font-size: 1.2rem; color: #ffffff;">${l.slice(2)}</h2>`);
        return;
      }
      // Blockquotes
      if (l.startsWith('> ')) {
        htmlLines.push(`<blockquote style="margin: 0.5rem 0; padding: 0.4rem 0.8rem; border-left: 3px solid #6366f1; background: rgba(99,102,241,0.1); color: #cbd5e1; font-style: italic;">${l.slice(2)}</blockquote>`);
        return;
      }
      // Unordered lists
      if (l.startsWith('- ') || l.startsWith('* ')) {
        htmlLines.push(`<li style="margin-left: 1.2rem; color: #e2e8f0; font-size: 0.85rem;">${parseInline(l.slice(2))}</li>`);
        return;
      }
      // Numbered lists
      if (/^\d+\.\s/.test(l)) {
        const itemText = l.replace(/^\d+\.\s/, '');
        htmlLines.push(`<li style="margin-left: 1.2rem; color: #e2e8f0; font-size: 0.85rem;">${parseInline(itemText)}</li>`);
        return;
      }
      // Empty line
      if (l.trim() === '') {
        htmlLines.push('<div style="height: 0.4rem;"></div>');
        return;
      }
      // Paragraph
      htmlLines.push(`<p style="margin: 0 0 0.4rem 0; color: #cbd5e1; font-size: 0.85rem; line-height: 1.5;">${parseInline(l)}</p>`);
    });

    return htmlLines.join('');
  };

  const parseInline = (str: string) => {
    let s = str;
    // Bold
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>');
    // Italic
    s = s.replace(/\*(.*?)\*/g, '<em style="color: #a5b4fc;">$1</em>');
    // Inline code
    s = s.replace(/`(.*?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; color: #38bdf8; font-family: monospace;">$1</code>');
    return s;
  };

  const insertSnippet = (snippet: string) => {
    setContent((prev) => prev + '\n' + snippet);
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
            Formato universal
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
            Editor Markdown con Vista Previa en Vivo
          </h3>
        </div>

        {/* Botones de plantillas rápidas */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setContent(PRESET_AGENTS_MD)}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              backgroundColor: 'var(--sl-color-bg, #1e293b)',
              color: '#a5b4fc',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            📄 Plantilla AGENTS.md
          </button>
          <button
            onClick={() => setContent(PRESET_FIELD_NOTE)}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              backgroundColor: 'var(--sl-color-bg, #1e293b)',
              color: '#cbd5e1',
              cursor: 'pointer',
            }}
          >
            🌿 Nota de campo
          </button>
        </div>
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: 'var(--sl-color-gray-2, #cbd5e1)' }}>
        Los agentes aman el formato Markdown (<code>.md</code>) porque es texto plano, ligero en tokens y perfectamente estructurado. Modifica el texto a la izquierda y observa cómo se formatea al instante a la derecha:
      </p>

      {/* Barra de atajos de formato */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => insertSnippet('## Nuevo subtítulo')}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.25rem', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#cbd5e1', cursor: 'pointer' }}
        >
          + Título (##)
        </button>
        <button
          onClick={() => insertSnippet('- Elemento de lista')}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.25rem', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#cbd5e1', cursor: 'pointer' }}
        >
          + Lista (- )
        </button>
        <button
          onClick={() => insertSnippet('> Nota destacada o cita')}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.25rem', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#cbd5e1', cursor: 'pointer' }}
        >
          + Cita (&gt;)
        </button>
        <button
          onClick={() => insertSnippet('`palabra_en_codigo`')}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.25rem', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#cbd5e1', cursor: 'pointer' }}
        >
          + Código (`)
        </button>
      </div>

      {/* Grid de dos columnas: Editor y Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Panel izquierdo: Editor de texto plano */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="md-editor-textarea"
            style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.35rem', textTransform: 'uppercase' }}
          >
            ✏️ Código fuente Markdown (.md)
          </label>
          <textarea
            id="md-editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              minHeight: '260px',
              backgroundColor: '#0a0f1d',
              color: '#f8fafc',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              padding: '0.85rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Panel derecho: Vista previa renderizada */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
            👁️ Vista previa renderizada (Cómo lo lee el modelo)
          </div>
          <div
            style={{
              backgroundColor: 'var(--sl-color-bg, #1e293b)',
              padding: '0.85rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              minHeight: '260px',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>
      </div>
    </div>
  );
}
