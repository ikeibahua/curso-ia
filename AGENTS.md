# AGENTS.md — Curso de IA (web)

## Propósito
Web de documentación navegable, interactiva y animada que funciona como un curso autodirigido de IA para una sola persona: un biólogo jubilado de unos 60 años. Es un regalo de cumpleaños, así que importan tanto el cuidado del detalle como la claridad.

## Público y tono
- Usuario de Mac con buen nivel de ofimática y tecnología general; **no programa** y casi no usa la terminal. Ya usa ChatGPT y Claude en sus versiones web gratuitas.
- Curiosidad personal y proyectos propios (automatizar cosas del día a día). No es un curso para trabajo.
- Español de España, tuteo, tono cercano y respetuoso. Nunca infantilizar ni condescender.
- Frases cortas. Toda jerga se explica la primera vez que aparece y pasa al glosario.
- Las analogías con biología (ecosistemas, evolución, ADN, cuaderno de campo) son bienvenidas **si son honestas**: indica siempre dónde la analogía deja de valer.
- Prioriza entender sobre memorizar. Teoría breve, mucho "pruébalo tú".

## Stack
- **Astro + Starlight** (plantilla de documentación). Lecciones en `.mdx` dentro de `src/content/docs/`.
- **Widgets y animaciones:** islas interactivas (React) con carga diferida (`client:visible`), más CSS y la librería Motion para animaciones. d3 solo si hace falta para escalas o layouts.
- **Modelos en navegador** (tokenizador, embeddings): solo con carga bajo demanda, aviso de tamaño y alternativa con datos precalculados.
- **Fuentes autoalojadas** (paquetes fontsource), sin peticiones a servicios externos.
- **Despliegue:** GitHub Pages con GitHub Actions. Contenido público y sin secretos.
- Usa las **versiones estables actuales** de todo y consulta la documentación oficial antes de configurar; no confíes en versiones de memoria.

## Estructura
```
AGENTS.md
docs/
  00-roadmap.md          plan por fases (léelo antes de empezar cualquier trabajo)
  01-design-system.md    estética, componentes, animación, accesibilidad
  lessons/NN-*.md        especificación de cada lección (qué debe contener); 21 lecciones
src/
  content/docs/          lecciones publicadas (.mdx), una por especificación
  components/ui/         componentes de contenido (Callout, Terminal, Reto...)
  components/widgets/    widgets interactivos (uno por carpeta, con su README)
  styles/                tokens y estilos globales
public/                  recursos estáticos y datos precalculados
```

## Reglas de contenido
1. **Estructura fija de cada lección:** objetivo en una frase → teoría breve → interactivo/animación → práctica en su Mac → reto final → resumen y glosario.
2. **Verificación obligatoria.** Todo dato que pueda cambiar (precios, planes, nombres de modelos, comandos de instalación, versiones, funciones de herramientas) debe:
   - sacarse de la **documentación oficial vigente**, nunca de memoria;
   - mostrarse con el componente `<Verificado fecha="AAAA-MM" fuente="URL" />`.
3. **Nunca inventes** comandos, cifras, citas ni capacidades. Si no puedes comprobar algo, márcalo con `TODO(verificar)` y avísalo al terminar.
4. Los comandos de terminal se muestran con el componente `<Terminal>`: copiables y con explicación de qué hace cada parte. Todo comando destructivo lleva aviso y alternativa segura.
5. Cada práctica indica el resultado esperado ("deberías ver esto") y qué hacer si no coincide.
6. Los widgets ilustrativos deben decir que lo son cuando no usan un modelo real.
7. **Los números de archivo (`NN-*.md`) son identificadores estables, no el orden visible.** El orden del curso y el número que ve el alumno se definen en la tabla "Orden del curso" de `docs/00-roadmap.md`. Las referencias cruzadas entre lecciones usan el identificador (L05, L20...) y deben mostrarse con el número visible.
8. **Las decisiones pendientes del roadmap no bloquean.** Si falta un dato (Mac, impresora, plan de suscripción...), redacta la versión genérica y marca `TODO(personalizar)`.

## Reglas técnicas
- Accesibilidad: contraste AA mínimo, navegación por teclado, textos alternativos y base tipográfica grande (ver design system).
- **Respeta `prefers-reduced-motion`:** toda animación debe tener estado estático equivalente y control de pausa/repetición.
- Rendimiento: JS diferido, imágenes optimizadas, nada pesado en la carga inicial. Prueba en móvil y en Safari.
- Sin analíticas ni cookies. Sin claves, tokens ni datos personales en el repositorio.
- Funciona sin conexión a servicios de terceros una vez cargada la página (salvo las descargas explícitas de modelos).

## Flujo de trabajo
1. Lee `docs/00-roadmap.md` y trabaja **una fase cada vez**.
2. Al terminar cada fase, **para y resume** qué hiciste, qué dudas tienes y qué verificar. No encadenes fases sin revisión humana.
3. Commits pequeños y descriptivos. La rama principal siempre compila.
4. No modifiques archivos de `docs/` sin pedirlo; si ves un error o una contradicción, propónlo.
5. Ante ambigüedad, pregunta. No rellenes huecos con suposiciones.

## Comandos
- **Instalar dependencias:** `npm install`
- **Desarrollo local:** `npm run dev` (inicia el servidor de desarrollo en `http://localhost:4321/curso-ia/`)
- **Compilar para producción:** `npm run build` (genera el sitio estático en `dist/` con sitemap y búsqueda Pagefind)
- **Previsualizar compilación:** `npm run preview` (sirve localmente la build de `dist/`)
- **Diagnóstico y comprobación de tipos:** `npm run check` (ejecuta Astro check para verificar sintaxis y tipos)

## Definición de "hecho"
La build pasa, los enlaces internos funcionan, la lección sigue la estructura fija, los datos volátiles tienen sello `Verificado`, la accesibilidad básica está revisada y se ha probado en móvil.
