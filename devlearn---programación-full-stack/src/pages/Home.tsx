import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code, Play, MessageSquare, Award, ChevronDown
} from 'lucide-react';
import { TECHS, Tech } from '../data/techs';
import CourseModal from '../components/CourseModal';
import ChannelBanner from '../components/ChannelBanner';

export default function Home({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const scrollToCourses = () => {
    document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-20 pt-44 font-sans">
      <style>{`
        @keyframes entry-spin {
          0% { opacity: 0; transform: perspective(1000px) rotateY(-30deg) rotateX(10deg) scale(0.8) translateY(100px); }
          100% { opacity: 1; transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0px); }
        }
        @keyframes code-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-entry-spin {
          animation: entry-spin 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-code {
          animation: code-float 5s ease-in-out infinite;
        }
        .step-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .step-card:hover {
          transform: translateY(-12px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
              {isLoggedIn ? 'Bienvenido a tu sitio web de aprendizaje de programación.' : 'Domina el Lenguaje de la programacion y desarrollate profecionalmente.'}
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed max-w-xl mb-12 mx-auto lg:mx-0 font-medium">
              Aprende programación avanzada desde cero con nuestra plataforma interactiva diseñada para el aprendizaje de nuevas personas o mejorar su nivel actual de programación para su desarrollo profesional.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              {!isLoggedIn ? (
                <button
                  onClick={onOpenAuth}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 text-xl"
                >
                  Empezar formación ahora
                </button>
              ) : (
                <button
                  onClick={scrollToCourses}
                  className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-black py-5 px-10 rounded-2xl border border-white/10 transition-all group active:scale-95 text-xl shadow-2xl"
                >
                  Explorar todos los cursos
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Bloque de código ANIMADO CON GIRO */}
          <div className="flex-1 w-full max-w-xl animate-entry-spin">
            <div className="animate-code">
              <div className="bg-[#1e293b] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl font-mono text-sm md:text-lg text-cyan-300 relative overflow-hidden">
                <div className="flex gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <p><span className="text-purple-400">class</span> <span className="text-yellow-400">Mentor</span> {"{"}</p>
                <div className="pl-6 space-y-1">
                  <p><span className="text-blue-400">constructor</span>() {"{"}</p>
                  <div className="pl-6 text-slate-400">
                    <p>this.name = <span className="text-green-400">'Cristian Gómez Vega'</span>;</p>
                    <p>this.expertise = <span className="text-green-400">'Full Stack'</span>;</p>
                    <p>this.expertise = <span className="text-green-400">'Bases de datos'</span>;</p>
                    <p>this.expertise = <span className="text-green-400">'Desarrollo de Software'</span>;</p>
                    <p>this.expertise = <span className="text-green-400">'Desarrollo Web'</span>;</p>
                    <p>this.expertise = <span className="text-green-400">'Inteligencia Artificial'</span>;</p>
                  </div>
                  <p>{"}"}</p>
                  <p className="mt-2"><span className="text-purple-400">async</span> <span className="text-yellow-400">teach</span>(topic) {"{"}</p>
                  <p className="pl-6">await <span className="text-blue-400">masterContent</span>(topic);</p>
                  <p className="pl-6"><span className="text-purple-400">return</span> <span className="text-green-400">'Success! ✨'</span>;</p>
                  <p>{"}"}</p>
                </div>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de Creador Estilo YouTube */}
      <ChannelBanner />

      {/* Grid de Cursos */}
      <section id="cursos" className="max-w-7xl mx-auto px-6 mb-32 pt-10">
        <h2 className="text-3xl font-bold mb-12 border-l-6 border-cyan-400 pl-6 tracking-tighter">Rutas de Especialización</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TECHS.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className="group cursor-pointer glass border-white/5 rounded-[2rem] transition-all hover:bg-white/5 hover:border-white/20 shadow-xl flex flex-col active:scale-95 overflow-hidden"
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-900 relative border-b border-white/5">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className={`absolute top-4 right-4 p-2 rounded-xl bg-gradient-to-br ${tech.color} shadow-lg scale-75 md:scale-100`}>
                  <tech.icon className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow px-2">
                <h3 className="text-base font-bold mb-1 text-white px-4 truncate">{tech.name}</h3>
                <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2 mb-4 px-4 h-8">{tech.description}</p>
                <div className="mx-4 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Explorar →</span>
                  <Code className="w-3 h-3 text-slate-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Funcionamiento (Rectángulos Verticales) */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">¿Cómo funciona CodeLearn?</h2>
          <p className="text-slate-500">Un ecosistema diseñado para acelerar tu aprendizaje de forma exponencial.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Aprende a tu ritmo",
              desc: "Accede a contenido de alta calidad disponible 24/7. Nuestra plataforma se adapta a tus horarios y velocidad de aprendizaje.",
              icon: Play,
              color: "text-cyan-400",
              bg: "bg-cyan-400/10"
            },
            {
              title: "Mentoría Continua",
              desc: "No estás solo. Obtén feedback directo de expertos en la industria que revisarán tus proyectos y código.",
              icon: MessageSquare,
              color: "text-indigo-400",
              bg: "bg-indigo-400/10"
            },
            {
              title: "Aprendizaje de calidad",
              desc: "Videos cortos, clases en vivo, retos de código y proyectos reales para tu aprendizaje y desarrollo profesional.",
              icon: Award,
              color: "text-emerald-400",
              bg: "bg-emerald-400/10"
            }
          ].map((step, idx) => (
            <div key={idx} className="step-card group relative p-10 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col items-center text-center">
              <div className={`w-16 h-16 ${step.bg} rounded-3xl flex items-center justify-center ${step.color} mb-8 shadow-inner`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {step.desc}
              </p>

              <div className="mt-auto pt-10">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Fase 0{idx + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CourseModal tech={selectedTech} onClose={() => setSelectedTech(null)} />
    </div>
  );
}
