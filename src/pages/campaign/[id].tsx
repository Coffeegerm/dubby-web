import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

import { api } from "~/utils/api";

export default function Game() {
  const router = useRouter();

  const { isLoading, data } = api.campaigns.getOne.useQuery(
    router.query.id as string
  );

  if (isLoading) return <ClipLoader color="white" className="self-center" />;

  return (
    <div>
      <h1>Campaign</h1>
    </div>
  );
}
