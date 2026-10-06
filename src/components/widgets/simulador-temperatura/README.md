# Widget: Simulador de Temperatura y Top-P

Simulador interactivo del paso de muestreo estocástico (*sampling*) en modelos de lenguaje.

## Propósito
Permite comprender matemáticamente y de manera intuitiva cómo influyen los hiperparámetros de Temperatura ($T$) y Muestreo de Núcleo (Top-P) en la conversión de *logits* a probabilidades mediante la función Softmax, y cómo afectan a la variabilidad de las respuestas generadas.

## Funcionalidades
- Control deslizante continuo de Temperatura ($T \in [0.1, 2.0]$) y Top-P ($P \in [0.2, 1.0]$).
- Presets inmediatos para los cuatro casos típicos: Código y precisión matemática, Conversacional estándar, Escritura creativa y Muestreo caótico.
- Botón de muestreo con tirada pseudoaleatoria que respeta la distribución acumulada resultante.
- Historial dinámico de palabras seleccionadas para verificar la dispersión empírica.
- Nota contextualizada sobre modelos con razonamiento extendido (OpenAI o1/o3, Claude 3.7) donde la temperatura se fija a 1.0 por diseño del sistema.
- Respeto a accesibilidad (`aria-labelledby`, etiquetas de formularios, alto contraste).

