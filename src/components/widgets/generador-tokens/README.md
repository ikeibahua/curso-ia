# Widget: Generación token a token (Animación explicativa)

## Propósito
Muestra de forma visual e intuitiva la naturaleza probabilística de un LLM: cómo en cada paso el modelo calcula probabilidades sobre su vocabulario para elegir el siguiente token, y cómo ese token se incorpora al contexto para calcular el siguiente.

## Indicación obligatoria
- Lleva la etiqueta visible **Ilustrativo**, ya que utiliza distribuciones de probabilidad precalculadas con fines didácticos en lugar de ejecutar una red neuronal completa en el navegador.

## Controles de animación
- Cumple con la pauta de accesibilidad: incluye botones para **Reproducir**, **Pausar**, **Avanzar paso a paso** y **Repetir**.
- Respeto a `prefers-reduced-motion`: no ejecuta animaciones en bucle forzado y permite el control manual en todo momento.
