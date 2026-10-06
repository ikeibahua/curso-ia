import React, { useState, useId } from 'react';

export interface TerminoGlosario {
  id: string;
  termino: string;
  categoria: 'Fundamentos' | 'Modelos' | 'Terminal' | 'Agentes' | 'Diseño 3D' | 'Seguridad';
  definicion: string;
  analogia: string;
}

export const GLOSARIO_COMPLETO: TerminoGlosario[] = [
  {
    id: 'token',
    termino: 'Token',
    categoria: 'Fundamentos',
    definicion: 'Fracción mínima de texto (palabra, trozo de palabra o puntuación) que el modelo de lenguaje procesa, cuenta y predice probabilísticamente.',
    analogia: 'Como los codones de tres nucleótidos en el ARN mensajero: no lees letra a letra, sino en bloques moleculares con significado funcional.',
  },
  {
    id: 'embedding',
    termino: 'Embedding',
    categoria: 'Fundamentos',
    definicion: 'Vector de números que sitúa un concepto en un espacio multidimensional donde ideas con significado similar quedan situadas cerca unas de otras.',
    analogia: 'Las coordenadas de latitud, altitud y pH del suelo que sitúan a una especie vegetal dentro de su nicho ecológico.',
  },
  {
    id: 'transformer',
    termino: 'Transformer',
    categoria: 'Fundamentos',
    definicion: 'Arquitectura de red neuronal inventada en 2017 basada en el mecanismo de atención que procesa todas las partes de una secuencia en paralelo.',
    analogia: 'Una bandada de estorninos que coordina su vuelo en milésimas de segundo: cada individuo ajusta su posición atendiendo a todas las aves circundantes al mismo tiempo.',
  },
  {
    id: 'atencion',
    termino: 'Atención (Self-Attention)',
    categoria: 'Fundamentos',
    definicion: 'Mecanismo matemático que calcula la relevancia e influencia mutua entre todas las palabras de un texto independientemente de su distancia.',
    analogia: 'El oído de un naturalista en el bosque: es capaz de aislar el canto específico de una curruca entre el murmullo general del viento y el agua.',
  },
  {
    id: 'descenso-gradiente',
    termino: 'Descenso de gradiente',
    categoria: 'Fundamentos',
    definicion: 'Algoritmo de optimización que ajusta progresivamente los millones de pesos de una red para reducir el error de predicción en cada ciclo de entrenamiento.',
    analogia: 'El agua de lluvia que desciende por la ladera de una montaña buscando siempre el camino de mayor pendiente hacia el fondo del valle.',
  },
  {
    id: 'modelo',
    termino: 'Modelo (LLM)',
    categoria: 'Modelos',
    definicion: 'Red neuronal entrenada con miles de millones de textos cuyos pesos matemáticos quedan congelados, capaz de generar texto o código respondiendo a un prompt.',
    analogia: 'Un espécimen botánico disecado en un pliego de herbario: conserva la morfología intacta de la planta en el momento exacto en que fue recolectada.',
  },
  {
    id: 'familia-modelos',
    termino: 'Familia de modelos',
    categoria: 'Modelos',
    definicion: 'Conjunto de modelos desarrollados por la misma organización que comparten arquitectura y linaje, adaptados a diferentes tamaños y costes (ej: Claude 3.5/3.7, Llama 3, Qwen 2.5).',
    analogia: 'Un género botánico como Quercus: incluye desde arbustos modestos (coscoja) hasta árboles monumentales (roble albar), con caracteres comunes y tamaños dispares.',
  },
  {
    id: 'version',
    termino: 'Versión',
    categoria: 'Modelos',
    definicion: 'Identificador específico de una actualización concreta de un modelo o programa (ej: FreeCAD 1.0, Llama 3.2, Claude 3.7 Sonnet) que fija sus capacidades y compatibilidad.',
    analogia: 'Las diferentes ediciones de una Flora Ibérica revisada: cada volumen corrige erratas taxonómicas y actualiza la clave dicotómica según nuevos hallazgos.',
  },
  {
    id: 'pesos-parametros',
    termino: 'Pesos y Parámetros',
    categoria: 'Modelos',
    definicion: 'Los valores numéricos internos ajustables que conectan las neuronas artificiales y almacenan todo el conocimiento adquirido durante el entrenamiento.',
    analogia: 'La densidad y grosor de las conexiones sinápticas en un cerebro biológico tras años de aprendizaje experiencial.',
  },
  {
    id: 'cuantizacion',
    termino: 'Cuantización',
    categoria: 'Modelos',
    definicion: 'Técnica de compresión que reduce la precisión de los números de los pesos (de 16 bits a 4 bits) para que el modelo ocupe una fracción de memoria RAM sin perder calidad crítica.',
    analogia: 'Reducir la paleta cromática de una lámina botánica ilustrada a tintas planas: la identificación morfológica de la hoja sigue siendo perfecta.',
  },
  {
    id: 'esfuerzo-razonamiento',
    termino: 'Nivel de esfuerzo de razonamiento',
    categoria: 'Modelos',
    definicion: 'Parámetro en modelos avanzados (*Thinking*) que determina cuántos tokens de deliberación interna e hipótesis genera el modelo antes de responder.',
    analogia: 'El tiempo que se toma un taxónomo al observar con lupa binocular los caracteres sutiles de una flor antes de pronunciar el nombre de la especie.',
  },
  {
    id: 'slm',
    termino: 'SLM (Small Language Model)',
    categoria: 'Modelos',
    definicion: 'Modelo de lenguaje compacto (entre 1B y 8B de parámetros) diseñado para ejecutarse localmente con gran agilidad y bajo consumo de energía en dispositivos personales.',
    analogia: 'Un vencejo común: ligero, con masa corporal mínima y un metabolismo extraordinariamente eficiente para maniobrar rápido.',
  },
  {
    id: 'memoria-unificada',
    termino: 'Memoria unificada',
    categoria: 'Terminal',
    definicion: 'Arquitectura de hardware de Apple Silicon en macOS donde la CPU y la GPU comparten el mismo módulo físico de memoria RAM a velocidad ultra-rápida.',
    analogia: 'Un sistema vascular común en un árbol que distribuye la savia elaborada a todas las ramas sin necesidad de estaciones de bombeo separadas.',
  },
  {
    id: 'terminal',
    termino: 'Terminal / Shell (Zsh)',
    categoria: 'Terminal',
    definicion: 'Interfaz de línea de comandos en modo texto que permite dialogar directamente con el sistema operativo de tu Mac sin intermediarios visuales.',
    analogia: 'El cuadro de mandos directo o la sala de máquinas del observatorio: permite ajustar los engranajes sin pasar por la recepción de visitantes.',
  },
  {
    id: 'path',
    termino: 'PATH',
    categoria: 'Terminal',
    definicion: 'Variable de entorno de macOS que contiene la lista ordenada de carpetas donde la terminal busca los programas ejecutables cuando escribes su nombre.',
    analogia: 'La lista de senderos señalizados de un parque natural: cuando buscas una fuente, el guarda solo mira en los caminos homologados de su mapa.',
  },
  {
    id: 'clave-api',
    termino: 'Clave de API (API Key)',
    categoria: 'Terminal',
    definicion: 'Cadena secreta de caracteres que identifica tu cuenta ante un servicio de IA en la nube, autorizando el consumo y facturación por token.',
    analogia: 'Una llave maestra personalizada para abrir la verja de la estación biológica experimental.',
  },
  {
    id: 'herramienta',
    termino: 'Herramienta (Tool / Function)',
    categoria: 'Agentes',
    definicion: 'Función de software declarada que un modelo puede invocar para interactuar con el mundo exterior (leer un archivo, hacer una petición web o ejecutar un script).',
    analogia: 'Las pinzas, el bisturí y la lupa de mano en el maletín de campo de un botánico: extensiones mecánicas que permiten manipular muestras.',
  },
  {
    id: 'agente',
    termino: 'Agente de IA',
    categoria: 'Agentes',
    definicion: 'Sistema compuesto por un modelo de lenguaje, memoria y herramientas que opera en un bucle autónomo para resolver una meta compleja.',
    analogia: 'Un ayudante de investigación de campo al que le encomiendas un muestreo: planifica la ruta, toma notas, consulta el herbario y te entrega el informe.',
  },
  {
    id: 'mcp',
    termino: 'MCP (Model Context Protocol)',
    categoria: 'Agentes',
    definicion: 'Estándar abierto de comunicación cliente-servidor que permite conectar cualquier modelo de IA con herramientas y fuentes de datos de forma modular.',
    analogia: 'El conector USB-C universal: un único enchufe estándar que sirve tanto para conectar un disco duro como un microscopio digital a tu ordenador.',
  },
  {
    id: 'agents-md',
    termino: 'AGENTS.md / Instrucciones Markdown',
    categoria: 'Agentes',
    definicion: 'Archivo de texto plano estructurado en la raíz de un proyecto que define las reglas, el contexto y los límites de seguridad que debe acatar el agente.',
    analogia: 'El protocolo estandarizado de laboratorio colgado en la pared: cualquier técnico que entra en la sala sabe qué normas debe cumplir antes de tocar nada.',
  },
  {
    id: 'diff',
    termino: 'Diff (Diferencias)',
    categoria: 'Agentes',
    definicion: 'Representación visual que compara dos versiones de un archivo mostrando en rojo con signo (-) lo suprimido y en verde con signo (+) lo añadido.',
    analogia: 'Comparar dos fotografías de una misma parcela de vegetación tomadas en dos estaciones para marcar qué brotes han nacido y cuáles se han secado.',
  },
  {
    id: 'rag',
    termino: 'RAG (Retrieval-Augmented Generation)',
    categoria: 'Agentes',
    definicion: 'Arquitectura que recupera fragmentos pertinentes de tus documentos privados y los inyecta en la ventana de contexto del modelo para responder con citas contrastadas.',
    analogia: 'Un examen a libro abierto: el estudiante no responde de memoria, sino que consulta el fichero de fichas de la biblioteca antes de redactar.',
  },
  {
    id: 'chunking',
    termino: 'Chunking (Troceado)',
    categoria: 'Agentes',
    definicion: 'Partición sistemática de documentos extensos en segmentos coherentes de tamaño homogéneo para permitir su indexación y búsqueda semántica.',
    analogia: 'Dividir un rollo continuo de papel de prensar en pliegos estandarizados de herbario para poder archivarlos en estantes.',
  },
  {
    id: 'overlap',
    termino: 'Overlap (Solapamiento)',
    categoria: 'Agentes',
    definicion: 'Fracción de palabras compartidas entre el final de un fragmento y el inicio del siguiente para que las ideas en las fronteras de corte no queden mutiladas.',
    analogia: 'Las tejas de una cubierta o las escamas de una piña: se montan unas sobre otras para que el agua no se filtre por la ranura.',
  },
  {
    id: 'base-vectorial',
    termino: 'Base de datos vectorial',
    categoria: 'Agentes',
    definicion: 'Sistema de almacenamiento diseñado para guardar vectores de embeddings y realizar búsquedas por proximidad semántica a gran velocidad.',
    analogia: 'El mapa tridimensional de un bosque donde cada árbol está situado por sus coordenadas: hallar los vecinos cercanos es un cálculo de distancia geométrica.',
  },
  {
    id: 'demonio',
    termino: 'Demonio (Daemon / Servicio)',
    categoria: 'Agentes',
    definicion: 'Proceso de software que vive en segundo plano en el sistema operativo esperando silenciosamente eventos sin necesidad de mantener una ventana abierta.',
    analogia: 'El sistema nervioso autónomo: regula la respiración y el ritmo cardíaco sin exigir que tu mente consciente piense en ello.',
  },
  {
    id: 'parametrico',
    termino: 'Paramétrico (Modelado CAD)',
    categoria: 'Diseño 3D',
    definicion: 'Método de diseño geométrico donde las formas dependen de variables numéricas y relaciones matemáticas: al modificar un parámetro, la pieza entera se recalcula.',
    analogia: 'Una fórmula alométrica botánica: al variar el diámetro del tronco, la ecuación recalcula la masa de las ramas y la altura del árbol de forma armónica.',
  },
  {
    id: 'stl',
    termino: 'STL (Standard Triangle Language)',
    categoria: 'Diseño 3D',
    definicion: 'Formato estándar de archivo para impresión 3D que describe la superficie externa de un objeto sólido mediante una malla de triángulos interconectados.',
    analogia: 'El exoesqueleto rígido de un escarabajo: una coraza poligonal continua que encierra la forma sin describir el interior celular.',
  },
  {
    id: 'tres-mf',
    termino: '3MF (3D Manufacturing Format)',
    categoria: 'Diseño 3D',
    definicion: 'Formato moderno para fabricación aditiva que almacena en un único archivo comprimido la geometría, colores, materiales y datos del laminador.',
    analogia: 'Una semilla completa con su embrión, endospermo y cubierta protectora: contiene toda la información necesaria para germinar la pieza exacta.',
  },
  {
    id: 'laminador',
    termino: 'Laminador (Slicer)',
    categoria: 'Diseño 3D',
    definicion: 'Programa que corta un modelo 3D en capas horizontales microscópicas y genera las instrucciones de coordenadas mecánicas (G-code) para la impresora.',
    analogia: 'Un microtomo de laboratorio histológico: rebana un tejido biológico en láminas ultrafinas de pocas micras para poder observarlas capa a capa.',
  },
  {
    id: 'voladizo',
    termino: 'Voladizo (Overhang)',
    categoria: 'Diseño 3D',
    definicion: 'Parte de una pieza tridimensional que sobresale hacia el exterior en el aire sin material directo debajo en la capa inferior; si supera los 45° necesita soporte.',
    analogia: 'Una seta en repisa adherida al tronco de un roble: desafía la fuerza de la gravedad y necesita anclarse con fuerza a la madera viva.',
  },
  {
    id: 'tolerancia',
    termino: 'Tolerancia dimensional',
    categoria: 'Diseño 3D',
    definicion: 'Margen milimétrico deliberado de holgura (+0.2 a +0.4 mm) que se añade a una cavidad para compensar la contracción térmica del plástico y permitir el encaje.',
    analogia: 'El margen que deja un carpintero en el marco de una puerta para que no roce cuando la madera se dilata con la humedad invernal.',
  },
  {
    id: 'prompt-injection',
    termino: 'Prompt Injection (Inyección de instrucciones)',
    categoria: 'Seguridad',
    definicion: 'Técnica de manipulación donde un texto externo malicioso secuestra las directrices originales de un modelo para forzarlo a realizar acciones no deseadas.',
    analogia: 'Un virus biológico que se disfraza con la cubierta de una proteína normal para engañar a los receptores celulares y obligar a la célula a multiplicarlo.',
  },
  {
    id: 'minimo-privilegio',
    termino: 'Principio de Mínimo Privilegio',
    categoria: 'Seguridad',
    definicion: 'Norma de ciberseguridad que exige conceder a un usuario o agente de software únicamente los accesos y herramientas indispensables para su tarea.',
    analogia: 'Darle al cerrajero solo la llave del portal y del trastero, pero jamás la llave del dormitorio principal ni la combinación de la caja fuerte.',
  },
  {
    id: 'alucinacion',
    termino: 'Alucinación',
    categoria: 'Seguridad',
    definicion: 'Generación de afirmaciones falsas o inventadas por parte de un modelo con apariencia gramatical impecable y tono de certeza indiscutible.',
    analogia: 'Un espejismo en el desierto o un falso recuerdo: la mente proyecta una imagen nítida que no se corresponde con ningún objeto físico real.',
  },
  {
    id: 'sandbox',
    termino: 'Sandbox (Carpeta acotada)',
    categoria: 'Seguridad',
    definicion: 'Entorno o carpeta aislada donde se confina la ejecución de un programa para que sus acciones no puedan afectar al resto del sistema operativo.',
    analogia: 'Una placa de Petri o una cabina de flujo laminar en un laboratorio: lo que ocurre dentro no contamina el resto de la habitación.',
  },
  {
    id: 'kill-switch',
    termino: 'Kill Switch (Interruptor de apagado)',
    categoria: 'Seguridad',
    definicion: 'Mecanismo o comando de emergencia que detiene inmediatamente la ejecución de un agente o proceso en segundo plano ante cualquier comportamiento anómalo.',
    analogia: 'La seta roja de parada de emergencia en una desbrozadora o la llave general de corte del agua.',
  },
  {
    id: 'ai-act',
    termino: 'AI Act (Ley Europea de IA)',
    categoria: 'Seguridad',
    definicion: 'Reglamento (UE) 2024/1689 de la Unión Europea que prohíbe usos abusivos de IA (vigilancia biométrica masiva, manipulación) y exige transparencia en modelos comerciales.',
    analogia: 'El convenio CITES de protección de especies amenazadas: establece qué actividades atentan contra el bien común y fija fronteras inviolables.',
  },
];

export default function GlosarioInteractivo() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('Todas');
  const titleId = useId();

  const categories = ['Todas', 'Fundamentos', 'Modelos', 'Terminal', 'Agentes', 'Diseño 3D', 'Seguridad'];

  const filtered = GLOSARIO_COMPLETO.filter((item) => {
    if (selectedCat !== 'Todas' && item.categoria !== selectedCat) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      item.termino.toLowerCase().includes(query) ||
      item.definicion.toLowerCase().includes(query) ||
      item.analogia.toLowerCase().includes(query)
    );
  });

  return (
    <div
      style={{
        margin: '1.5rem 0',
      }}
      aria-labelledby={titleId}
    >
      {/* Search and Filters Bar */}
      <div
        style={{
          background: 'var(--sl-color-bg-sidebar, #0f172a)',
          border: '1px solid var(--sl-color-gray-5, #334155)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sl-color-accent, #0ea5e9)', letterSpacing: '0.05em' }}>
              Herbario Conceptual · Buscador Interactivo
            </span>
            <h3 id={titleId} style={{ margin: '0.2rem 0 0', fontSize: '1.25rem' }}>
              Diccionario de Términos y Analogías de Campo
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {filtered.length} de {GLOSARIO_COMPLETO.length} términos visibles
          </span>
        </div>

        {/* Text Search Input */}
        <div style={{ marginBottom: '0.85rem' }}>
          <input
            type="search"
            placeholder="Buscar por término (ej: token, MCP, paramétrico, tolerancia)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #334155',
              background: '#090d16',
              color: '#f8fafc',
              fontSize: '0.9rem',
            }}
          />
        </div>

        {/* Categories Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--sl-color-accent, #0ea5e9)' : '#1e293b',
                  background: isSelected ? 'rgba(14, 165, 233, 0.2)' : '#090d16',
                  color: isSelected ? '#38bdf8' : '#cbd5e1',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        {filtered.map((item) => (
          <article
            key={item.id}
            id={`termino-${item.id}`}
            style={{
              background: 'var(--sl-color-bg-sidebar, #0f172a)',
              border: '1px solid var(--sl-color-gray-5, #334155)',
              borderRadius: '10px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed #334155', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', fontFamily: 'var(--font-serif, serif)' }}>
                  {item.termino}
                </h4>
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '999px',
                    background: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    fontFamily: 'var(--sl-font-mono, monospace)',
                  }}
                >
                  {item.categoria}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.85rem' }}>
                {item.definicion}
              </p>
            </div>

            <div
              style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                fontSize: '0.8rem',
                color: '#a7f3d0',
                lineHeight: 1.4,
              }}
            >
              🌱 <strong>Analogía de campo:</strong> {item.analogia}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
