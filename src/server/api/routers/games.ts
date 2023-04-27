// import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const gamesRouter = createTRPCRouter({
  getMyGames: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      where: {
        dungeonMasterId: ctx.session.user.id,
      },
    });
  }),
});
