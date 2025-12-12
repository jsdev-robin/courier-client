import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import Link from "next/link";
import { ArrowRight, Key, Smartphone } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { buttonVariants } from "@repo/ui/components/button";

const PasskeySetupCard = () => {
  return (
    <Card className="self-start">
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>
          Set up your first passkey in just a few steps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Link
            href="/account/dashboard/settings/security/trusted-device/setup/?return_to=/settings/security"
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            <Key />
            Create New Passkey
            <ArrowRight />
          </Link>
          <Link
            href="/account/dashboard/settings/security/trusted-device/devices"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full",
            )}
          >
            <Smartphone />
            Manage Devices
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasskeySetupCard;
