import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Plus, X, BookOpen, Edit3, Trash2 } from 'lucide-react';
import { TECHS } from '../data/techs';

const LEVEL_COLOR: Record<string, string> = {
  'Básico':     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermedio': 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  'Avanzado':   'bg-red-500/10    text-red-400    border-red-500/20',
};

function getUser() {
  try { const r = localStorage.getItem('user'); return r ? JSON.parse(r) : null; } catch { return null; }
}

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const user    = getUser();
  const isAdmin = user?.role === 'ADMIN';

  const [form, setForm] = useState({
    name: '', description: '', longDescription: '',
    level: 'Básico', image: '', learns: ''
  });

  useEffect(() => { fetchCourses(); }, []);

  async function fetchCourses() {
    setLoading(true);
    try {
      // MODO LOCAL: Usamos los datos estáticos de techs.ts
      setCourses(TECHS);
      
      /* 
      // MODO API (Descomentar para usar base de datos)
      const r = await fetch('http://localhost:3001/api/courses');
      setCourses(await r.json());
      */
    } catch { 
      setCourses(TECHS);
    }
    finally { setLoading(false); }
  }

  function openCreate() {
    setEditingCourse(null);
    setForm({ name: '', description: '', longDescription: '', level: 'Básico', image: '', learns: '' });
    setShowModal(true);
  }

  function openEdit(course: any, e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    setEditingCourse(course);
    setForm({
      name: course.name,
      description: course.description,
      longDescription: course.longDescription || '',
      level: course.level,
      image: course.image || '',
      learns: (course.learns || []).join(', ')
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url    = editingCourse ? `http://localhost:3001/api/courses/${editingCourse.id}` : 'http://localhost:3001/api/courses';
    const method = editingCourse ? 'PUT' : 'POST';
    const body   = { ...form, learns: form.learns.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (r.ok) { setShowModal(false); fetchCourses(); }
    } catch { alert('Error al guardar'); }
  }

  async function deleteCourse(id: string, e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    if (!confirm('¿Borrar este curso? Es irreversible.')) return;
    await fetch(`http://localhost:3001/api/courses/${id}`, { method: 'DELETE' });
    fetchCourses();
  }

  return (
    <div className="pb-32 pt-44 max-w-5xl mx-auto px-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="border-l-4 border-cyan-400 pl-8">
          <h1 className="text-5xl font-bold mb-3 tracking-tight text-white">Catálogo Académico</h1>
          <p className="text-slate-500 text-lg">Programas de especialización técnica avanzada.</p>
        </div>

        {/* BOTÓN ADMIN — siempre calculado en el render, no en estado */}
        {isAdmin && (
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] px-7 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl shadow-cyan-500/25 shrink-0"
          >
            <Plus className="w-5 h-5" /> Nuevo Curso
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-4 py-24">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Cargando catálogo…</p>
        </div>
      ) : (
        <div className="space-y-5">
          {courses.map((tech) => (
            <Link
              key={tech.id}
              to={`/cursos/${tech.slug || tech.id}`}
              className="group relative flex flex-col md:flex-row rounded-3xl border border-white/5 hover:border-white/20 bg-[#1e293b]/40 hover:bg-[#1e293b]/70 transition-all duration-300 overflow-hidden shadow-lg"
            >
              {/* Imagen */}
              <div className="w-full md:w-52 md:shrink-0 overflow-hidden bg-slate-800">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-48 md:h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-col justify-between p-7 flex-1 min-w-0">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-bold text-white tracking-tight">{tech.name}</h2>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${LEVEL_COLOR[tech.level] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                        {tech.level}
                      </span>
                    </div>

                    {/* Botones admin por tarjeta */}
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => openEdit(tech, e)}
                          className="p-2 bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 rounded-xl border border-white/5 transition-all"
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => deleteCourse(tech.id, e)}
                          className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl border border-white/5 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">{tech.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-6">
                    {(tech.learns || []).slice(0, 4).map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <span className="text-xs text-slate-600">{tech._count?.lessons || 0} lecciones disponibles</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:text-white transition-colors">
                    Ver programa <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ───── MODAL CREAR / EDITAR ───── */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] border border-white/10 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden">

            {/* Header modal */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  {editingCourse ? <Edit3 className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{editingCourse ? 'Editar Programa' : 'Nuevo Programa'}</h3>
                  <p className="text-slate-500 text-xs">{editingCourse ? 'Modifica los datos del curso.' : 'Rellena los datos del nuevo curso.'}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-cyan-500 transition-all"
                    placeholder="Ej: Master en React" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nivel</label>
                  <select value={form.level} onChange={e => setForm({...form, level: e.target.value})}
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-cyan-500">
                    <option>Básico</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Imagen (ruta en /Fotos/)</label>
                <input value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-cyan-500 transition-all"
                  placeholder="/Fotos/python.png" />
                {form.image && (
                  <img src={form.image} className="mt-2 h-16 rounded-lg object-cover border border-white/10" />
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción corta</label>
                <input required value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-cyan-500 transition-all"
                  placeholder="Una frase llamativa…" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción larga</label>
                <textarea rows={3} required value={form.longDescription} onChange={e => setForm({...form, longDescription: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-cyan-500 transition-all resize-none"
                  placeholder="Explica el programa en detalle…" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aprendizajes (separar con comas)</label>
                <textarea rows={2} value={form.learns} onChange={e => setForm({...form, learns: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-cyan-500 transition-all resize-none"
                  placeholder="React, Node.js, PostgreSQL…" />
              </div>

              <button type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20">
                {editingCourse ? 'Guardar Cambios' : 'Crear Curso'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
