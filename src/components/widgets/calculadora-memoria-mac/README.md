# Widget: Calculadora de Memoria para Mac

Herramienta interactiva de compatibilidad hardware para ejecutar modelos de inteligencia artificial en local sobre ordenadores Mac.

## Propósito
Permite al alumno seleccionar la memoria RAM de su equipo (de 8 GB a 64 GB) y su tipo de procesador (Intel Core i5, i7, i9 / Xeon) para ver instantáneamente:
- El presupuesto útil de memoria restando la reserva de macOS.
- La compatibilidad real de 8 modelos populares cuantizados a 4 bits (GGUF Q4_K_M).
- La velocidad estimada de generación en tokens por segundo (tok/s).

## Funcionalidades
- Selector rápido por botones de RAM (8, 16, 24, 32, 48, 64 GB).
- Selector de procesador de Mac.
- Semáforo visual de compatibilidad (Verde = holgado, Amarillo = justo, Rojo = saturación de RAM).
- Accesibilidad con etiquetas ARIA y alto contraste.
