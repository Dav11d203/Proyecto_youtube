import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // El servidor devuelve el usuario directamente (no dentro de { user: ... })
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
        window.location.reload();
      } else {
        setError(data.error || data.message || 'Credenciales incorrectas');
      }
    } catch {
      setError('No se pudo conectar con el servidor. ¿Está el backend corriendo?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md glass border-white/10 rounded-3xl p-10 shadow-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="text-4xl font-bold mb-2 text-white">Iniciar sesión</h1>
        <p className="text-slate-500 mb-8 text-sm">Ingresa tu correo y contraseña.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-indigo-500/50 transition-colors text-sm text-white placeholder-slate-600"
                placeholder="admin@codelearn.edu"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-5 focus:outline-none focus:border-indigo-500/50 transition-colors text-sm text-white placeholder-slate-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-3 mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          ¿Sin cuenta? <Link to="/register" className="text-indigo-400 font-semibold hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
