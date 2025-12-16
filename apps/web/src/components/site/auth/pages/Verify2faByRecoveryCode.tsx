"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Field, FieldGroup, FieldSet } from "@repo/ui/components/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { useVerifyBackupCodeMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import {
  DEFAULT_SUCCESS_MESSAGE,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "@repo/ui/utils/contants";
import { Spinner } from "@repo/ui/components/spinner";
import { authSchema } from "@repo/ui/validations/authSchema";

const Verify2faByRecoveryCode = () => {
  const [verifyBackupCode, { isLoading }] = useVerifyBackupCodeMutation();
  const form = useForm<z.infer<typeof authSchema.verify2FARecovery>>({
    resolver: zodResolver(authSchema.verify2FARecovery),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });
  async function onSubmit(data: z.infer<typeof authSchema.verify2FARecovery>) {
    await toast.promise(
      verifyBackupCode(data)
        .unwrap()
        .then((res) => res),
      {
        loading: "Verifying your identity...",
        success: (res) => {
          window.location.href = "/account/dashboard/overview";
          return res?.message || DEFAULT_SUCCESS_MESSAGE;
        },
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  }

  return (
    <section className="flex min-h-svh w-full items-center justify-center">
      <div className="max-w-xs w-full">
        <Card>
          <CardHeader>
            <CardTitle>Login with Recovery Code</CardTitle>
            <CardDescription>
              Can&apos;t access your authentication app? Use a backup recovery
              code to securely log in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter your recovery code</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="XXXX-XXXX"
                                className="text-center tracking-widest"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Spinner />}Verify
                      </Button>
                    </Field>
                    <Field>
                      <Link
                        href="/sessions/verify-2fa/app"
                        className={cn(
                          buttonVariants({ variant: "destructive" }),
                        )}
                      >
                        Use 2FA app instead
                      </Link>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Verify2faByRecoveryCode;
