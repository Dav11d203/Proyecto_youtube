import { PrismaClient } from '@prisma/client';
import { TECHS } from '../src/data/techs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando migración de cursos estáticos a base de datos...');

  for (const tech of TECHS) {
    console.log(`Migrando curso: ${tech.name}...`);
    
    // Crear o actualizar curso
    const course = await prisma.course.upsert({
      where: { slug: tech.id },
      update: {
        name: tech.name,
        description: tech.description,
        longDescription: tech.longDescription,
        level: tech.level,
        image: tech.image,
        color: tech.color,
        badge: tech.badge,
        glowColor: tech.glowColor,
        learns: tech.learns,
      },
      create: {
        slug: tech.id,
        name: tech.name,
        description: tech.description,
        longDescription: tech.longDescription,
        level: tech.level,
        image: tech.image,
        color: tech.color,
        badge: tech.badge,
        glowColor: tech.glowColor,
        learns: tech.learns,
      }
    });

    // Migrar lecciones (Teoría)
    for (let i = 0; i < tech.curriculum.teoria.length; i++) {
      const lesson = tech.curriculum.teoria[i];
      await prisma.lesson.create({
        data: {
          courseId: course.id,
          title: lesson.title,
          duration: lesson.duration,
          youtubeId: lesson.youtubeId,
          driveUrl: lesson.driveUrl,
          type: 'theory',
          order: i
        }
      });
    }

    // Migrar lecciones (Desarrollo)
    for (let i = 0; i < tech.curriculum.desarrollo.length; i++) {
      const lesson = tech.curriculum.desarrollo[i];
      await prisma.lesson.create({
        data: {
          courseId: course.id,
          title: lesson.title,
          duration: lesson.duration,
          youtubeId: lesson.youtubeId,
          driveUrl: lesson.driveUrl,
          type: 'development',
          order: tech.curriculum.teoria.length + i
        }
      });
    }
  }

  console.log('Migración completada con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
