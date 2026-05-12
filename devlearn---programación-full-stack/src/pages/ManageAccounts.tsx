import { useState, useEffect } from 'react';
import { User, Mail, Shield, Trash2, Search } from 'lucide-react';

interface StudentUser {
  id: string;
  username: string;
  firstName: string;
  lastNamePaternal: string;
  lastNameMaternal: string;
  email: string;
  role: string;
  createdAt: string;
}

const ROLE_STYLE: Record<string, string> = {
  ADMIN:   'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  STUDENT: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

export default function ManageAccounts() {
  const [users, setUsers]     = useState<StudentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [error, setError]     = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then((r) => r.json())
      .then((data) => { setUsers(data); setLoading(false); })
      .catch(() => { setError('No se pudo conectar con el servidor.'); setLoading(false); });
  }, []);

  async function deleteUser(id: string, username: string) {
    if (!confirm(`¿Eliminar al usuario "${username}"?`)) return;
    try {
      await fetch(`http://localhost:3001/api/users/${id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert('Error al eliminar el usuario.');
    }
  }

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const students = filtered.filter((u) => u.role === 'STUDENT');
  const admins   = filtered.filter((u) => u.role === 'ADMIN');

  return (
    <div className="pb-32 pt-44 max-w-7xl mx-auto px-6">
      <div className="mb-12 border-l-4 border-cyan-400 pl-8">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Administrar Estudiantes</h1>
        <p className="text-slate-500">Gestión de cuentas de la plataforma.</p>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <User className="w-8 h-8 text-indigo-400" />
          <div>
            <div className="text-3xl font-bold text-white">{users.filter((u) => u.role === 'STUDENT').length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Estudiantes</div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <Shield className="w-8 h-8 text-cyan-400" />
          <div>
            <div className="text-3xl font-bold text-white">{users.filter((u) => u.role === 'ADMIN').length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Admins</div>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
        <input
          type="text"
          placeholder="Buscar por usuario o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
        />
      </div>

      {loading && <p className="text-slate-500 text-center py-20">Cargando...</p>}
      {error   && <p className="text-red-400 text-center py-20">{error}</p>}

      {!loading && !error && (
        <div className="bg-[#1e293b]/40 border border-white/5 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <th className="px-6 py-5">Usuario</th>
                <th className="px-6 py-5">Nombre completo</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Rol</th>
                <th className="px-6 py-5">Registro</th>
                <th className="px-6 py-5">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[...admins, ...students].map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-bold text-xs uppercase">
                        {u.username.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-white">{u.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {u.firstName} {u.lastNamePaternal} {u.lastNameMaternal}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Mail className="w-3.5 h-3.5" />
                      {u.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${ROLE_STYLE[u.role] ?? ROLE_STYLE.STUDENT}`}>
                      {u.role === 'ADMIN' ? 'Admin' : 'Estudiante'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600">
                    {new Date(u.createdAt).toLocaleDateString('es-CL')}
                  </td>
                  <td className="px-6 py-4">
                    {u.role !== 'ADMIN' && (
                      <button
                        onClick={() => deleteUser(u.id, u.username)}
                        className="p-2 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-600">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
