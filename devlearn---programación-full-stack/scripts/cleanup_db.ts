import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Limpiando tablas de progreso y entregas para permitir la migración...');
  await prisma.submission.deleteMany({});
  await prisma.progress.deleteMany({});
  console.log('Limpieza completada.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
