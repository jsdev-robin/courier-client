import React from "react";
import { redirect } from "next/navigation";
import sessionAccessLayer from "@/dal/sessionAccessLayer";

const Layout2Fa = async ({ children }: { children: React.ReactNode }) => {
  const session = await sessionAccessLayer();

  if (!session) {
    return redirect("/sign-in");
  }

  return <>{children}</>;
};

export default Layout2Fa;
