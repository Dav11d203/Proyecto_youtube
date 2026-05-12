import { X, UserPlus, LogIn, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass border-white/10 rounded-[3rem] overflow-hidden p-8 md:p-12 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Únete a CodeLearn</h2>
          <p className="text-slate-400">Elige cómo quieres empezar tu carrera hoy mismo</p>
        </div>

        <div className="grid gap-6">
          <Link 
            to="/login" 
            onClick={onClose}
            className="group p-6 glass border-white/5 rounded-[2rem] hover:border-cyan-400/30 transition-all flex items-center gap-6"
          >
            <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <LogIn className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg">Ya tengo cuenta</div>
              <div className="text-xs text-slate-500">Continuar mis estudios donde los dejé</div>
            </div>
          </Link>

          <Link 
            to="/register" 
            onClick={onClose}
            className="group p-6 glass border-white/5 rounded-[2rem] hover:border-indigo-400/30 transition-all flex items-center gap-6"
          >
            <div className="w-14 h-14 bg-indigo-400/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg">Crear cuenta nueva</div>
              <div className="text-xs text-slate-500">Acceder a todo el contenido de la academia</div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest leading-relaxed">
            Al unirte aceptas nuestras políticas de <br /> comunidad y términos de servicio.
          </p>
        </div>
      </div>
    </div>
  );
}
