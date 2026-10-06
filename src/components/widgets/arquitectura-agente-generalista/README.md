# Widget: Arquitectura de Agente Generalista (`arquitectura-agente-generalista`)

## Propósito
Permite al alumno comprender cómo funciona un agente autónomo de fondo (como Hermes Agent u OpenClaw):
1. **Canales:** Telegram, Signal o tareas automáticas del reloj (Cron).
2. **Pasarela (*Gateway*):** autenticación de remitentes e interceptación de peticiones no autorizadas.
3. **Núcleo (*LLM*):** razonamiento sobre el objetivo y consulta de contexto.
4. **Herramientas y Memoria:** llamadas a APIs externas y escritura de diarios en Markdown o SQLite.

## Accesibilidad
- Selector de escenarios y pasos interactivos mediante botones con contraste WCAG AA.
- Explicaciones de texto descriptivas para cada estado.
