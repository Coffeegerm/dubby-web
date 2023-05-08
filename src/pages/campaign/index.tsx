import Link from "next/link";

import { GameCard } from "~/components/gameCard";
import { api } from "~/utils/api";

export default function Games() {
  const { data, isLoading } = api.campaigns.getMyGames.useQuery();

  return (
    <div className="flex flex-col gap-4 px-16">
      <div className="flex flex-1 flex-row items-center justify-between">
        <h1 className="text-3xl">Your Games</h1>
        <Link
          href="/games/create"
          className="rounded-full bg-white/10 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          Create New Game
        </Link>
      </div>
    </div>
  );
}
