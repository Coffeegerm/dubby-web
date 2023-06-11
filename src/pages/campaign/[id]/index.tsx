import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button } from "primereact/button";
import ClipLoader from "react-spinners/ClipLoader";

import { api } from "~/utils/api";

export default function Game() {
  const router = useRouter();
  const { data: session } = useSession();

  const { isLoading, data, isError } = api.campaigns.getOne.useQuery(
    Number(router.query.id)
  );

  const isDungeonMaster = data?.dungeonMasterId === session?.user?.id;

  if (isLoading) return <ClipLoader color="white" className="self-center" />;

  if (isError || !data)
    return <div>Uh Oh, we hit a snag. Try again later.</div>;

  return (
    <div className="flex flex-col gap-3 px-16 py-12 text-white">
      <div className="flex justify-between">
        <h1 className="text-4xl text-white">{data?.name}</h1>
        {isDungeonMaster && (
          <Link href={`/campaign/${data?.id}/edit`}>
            <Button label="Edit" className="p-button-rounded p-button-raised" />
          </Link>
        )}
      </div>
      <p>{data?.description}</p>
    </div>
  );
}
