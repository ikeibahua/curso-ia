# Lección 20 — El mapa de modelos: herramientas, familias y niveles de razonamiento

**Bloque 1 · Por dentro** · Duración estimada: 75 min · Requisitos: Lecciones 01, 03 y 04
**Posición en el curso:** justo después de la lección 04 y antes de la 05.

## Objetivos
- Distinguir con claridad **empresa, herramienta, modelo y nivel de esfuerzo**.
- Saber que ChatGPT y Claude son **herramientas** (productos), y que los modelos son lo que hay dentro.
- Reconocer las familias y los tamaños de modelos actuales, y qué significan los nombres.
- Entender el "nivel de razonamiento" (low, medium, high, extra high...) y cuándo conviene subirlo o bajarlo.

## Contenido a cubrir
- **La pirámide (de arriba abajo):**
  1. Empresa (OpenAI, Anthropic, Google...).
  2. Herramienta o producto (ChatGPT, Claude, Codex, Claude Code; web, app, API).
  3. Familia de modelos y tamaño (en cada empresa, una escalera de pequeño/rápido a grande/potente).
  4. Modelo concreto y su versión.
  5. Nivel de esfuerzo de razonamiento (el "dial" que se aplica a ese modelo).
- **Error típico a desmontar:** "usar ChatGPT" no dice qué modelo responde. La misma herramienta puede ofrecer varios modelos, y el mismo modelo puede aparecer en varias herramientas. Ejemplo para ilustrarlo con la vida real de su uso diario.
- **Familias de OpenAI y Anthropic** (ver "Estado verificado" abajo): qué significa cada nombre, cómo se ordenan y por qué el mismo nombre puede existir en dos generaciones (la versión importa).
- **Tamaño frente a coste, velocidad y capacidad:** conectar con las lecciones 01 (tokens, coste por token) y 05 (parámetros). Un modelo mayor no siempre es la mejor elección.
- **Niveles de esfuerzo de razonamiento:** qué controlan (cuánto "piensa" el modelo antes de responder), por qué suben coste y tiempo, y que más esfuerzo no garantiza mejor resultado. Los nombres exactos de los niveles varían según empresa y modelo.
- **Cómo elegir:** tarea simple → modelo pequeño o esfuerzo bajo; tarea compleja o con varios pasos → modelo mayor o esfuerzo alto; cuándo compensa escalar. Ligar con benchmarks y escepticismo (lección 04).
- **Otras empresas y modelos abiertos** (Google, Mistral, DeepSeek, Qwen, Meta...): mención breve y verificada, enlazando con la lección 05.
- **Los modelos envejecen:** se retiran y se sustituyen con frecuencia. Qué significa para él a la hora de fiarse de una guía antigua.
- **Una advertencia técnica útil:** en los modelos de razonamiento recientes suele no poder ajustarse la temperatura directamente (se controla con el nivel de esfuerzo). Conecta con el simulador de la lección 03.

## Interactivo y animación
- **Pirámide interactiva:** pulsar cada nivel (empresa → herramienta → modelo → esfuerzo) y ver ejemplos reales con la fecha de verificación.
- **Selector "¿dónde estoy?":** el usuario elige herramienta y plan y ve qué modelos suele ofrecer (datos fechados).
- **Dial de esfuerzo:** deslizador low → max que muestra, de forma ilustrativa, el efecto en tiempo, coste en tokens y calidad esperada; con nota de que es una simplificación.
- **Escalera de tamaños** de cada empresa, en paralelo, con tooltips de cada nombre.
- **Mini-juego "herramienta o modelo":** clasificar nombres (ChatGPT, Sol, Claude, Opus, Codex...) arrastrándolos a su casilla.

## Práctica en su Mac
- En su ChatGPT y su Claude web: localizar el selector de modelo, anotar qué modelos ve y cuál se usa por defecto.
- Hacer la misma pregunta difícil con un modelo pequeño y otro mayor (o con y sin la opción de "pensar" si existe en su plan) y comparar calidad, tiempo y longitud.
- Repetir una tarea sencilla con esfuerzo bajo y alto si su plan lo permite; si no, usar el material grabado de ejemplo.

## Reto final
Dadas seis tareas (corregir un texto, planificar un viaje, depurar un script, resumir un PDF, resolver un problema de matemáticas, clasificar archivos), elegir para cada una **herramienta, familia/tamaño y nivel de esfuerzo**, justificando en una frase.

## Notas para el agente
- **Todo dato de esta lección es volátil:** verifícalo en la documentación oficial de OpenAI y Anthropic (páginas de modelos y de esfuerzo/razonamiento), pon `Verificado` con fecha y evita cifras de precio salvo que estén contrastadas.
- **Estado verificado (octubre 2026, a re-verificar antes de publicar):**
  - OpenAI: existen dos generaciones activas con nombres compartidos. GPT-6: Astra (el más capaz), Sol y Luna. GPT-5.6: Sol, Terra y Luna. Orden general de capacidad y coste: Luna < Terra < Sol < Astra. En ChatGPT, la opción "GPT-6 Pro" usaría Astra (fuente secundaria; confirmar). Los modelos disponibles en ChatGPT y en la API pueden diferir, y dependen del plan.
  - Anthropic: Haiku (rápido y ligero), Sonnet (equilibrado), Opus (el más potente de la escalera clásica) y, por encima, un nivel superior (Mythos), del que Fable es la variante con medidas de seguridad adicionales. Versiones a fecha de esta nota: Haiku 4.5, Sonnet 5.5, Opus 5.5, Fable 5.1.
  - Niveles de esfuerzo: Anthropic usa low, medium, high, xhigh (aparece como "Extra high" en claude.ai) y max. OpenAI usa none o minimal, low, medium, high y xhigh, según el modelo. Los nombres y el valor por defecto cambian por modelo y plan.
- Los ejemplos de selector de modelo deben reflejar lo que **su plan gratuito** muestra realmente; preguntar a Iker o enseñarle a observarlo, no suponer.
- Evitar "rankings" y afirmaciones de superioridad entre empresas; centrar en criterios de elección.
- Aplica la estructura fija de lección, el sello `Verificado` y las reglas de `AGENTS.md`.
