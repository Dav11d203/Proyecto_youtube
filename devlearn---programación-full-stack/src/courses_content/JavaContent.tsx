export const lessons = [
  {
    id: 'java-1',
    type: 'theory',
    title: 'POO: clases, herencia y polimorfismo',
    duration: '70 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'java-2',
    type: 'theory',
    title: 'Colecciones y streams de Java',
    duration: '65 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'java-3',
    type: 'theory',
    title: 'Spring Boot: configuración e inyección de dependencias',
    duration: '75 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function JavaContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-red-600 rounded-full" />
          Plan de Estudios: Java & Spring Boot
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Java es el lenguaje líder para sistemas empresariales a gran escala. En este curso aprenderás desde la 
          Programación Orientada a Objetos robusta hasta la creación de microservicios escalables con Spring Boot, 
          el framework más utilizado en el mundo corporativo.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-widest">Enterprise Ready</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende a diseñar sistemas con alta disponibilidad, seguridad y arquitectura limpia bajo el estándar de Java.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Ecosistema Spring</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Domina la inyección de dependencias, JPA, Hibernate y la creación de APIs REST profesionales.
          </p>
        </div>
      </div>
    </div>
  );
}
