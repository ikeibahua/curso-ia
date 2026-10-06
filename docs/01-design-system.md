# Sistema de diseño — "Cuaderno de campo"

## Concepto
Un cuaderno de campo de naturalista para explorar un territorio nuevo: la IA. Cálido, editorial, ordenado y legible. Piezas inspiradas en etiquetas de herbario y notas al margen, sin caer en lo infantil ni en el cliché "tecnología oscura". La terminal es el único elemento deliberadamente técnico y debe destacar como tal.

## Color (tokens; ajusta contrastes a AA)
| Token | Claro | Oscuro |
|---|---|---|
| `--papel` (fondo) | #F6F1E7 | #151B17 |
| `--tinta` (texto) | #1F2A24 | #E9E4D6 |
| `--musgo` (primario) | #3F6B4F | #7FB08F |
| `--terracota` (acento) | #C4623A | #E08A62 |
| `--ocre` (aviso/destacado) | #D9A441 | #E3B965 |
| `--agua` (información) | #3C6E8F | #7DB0CF |
| `--linea` (bordes) | #D8CFBC | #2C362F |

## Tipografía (autoalojada)
- Títulos: serif con carácter (p. ej. Fraunces).
- Texto: sans muy legible (p. ej. Source Sans 3).
- Código y terminal: monoespaciada (p. ej. JetBrains Mono).
- **Base 18 px**, interlineado 1.7, ancho de línea máximo ~68 caracteres. Permitir aumentar el tamaño de texto.

## Layout
- Columna de lectura central y generosa; notas al margen en pantallas anchas que pasan a bloques en móvil.
- Barra lateral con bloques y lecciones, y marca de lecciones completadas (almacenada localmente).
- Cada lección abre con una "etiqueta de herbario": número, título, duración estimada y requisitos previos.

## Componentes de contenido
- `Callout` (nota, ojo, truco, peligro), `Analogia` ("En el campo": analogía biológica con su límite explícito).
- `Terminal`: bloque oscuro, copiable, con explicación desplegable de cada parte del comando.
- `Pasos`/`Paso`: lista numerada con casillas y "deberías ver esto".
- `Reto`: tarjeta destacada con resultado esperado y pista desplegable.
- `Verificado`: sello pequeño con fecha y enlace a fuente oficial.
- `Glosario`: términos con tooltip y página índice.
- `ProgresoCurso`: indicador discreto del avance.

## Movimiento
- Propósito: explicar (flujos, transformaciones, causa-efecto), no decorar. Entradas suaves al hacer scroll (opacidad y desplazamiento pequeño).
- Duraciones 150–400 ms; curvas suaves; nada que parpadee ni se repita sin control.
- Toda animación explicativa tiene **reproducir, pausar y repetir**.
- `prefers-reduced-motion`: reemplazar por estados estáticos equivalentes.

## Widgets
- Aspecto de "instrumento de laboratorio": marco claro, título, instrucciones de una línea, botón de reiniciar.
- Estados vacío, de carga y de error cuidados. Usable con teclado. Resultado comprensible sin color únicamente.
- Cuando no usen un modelo real, indicarlo con una etiqueta "ilustrativo".

## Accesibilidad
Contraste AA, foco visible, orden de lectura lógico, textos alternativos, objetivos táctiles amplios, sin información transmitida solo por color o animación.
