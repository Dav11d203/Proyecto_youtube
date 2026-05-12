import { Target, Eye, ShieldCheck, Zap } from 'lucide-react';
import ChannelBanner from '../components/ChannelBanner';

export default function AboutUs() {
  return (
    <div className="pb-20 pt-44 font-sans">
      <main className="max-w-7xl mx-auto px-6">

        <section className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nuestra visión de la excelencia académica
            </h1>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                ¡Hola! Soy <strong>Cristian Gómez Vega</strong>, Ingeniero de Software con 5 años de experiencia en el mundo del desarrollo. He trabajado en empresas multinacionales y startups tecnológicas, participando en el ciclo completo de vida del software, desde la concepción de ideas hasta el despliegue en producción y mantenimiento. Soy autor de varios libros de programación y he mentorizado a cientos de estudiantes que hoy son ingenieros exitosos en el mercado laboral.
              </p>
            </div>
          </div>
          <div className="flex-[1.3] flex justify-center">
            <div className="relative group rounded-[3rem] shadow-2xl">
              <img
                src="/Fotos/Cristian.jpg"
                alt="Cristian Gómez Vega"
                className="max-w-full h-auto rounded-[2.5rem] shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </section>

        {/* Banner de Presentación (Estilo YouTube) */}
        <ChannelBanner />

        {/* Historia y Fundador (Restaurado) */}


        {/* Misión, Visión y Valores */}
        <section className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: Target,
              title: 'Misión',
              desc: 'Empoderar a la próxima generación de ingenieros Full Stack mediante una metodología de aprendizaje profundo y práctica constante.',
              color: 'text-indigo-400'
            },
            {
              icon: Eye,
              title: 'Visión',
              desc: 'Convertirnos en el estándar de formación técnica en Latinoamérica, siendo el puente directo hacia las empresas Big Tech.',
              color: 'text-cyan-400'
            },
            {
              icon: ShieldCheck,
              title: 'Valores',
              desc: 'Excelencia técnica, integridad profesional y un compromiso inquebrantable con el éxito de cada uno de nuestros alumnos.',
              color: 'text-emerald-400'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] hover:border-white/10 transition-all group">
              <item.icon className={`w-10 h-10 ${item.color} mb-6 group-hover:scale-110 transition-transform`} />
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>

    </div>
  );
}
