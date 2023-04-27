import { prisma } from "../src/server/db";

async function main() {
  const firstUser = await prisma.user.findFirst();
  if (firstUser) {
    const firstGame = await prisma.game.upsert({
      where: { id: "1" },
      create: {
        id: "1",
        campaignName: "Test Campaign",
        dungeonMasterId: firstUser.id,
      },
      update: {},
    });

    const userGame = await prisma.usersGames.upsert({
      where: { userId_gameId: { userId: firstUser.id, gameId: firstGame.id } },
      create: {
        userId: firstUser.id,
        gameId: firstGame.id,
        status: "DRAFT",
      },
      update: {},
    });
  }
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
