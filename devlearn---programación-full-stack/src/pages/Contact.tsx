import { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('Elección de Ruta Tecnológica');
  const [mensaje, setMensaje] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const user = JSON.parse(raw);
        // Usa firstName si existe, si no usa username
        const fullName = user.firstName
          ? `${user.firstName} ${user.lastNamePaternal || ''}`.trim()
          : user.username;
        setNombre(fullName || '');
        setEmail(user.email || '');
      }
    } catch { }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim()) {
      alert('Por favor, escribe un mensaje antes de enviar.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, asunto, mensaje })
      });

      if (res.ok) {
        alert('¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto a tu correo.');
        setMensaje(''); // Limpiar el mensaje tras enviar
      } else {
        alert('Hubo un error al enviar tu solicitud.');
      }
    } catch (error) {
      alert('Error de red al intentar conectar con el servidor.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-6">¿Necesitas una <span className="text-cyan-400">Asesoría?</span></h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Estamos aquí para impulsarte. Cuéntanos sobre tus objetivos y te ayudaremos a elegir la ruta perfecta para tu carrera.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 glass rounded-3xl border-white/5">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-2xl flex items-center justify-center text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Email Directo</div>
                  <div className="text-sm font-bold">cgomezvega@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 glass rounded-3xl border-white/5">
                <div className="w-12 h-12 bg-indigo-400/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Soporte Discord</div>
                  <div className="text-sm font-bold">Comunidad CodeLearn</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass border-white/10 p-8 md:p-12 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-indigo-500"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Asunto</label>
                <select
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  className="w-full bg-[#1e293b] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                >
                  <option>Elección de Ruta Tecnológica</option>
                  <option>Mentoría 1 a 1</option>
                  <option>Revisión de Portafolio</option>
                  <option>Soporte Técnico</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Mensaje</label>
                <textarea
                  rows={4}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Cuéntanos un poco sobre ti y cómo podemos ayudarte..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button disabled={isSubmitting} type="submit" className={`w-full py-5 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
