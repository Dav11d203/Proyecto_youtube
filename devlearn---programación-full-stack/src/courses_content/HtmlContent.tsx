export const lessons = [
  {
    id: 'html-1',
    type: 'theory',
    title: 'Estructura básica de un documento HTML',
    duration: '40 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'html-2',
    type: 'theory',
    title: 'Etiquetas semánticas: header, main, footer',
    duration: '45 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'html-3',
    type: 'theory',
    title: 'Formularios y tipos de input',
    duration: '50 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function HtmlContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-orange-500 rounded-full" />
          Plan de Estudios: HTML
        </h3>
        <p className="text-slate-300 leading-relaxed">
          HTML5 es la piedra angular de la web. En este curso aprenderás a estructurar contenido de forma profesional, 
          priorizando la semántica, el SEO y la accesibilidad para que tus sitios sean entendidos tanto por usuarios 
          como por motores de búsqueda.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-orange-400 mb-2 uppercase tracking-widest">Semántica y SEO</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Uso correcto de etiquetas como header, main, section y article para mejorar el posicionamiento.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-widest">Formularios Pro</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Creación de formularios complejos con validaciones nativas y tipos de input avanzados.
          </p>
        </div>
      </div>
    </div>
  );
}
