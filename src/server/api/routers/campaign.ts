import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  getMyGames: protectedProcedure.query(async ({ ctx }) => {
    const ownedCampaigns = await ctx.prisma.campaign.findMany({
      where: { dungeonMasterId: ctx.session.user.id },
    });
    // TODO add player campaigns
    return { ownedCampaigns };
  }),

  getOne: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const campaign = await ctx.prisma.campaign.findUnique({
      where: { id: input },
    });
    return campaign;
  }),

  upsert: protectedProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        description: z.string().optional(),
        players: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, players } = input;
      // TODO playrs can be added
      const campaign = await ctx.prisma.campaign.upsert({
        create: {
          name,
          description: description || "",
          dungeonMasterId: ctx.session.user.id,
        },
        where: {
          id: id || undefined,
        },
        update: {
          name,
          description: description || "",
        },
      });
      return campaign;
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const campaign = await ctx.prisma.campaign.delete({
        where: { id: input },
      });
      return campaign;
    }),
});
