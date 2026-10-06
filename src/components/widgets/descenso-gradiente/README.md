# Widget: Descenso de Gradiente

Simulador interactivo del algoritmo de descenso de gradiente estocástico (*Gradient Descent*).

## Propósito
Explicar de forma visual la intuición matemática tras el entrenamiento de una red neuronal:
- La función de coste/pérdida (*Loss*) como un terreno montañoso.
- La pendiente local (derivada / gradiente) que indica hacia dónde rodar.
- El papel de la tasa de aprendizaje (*learning rate*): muy baja tarda demasiado, muy alta oscila o explota, la óptima converge al valle.
- La conexión entre la reducción del error matemático y el ajuste de una curva a observaciones botánicas reales.

## Funcionalidades
- Control interactivo del parámetro mediante pasos discretos o animación automática.
- Gráficos SVG sincronizados: cuenca parabólica de error y ajuste de regresión a puntos empíricos.
- Detección interactiva de divergencia por sobre-oscilación.
- Accesibilidad con alto contraste, estados aria y etiquetas explicativas.
