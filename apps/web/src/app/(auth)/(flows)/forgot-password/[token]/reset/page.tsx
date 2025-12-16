import React from "react";
import ForgotPasswordReset from "@/components/site/auth/pages/ForgotPasswordReset";

interface ForgotPasswordResetPageProps {
  params: Promise<{
    token: string;
  }>;
}

const ForgotPasswordResetPage = async ({
  params,
}: ForgotPasswordResetPageProps) => {
  const { token } = await params;

  return (
    <>
      <ForgotPasswordReset token={token} />
    </>
  );
};

export default ForgotPasswordResetPage;
