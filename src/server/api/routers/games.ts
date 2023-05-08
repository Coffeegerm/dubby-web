import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const gamesRouter = createTRPCRouter({
  getMyGames: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      where: {
        dungeonMasterId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        campaignName: z.string(),
        description: z.string().optional(),
        players: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.game.create({
        data: {
          campaignName: input.campaignName,
          dungeonMasterId: ctx.session.user.id,
          description: input.description,
        },
      });

      return {
        game,
      };
    }),
});
