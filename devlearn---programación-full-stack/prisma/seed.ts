import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando siembra de datos...');

  // Crear Admin
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@codelearn.edu',
      password: 'admin123_secure',
      firstName: 'Administrador',
      lastNamePaternal: 'Code',
      lastNameMaternal: 'Learn',
      role: 'ADMIN',
    },
  });

  // Crear Usuario de Prueba
  const testUser = await prisma.user.upsert({
    where: { username: 'estudiante_prueba' },
    update: {},
    create: {
      username: 'estudiante_prueba',
      email: 'pruebas@gmail.com',
      password: 'estudiante_123',
      firstName: 'Juan',
      lastNamePaternal: 'Pérez',
      lastNameMaternal: 'García',
      phone: '987654321',
      role: 'STUDENT',
    },
  });

  console.log('Usuarios creados con éxito:');
  console.log({ admin, testUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
