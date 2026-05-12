import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Tech } from '../data/techs';
import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';

const PythonContent = lazy(() => import('../courses_content/PythonContent'));
const HtmlContent = lazy(() => import('../courses_content/HtmlContent'));
const CssContent = lazy(() => import('../courses_content/CssContent'));
const WebContent = lazy(() => import('../courses_content/DesarrolloWebContent'));
const MobileContent = lazy(() => import('../courses_content/DesarrolloAppMovilContent'));
const JavaContent = lazy(() => import('../courses_content/JavaContent'));
const TsContent = lazy(() => import('../courses_content/TypeScriptContent'));
const ApisContent = lazy(() => import('../courses_content/ApisContent'));
const IotContent = lazy(() => import('../courses_content/IoTContent'));
const VgContent = lazy(() => import('../courses_content/VideojuegosContent'));
const IaIntroContent = lazy(() => import('../courses_content/IntroduccionIaContent'));
const IaDevContent = lazy(() => import('../courses_content/DesarrolloIaContent'));

const contentMap: Record<string, any> = {
  python: PythonContent,
  html: HtmlContent,
  css: CssContent,
  desarolloweb: WebContent,
  desarolloappmovil: MobileContent,
  java: JavaContent,
  TypeScript: TsContent,
  apis: ApisContent,
  IoT: IotContent,
  videojuegos: VgContent,
  IntroduccionIA: IaIntroContent,
  DesarrolloIa: IaDevContent,
};


interface CourseModalProps {
  tech: Tech | null;
  onClose: () => void;
}

export default function CourseModal({ tech, onClose }: CourseModalProps) {
  const navigate = useNavigate();

  if (!tech) return null;

  const Icon = tech.icon;
  const ContentComponent = contentMap[tech.id];

  const handleTutoriaClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Debes iniciar sesión para acceder a las tutorías.');
      return;
    }
    onClose();
    navigate(`/cursos/${tech.id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass-dark border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
            <div className={`p-6 rounded-3xl bg-gradient-to-br ${tech.color} shadow-2xl shrink-0`}>
              <Icon className="w-16 h-16 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
                  {tech.level}
                </span>
                {tech.badge && (
                  <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-widest">
                    {tech.badge}
                  </span>
                )}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{tech.name}</h2>
            </div>
          </div>

          <div className="py-8 border-y border-white/5 mb-8">
            {tech.content && (
              <p className="text-xl font-medium text-white mb-6 leading-relaxed">
                {tech.content}
              </p>
            )}
            
            <Suspense fallback={<div className="text-slate-400 animate-pulse">Cargando detalles...</div>}>
              {ContentComponent ? (
                <div className="bg-white/[0.02] rounded-3xl p-6 border border-white/5">
                  <ContentComponent />
                </div>
              ) : (
                <p className="text-slate-400 leading-relaxed">
                  {tech.longDescription || tech.description}
                </p>
              )}
            </Suspense>
          </div>


          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {['Tutoría Personalizada', 'Ejercicios Prácticos', 'Material Descargable'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-400">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleTutoriaClick}
            className={`w-full py-5 bg-gradient-to-r ${tech.color} rounded-2xl font-bold text-lg text-white shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3`}
          >
            Ir a las tutorías
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
