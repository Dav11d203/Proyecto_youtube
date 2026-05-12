// ──────────────────────────────────────────────────────────
// courseContent.ts
// Índice central de lecciones por curso.
// ──────────────────────────────────────────────────────────

// Importaciones dinámicas desde cada archivo de contenido específico
import { lessons as pythonLessons } from '../courses_content/PythonContent';

export interface Lesson {
  id: string;
  type: 'theory';
  title: string;
  duration: string;
  videoId: string;
  driveLink: string;
  instructions?: string[];
}

export interface CourseContent {
  courseId: string;
  title: string;
  lessons: Lesson[];
}

// ── DRIVE BASE ──
const DRIVE = 'https://drive.google.com/drive/folders/1OqWFJacQgq0ZWW-aW_U7AxMlkpCitqv1?usp=sharing';
// ── VIDEO PLACEHOLDER (reemplazar por el real de cada clase) ──
const VIDEO = 'hvi3J3yBRXI';



// ════════════════════════════════════════════════════════════
// HTML
// ════════════════════════════════════════════════════════════
export const htmlLessons: Lesson[] = [
  {
    id: 'html-1',
    type: 'theory',
    title: 'Estructura básica de un documento HTML',
    duration: '40 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: DRIVE,
  },
  {
    id: 'html-2',
    type: 'theory',
    title: 'Etiquetas semánticas: header, main, footer',
    duration: '45 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: DRIVE,
  },
  {
    id: 'html-3',
    type: 'theory',
    title: 'Formularios y tipos de input',
    duration: '50 min',
    videoId: 'hvi3J3yBRXI',
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════
export const cssLessons: Lesson[] = [
  {
    id: 'css-t1',
    type: 'theory',
    title: 'Selectores, especificidad y cascada',
    duration: '45 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'css-t2',
    type: 'theory',
    title: 'Flexbox: diseño en una dimensión',
    duration: '60 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'css-t3',
    type: 'theory',
    title: 'CSS Grid: diseño en dos dimensiones',
    duration: '60 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'css-t4',
    type: 'theory',
    title: 'Animaciones y transiciones CSS',
    duration: '50 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// DESARROLLO WEB
// ════════════════════════════════════════════════════════════
export const desarollowebLessons: Lesson[] = [
  {
    id: 'web-t1',
    type: 'theory',
    title: 'Arquitectura web y protocolo HTTP',
    duration: '50 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'web-t2',
    type: 'theory',
    title: 'React: componentes, props y estado',
    duration: '70 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'web-t3',
    type: 'theory',
    title: 'Node.js y Express: creación de APIs',
    duration: '65 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// DESARROLLO APP MÓVIL
// ════════════════════════════════════════════════════════════
export const desarolloappmovilLessons: Lesson[] = [
  {
    id: 'mob-t1',
    type: 'theory',
    title: 'Introducción a React Native y Expo',
    duration: '55 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'mob-t2',
    type: 'theory',
    title: 'Componentes nativos y estilos',
    duration: '60 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// JAVA
// ════════════════════════════════════════════════════════════
export const javaLessons: Lesson[] = [
  {
    id: 'java-t1',
    type: 'theory',
    title: 'POO: clases, herencia y polimorfismo',
    duration: '70 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'java-t2',
    type: 'theory',
    title: 'Colecciones y streams de Java',
    duration: '65 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'java-t3',
    type: 'theory',
    title: 'Spring Boot: configuración e inyección de dependencias',
    duration: '75 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// TYPESCRIPT
// ════════════════════════════════════════════════════════════
export const TypeScriptLessons: Lesson[] = [
  {
    id: 'ts-t1',
    type: 'theory',
    title: 'Tipos, interfaces y type aliases',
    duration: '55 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'ts-t2',
    type: 'theory',
    title: 'Genéricos y tipos condicionales',
    duration: '65 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// REST APIs
// ════════════════════════════════════════════════════════════
export const apisLessons: Lesson[] = [
  {
    id: 'api-t1',
    type: 'theory',
    title: 'Principios REST y diseño de recursos',
    duration: '50 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'api-t2',
    type: 'theory',
    title: 'Autenticación con JWT',
    duration: '60 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// IOT
// ════════════════════════════════════════════════════════════
export const IoTLessons: Lesson[] = [
  {
    id: 'iot-t1',
    type: 'theory',
    title: 'Introducción a Arduino y ESP32',
    duration: '55 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'iot-t2',
    type: 'theory',
    title: 'Protocolo MQTT y brokers',
    duration: '60 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// VIDEOJUEGOS
// ════════════════════════════════════════════════════════════
export const videojuegosLessons: Lesson[] = [
  {
    id: 'vg-t1',
    type: 'theory',
    title: 'Fundamentos de Unity y C# para juegos',
    duration: '65 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'vg-t2',
    type: 'theory',
    title: 'Física y detección de colisiones',
    duration: '60 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// INTRODUCCIÓN IA
// ════════════════════════════════════════════════════════════
export const IntroduccionIALessons: Lesson[] = [
  {
    id: 'ia-t1',
    type: 'theory',
    title: 'Qué es el Machine Learning y sus tipos',
    duration: '55 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'ia-t2',
    type: 'theory',
    title: 'Regresión lineal: predicción de valores',
    duration: '65 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// DESARROLLO IA
// ════════════════════════════════════════════════════════════
export const DesarrolloIaLessons: Lesson[] = [
  {
    id: 'dia-t1',
    type: 'theory',
    title: 'Deep Learning: redes neuronales profundas',
    duration: '80 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  {
    id: 'dia-t2',
    type: 'theory',
    title: 'Visión artificial con CNN',
    duration: '75 min',
    videoId: VIDEO,
    driveLink: DRIVE,
  },
  ];

// ════════════════════════════════════════════════════════════
// ÍNDICE CENTRAL — mapea courseId → lecciones
// ════════════════════════════════════════════════════════════
export const COURSE_LESSONS: Record<string, Lesson[]> = {
  python: pythonLessons as Lesson[],
  html: htmlLessons,
  css: cssLessons,
  desarolloweb: desarollowebLessons,
  desarolloappmovil: desarolloappmovilLessons,
  java: javaLessons,
  TypeScript: TypeScriptLessons,
  apis: apisLessons,
  IoT: IoTLessons,
  videojuegos: videojuegosLessons,
  IntroduccionIA: IntroduccionIALessons,
  DesarrolloIa: DesarrolloIaLessons,
};
