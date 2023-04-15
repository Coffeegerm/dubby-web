import { useSession } from "next-auth/react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex flex-row items-center justify-between p-6 text-gray-200">
      <h2 className="text-2xl">Dubby</h2>
      <div className="flex flex-row items-center gap-2">
        {sessionData && <Link href="/games">Games</Link>}
        <button
          className="rounded-full bg-white/10 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
};
