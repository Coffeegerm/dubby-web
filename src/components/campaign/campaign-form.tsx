import { type Campaign } from "@prisma/client";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";

export const CampaignForm = ({
  onSuccess,
  campaign,
}: {
  campaign?: Campaign;
  onSuccess?: (data: Campaign) => void;
}) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { register, handleSubmit, formState } = useForm<Campaign>({
    mode: "onChange",
    defaultValues: {
      name: campaign?.name,
      description: campaign?.description,
    },
  });

  const { mutate, isLoading, isError, error } =
    api.campaigns.upsert.useMutation<Campaign>({
      onSuccess,
    });

  const { mutate: deleteCampaign, isLoading: isDeleting } =
    api.campaigns.delete.useMutation<Campaign>({
      onSuccess: () => {
        router.replace("/campaign").catch(console.error);
      },
    });

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => {
        mutate({
          id: campaign?.id,
          name: data.name,
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
          {...register("name", { required: true })}
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
        disabled={!formState.isValid || !formState.isDirty}
        label={campaign ? "Save" : "Create"}
      />

      {campaign?.id && (
        <Button
          type="button"
          label="Delete"
          severity="danger"
          disabled={isLoading || isDeleting}
          onClick={() => {
            setShowDeleteDialog(true);
          }}
        />
      )}
      <Dialog
        visible={showDeleteDialog}
        onHide={() => {
          setShowDeleteDialog(false);
        }}
      >
        <div className="flex flex-col gap-4">
          <h1>Are you sure you want to delete this campaign?</h1>
          <p>Once deleted, it cannot be recovered.</p>
          <Button
            type="button"
            label="Yes"
            severity="danger"
            loading={isDeleting}
            onClick={() => {
              if (!campaign?.id) return;
              deleteCampaign(campaign.id);
            }}
          />
          <Button severity="info" label="No" disabled={isDeleting} />
        </div>
      </Dialog>
    </form>
  );
};
