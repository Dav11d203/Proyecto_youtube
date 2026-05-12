export const lessons = [
  {
    id: 'iot-1',
    type: 'theory',
    title: 'Introducción a Arduino y ESP32',
    duration: '55 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  {
    id: 'iot-2',
    type: 'theory',
    title: 'Protocolo MQTT y brokers',
    duration: '60 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing',
  },
  ];

export default function IoTContent() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-2 h-8 bg-cyan-500 rounded-full" />
          Plan de Estudios: IoT
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Explora la intersección entre el hardware y el software. En este curso aprenderás a programar dispositivos 
          físicos (ESP32/Arduino), capturar datos del entorno mediante sensores y enviarlos a la nube para su visualización 
          en tiempo real.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-widest">Hardware & C++</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aprende los fundamentos de la electrónica y programación embebida para controlar sensores y actuadores.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Conectividad</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Domina el protocolo MQTT y la comunicación inalámbrica para crear sistemas distribuidos e inteligentes.
          </p>
        </div>
      </div>
    </div>
  );
}
