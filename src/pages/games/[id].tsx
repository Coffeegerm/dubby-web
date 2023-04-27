import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

export default function Game() {
  // if i were to get the param from the url in nextjs i would
  // use the useRouter hook
  const router = useRouter();
  const { id } = router.query;

  const { data: sessionData } = useSession();

  const { data: game } = api.games.getOne.useQuery(
    { id: id as string }, // no input
    { enabled: id !== "-1" }
  );

  return (
    <div>
      <h1>Game</h1>
    </div>
  );
}
