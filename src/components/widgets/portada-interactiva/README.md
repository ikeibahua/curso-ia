# Widgets de la Portada Interactiva

Componentes interactivos y animados desarrollados para la página de inicio del curso (`src/content/docs/index.mdx`):

1. **`HeroAnimado.tsx`**:
   - Visualizador conceptual interactivo que traza la metáfora biológica central del curso: del Token (célula/ADN) al Embeddings (taxonomía), la Atención (micorrizas) y el Agente (organismo en su entorno).
   - Animación con lienzo SVG, halo pulsante, barra de progreso temporal automática, controles de reproducción (Play, Pausa, Anterior, Siguiente) y fichas de rigor científico.
   - Enlace directo a cada lección implicada.

2. **`ProbadorTokensMini.tsx`**:
   - Laboratorio instantáneo para experimentar en menos de 10 segundos cómo un LLM divide frases botánicas o de lenguaje natural en tokens numéricos.
   - Métricas en vivo (tokens, palabras, caracteres, ratio) y explicación del límite arquitectónico de contar letras.

3. **`ExploradorRutas.tsx`**:
   - Selector interactivo de rutas de aprendizaje ("Brújula de Campo") que orienta al alumno según sus objetivos del día (Fundamentos, Terminal, Agentes/MCP, o Fabricación 3D en FreeCAD).

## Accesibilidad
- Controles accesibles con teclado (`Tab`, `Enter`, `Espacio`).
- Atributos ARIA (`role="tab"`, `aria-selected`, `aria-controls`, `aria-live="polite"`).
- Respeta `prefers-reduced-motion` anulando animaciones automáticas cuando está habilitado.

