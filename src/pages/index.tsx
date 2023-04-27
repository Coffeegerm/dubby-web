import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h3 className="text-2xl text-white sm:text-[2rem]">
          You and your friends newest companion in your DnD journeys!
        </h3>
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
      </div>
    </main>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
    </div>
  );
};
