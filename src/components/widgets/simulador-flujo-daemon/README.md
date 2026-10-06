# Widget: Simulador de Flujo de Daemon (`simulador-flujo-daemon`)

## Propósito
Permite al alumno comprender cómo se comporta un servicio en segundo plano (daemon) a lo largo de sus 6 estados:
1. Reposo silencioso (*Idle* con CPU 0.1%).
2. Recepción de evento (*Trigger* por Cron o Telegram).
3. Filtro de frontera (*Whitelist* y verificación de seguridad).
4. Razonamiento y ejecución de herramientas con memoria persistente.
5. Notificación al móvil y guardado de fichas Markdown.
6. Retorno al reposo y liberación de memoria.

## Accesibilidad
- Paginación secuencial por estados con botones accesibles e indicadores de consumo textuales.
- Contraste verificado según WCAG AA.
