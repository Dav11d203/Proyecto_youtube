import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowLeft, Loader2, Fingerprint } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastNamePaternal: '',
    lastNameMaternal: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // El servidor devuelve el usuario directamente
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
        window.location.reload();
      } else {
        setError(data.error || data.message || 'Error al registrarse');
      }
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-6 py-32">
      <div className="w-full max-w-2xl glass border-white/10 rounded-3xl p-10 shadow-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="text-4xl font-bold mb-2 text-white">Crear cuenta</h1>
        <p className="text-slate-500 mb-8 text-sm">Únete a la comunidad de CodeLearn Academy.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-5">
          {/* Nombre */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Nombre</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input type="text" name="firstName" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-indigo-500/50 text-sm text-white placeholder-slate-600 transition-colors" placeholder="Juan" required />
            </div>
          </div>

          {/* Usuario */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Nombre de usuario</label>
            <div className="relative">
              <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input type="text" name="username" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-indigo-500/50 text-sm text-white placeholder-slate-600 transition-colors" placeholder="juan_dev" required />
            </div>
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Apellido Paterno</label>
            <input type="text" name="lastNamePaternal" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 focus:outline-none focus:border-indigo-500/50 text-sm text-white placeholder-slate-600 transition-colors" placeholder="Pérez" required />
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Apellido Materno</label>
            <input type="text" name="lastNameMaternal" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 focus:outline-none focus:border-indigo-500/50 text-sm text-white placeholder-slate-600 transition-colors" placeholder="García" required />
          </div>

          {/* Correo — ocupa todo el ancho */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input type="email" name="email" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-indigo-500/50 text-sm text-white placeholder-slate-600 transition-colors" placeholder="juan@email.com" required />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input type="password" name="password" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-indigo-500/50 text-sm text-white placeholder-slate-600 transition-colors" placeholder="••••••••" required />
            </div>
          </div>

          {/* Celular (Opcional) */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Celular <span className="text-slate-600 normal-case">(Opcional)</span></label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input type="text" name="phone" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-indigo-500/50 text-sm text-white placeholder-slate-600 transition-colors" placeholder="+56 9 1234 5678" />
            </div>
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-3 mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-400 font-semibold hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
