export const lessons = [
  {
    id: 'ts-1',
    type: 'theory',
    title: 'Tipos, interfaces y type aliases',
    duration: '55 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'ts-2',
    type: 'theory',
    title: 'Genéricos y tipos condicionales',
    duration: '65 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function TypeScriptContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-blue-600 rounded-full" />
          Plan de Estudios: TypeScript
        </h3>
        <p className="text-slate-300 leading-relaxed">
          TypeScript es el estándar para el desarrollo profesional con JavaScript. En este curso aprenderás a utilizar 
          el tipado estático para escribir código más seguro, mantenible y escalable, eliminando errores comunes antes 
          de que ocurran en producción.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Tipado Avanzado</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Domina interfaces, genéricos, enums y tipos condicionales para crear arquitecturas de código robustas.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-widest">Escalabilidad</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende cómo TypeScript facilita la refactorización y la colaboración en equipos grandes de desarrollo.
          </p>
        </div>
      </div>
    </div>
  );
}
