import { type Game } from "@prisma/client";

import { Card } from "./card";

export const GameCard = ({ game }: { game: Game }) => {
  return <Card title={game.campaignName} containerClassName="cursor-pointer" />;
};
