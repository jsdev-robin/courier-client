"use client";

import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@repo/ui/components/item";
import { MessageSquare, ShieldCheck, Smartphone } from "lucide-react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import useUser from "@/store/useUser";
import { useRemove2faMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from "@repo/ui/utils/contants";

const TwoFactorMethods = () => {
  const user = useUser();
  const [remove2fa, { isLoading }] = useRemove2faMutation();

  const handleRemove2FA = async () => {
    await toast.promise(remove2fa().unwrap(), {
      loading: "Removing 2FA securely...",
      success: (res) => res?.message || DEFAULT_SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <section>
      <div className="wrapper">
        <Card>
          <CardHeader>
            <CardTitle>Two-factor Authentication</CardTitle>
            <CardDescription>
              Add an additional layer of security by requiring at least two
              methods of authentication to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ItemGroup className="border border-border rounded-xl">
              <Item>
                <ItemMedia variant="icon">
                  <Smartphone />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    Authenticator app
                    {user?.authentication.twoFA.enabled && (
                      <Badge className="bg-green-600/25 text-green-500 border-green-500">
                        Configured
                      </Badge>
                    )}
                  </ItemTitle>
                  <ItemDescription>
                    Use an authentication app or browser extension to get
                    two-factor authentication codes when prompted.
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  {user?.authentication.twoFA.enabled ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleRemove2FA}
                    >
                      {isLoading ? "Removing..." : "Remove"}
                    </Button>
                  ) : (
                    <Link
                      href="/account/dashboard/settings/security/two-factor"
                      className={cn(
                        buttonVariants({ size: "sm", variant: "outline" }),
                      )}
                    >
                      Add
                    </Link>
                  )}
                </ItemActions>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <MessageSquare />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Passkeys</ItemTitle>
                  <ItemDescription>
                    You can use the same passkeys you use for login as a second
                    factor of authentication.
                  </ItemDescription>
                </ItemContent>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <ShieldCheck />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Security keys</ItemTitle>
                  <ItemDescription>
                    Security keys are webauthn credentials that can only be used
                    as a second factor of authentication.
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Link
                    href="/account/dashboard/settings/security/recovery-codes"
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                    )}
                  >
                    View
                  </Link>
                </ItemActions>
              </Item>
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TwoFactorMethods;
