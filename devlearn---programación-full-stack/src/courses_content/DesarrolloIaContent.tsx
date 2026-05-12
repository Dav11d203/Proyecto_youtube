export const lessons = [
  {
    id: 'dia-1',
    type: 'theory',
    title: 'Deep Learning: redes neuronales profundas',
    duration: '80 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'dia-2',
    type: 'theory',
    title: 'Visión artificial con CNN',
    duration: '75 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function DesarrolloIaContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-indigo-600 rounded-full" />
          Plan de Estudios: Desarrollo IA Avanzado
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Especialízate en las tecnologías más avanzadas del mercado. En este curso profundizarás en Deep Learning, 
          Redes Neuronales Convolucionales para visión artificial y Procesamiento de Lenguaje Natural para crear 
          soluciones de IA de última generación.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-indigo-400 mb-2 uppercase tracking-widest">Deep Learning</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende a diseñar y entrenar redes neuronales profundas con múltiples capas para problemas complejos.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">Visión & NLP</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Implementa reconocimiento de imágenes y procesamiento de texto para crear aplicaciones inteligentes.
          </p>
        </div>
      </div>
    </div>
  );
}
