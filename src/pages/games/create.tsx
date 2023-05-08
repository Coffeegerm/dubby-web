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

  const { mutate, isLoading, isError, error } = api.games.create.useMutation({
    onSuccess: async (data) => {
      data.game.id && (await router.push(`/games/${data.game.id}`));
    },
  });

  return (
    <div className="p-8">
      <h1>Create New Game</h1>
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
          <label htmlFor="campaignName">Name</label>
          <InputText
            type="text"
            {...register("campaignName", { required: true })}
            placeholder="Journey to the Underworld"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
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
