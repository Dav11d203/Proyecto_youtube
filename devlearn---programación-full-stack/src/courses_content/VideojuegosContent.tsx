export const lessons = [
  {
    id: 'vg-1',
    type: 'theory',
    title: 'Fundamentos de Unity y C# para juegos',
    duration: '65 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'vg-2',
    type: 'theory',
    title: 'Física y detección de colisiones',
    duration: '60 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function VideojuegosContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-orange-500 rounded-full" />
          Plan de Estudios: Desarrollo de Videojuegos
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Convierte tu imaginación en mundos interactivos. En este curso aprenderás a utilizar Unity y C# para desarrollar 
          videojuegos desde cero, cubriendo lógica de juego, física, animaciones y diseño de niveles para plataformas 2D.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-yellow-500 mb-2 uppercase tracking-widest">Motor Unity</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende a navegar y utilizar el motor líder en la industria para el desarrollo de juegos independientes y AAA.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-orange-400 mb-2 uppercase tracking-widest">Lógica con C#</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Domina la programación orientada a objetos aplicada a mecánicas de juego, IA básica y sistemas de puntuación.
          </p>
        </div>
      </div>
    </div>
  );
}
