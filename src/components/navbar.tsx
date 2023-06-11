import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "primereact/button";

export const Navbar = () => {
  return (
    <div className="flex bg-gray-900">
      <nav className="flex flex-1 flex-col flex-wrap justify-between p-5">
        <div className="flex flex-shrink-0 flex-col gap-6 text-white ">
          <Link href="/dashboard">
            <span className="text-2xl font-semibold tracking-tight hover:text-gray-400">
              Dubby
            </span>
          </Link>
          <div className="flex flex-col gap-3">
            <Link href="/campaign">
              <p className="text-white hover:text-gray-400">Campaigns</p>
            </Link>
          </div>
        </div>

        <Button
          label="Logout"
          className="self-end"
          onClick={() => {
            signOut({
              callbackUrl: `${window.location.origin}`,
            }).catch(console.error);
          }}
        />
      </nav>
    </div>
  );
};
