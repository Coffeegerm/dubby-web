import { type PropsWithChildren } from "react";

import { Header } from "./header";

export const Layout = ({ children }: PropsWithChildren<object>) => {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-gray-900 text-white">
      <Header />
      {children}
    </div>
  );
};
