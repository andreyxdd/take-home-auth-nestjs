import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordSample= await bcrypt.hash('password-sabin', roundsOfHashing);
  const user1 = await prisma.user.upsert({
    where: { email: 'sample@sample.sample' },
    update: {
      password: passwordSample,
    },
    create: {
      email: 'sample@sample.sample',
      name: 'Sample Samplov',
      password: passwordSample,
    },
  });

  const passwordTest = await bcrypt.hash('password-alex', roundsOfHashing);
  const user2 = await prisma.user.upsert({
    where: { email: 'test@test.test' },
    update: {
      password: passwordTest,
    },
    create: {
      email: 'test@test.test',
      name: 'Test Testov',
      password: passwordTest,
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
