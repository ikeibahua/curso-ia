# Lección 14 — RAG sobre documentos propios

**Bloque 3 · Agentes** · Duración estimada: 90 min · Requisitos: Lecciones 02 y 10

## Objetivos
- Entender por qué el modelo no conoce sus documentos y cómo lo resuelve RAG.
- Construir un RAG mínimo.
- Diagnosticar fallos.

## Contenido a cubrir
- Recuperar fragmentos relevantes y generar con ellos.
- Chunking, embeddings y base vectorial (SQLite o Chroma, a decidir).
- Recuperación híbrida a nivel de mención; citas y verificación.
- Cuándo es mejor pegar el documento entero en el contexto.

## Interactivo y animación
- Pipeline animado: documento → trozos → vectores → búsqueda → respuesta.
- Chunking ajustable (tamaño y solapamiento).

## Práctica en su Mac
- Montar un RAG mínimo sobre 10–20 PDF de su interés con ayuda de un agente; hacer preguntas y comprobar citas.

## Reto final
Encontrar una pregunta que el RAG responda mal y diagnosticar la causa.

## Notas para el agente
- Stack mínimo con Python y venv, embeddings locales.
- No enviar documentos sensibles a servicios externos sin avisar.
- Aplica la estructura fija de lección, el sello `Verificado` para datos volátiles y las reglas de `AGENTS.md`.
