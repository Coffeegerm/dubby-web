import Link from "next/link";
import { Button } from "primereact/button";

import { api } from "~/utils/api";

export default function Games() {
  const { data, isLoading } = api.campaigns.getMyGames.useQuery();

  return (
    <div className="flex flex-col gap-4 px-16 pt-4">
      <div className="flex flex-1 flex-row items-center justify-between">
        <h1 className="text-3xl text-white">Campaigns</h1>
        <Link href="/campaign/create">
          <Button
            label="Create new campaign!"
            className="p-button-rounded p-button-raised"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl text-white">Your Campaigns</h2>
        <div className="flex flex-row flex-wrap gap-2">
          {data?.ownedCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="surface-0 border-rounded flex flex-1 rounded p-2"
            >
              <Link href={`campaign/${campaign.id}`}>
                <h2>{campaign.name}</h2>
                <p>{campaign.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
