# Widget: Simulador de Cuantización

Visualizador interactivo de los niveles de cuantización de precisión numérica (de 16 bits a 2 bits).

## Propósito
Explicar cómo la reducción de bits discretiza la función matemática de la red neuronal:
- Curva de señal biológica continua (16 bits).
- Mapeo a escalones de 8 bits (256 niveles), 4 bits (16 niveles) y 2 bits (4 niveles).
- Impacto numérico directo en el tamaño de un modelo 8B (16 GB $\to$ 8 GB $\to$ 4.5 GB $\to$ 2.2 GB).
- Calidad lingüística preservada vs degradación por compresión extrema.

## Funcionalidades
- Gráfico SVG dinámico que muestra los peldaños escalonados superpuestos a la curva teórica suave.
- Comparativa de ahorro de memoria (%) y retención de calidad (%).
- Muestra de texto real generada a cada nivel de bits.
- Accesibilidad con etiquetas semánticas y alto contraste.
