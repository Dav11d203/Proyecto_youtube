import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

async function main() {
  const courseImages: Record<string, string> = {
    'python':           '/Fotos/python.png',
    'html':             '/Fotos/html.png',
    'css':              '/Fotos/css.png',
    'desarolloweb':     '/Fotos/desarolloweb.png',
    'desarolloappmovil':'/Fotos/desarolloappmovil.png',
    'java':             '/Fotos/java.png',
    'TypeScript':       '/Fotos/typescript.png',
    'apis':             '/Fotos/desarolloweb.png',
    'IoT':              '/Fotos/python.png',
    'videojuegos':      '/Fotos/java.png',
    'IntroduccionIA':   '/Fotos/python.png',
    'DesarrolloIa':     '/Fotos/typescript.png',
  };
  for (const [slug, image] of Object.entries(courseImages)) {
    const r = await p.course.updateMany({ where: { slug }, data: { image } });
    console.log('Updated:', slug, '->', image, '| rows:', r.count);
  }
  console.log('Done.');
}

main()
  .catch(console.error)
  .finally(async () => { await p.$disconnect(); });
