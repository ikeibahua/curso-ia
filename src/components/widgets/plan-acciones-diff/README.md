# Widget: Plan → Acciones → Diff (`plan-acciones-diff`)

## Propósito
Permite al alumno entender visualmente el flujo de trabajo estándar de un agente de código o terminal:
1. **Plan:** el desglose lógico de pasos propuestos antes de alterar ningún fichero.
2. **Acciones:** la secuencia de llamadas a herramientas (`inspect_file`, `run_analysis`, `propose_patch`).
3. **Diff:** la radiografía comparativa entre el archivo original y la propuesta, identificando adiciones (verde `+`) y supresiones (rojo `-`).

## Accesibilidad
- Selector de fases mediante botones con indicación de estado activo.
- Colores contrastados y marcadores textuales (`+` y `-`) para no depender únicamente del color al interpretar las diferencias de código.

