import { Star, CheckCircle } from 'lucide-react';

export default function ChannelBanner() {
  return (
    <div className="w-full max-w-5xl mx-auto mb-20 font-sans">
      {/* Banner Superior */}
      <div className="w-full h-32 md:h-56 rounded-t-3xl overflow-hidden relative bg-[#181818] border border-white/5 border-b-0">
        {/* Usamos un fondo abstracto para simular el banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-indigo-500/20"></div>
        <img
          src="/Fotos/img.jpg"
          alt="Cristian Gómez Vega"
          className="w-full h-full object-cover bg-slate-800"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop';
          }}
        />      </div>

      {/* Información del Perfil */}
      <div className="bg-[#0f0f0f] rounded-b-3xl border border-white/5 border-t-0 pb-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">

          {/* Foto de Perfil superpuesta */}
          <div className="-mt-12 md:-mt-16 shrink-0">
            <img
              src="/Fotos/cristian2.png"
              alt="Cristian Gómez Vega"
              className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-[#0f0f0f] object-cover bg-slate-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop';
              }}
            />
          </div>

          {/* Textos y Botones */}
          <div className="flex-1 text-center md:text-left mt-2 md:mt-4 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2 mb-1">
              Cristian Gómez Vega
              <CheckCircle className="w-4 h-4 text-gray-400 fill-gray-300" />
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-medium mb-1">
              @CristianGomezVega • 55,4 M de suscriptores • 2,4 K vídeos
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Lento pero seguro. <span className="text-white font-medium cursor-pointer">...más</span>
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <a 
                href="https://www.youtube.com/channel/UCiC2wfbkgr8DU5uOQFz9OrQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black hover:bg-gray-200 font-bold py-2 px-5 rounded-full transition-colors text-sm"
              >
                Suscribirme
              </a>
              <a 
                href="https://www.reddit.com/r/chile/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-5 rounded-full flex items-center gap-2 transition-colors text-sm"
              >
                <Star className="w-4 h-4 fill-current" />
                Unirme
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
