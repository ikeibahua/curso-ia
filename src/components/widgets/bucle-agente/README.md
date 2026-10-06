# Widget: Bucle del Agente (Observar → Razonar → Actuar)

Visualizador paso a paso del ciclo autónomo de un agente inteligente.

## Propósito
Explicar cómo un modelo pasa de ser un generador de texto pasivo a un agente resolutivo:
1. Observa el objetivo y el contexto actual.
2. Razona internamente la estrategia a seguir.
3. Actúa emitiendo una llamada estructurada en JSON (*Tool Call*).
4. El sistema ejecuta la herramienta y devuelve el resultado (*Tool Result*).
5. El bucle se repite hasta que el objetivo se cumple.

## Funcionalidades
- Navegación paso a paso de 8 etapas divididas en 2 ciclos completos de resolución.
- Reproducción automática, pausa y reinicio.
- Muestra de código JSON realista tanto de la llamada como de la respuesta del entorno.
- Contraste AA y controles por teclado.
