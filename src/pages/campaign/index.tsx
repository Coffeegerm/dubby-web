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
          <Button label="Create new campaign!" />
        </Link>
      </div>

      <div>
        <p>Your Campaigns</p>
        {data?.ownedCampaigns.map((campaign) => (
          <div key={campaign.id}>
            <Link href={`campaign/${campaign.id}`}>
              <h2>{campaign.name}</h2>
            </Link>
          </div>
        ))}
      </div>

      <div>
        <p>Other Campaigns</p>
      </div>
    </div>
  );
}
