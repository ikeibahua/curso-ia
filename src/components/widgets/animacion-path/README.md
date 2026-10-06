# Widget: Animación del PATH

Visualizador interactivo del proceso de búsqueda y resolución de ejecutables a través de la variable de entorno `$PATH` en macOS.

## Propósito
Explicar cómo macOS localiza los programas cuando el usuario teclea su nombre en la consola:
- La lista ordenada de directorios (`/opt/homebrew/bin`, `/usr/local/bin`, `/usr/bin`, `/bin`).
- El escaneo secuencial de izquierda a derecha.
- La detención inmediata al hallar la primera coincidencia válida.
- El origen del error común `zsh: command not found` cuando ninguna carpeta del `$PATH` alberga el ejecutable.

## Funcionalidades
- Selección de comandos habituales (`ls`, `brew`, `git`, `tree`, comando inexistente).
- Animación de escaneo con temporizador y resaltado visual de estados (pendiente, comprobando, no encontrado, hallado).
- Resumen pedagógico del veredicto final.
- Accesibilidad con alto contraste y controles por teclado.
