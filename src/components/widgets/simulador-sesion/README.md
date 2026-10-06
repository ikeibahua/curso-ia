# Widget: Simulador de Sesión con Aprobaciones (`simulador-sesion`)

## Propósito
Permite al alumno experimentar cómo se supervisa un agente de programación/escritorio (como `opencode` o `claude`). Muestra el diálogo en la terminal, la solicitud explícita de confirmación antes de modificar o borrar archivos, y el reflejo inmediato de los cambios en el árbol de carpetas de macOS.

## Casos simulados
1. **Clasificación botánica:** creación de directorios, reubicación de imágenes y propuesta de borrado destructivo (`rm`) con advertencia de seguridad.
2. **Normalización de tabla CSV:** propuesta preventiva de copia de seguridad (`cp`) y generación de un archivo nuevo corregido en lugar de sobreescribir el original.

## Accesibilidad
- Roles semánticos y botones accesibles con contraste WCAG AA.
- Árbol de archivos legible con estados por texto e iconos.

