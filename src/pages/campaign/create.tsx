import { useRouter } from "next/router";

import { CampaignForm } from "~/components/campaign/campaign-form";

export default function CreateGame() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 p-8">
      <h1 className="text-2xl text-white">Create New Campaign</h1>
      <p className="text-lg text-white">
        Where will you and your adventurers go? What will you see? What dangers
        await you around the next corner?
      </p>
      <CampaignForm
        onSuccess={(data) => {
          // navigate to the new campaign's page
          router.push(`/campaign/${data.id}`).catch(console.error);
        }}
      />
    </div>
  );
}
