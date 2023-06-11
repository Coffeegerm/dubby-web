import { prisma } from "../src/server/db";

async function main() {
  const firstUser = await prisma.user.findFirst();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
