import { type NextPage } from "next";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Button } from "primereact/button";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { replace } = useRouter();

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h3 className="text-2xl text-white sm:text-[2rem]">
          You and your friends newest companion in your DnD journeys!
        </h3>
        <Button
          onClick={() => {
            if (session?.user) {
              replace("/dashboard").catch(console.error);
            } else {
              signIn().catch(console.error);
            }
          }}
          label={session?.user ? "Go to Dashboard" : "Sign In"}
        />
      </div>
    </main>
  );
};

export default Home;
