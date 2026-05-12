export const lessons = [
  {
    id: 'web-1',
    type: 'theory',
    title: 'Arquitectura web y protocolo HTTP',
    duration: '50 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'web-2',
    type: 'theory',
    title: 'React: componentes, props y estado',
    duration: '70 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'web-3',
    type: 'theory',
    title: 'Node.js y Express: creación de APIs',
    duration: '65 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function DesarrolloWebContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-emerald-500 rounded-full" />
          Plan de Estudios: Full Stack Web
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Conviértete en un desarrollador Full Stack capaz de crear aplicaciones complejas desde cero. Aprenderás a dominar 
          el ecosistema de JavaScript, desde React en el frontend hasta Node.js y bases de datos relacionales en el backend.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-widest">Frontend React</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende Hooks, Context API y gestión de estado para crear interfaces dinámicas y rápidas.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Backend Node.js</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Construye APIs escalables con Express y conéctalas a bases de datos PostgreSQL para persistencia real.
          </p>
        </div>
      </div>
    </div>
  );
}
