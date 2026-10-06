# Lección 01 — Qué es un LLM y qué son los tokens

**Bloque 1 · Por dentro** · Duración estimada: 60 min · Requisitos: Ninguno

## Objetivos
- Explicar con sus palabras que un LLM predice el siguiente token.
- Entender por qué el modelo trabaja con tokens y no con palabras o letras.
- Saber por qué el idioma y el tipo de texto afectan al coste y a la calidad.

## Contenido a cubrir
- Predicción del siguiente token: autocompletado a gran escala.
- Tokenización (idea de BPE a nivel intuitivo), vocabulario de decenas de miles de tokens, texto → identificadores numéricos.
- Por qué fallan cosas como contar letras.
- Ventana de contexto como memoria de trabajo; coste por token.
- Español frente a inglés y código: diferencias en número de tokens.

## Interactivo y animación
- Widget tokenizador: texto libre → tokens coloreados con IDs y recuento; comparar idiomas y código.
- Animación de generación token a token con las probabilidades de los candidatos.

## Práctica en su Mac
- Pedir a su chat web que cuente letras de una palabra, observar el fallo y compararlo con el tokenizador.

## Reto final
Predecir cuántos tokens tendrá una frase y verificarlo con el widget; explicar en tres frases por qué falla contando letras.

## Notas para el agente
- Usar un tokenizador que corra en el navegador y avisar de que cada modelo tiene el suyo: las cifras son aproximadas.
- Aplica la estructura fija de lección, el sello `Verificado` para datos volátiles y las reglas de `AGENTS.md`.
