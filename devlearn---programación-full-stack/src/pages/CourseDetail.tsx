import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FolderOpen, CheckCircle2, CheckCheck,
  ChevronRight, Plus, X, Play, Edit3, Trash2
} from 'lucide-react';
import { TECHS } from '../data/techs';

const LEVEL_COLOR: Record<string, string> = {
  'Básico':     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermedio': 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  'Avanzado':   'bg-red-500/10    text-red-400    border-red-500/20',
};

function getUser() {
  try { const r = localStorage.getItem('user'); return r ? JSON.parse(r) : null; } catch { return null; }
}

export default function CourseDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();

  const [course, setCourse]         = useState<any>(null);
  const [loading, setLoading]       = useState(true);
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [completed, setCompleted]   = useState<Set<string>>(new Set());
  const [saving, setSaving]         = useState<string | null>(null);

  // Modals
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingLesson, setEditingLesson]     = useState<any>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  // Forms
  const [lessonForm, setLessonForm] = useState({ title: '', duration: '', youtubeId: '', driveUrl: '', type: 'theory' });
  const [courseForm, setCourseForm] = useState({ name: '', description: '', longDescription: '', level: 'Básico', image: '' });

  const user    = getUser();
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => { fetchCourse(); }, [id]);

  async function fetchCourse() {
    if (!id) return;
    try {
      // MODO LOCAL: Buscamos en los datos estáticos de techs.ts
      const localCourse = TECHS.find((t: any) => t.id === id || t.slug === id);
      
      if (localCourse) {
        // Adaptar formato local al formato de la base de datos (curriculum -> lessons)
        const lessons = [
          ...(localCourse.curriculum?.teoria || []).map((l: any) => ({ ...l, type: 'theory' })),
          ...(localCourse.curriculum?.desarrollo || []).map((l: any) => ({ ...l, type: 'development' }))
        ];
        const adapted = { ...localCourse, lessons };
        setCourse(adapted);
        setCourseForm({
          name: adapted.name, description: adapted.description,
          longDescription: adapted.longDescription || '',
          level: adapted.level, image: adapted.image || ''
        });
      }

      /*
      // MODO API (Descomentar para usar base de datos)
      const r    = await fetch(`http://localhost:3001/api/courses/${id}`);
      const data = await r.json();
      setCourse(data);
      setCourseForm({
        name: data.name, description: data.description,
        longDescription: data.longDescription || '',
        level: data.level, image: data.image || ''
      });
      if (user?.id) {
        const pr    = await fetch(`http://localhost:3001/api/progress/${user.id}`);
        const pdata = await pr.json();
        const cp    = pdata.find((p: any) => p.courseId === data.id);
        if (cp?.completedLessons) setCompleted(new Set(cp.completedLessons));
      }
      */
    } catch (e) { 
      console.error(e);
    }
    finally { setLoading(false); }
  }

  // ── Lección ───────────────────────────────────────────────────
  function openCreateLesson() {
    setEditingLesson(null);
    setLessonForm({ title: '', duration: '', youtubeId: '', driveUrl: '', type: 'theory' });
    setShowLessonModal(true);
  }
  function openEditLesson(lesson: any, e: React.MouseEvent) {
    e.stopPropagation();
    setEditingLesson(lesson);
    setLessonForm({ title: lesson.title, duration: lesson.duration, youtubeId: lesson.youtubeId, driveUrl: lesson.driveUrl || '', type: lesson.type });
    setShowLessonModal(true);
  }
  async function handleSaveLesson(e: React.FormEvent) {
    e.preventDefault();
    const url    = editingLesson ? `http://localhost:3001/api/lessons/${editingLesson.id}` : `http://localhost:3001/api/courses/${course.id}/lessons`;
    const method = editingLesson ? 'PUT' : 'POST';
    const body   = { ...lessonForm, order: editingLesson ? editingLesson.order : (course.lessons?.length || 0) };
    const r      = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { setShowLessonModal(false); fetchCourse(); }
  }
  async function deleteLesson(lid: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm('¿Eliminar esta clase?')) return;
    await fetch(`http://localhost:3001/api/lessons/${lid}`, { method: 'DELETE' });
    fetchCourse();
  }

  // ── Curso ─────────────────────────────────────────────────────
  async function handleUpdateCourse(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch(`http://localhost:3001/api/courses/${course.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(courseForm)
    });
    if (r.ok) { setShowCourseModal(false); fetchCourse(); }
  }
  async function deleteCourse() {
    if (!confirm('¿ELIMINAR todo el curso? Esta acción es irreversible.')) return;
    await fetch(`http://localhost:3001/api/courses/${course.id}`, { method: 'DELETE' });
    navigate('/cursos');
  }

  // ── Progreso ──────────────────────────────────────────────────
  async function markComplete(lessonId: string) {
    if (!user) return;
    setSaving(lessonId);
    setCompleted(prev => { const s = new Set(prev); s.has(lessonId) ? s.delete(lessonId) : s.add(lessonId); return s; });
    try {
      await fetch('http://localhost:3001/api/progress', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, lessonId, techId: course.id, totalLessons: lessons.length }),
      });
    } catch { /* ignore */ }
    setSaving(null);
  }

  if (loading) return <div className="pt-44 text-center text-slate-500 text-sm">Cargando curso…</div>;
  if (!course)  return (
    <div className="pt-44 text-center">
      <p className="text-2xl font-bold text-white mb-4">Curso no encontrado</p>
      <button onClick={() => navigate('/cursos')} className="text-cyan-400 hover:underline text-sm">← Volver al catálogo</button>
    </div>
  );

  const lessons    = course.lessons || [];
  const doneCount  = [...completed].filter(lid => lessons.some((l: any) => l.id === lid)).length;
  const progress   = lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0;

  return (
    <div className="pb-32 pt-40 max-w-5xl mx-auto px-6">

      {/* Barra superior: volver + acciones admin */}
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => navigate('/cursos')} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </button>
        {isAdmin && (
          <div className="flex gap-2">
            <button onClick={() => setShowCourseModal(true)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-all">
              <Edit3 className="w-3.5 h-3.5" /> Editar curso
            </button>
            <button onClick={deleteCourse}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-bold transition-all">
              <Trash2 className="w-3.5 h-3.5" /> Borrar curso
            </button>
          </div>
        )}
      </div>

      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-14">
        <div className="w-full md:w-64 aspect-video rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-slate-900">
          <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-white tracking-tight">{course.name}</h1>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${LEVEL_COLOR[course.level] || ''}`}>
              {course.level}
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6">{course.longDescription || course.description}</p>
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>{doneCount} de {lessons.length} clases completadas</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Cabecera plan de estudio */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Plan de Estudio</h2>
          <span className="text-xs text-slate-600">— haz clic para abrir</span>
        </div>
        {isAdmin && (
          <button onClick={openCreateLesson}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg shadow-indigo-600/20">
            <Plus className="w-4 h-4" /> Añadir clase
          </button>
        )}
      </div>

      {/* Lista de lecciones */}
      <div className="space-y-2">
        {lessons.length === 0 && (
          <div className="py-20 text-center text-slate-600 border border-white/5 rounded-2xl">
            <p className="text-lg">Aún no hay clases en este curso.</p>
            {isAdmin && <p className="text-sm mt-2">Usa el botón <span className="text-indigo-400 font-bold">Añadir clase</span> para empezar.</p>}
          </div>
        )}
        {lessons.map((lesson: any, idx: number) => {
          const isOpen   = openLesson === lesson.id;
          const isDone   = completed.has(lesson.id);
          const isSaving = saving === lesson.id;
          return (
            <div key={lesson.id} className={`rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? 'border-cyan-500/30 bg-white/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}>
              <div className="flex items-center group/row">
                <button onClick={() => setOpenLesson(isOpen ? null : lesson.id)} className="flex-1 flex items-center gap-4 px-5 py-4 text-left">
                  <span className="text-xs text-slate-700 font-mono w-6 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                  {isDone
                    ? <CheckCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    : <ChevronRight className={`w-5 h-5 text-slate-600 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  }
                  <span className={`flex-1 text-sm font-semibold ${isDone ? 'text-slate-500 line-through' : 'text-white'}`}>{lesson.title}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 text-cyan-400 bg-cyan-500/10 border-cyan-500/20 mr-2">
                    {lesson.type === 'theory' ? 'Teórica' : 'Práctica'}
                  </span>
                  <span className="text-xs text-slate-600 shrink-0">{lesson.duration}</span>
                </button>

                {/* Botones editar/borrar lección — solo admin, visibles al hover */}
                {isAdmin && (
                  <div className="flex gap-1 pr-3 opacity-0 group-hover/row:opacity-100 transition-opacity">
                    <button onClick={(e) => openEditLesson(lesson, e)} className="p-2 text-slate-500 hover:text-white transition-colors" title="Editar"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={(e) => deleteLesson(lesson.id, e)} className="p-2 text-slate-500 hover:text-red-400 transition-colors" title="Borrar"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )}
              </div>

              {isOpen && (
                <div className="px-5 pb-6 pt-4 border-t border-white/5 space-y-4">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl">
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${lesson.youtubeId}`} title={lesson.title} allowFullScreen />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {lesson.driveUrl && (
                      <a href={lesson.driveUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-colors">
                        <FolderOpen className="w-4 h-4 text-yellow-400" /> Recursos
                      </a>
                    )}
                    <button onClick={() => markComplete(lesson.id)} disabled={isSaving}
                      className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors ${isDone ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' : isSaving ? 'bg-indigo-600/50 text-white/50 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      {isSaving ? 'Guardando…' : isDone ? 'Cancelar finalización' : 'Marcar como finalizada'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── MODAL LECCIÓN ── */}
      {showLessonModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-white/10 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">{editingLesson ? 'Editar Clase' : 'Nueva Clase'}</h3>
              </div>
              <button onClick={() => setShowLessonModal(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveLesson} className="p-8 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título</label>
                <input required value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-indigo-500 transition-all"
                  placeholder="Ej: Fundamentos de CSS" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duración</label>
                  <input required value={lessonForm.duration} onChange={e => setLessonForm({...lessonForm, duration: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-indigo-500 transition-all"
                    placeholder="45 min" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">YouTube ID</label>
                  <input required value={lessonForm.youtubeId} onChange={e => setLessonForm({...lessonForm, youtubeId: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-indigo-500 transition-all"
                    placeholder="nLRL_NcnK-4" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Drive URL (opcional)</label>
                <input value={lessonForm.driveUrl} onChange={e => setLessonForm({...lessonForm, driveUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-indigo-500 transition-all"
                  placeholder="https://drive.google.com/..." />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipo</label>
                <select value={lessonForm.type} onChange={e => setLessonForm({...lessonForm, type: e.target.value})}
                  className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-indigo-500">
                  <option value="theory">Teórica</option>
                  <option value="development">Práctica</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold transition-all">
                {editingLesson ? 'Guardar Cambios' : 'Añadir Clase'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL EDITAR CURSO ── */}
      {showCourseModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-white/10 w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Editar Curso</h3>
              <button onClick={() => setShowCourseModal(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpdateCourse} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <input required value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none" placeholder="Nombre del curso" />
              <input required value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none" placeholder="Descripción corta" />
              <textarea rows={4} required value={courseForm.longDescription} onChange={e => setCourseForm({...courseForm, longDescription: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none resize-none" placeholder="Descripción larga" />
              <input value={courseForm.image} onChange={e => setCourseForm({...courseForm, image: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none" placeholder="Ruta imagen (/Fotos/python.png)" />
              {courseForm.image && <img src={courseForm.image} className="h-16 rounded-lg object-cover border border-white/10" />}
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] py-3 rounded-xl font-bold transition-all">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
