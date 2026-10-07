# Widget: Calculadora de Tamaño de Modelos

Calculadora interactiva del peso en gigabytes y de los requisitos de memoria RAM para modelos de lenguaje.

## Propósito
Permite calcular matemáticamente el espacio requerido por una red neuronal:
$$\text{Tamaño (GB)} = \text{Parámetros (miles de millones)} \times \text{Bytes por peso}$$
Y evalúa si cabe o no en las configuraciones típicas de ordenadores Mac (8 GB, 16 GB, 32 GB, 64 GB, 128 GB).

## Funcionalidades
- Presets con modelos reales del ecosistema abierto (Llama 3.2 1B/3B, Llama 3.1 8B, Qwen 2.5 14B, Llama 3.3 70B, etc.).
- Comparativa de 4 formatos de precisión (FP16 a 2 bytes, INT8 a 1 byte, INT4 a 0.5 bytes, FP32 a 4 bytes).
- Estimación con margen del 25% para la ventana de contexto y caché de claves/valores (KV Cache).
- Diagnóstico de compatibilidad con Mac.
