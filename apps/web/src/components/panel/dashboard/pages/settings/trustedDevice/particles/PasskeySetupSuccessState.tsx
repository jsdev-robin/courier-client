"use client";

import { CheckCircle2 } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { buttonVariants } from "@repo/ui/components/button";

import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";

const PasskeySetupSuccessState = () => {
  return (
    <div className="space-y-4 text-center">
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader>
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary mb-6 animate-in zoom-in duration-300 mx-auto">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold">
              Passkey Registered!
            </CardTitle>
            <CardDescription className="max-w-md mx-auto text-base">
              Your device wwe has been successfully registered. You can now use
              it to sign in securely.
            </CardDescription>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <Link
            href="/account/dashboard/settings/security/trusted-device/devices"
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            View All Devices
          </Link>

          <Link
            href="/account/dashboard/settings/security"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full",
            )}
          >
            Back to Dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasskeySetupSuccessState;
