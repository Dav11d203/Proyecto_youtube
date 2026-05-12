export const lessons = [
  {
    id: 'css-1',
    type: 'theory',
    title: 'Selectores, especificidad y cascada',
    duration: '45 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'css-2',
    type: 'theory',
    title: 'Flexbox: diseño en una dimensión',
    duration: '60 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'css-3',
    type: 'theory',
    title: 'CSS Grid: diseño en dos dimensiones',
    duration: '60 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'css-4',
    type: 'theory',
    title: 'Animaciones y transiciones CSS',
    duration: '50 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function CssContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-blue-500 rounded-full" />
          Plan de Estudios: CSS Avanzado
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Domina el arte del diseño web con CSS moderno. Aprenderás a crear interfaces pulidas, responsivas y con 
          experiencias de usuario fluidas utilizando las herramientas más potentes como Flexbox, Grid y Animaciones.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Layouts Modernos</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Profundiza en Flexbox y Grid para resolver cualquier desafío de diseño con pocas líneas de código.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-indigo-400 mb-2 uppercase tracking-widest">Micro-interacciones</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende a usar transiciones y keyframes para darle vida a tus interfaces y mejorar el engagement.
          </p>
        </div>
      </div>
    </div>
  );
}
