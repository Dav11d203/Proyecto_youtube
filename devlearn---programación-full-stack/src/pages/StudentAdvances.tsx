import { useState, useEffect } from 'react';

import { Search, BookOpen, Clock, CheckCircle2, Terminal } from 'lucide-react';

export default function StudentAdvances() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <main className="pt-44 pb-20 max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Avances de Alumnos</h1>
          <p className="text-slate-400">Revisa las entregas y el progreso de los estudiantes.</p>
        </div>

        <div className="grid gap-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="glass border-white/10 p-6 rounded-[2rem] flex items-center justify-between hover:bg-white/[0.02] transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-lg">{sub.user.username}</span>
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-500 uppercase tracking-widest">
                      {sub.techId}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Entregado recientemente
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a 
                  href={`http://localhost:3001${sub.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/5"
                >
                  Descargar Entrega
                </a>
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all shadow-xl shadow-indigo-600/20">
                  Calificar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
