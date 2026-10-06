# Roadmap

Trabaja por fases. Al final de cada una, para y pide revisión.

## Decisiones pendientes (ninguna bloquea las fases 1 a 3)
| Decisión | Afecta solo a | Cuándo decidir |
|---|---|---|
| Nombre del curso y URL final | Portada y publicación | Antes de la fase 6; usar un título provisional hasta entonces |
| Plan de suscripciones y agente para las prácticas del destinatario | L09 (script), L12, L13, L21 (Ruta B), L19 | Antes de redactar esas lecciones; hasta entonces, redactar con opencode y modelos abiertos o locales como ruta por defecto |
| Máquina o entorno aislado para un agente siempre activo | Solo L19 (opcional) | Solo si se decide incluir L19; si no, se puede recortar |
| Chip y RAM del Mac, impresora, laminador, cliente MCP | Nada es bloqueante | Las lecciones se escriben en genérico y enseñan a comprobarlo; personalizar si se conocen |

Regla general: **una decisión pendiente nunca detiene el trabajo.** Redacta la versión genérica y marca `TODO(personalizar)`.

## Orden del curso (fuente de verdad)
| Orden visible | ID | Lección |
|---|---|---|
| 1–4 | L01–L04 | Fundamentos |
| 5 | **L20** | Mapa de modelos y niveles de razonamiento |
| 6–7 | L05–L06 | Pesos y parámetros; cuantización y modelos locales |
| 8–9 | L07–L08 | Terminal I y II |
| 10–15 | L09–L14 | Anatomía de un agente, tools/MCP, los .md, agentes de programación I y II, RAG |
| 16 | L15 | Seguridad, privacidad y fiabilidad |
| 17 | **L21** | IA para diseño 3D: FreeCAD con MCP |
| 18 | L16 | Agentes generalistas |
| 19–21 | L17–L19 | Proyecto final, panorama, tutorial opcional |

## Fase 1 — Andamiaje
- Crear proyecto Astro + Starlight en español, con navegación por bloques y lecciones.
- Configurar despliegue en GitHub Pages con Actions (ruta base correcta).
- Fuentes autoalojadas, modo claro/oscuro, página de inicio provisional.
- **Hecho cuando:** la web vacía se publica y navega bien en escritorio y móvil.

## Fase 2 — Sistema de diseño y componentes de contenido
- Implementar tokens y estilos según `docs/01-design-system.md`.
- Componentes: `Callout`, `Terminal`, `Paso`/`Pasos` (con progreso local), `Reto`, `Analogia`, `Verificado`, `Glosario` (tooltip + página), `ProgresoCurso`.
- Página de muestra que use todos los componentes.
- **Hecho cuando:** la página de muestra se ve cuidada, es accesible y respeta reduced-motion.

## Fase 3 — Lección vertical (L01)
- Implementar **solo la lección 01** completa (texto, widget tokenizador, animación de generación, práctica, reto).
- Sirve para validar tono, estética y nivel de interactividad antes de producir el resto.
- **Hecho cuando:** el propietario la revisa y aprueba (o pide ajustes de tono y diseño).

## Fase 4 — Lecciones por bloques
Orden: el de la tabla "Orden del curso" (Bloque 1: L02–L04, L20, L05–L06; Bloque 2: L07–L08; Bloque 3: L09–L15, L21, L16; Bloque 4: L17–L19).
**La L19 es opcional y NO se redacta salvo confirmación explícita del propietario**; al llegar al final del Bloque 4, pregunta antes de empezarla.
Para cada lección: leer su especificación, construir widgets nuevos del catálogo, redactar, verificar datos volátiles, revisar. **Revisión humana entre bloques.**

## Fase 5 — Pulido
- Glosario completo (incluye: herramienta, modelo, familia de modelos, versión, nivel de esfuerzo de razonamiento, paramétrico, STL, 3MF, laminador, voladizo, tolerancia), búsqueda, navegación entre lecciones, página de recursos.
- Accesibilidad, rendimiento, pruebas en móvil y Safari, enlaces rotos.
- Pasada final de verificación de datos volátiles.

## Fase 6 — Publicación
- Revisar que no hay secretos ni datos personales, configurar dominio si procede y publicar.

## Catálogo de widgets (por lección)
| Lección | Widgets |
|---|---|
| 01 | tokenizador, generación token a token |
| 02 | mapa de embeddings 2D, similitud de frases, suma de vectores |
| 03 | mapa de atención, simulador de temperatura, flujo por capas |
| 04 | descenso de gradiente, línea temporal del entrenamiento |
| 05 | calculadora de tamaño, mini red con pesos editables, comparador de tamaños |
| 06 | simulador de cuantización, calculadora de memoria por Mac |
| 07 | terminal simulada con misiones, árbol de carpetas animado |
| 08 | explicador de comandos, animación del PATH |
| 09 | bucle del agente animado, agente de juguete |
| 10 | diagrama MCP animado, diseñador de tools |
| 11 | editor Markdown con vista previa, "mochila" de contexto |
| 12 | simulador de sesión con aprobaciones, plan→acciones→diff |
| 13 | comparativa filtrable, cuestionario "¿qué agente me conviene?" |
| 14 | pipeline RAG animado, chunking ajustable |
| 15 | "encuentra la instrucción oculta", simulador de permisos |
| 16 | arquitectura animada de un agente generalista, comparativa |
| 17 | ficha de proyecto descargable, checklist de seguridad |
| 18 | línea temporal interactiva, lista de recursos |
| 19 | checklist con progreso local, arquitectura animada |
| 20 | pirámide interactiva, selector de herramienta y plan, dial de esfuerzo, escalera de tamaños, mini-juego herramienta/modelo |
| 21 | visor 3D paramétrico, animación prompt→pieza, checklist de imprimibilidad, comparativa Tinkercad/FreeCAD |
