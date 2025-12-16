"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { ChevronLeft } from "lucide-react";
import MainLogo from "../../../ui/main-logo";

const AuthHeader = () => {
  const router = useRouter();

  return (
    <header className="border-b border-border h-14">
      <div className="container h-full">
        <div className="relative w-full h-full flex items-center justify-between">
          <div className="md:hidden">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ChevronLeft />
              <span className="sr-only">Back Button</span>
            </Button>
          </div>
          <div className="hidden md:flex">
            <MainLogo />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
