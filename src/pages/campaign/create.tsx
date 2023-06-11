import { type Campaign } from "@prisma/client";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";

export default function CreateGame() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<{
    campaignName: string;
    description?: string;
  }>({
    mode: "onChange",
  });

  const { mutate, isLoading, isError, error } =
    api.campaigns.create.useMutation<Campaign>({
      onSuccess: async (data) => {
        console.log({ data });
        // navigate to the new campaign's page
        await router.push(`/campaign/${data.id}`);
      },
    });

  return (
    <div className="flex flex-col gap-3 p-8">
      <h1 className="text-2xl text-white">Create New Campaign</h1>
      <p className="text-lg text-white">
        Where will you and your adventurers go? What will you see? What dangers
        await you around the next corner?
      </p>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => {
          mutate({
            campaignName: data.campaignName,
            description: data.description,
          });
        })}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="campaignName" className="text-white">
            Name
          </label>
          <InputText
            type="text"
            {...register("campaignName", { required: true })}
            placeholder="Journey to the Underworld"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-white">
            Description
          </label>
          <InputTextarea
            {...register("description")}
            placeholder="A place dark and full of terrors"
          />
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={!formState.isValid}
          label="Create"
        />
      </form>
    </div>
  );
}
