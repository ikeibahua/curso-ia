# Lección 03 — Transformers y atención, sin miedo

**Bloque 1 · Por dentro** · Duración estimada: 75 min · Requisitos: Lecciones 01 y 02

## Objetivos
- Ver el esquema general de un transformer.
- Entender la atención como "a qué palabras mira cada palabra".
- Comprender probabilidades, softmax y temperatura.

## Contenido a cubrir
- Arquitectura a vista de pájaro: embeddings → capas de atención y MLP → probabilidades.
- Atención con un ejemplo de ambigüedad ("banco").
- Cabezas y capas; posición; generación autorregresiva.
- Matemáticas mínimas: probabilidades, softmax, temperatura, top-p.
- Por qué el contexto largo cuesta más.

## Interactivo y animación
- Mapa de atención con frase editable.
- Simulador de temperatura con barras de probabilidad y deslizador.
- Animación del flujo de datos por las capas.

## Práctica en su Mac
- Retomar la temperatura con un modelo local en la lección 06.

## Reto final
Ajustar el simulador para respuesta creativa frente a precisa y justificar la elección.

## Notas para el agente
- Marcar los mapas de atención como ilustrativos si no provienen de un modelo real.
- No prometer interpretabilidad que no existe.
- En los modelos de razonamiento recientes la temperatura suele no ser ajustable por el usuario; se controla con el nivel de esfuerzo (ver L20). Reflejarlo con una nota en el simulador.
- Aplica la estructura fija de lección, el sello `Verificado` para datos volátiles y las reglas de `AGENTS.md`.
