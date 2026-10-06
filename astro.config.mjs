import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ikeibahua.github.io',
  base: '/curso-ia',
  integrations: [
    starlight({
      title: 'Cuaderno de campo: Inteligencia Artificial',
      description: 'Curso autodirigido y práctico de inteligencia artificial, modelos locales y agentes.',
      defaultLocale: 'root',
      disable404Route: true,
      locales: {
        root: {
          label: 'Español',
          lang: 'es',
        },
      },
      customCss: [
        '@fontsource/fraunces/latin.css',
        '@fontsource/fraunces/latin-ext.css',
        '@fontsource/source-sans-3/latin.css',
        '@fontsource/source-sans-3/latin-ext.css',
        '@fontsource/jetbrains-mono/latin.css',
        './src/styles/custom.css',
      ],
      head: [
        {
          tag: 'script',
          content: `(function(){try{if(localStorage.getItem('curso-ia:sidebar-hidden')==='true'&&window.innerWidth>=800){document.documentElement.dataset.sidebarHidden='true';}}catch(e){}})();`,
        },
      ],
      components: {
        SiteTitle: './src/components/starlight/SiteTitle.astro',
      },
      sidebar: [
        {
          label: 'Sistema de diseño',
          items: [
            { label: 'Muestra de componentes', slug: 'muestra' },
          ],
        },
        {
          label: 'Bloque 1: Fundamentos y modelos',
          items: [
            { label: '01. ¿Qué es un LLM y qué son los tokens?', slug: 'lecciones/01-que-es-un-llm' },
            { label: '02. Embeddings: el mapa del significado', slug: 'lecciones/02-embeddings' },
            { label: '03. Transformers y atención, sin miedo', slug: 'lecciones/03-transformers-atencion' },
            { label: '04. Cómo aprende un modelo', slug: 'lecciones/04-como-aprende-un-modelo' },
            { label: '05. El mapa de modelos: familias y niveles', slug: 'lecciones/20-mapa-de-modelos-y-niveles-de-razonamiento' },
            { label: '06. Pesos y parámetros: qué significa 70B', slug: 'lecciones/05-pesos-y-parametros' },
            { label: '07. Cuantización y modelos en local', slug: 'lecciones/06-cuantizacion-y-modelos-locales' },
          ],
        },
        {
          label: 'Bloque 2: La terminal sin miedo',
          items: [
            { label: '08. Terminal I: perder el miedo', slug: 'lecciones/07-terminal-i' },
            { label: '09. Terminal II: instalar herramientas y claves', slug: 'lecciones/08-terminal-ii' },
          ],
        },
        {
          label: 'Bloque 3: Agentes, herramientas y contexto',
          items: [
            { label: '10. Anatomía de un agente', slug: 'lecciones/09-anatomia-de-un-agente' },
            { label: '11. Tools y MCP', slug: 'lecciones/10-tools-y-mcp' },
            { label: '12. El mundo de los .md: instrucciones y memoria', slug: 'lecciones/11-los-md-instrucciones-skills-memoria' },
            { label: '13. Agentes de programación I: uso real', slug: 'lecciones/12-agentes-de-programacion-i' },
            { label: '14. Agentes de programación II: ecosistema', slug: 'lecciones/13-agentes-de-programacion-ii' },
            { label: '15. RAG sobre documentos propios', slug: 'lecciones/14-rag-sobre-documentos-propios' },
            { label: '16. Seguridad, privacidad y fiabilidad', slug: 'lecciones/15-seguridad-privacidad-fiabilidad' },
            { label: '17. IA para diseño 3D: FreeCAD con MCP', slug: 'lecciones/21-ia-para-diseno-3d-freecad' },
            { label: '18. Agentes generalistas', slug: 'lecciones/16-agentes-generalistas' },
          ],
        },
        {
          label: 'Bloque 4: Proyectos y futuro',
          items: [
            { label: '19. Automatización y proyecto final', slug: 'lecciones/17-automatizacion-y-proyecto-final' },
            { label: '20. Panorama y tendencias', slug: 'lecciones/18-panorama-y-tendencias' },
            { label: '21. Tutorial opcional: montar un agente generalista', slug: 'lecciones/19-tutorial-agente-generalista' },
          ],
        },
        {
          label: 'Consulta y recursos',
          items: [
            { label: 'Glosario maestro (Herbario)', slug: 'glosario' },
            { label: 'Recursos y enlaces de referencia', slug: 'recursos' },
          ],
        },
      ],
    }),
    react(),
  ],
});

