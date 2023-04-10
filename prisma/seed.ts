import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'sample@sample.sample' },
    update: {},
    create: {
      email: 'sample@sample.sample',
      name: 'Sample Samplov',
      password: 'password-sample',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'test@test.test' },
    update: {},
    create: {
      email: 'test@test.test',
      name: 'Test Testov',
      password: 'password-test',
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
