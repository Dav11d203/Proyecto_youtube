import 'dotenv/config';
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Crear carpeta uploads si no existe
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos

// Configuración de Multer para guardar archivos con su nombre original
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>CodeLearn Backend API</h1>');
});

// LOGIN
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// REGISTER
app.post('/api/register', async (req: Request, res: Response) => {
  const { email, username, password, firstName, lastNamePaternal, lastNameMaternal, phone } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existingUser) return res.status(400).json({ error: 'Email o Usuario ya en uso' });

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password,
        firstName,
        lastNamePaternal,
        lastNameMaternal,
        phone,
        role: 'STUDENT' // Siempre estudiante por defecto
      }
    });
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar' });
  }
});

// OBTENER PERFIL DE USUARIO
app.get('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// ACTUALIZAR PERFIL DE USUARIO
app.put('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastNamePaternal, lastNameMaternal, email, phone } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { firstName, lastNamePaternal, lastNameMaternal, email, phone }
    });
    const { password: _, ...userWithoutPassword } = updated;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// MARCAR LECCIÓN COMO COMPLETADA
app.post('/api/progress', async (req: Request, res: Response) => {
  const { userId, lessonId, techId, totalLessons } = req.body;
  if (!userId || !lessonId || !techId) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const existing = await prisma.progress.findUnique({
      where: { userId_courseId: { userId, courseId: techId } }
    });
    const currentLessons: string[] = existing?.completedLessons ?? [];
    const updatedLessons = currentLessons.includes(lessonId)
      ? currentLessons.filter(id => id !== lessonId)
      : [...currentLessons, lessonId];
    const total = totalLessons ?? existing?.totalLessons ?? updatedLessons.length;
    const pct = Math.round((updatedLessons.length / total) * 100);
    const status = pct === 0 ? 'NOT_STARTED' : pct >= 100 ? 'COMPLETED' : 'IN_PROGRESS';

    const progress = await prisma.progress.upsert({
      where: { userId_courseId: { userId, courseId: techId } },
      update: {
        completedLessons: updatedLessons,
        totalLessons: total,
        progressPercentage: pct,
        status: status as any,
        lastAccessed: new Date()
      },
      create: {
        userId,
        courseId: techId,
        completedLessons: updatedLessons,
        totalLessons: total,
        progressPercentage: pct,
        status: status as any
      }
    });
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar progreso' });
  }
});

// OBTENER PROGRESO DE UN USUARIO
app.get('/api/progress/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const progress = await prisma.progress.findMany({
      where: { userId },
      orderBy: { lastAccessed: 'desc' }
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener progreso' });
  }
});

// OBTENER PROGRESO DE TODOS LOS ALUMNOS (ADMIN)
app.get('/api/admin/progress', async (_req: Request, res: Response) => {
  try {
    const allProgress = await prisma.progress.findMany({
      include: {
        user: {
          select: { id: true, username: true, firstName: true, lastNamePaternal: true, email: true, role: true }
        }
      },
      orderBy: { lastAccessed: 'desc' }
    });
    res.json(allProgress);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener progreso de alumnos' });
  }
});


// ENVIAR MENSAJE DE CONTACTO (REAL CON NODEMAILER)
app.post('/api/contact', async (req: Request, res: Response) => {
  const { nombre, email, asunto, mensaje } = req.body;

  try {
    // Configura el transporte de correo (ejemplo con Gmail)
    // NECESITAS configurar EMAIL_USER y EMAIL_PASS en tu archivo .env
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${nombre} (Vía CodeLearn)" <${process.env.EMAIL_USER}>`,
      to: 'da.yanezv@duocuc.cl', // Correo destino solicitado
      replyTo: email, // Permite responder directo al alumno
      subject: `CodeLearn Soporte: ${asunto}`,
      text: `Has recibido un nuevo mensaje de contacto desde la plataforma CodeLearn.\n\n` +
        `Datos del estudiante:\n` +
        `Nombre: ${nombre}\n` +
        `Email: ${email}\n` +
        `Asunto: ${asunto}\n\n` +
        `Mensaje:\n${mensaje}`
    };

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ ADVERTENCIA: Las credenciales EMAIL_USER y EMAIL_PASS no están configuradas en .env. Simulando envío para no arrojar error fatal.');
      console.log('Mensaje que se habría enviado a da.yanezv@duocuc.cl:\n', mailOptions.text);
      // Simular retraso
      await new Promise(resolve => setTimeout(resolve, 800));
      return res.status(200).json({ success: true, message: 'Simulado por falta de credenciales.' });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Correo enviado correctamente a la bandeja de entrada.' });

  } catch (error) {
    console.error('Error enviando correo real:', error);
    res.status(500).json({ success: false, error: 'Hubo un error al enviar el correo con el servidor SMTP.' });
  }
});

// OBTENER TODOS LOS USUARIOS (ADMIN)
app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// EDITAR USUARIO (ADMIN)
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: data
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// BORRAR USUARIO (ADMIN)
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// --- CURSOS Y LECCIONES ---

// OBTENER TODOS LOS CURSOS
app.get('/api/courses', async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: { _count: { select: { lessons: true } } },
      orderBy: { createdAt: 'asc' }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

// OBTENER UN CURSO POR SLUG O ID
app.get('/api/courses/:identifier', async (req: Request, res: Response) => {
  const { identifier } = req.params;
  try {
    const course = await prisma.course.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ]
      },
      include: { lessons: { orderBy: { order: 'asc' } } }
    });
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
});

// CREAR CURSO (ADMIN)
app.post('/api/courses', async (req: Request, res: Response) => {
  const { name, description, longDescription, level, slug, image, color, glowColor, learns } = req.body;
  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/ /g, '-'),
        description,
        longDescription,
        level,
        image,
        color,
        glowColor,
        learns: learns || []
      }
    });
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear curso' });
  }
});

// AÑADIR LECCIÓN A UN CURSO (ADMIN)
app.post('/api/courses/:courseId/lessons', async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { title, duration, youtubeId, driveUrl, type, order } = req.body;
  try {
    const newLesson = await prisma.lesson.create({
      data: {
        courseId,
        title,
        duration,
        youtubeId,
        driveUrl,
        type: type || 'theory',
        order: order || 0
      }
    });
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear lección' });
  }
});

// ACTUALIZAR CURSO (ADMIN)
app.put('/api/courses/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.course.update({
      where: { id },
      data: {
        ...data,
        learns: Array.isArray(data.learns) ? data.learns : (data.learns?.split(',').map((s: string) => s.trim()) || [])
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar curso' });
  }
});

// ELIMINAR CURSO
app.delete('/api/courses/:id', async (req: Request, res: Response) => {
  try {
    await prisma.course.delete({ where: { id: req.params.id } });
    res.json({ message: 'Curso eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar curso' });
  }
});

// EDITAR LECCIÓN
app.put('/api/lessons/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.lesson.update({
      where: { id },
      data: data
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar lección' });
  }
});

// BORRAR LECCIÓN
app.delete('/api/lessons/:id', async (req: Request, res: Response) => {
  try {
    await prisma.lesson.delete({ where: { id: req.params.id } });
    res.json({ message: 'Lección eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar lección' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
