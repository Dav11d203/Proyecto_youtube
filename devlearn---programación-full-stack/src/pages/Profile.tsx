import { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastNamePaternal: string;
  lastNameMaternal: string;
  phone: string;
  role: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/');
      return;
    }
    const user = JSON.parse(stored);
    
    fetch(`http://localhost:3001/api/user/${user.id}`)
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar perfil');
        setLoading(false);
      });
  }, [navigate]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:3001/api/user/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      
      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        // Actualizar localStorage para reflejar cambios en navbar etc
        localStorage.setItem('user', JSON.stringify(updated));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Error al actualizar el perfil.');
      }
    } catch {
      setError('Error de conexión al servidor.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-44 flex justify-center text-slate-500">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="glass border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Header del Perfil */}
          <div className="h-32 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 border-b border-white/5 relative">
            <div className="absolute -bottom-12 left-10">
              <div className="w-24 h-24 rounded-3xl bg-[#0f172a] border-4 border-white/10 flex items-center justify-center text-4xl font-black text-indigo-400 shadow-2xl">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="pt-16 px-10 pb-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Configuración de Perfil</h1>
                <p className="text-slate-500 text-sm">Gestiona tu información personal y cuenta.</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                  Rol: {profile.role}
                </span>
                <p className="text-[10px] text-slate-600 font-mono">ID: {profile.id}</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text"
                      value={profile.firstName}
                      onChange={e => setProfile({...profile, firstName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                </div>

                {/* Apellido Paterno */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Apellido Paterno</label>
                  <input 
                    type="text"
                    value={profile.lastNamePaternal}
                    onChange={e => setProfile({...profile, lastNamePaternal: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition-all"
                    placeholder="Tu apellido"
                    required
                  />
                </div>

                {/* Apellido Materno */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Apellido Materno</label>
                  <input 
                    type="text"
                    value={profile.lastNameMaternal}
                    onChange={e => setProfile({...profile, lastNameMaternal: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition-all"
                    placeholder="Tu segundo apellido"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Número de Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="tel"
                      value={profile.phone}
                      onChange={e => setProfile({...profile, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
                      placeholder="+56 9 XXXX XXXX"
                    />
                  </div>
                </div>

                {/* Usuario (No editable) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre de Usuario (ID)</label>
                  <div className="relative opacity-60">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text"
                      value={profile.username}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl animate-shake">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl animate-fade-in">
                  ¡Perfil actualizado correctamente!
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all shadow-xl ${saving ? 'bg-slate-700 text-white/50 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'}`}
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
