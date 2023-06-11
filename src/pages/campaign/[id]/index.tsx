import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ClipLoader from "react-spinners/ClipLoader";

import { api } from "~/utils/api";

export default function Game() {
  const router = useRouter();
  const { data: session } = useSession();

  const { isLoading, data } = api.campaigns.getOne.useQuery(
    Number(router.query.id)
  );

  const isDungeonMaster = data?.dungeonMasterId === session?.user?.id;

  if (isLoading) return <ClipLoader color="white" className="self-center" />;

  return (
    <div>
      <h1>{isDungeonMaster && "Your "}Campaign</h1>
      <p>{data?.name}</p>
    </div>
  );
}
