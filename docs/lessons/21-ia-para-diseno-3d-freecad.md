# Lección 21 — IA para diseño 3D: de Tinkercad a FreeCAD con MCP

**Bloque 3 · Agentes (aplicación)** · Duración estimada: 120 min (puede dividirse en dos sesiones) · Requisitos: Lecciones 10, 12 y 15
**Posición en el curso:** justo después de la lección 15 (seguridad) y antes de la 16.

## Objetivos
- Entender qué aporta la IA al diseño 3D para impresión y dónde se equivoca.
- Generar piezas paramétricas con ayuda de un modelo (con y sin MCP).
- Conectar FreeCAD a un cliente de IA mediante MCP con permisos acotados.
- Revisar la imprimibilidad de una pieza y completar el ciclo diseño → impresión → mejora.

## Contenido a cubrir
- **De Tinkercad a FreeCAD:** modelado por bloques y operaciones booleanas frente a modelado **paramétrico** (boceto → restricciones → operaciones). Por qué lo paramétrico y la IA encajan: se describe la pieza con medidas y luego se cambia un parámetro.
- **Qué aporta la IA aquí:**
  - Traducir una descripción con medidas a un modelo o a un script de FreeCAD (Python).
  - Piezas paramétricas reutilizables (cajas, soportes, adaptadores, organizadores).
  - Explicar la interfaz de FreeCAD, interpretar errores y proponer el flujo de trabajo.
  - Revisar imprimibilidad: voladizos, grosor de paredes, tolerancias y orientación en la cama.
  - Automatizar tareas repetitivas (exportar varias piezas, generar variantes).
- **Qué NO hace bien (y por qué hay que verificar siempre):** geometría compleja, restricciones finas y tolerancias reales. Incluir un caso documentado de un modelo que omitió agujeros pedidos, para fijar la regla "mide y comprueba antes de imprimir".
- **MCP para CAD:** qué herramientas suelen exponer estos servidores (crear y editar objetos, ejecutar Python, capturar la vista 3D, exportar STL). El **bucle ver–iterar**: el modelo recibe una captura tras cada operación y corrige. Existen varios servidores de la comunidad con alcance, licencia y mantenimiento muy distintos: criterios para elegir uno.
- **Seguridad:** algunos servidores dan al agente acceso completo al entorno Python de FreeCAD, que incluye archivos y sistema. Trabajar en una carpeta de proyecto, aprobar acciones, cerrar el servidor al terminar. Enlaza con la lección 15.
- **Flujo completo:** idea → medidas reales → modelo → verificación → exportación (STL o 3MF) → laminador → impresión → observación → ajuste de parámetros.
- **Alternativas a mencionar brevemente:** CAD basado en código (p. ej. OpenSCAD o CadQuery) y por qué suelen dar buenos resultados con modelos de lenguaje. Verificar antes de recomendar.

## Interactivo y animación
- **Visor 3D ligero** con una pieza paramétrica generada en el navegador y deslizadores (ancho, alto, grosor, número de agujeros) para entender qué es un parámetro.
- **Animación "del prompt a la pieza":** descripción → script → modelo → verificación → impresión.
- **Checklist de imprimibilidad interactivo** (voladizos, paredes, tolerancias, soporte, orientación).
- **Comparativa Tinkercad frente a FreeCAD** (modelado, curva de aprendizaje, qué ayuda la IA en cada uno).

## Práctica en su Mac
- **Ruta A, sin MCP (para todos):** pedir a su chat web un script de FreeCAD para una pieza sencilla con medidas concretas, pegarlo en la consola Python de FreeCAD, revisar el resultado y ajustar. Es la ruta gratuita y la que se hará primero.
- **Ruta B, con MCP (opcional):** instalar el complemento de FreeCAD y un servidor MCP elegido con sus guías oficiales, conectarlo a un cliente compatible, arrancar el servidor desde FreeCAD y repetir la tarea con el ciclo de capturas.
- Comparar ambas rutas: tiempo, calidad, número de iteraciones y sensación de control.

## Reto final
Diseñar e imprimir **una pieza útil para él** (por ejemplo, un soporte u organizador). Entregar: descripción inicial, medidas, errores detectados y corregidos, y una **versión 2 cambiando un solo parámetro**.

## Notas para el agente
- **Verifica todo con la documentación oficial vigente de FreeCAD y de cada servidor MCP elegido;** hay varios proyectos con nombres parecidos, versiones mínimas distintas de FreeCAD y requisitos distintos (Python, `uv`, Node, Docker). No copies comandos de memoria ni de esta nota.
- Antes de recomendar un servidor, revisa: licencia, actividad reciente, número de herramientas, si exige abrir un puerto o ejecutar código arbitrario, y compatibilidad con **la versión de FreeCAD y de macOS del destinatario**.
- Los scripts de ejemplo de FreeCAD deben **ejecutarse y probarse de verdad** antes de publicarse; si no puedes, márcalos con `TODO(verificar)`.
- La Ruta A debe funcionar con las herramientas web gratuitas. La Ruta B es opcional y depende del cliente MCP disponible; la lección debe funcionar completa sin ella.
- Si no constan impresora, laminador ni versión de FreeCAD, redacta en genérico (STL/3MF, ajustes habituales) y marca `TODO(personalizar)`; no es bloqueante.
- Aplica la estructura fija de lección, el sello `Verificado` y las reglas de `AGENTS.md`.
