"use client";

import React from "react";
import { useParams } from "next/navigation";
import FinishEmailChange from "@/components/site/panel/dashboard/pages/settings/email/FinishEmailChange";

const FinishEmailChangePage = () => {
  const { token } = useParams<{ token: string }>();

  return (
    <>
      <FinishEmailChange token={token} />
    </>
  );
};

export default FinishEmailChangePage;
