export const lessons = [
  {
    id: 'ia-1',
    type: 'theory',
    title: 'Qué es el Machine Learning y sus tipos',
    duration: '55 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'ia-2',
    type: 'theory',
    title: 'Regresión lineal: predicción de valores',
    duration: '65 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function IntroduccionIaContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-purple-600 rounded-full" />
          Plan de Estudios: Introducción a la IA
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Entiende los cimientos de la inteligencia artificial. En este curso aprenderás los conceptos fundamentales de 
          Machine Learning, los diferentes tipos de aprendizaje y cómo crear modelos predictivos básicos utilizando 
          datos del mundo real.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">Machine Learning</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende la diferencia entre aprendizaje supervisado y no supervisado y cuándo aplicar cada uno.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Modelos Predictivos</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Implementa regresiones y clasificadores para resolver problemas de predicción de datos.
          </p>
        </div>
      </div>
    </div>
  );
}
