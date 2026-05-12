export const lessons = [
  {
    id: 'p1',
    type: 'theory',
    title: 'Sintaxis y Estructuras Básicas',
    duration: '2h 30m',
    videoId: 'xESS0f9qaEo', // ← ID real de YouTube
    driveLink: 'https://drive.google.com/drive/folders/11cenHicZ_0WZltovlsoxKcVMLA89AGFN?usp=drive_link',
  },
  {
    id: 'p2',
    type: 'theory',
    title: 'Programación Orientada a Objetos',
    duration: '4h 15m',
    videoId: 'xESS0f9qaEo', // ← ID real de YouTube
    driveLink: 'https://drive.google.com/drive/folders/11cenHicZ_0WZltovlsoxKcVMLA89AGFN?usp=drive_link',
  },
  {
    id: 'p3',
    type: 'theory',
    title: 'Manejo de Archivos y Librerías',
    duration: '3h 45m',
    videoId: 'hvi3J3yBRXI', // ← reemplaza con el ID real de YouTube
    driveLink: 'https://drive.google.com/drive/folders/11cenHicZ_0WZltovlsoxKcVMLA89AGFN?usp=drive_link',
  },
  {
    id: 'p4',
    type: 'theory',
    title: 'Introducción a Data Science',
    duration: '5h 00m',
    videoId: 'hvi3J3yBRXI', // ← reemplaza con el ID real de YouTube
    driveLink: 'https://drive.google.com/drive/folders/11cenHicZ_0WZltovlsoxKcVMLA89AGFN?usp=drive_link',
  },
  ];

// Componente por defecto para mostrar en la ventana emergente (Home)
export default function PythonContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-yellow-400 rounded-full" />
          Plan de Estudios: Python
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Este curso está diseñado para llevarte desde los fundamentos más básicos hasta el desarrollo de aplicaciones 
          profesionales. Aprenderás la sintaxis moderna de Python 3, Programación Orientada a Objetos, y cómo automatizar 
          tareas del mundo real.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Fase Teórica</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dominarás la lógica de programación, tipos de datos complejos y el ecosistema de librerías estándar.
          </p>
        </div>
        </div>

      <p className="text-xs text-slate-500 italic">
        * Al finalizar este curso, estarás preparado para especializarte en Data Science o Desarrollo Web Backend.
      </p>
    </div>
  );
}

