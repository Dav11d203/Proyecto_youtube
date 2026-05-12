export const lessons = [
  {
    id: 'mob-1',
    type: 'theory',
    title: 'Introducción a React Native y Expo',
    duration: '55 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'mob-2',
    type: 'theory',
    title: 'Componentes nativos y estilos',
    duration: '60 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function DesarrolloAppMovilContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-purple-500 rounded-full" />
          Plan de Estudios: Desarrollo Móvil
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Domina el desarrollo multiplataforma con React Native. Aprende a crear aplicaciones nativas para iOS y Android 
          utilizando una sola base de código, integrando APIs, navegación fluida y diseño optimizado para dispositivos móviles.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">Multiplataforma</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Escribe código una vez y despliega en Android e iOS con rendimiento cercano al nativo usando Expo y React Native.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-pink-400 mb-2 uppercase tracking-widest">APIs y Datos</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende a conectar tus apps con servicios en la nube para mostrar información en tiempo real.
          </p>
        </div>
      </div>
    </div>
  );
}
