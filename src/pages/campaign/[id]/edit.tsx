import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

import { CampaignForm } from "~/components/campaign/campaign-form";
import { api } from "~/utils/api";

export default function EditCampaign() {
  const router = useRouter();

  const { id } = router.query;

  const { isLoading, data, isError } = api.campaigns.getOne.useQuery(
    Number(id)
  );

  return (
    <div className="flex flex-col gap-3 p-8">
      {isLoading ? (
        <ClipLoader className="self-center bg-white" />
      ) : !data ? (
        <>
          <h1>Looks like we hit a snag, try again later.</h1>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-white">Edit Campaign</h1>
          <CampaignForm
            campaign={data}
            onSuccess={({ id }) => {
              router.replace(`/campaign/${id}`).catch(console.error);
            }}
          />
        </>
      )}
    </div>
  );
}
