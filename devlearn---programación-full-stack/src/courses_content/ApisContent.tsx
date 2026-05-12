export const lessons = [
  {
    id: 'api-1',
    type: 'theory',
    title: 'Principios REST y diseño de recursos',
    duration: '50 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'api-2',
    type: 'theory',
    title: 'Autenticación con JWT',
    duration: '60 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function ApisContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-green-500 rounded-full" />
          Plan de Estudios: REST APIs
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Las APIs son el lenguaje que permite a las aplicaciones comunicarse entre sí. En este curso aprenderás a diseñar, 
          construir y asegurar APIs RESTful profesionales, utilizando estándares de la industria para autenticación, 
          documentación y gestión de recursos.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-green-400 mb-2 uppercase tracking-widest">Arquitectura REST</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Domina los principios de diseño para crear endpoints intuitivos, escalables y fáciles de consumir.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-teal-400 mb-2 uppercase tracking-widest">Seguridad JWT</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende a proteger tus datos mediante JSON Web Tokens y middleware de autorización avanzada.
          </p>
        </div>
      </div>
    </div>
  );
}
