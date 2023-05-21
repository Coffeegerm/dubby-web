import { useSession } from "next-auth/react";
import { type PropsWithChildren } from "react";

import { Navbar } from "./navbar";

export const Layout = ({ children }: PropsWithChildren<object>) => {
  const { data: session } = useSession();
  return (
    <div className="flex min-h-screen flex-1 flex-row bg-gray-800 text-white">
      {session?.user && <Navbar />}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
