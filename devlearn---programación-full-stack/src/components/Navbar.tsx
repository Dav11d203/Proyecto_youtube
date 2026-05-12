import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, Bell, LayoutDashboard, Users, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

interface StoredUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const location = useLocation();
  const navigate  = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [user, setUser]             = useState<StoredUser | null>(null);
  const [progressData, setProgressData] = useState<any[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    if (isMenuOpen || isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isNotifOpen]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      const u = raw ? JSON.parse(raw) : null;
      setUser(u);
      
      if (u) {
        // Cargar progreso (si es admin carga todo, si es alumno carga lo suyo)
        const endpoint = u.role === 'ADMIN' ? 'http://localhost:3001/api/admin/progress' : `http://localhost:3001/api/progress/${u.id}`;
        fetch(endpoint)
          .then(r => r.json())
          .then(data => setProgressData(Array.isArray(data) ? data : []))
          .catch(() => {});
      }
    } catch {
      setUser(null);
    }
    setIsMenuOpen(false);
    setIsNotifOpen(false);
  }, [location.pathname]);

  function logout() {
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
    window.location.reload();
  }

  const isAdmin   = user?.role === 'ADMIN';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const navLinks = [
    { label: 'Inicio',    to: '/' },
    { label: 'Cursos',    to: '/cursos' },
    { label: 'Nosotros',  to: '/nosotros' },
    { label: 'Contacto',  to: '/contacto' },
  ];

  return (
    <nav
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      className="px-6 pt-5 pb-2 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#0f172a]/85 border border-white/8 px-6 py-3 rounded-2xl backdrop-blur-xl shadow-2xl pointer-events-auto">

        {/* Izquierda: Logo y Links */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-white font-black text-sm select-none shadow-lg">
              &lt;/&gt;
            </div>
            <span className="text-lg font-bold text-white tracking-tight">CodeLearn</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === l.to
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right zone */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Bell */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className={`relative p-2 rounded-xl transition-all ${isNotifOpen ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                  <Bell className="w-5 h-5" />
                  {progressData.some(p => p.progressPercentage === 100) && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f172a] block" />
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                    <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Resumen de Progreso</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {progressData.filter(p => p.progressPercentage === 100).length > 0 ? (
                        <div className="p-2 space-y-1">
                          {progressData.filter(p => p.progressPercentage === 100).slice(0, 10).map((p, i) => (
                            <div key={i} className="px-3 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors group">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                  <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-[11px] text-white leading-relaxed">
                                    <span className="font-bold text-emerald-400">{p.user?.username || 'Un estudiante'}</span> ha completado el curso de <span className="font-bold text-cyan-400 uppercase">{p.courseId}</span> al 100%.
                                  </p>
                                  <p className="text-[9px] text-slate-500 mt-1">{new Date(p.lastAccessed).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center">
                          <p className="text-xs text-slate-600 italic">No hay nuevas felicitaciones</p>
                        </div>
                      )}
                    </div>
                    {isAdmin && (
                      <Link 
                        to="/admin/progreso" 
                        onClick={() => setIsNotifOpen(false)}
                        className="block w-full py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/[0.01] hover:bg-white/[0.05] hover:text-white transition-colors border-t border-white/5"
                      >
                        Ver todos los detalles
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* User dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen((v) => !v)}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 pl-1.5 pr-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs uppercase select-none ${isAdmin ? 'bg-cyan-600/40 text-cyan-300' : 'bg-indigo-600/40 text-indigo-300'}`}>
                    {user.username.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-white">{user.username}</span>
                  {isAdmin && (
                    <span className="text-[9px] font-black uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    {/* Header del dropdown */}
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-xs font-bold text-white">{user.username}</p>
                      <p className="text-[10px] text-slate-500">{user.email}</p>
                    </div>

                    <div className="p-1">
                      <Link 
                        to="/perfil"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors text-left"
                      >
                        <Settings className="w-4 h-4 shrink-0" />
                        Configurar perfil
                      </Link>

                      {/* Links exclusivos de ADMIN */}
                      {isAdmin && (
                        <>
                          <div className="my-1 border-t border-white/5" />
                          <p className="px-3 pt-2 pb-1 text-[9px] font-black uppercase tracking-widest text-slate-600">
                            Administración
                          </p>
                          <Link
                            to="/admin/progreso"
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 shrink-0 text-cyan-400" />
                            Progreso de alumnos
                          </Link>
                          <Link
                            to="/admin/estudiantes"
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors"
                          >
                            <Users className="w-4 h-4 shrink-0 text-indigo-400" />
                            Administrar estudiantes
                          </Link>
                        </>
                      )}

                      <div className="my-1 border-t border-white/5" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-sm text-red-400 hover:text-red-300 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            !isAuthPage && (
              <button
                onClick={onOpenAuth}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
              >
                Empezar
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
