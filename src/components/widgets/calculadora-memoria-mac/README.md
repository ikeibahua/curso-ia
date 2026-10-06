# Widget: Calculadora de Memoria para Mac (Apple Silicon)

Herramienta interactiva de compatibilidad hardware para ejecutar modelos de inteligencia artificial en local sobre ordenadores Apple Silicon (chips M1 a M4).

## Propósito
Permite al alumno seleccionar la memoria RAM unificada de su equipo (de 8 GB a 128 GB) y la familia de su procesador (Base, Pro, Max, Ultra) para ver instantáneamente:
- El presupuesto útil de memoria restando la reserva de macOS.
- La compatibilidad real de 8 modelos populares cuantizados a 4 bits (GGUF Q4_K_M).
- La velocidad estimada de generación en tokens por segundo (tok/s).

## Funcionalidades
- Selector rápido por botones de RAM (8, 16, 24, 32, 36, 48, 64, 128 GB).
- Selector de procesador Apple Silicon.
- Semáforo visual de compatibilidad (Verde = holgado, Amarillo = justo, Rojo = saturación de RAM).
- Accesibilidad con etiquetas ARIA y alto contraste.
