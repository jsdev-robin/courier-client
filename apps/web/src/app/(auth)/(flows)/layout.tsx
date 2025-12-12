import React from "react";
import AuthHeader from "@/components/site/auth/layouts/AuthHeader";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthHeader />
      <main className="py-3 md:py-6 lg:py-12">{children}</main>
    </>
  );
};

export default AuthLayout;
