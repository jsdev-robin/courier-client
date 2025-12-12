"use client";

import React from "react";
import SignInMethods from "@/components/site/panel/dashboard/pages/settings/security/SignInMethods";
import TwoFactorMethods from "@/components/site/panel/dashboard/pages/settings/security/TwoFactorMethods";

const SecurityPage = () => {
  return (
    <>
      <SignInMethods />
      <TwoFactorMethods />
    </>
  );
};

export default SecurityPage;
