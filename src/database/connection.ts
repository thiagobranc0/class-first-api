import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main(name: string, email: string) {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  await prisma.$disconnect();

  return allUsers;
}

export async function getAll() {
  // ... you will write your Prisma Client queries here

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  await prisma.$disconnect();

  return allUsers;
}

export async function deleteUser(id: number) {
  const data = await prisma.user.delete({ where: { id } });

  await prisma.$disconnect();

  return data;
}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
