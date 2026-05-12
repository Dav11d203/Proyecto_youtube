import { useState, useEffect } from 'react';
import { TECHS } from '../data/techs';
import { TrendingUp, Users, BookOpen, Award, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface ProgressRecord {
  id: string;
  courseId: string;
  completedLessons: string[];
  totalLessons: number;
  progressPercentage: number;
  status: string;
  lastAccessed: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastNamePaternal: string;
    email: string;
    role: string;
  };
}

interface SubmissionRecord {
  id: string;
  userId: string;
  techId: string;
  lessonId: string;
  fileUrl: string;
  status: string;
  feedback: string | null;
  createdAt: string;
  user: {
    username: string;
    firstName: string;
    lastNamePaternal: string;
  };
}

const STATUS_STYLE: Record<string, string> = {
  NOT_STARTED: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  IN_PROGRESS:  'bg-amber-500/10  text-amber-400  border-amber-500/20',
  COMPLETED:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};
const STATUS_LABEL: Record<string, string> = {
  NOT_STARTED: 'Sin iniciar',
  IN_PROGRESS: 'En progreso',
  COMPLETED:   'Completado',
};

export default function AdminProgress() {
  const [activeTab, setActiveTab] = useState<'progress'>('progress');
  const [records, setRecords] = useState<ProgressRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/admin/progress')
      .then(r => r.json())
      .then(progData => {
        setRecords(progData);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo conectar con el servidor.');
        setLoading(false);
      });
  }, []);

  const totalStudents = new Set(records.map((r) => r.user.id)).size;
  const completedCourses = records.filter((r) => r.status === 'COMPLETED').length;
  const avgProgress = records.length
    ? Math.round(records.reduce((s, r) => s + r.progressPercentage, 0) / records.length)
    : 0;

  return (
    <div className="pb-32 pt-44 max-w-7xl mx-auto px-6">
      <div className="mb-12 border-l-4 border-indigo-500 pl-8">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Panel de Control Académico</h1>
        <p className="text-slate-500">Monitorea el avance general y revisa los proyectos de los estudiantes.</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('progress')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'progress' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
          Progreso General
        </button>
      </div>

      {loading && <p className="text-slate-500 text-center py-20">Cargando datos...</p>}
      {error   && <p className="text-red-400 text-center py-20">{error}</p>}

      {!loading && !error && activeTab === 'progress' && (
        <div className="animate-fade-in">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Users,    label: 'Alumnos activos',   value: totalStudents,    color: 'text-cyan-400' },
              { icon: BookOpen, label: 'Registros de curso', value: records.length,  color: 'text-indigo-400' },
              { icon: Award,    label: 'Cursos completados', value: completedCourses, color: 'text-emerald-400' },
              { icon: TrendingUp, label: 'Progreso promedio', value: `${avgProgress}%`, color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <s.icon className={`w-6 h-6 ${s.color} mb-3`} />
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabla */}
          <div className="bg-[#1e293b]/40 border border-white/5 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-5">Alumno</th>
                  <th className="px-6 py-5">Curso</th>
                  <th className="px-6 py-5">Progreso</th>
                  <th className="px-6 py-5">Estado</th>
                  <th className="px-6 py-5">Último acceso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((r) => {
                  const courseName = TECHS.find((t) => t.id === r.courseId)?.name ?? r.courseId;
                  const date = new Date(r.lastAccessed).toLocaleDateString('es-CL');
                  return (
                    <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white text-sm">{r.user.username}</div>
                        <div className="text-xs text-slate-500">{r.user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{courseName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden w-24">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                              style={{ width: `${r.progressPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 w-8">{r.progressPercentage}%</span>
                        </div>
                        <div className="text-[10px] text-slate-600 mt-1">
                          {r.completedLessons.length} / {r.totalLessons} clases
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${STATUS_STYLE[r.status] ?? STATUS_STYLE.NOT_STARTED}`}>
                          {STATUS_LABEL[r.status] ?? r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{date}</td>
                    </tr>
                  );
                })}
                {records.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-600">
                      Aún no hay registros de progreso.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
