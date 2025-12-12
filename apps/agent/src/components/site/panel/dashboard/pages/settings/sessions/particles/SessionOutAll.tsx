"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { LogOut } from "lucide-react";
import { useSignoutAllSessionMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from "@repo/ui/utils/contants";
import { Spinner } from "@repo/ui/components/spinner";

const SessionOutAll = () => {
  const [signoutAllSession, { isLoading }] = useSignoutAllSessionMutation();

  const handleAllSessionOut = async () => {
    await toast.promise(signoutAllSession().unwrap(), {
      loading: "Signing out from all devices...",
      success: (res) => res?.message || DEFAULT_SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };
  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleAllSessionOut}
      disabled={isLoading}
    >
      {isLoading && <Spinner />}
      <LogOut />
      Sign Out All
    </Button>
  );
};

export default SessionOutAll;
