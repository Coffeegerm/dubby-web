import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  getMyGames: protectedProcedure.query(({ ctx }) => {}),

  getOne: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {}),

  create: protectedProcedure
    .input(
      z.object({
        campaignName: z.string(),
        description: z.string().optional(),
        players: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {}),
});
