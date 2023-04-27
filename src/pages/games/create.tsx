import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";

export default function CreateGame() {
  const { register, handleSubmit, formState } = useForm<{ name: string }>({
    mode: "onChange",
  });

  return (
    <div className="p-8">
      <h1>Create New Game</h1>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => {
          console.log({ data });
        })}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <InputText
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Journey to the Underworld"
          />
        </div>
        <Button type="submit" loading={false} disabled={!formState.isValid}>
          Create!
        </Button>
      </form>
    </div>
  );
}
