# Widget: Chunking Ajustable (`chunking-ajustable`)

## Propósito
Permite al alumno manipular interactivamente los dos parámetros cardinales de la fragmentación de documentos en RAG:
1. **Tamaño de trozo (*Chunk size*):** número de palabras o tokens incluidos en cada segmento.
2. **Solapamiento (*Overlap*):** cantidad de palabras compartidas entre fragmentos contiguos para evitar cortar hilos argumentales a la mitad.

## Visualización
- Muestra el texto botánico particionado en tiempo real.
- Destaca con fondo ámbar las palabras solapadas que actúan como "puente semántico".
- Ofrece un diagnóstico dinámico sobre el riesgo de sobrefragmentación o pérdida de especificidad.

## Accesibilidad
- Controles de rango (`<input type="range">`) con etiquetas semánticas (`<label>`) y valores numéricos visibles.
- Colores contrastados y respetuosos con temas oscuros y claros.
