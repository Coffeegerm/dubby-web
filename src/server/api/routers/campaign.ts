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

  create: protectedProcedure
    .input(
      z.object({
        campaignName: z.string(),
        description: z.string().optional(),
        players: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { campaignName, description, players } = input;
      // TODO playrs can be added
      const campaign = await ctx.prisma.campaign.create({
        data: {
          name: campaignName,
          description: description || "",
          dungeonMasterId: ctx.session.user.id,
        },
      });
      return campaign;
    }),
});
