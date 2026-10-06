# Widget: Flujo por Capas de un Transformer

Visualizador interactivo de la secuencia interna de cómputo en la arquitectura Transformer, desde la entrada de texto hasta la predicción estocástica del siguiente token.

## Propósito
Explicar de forma gradual y visual qué transformaciones sufre el dato a través de las 5 fases principales:
1. Tokenización y enteros.
2. Embeddings y codificación posicional (RoPE).
3. Autoatención multicabeza (MHA) y ponderación mutua.
4. Redes densas (MLP) y conexiones residuales.
5. Capa de proyección lineal, Softmax y generación autorregresiva.

## Funcionalidades
- Recorrido paso a paso (1 al 5) mediante botones de navegación o pulsadores directos.
- Modo de reproducción automática con pausa y reinicio.
- Cuadros explicativos paralelos: analogía biológica (sistemas naturales de coordinación y señalización) y especificación matemática/computacional.
- Cumplimiento de accesibilidad (`role="region"`, `aria-current="step"`, `aria-label`).

