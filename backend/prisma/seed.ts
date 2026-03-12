import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.student.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        age: 21,
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        age: 22,
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        age: 20,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
