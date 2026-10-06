# Widget: Dial de Esfuerzo de Razonamiento

Simulador interactivo del parámetro de esfuerzo de razonamiento (*Reasoning Effort* / *Thinking Budget*) de los modelos de frontera actuales.

## Propósito
Enseñar al alumno a graduar la cantidad de cómputo y tiempo que el modelo debe invertir antes de responder, mostrando:
- La relación directa entre esfuerzo, tiempo de espera (segundos a minutos) y tokens invisibles de pensamiento (*chain of thought*).
- Cómo el modelo razona internamente frente a problemas con trampas lógicas frecuentes.
- Reglas de decisión prácticas: cuándo es indispensable subir el dial y cuándo es un despilfarro de tiempo y cuota.

## Funcionalidades
- Deslizador de 5 posiciones (Mínimo, Bajo, Medio, Alto, Máximo).
- Comparativa en paralelo de métricas estimadas (tiempo, tokens de razonamiento, impacto en cuota).
- Muestra del razonamiento interno versus respuesta final.
- Criterios claros de aplicación ("cuándo conviene" vs "cuándo es un desperdicio").
- Accesibilidad con etiquetas semánticas y controles por teclado.
