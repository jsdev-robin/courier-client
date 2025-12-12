"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Field, FieldGroup } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { useFinish2FASetupMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import { Spinner } from "@repo/ui/components/spinner";
import { authSchema } from "@repo/ui/validations/authSchema";

const Finish2FASetup = ({
  token,
  setStep,
}: {
  token: string;
  setStep: React.Dispatch<
    React.SetStateAction<"scan" | "intro" | "verify" | "complete">
  >;
}) => {
  const [finish2FASetup, { isLoading }] = useFinish2FASetupMutation();
  const form = useForm<z.infer<typeof authSchema.finish2FASetup>>({
    resolver: zodResolver(authSchema.finish2FASetup),
    mode: "onChange",
    defaultValues: {
      totp: "",
    },
  });
  async function onSubmit(data: z.infer<typeof authSchema.finish2FASetup>) {
    await toast.promise(
      finish2FASetup({
        totp: data.totp,
        secret: token,
      })
        .unwrap()
        .then((res) => res),
      {
        loading: "Enabling 2FA",
        success: (res) => {
          form.reset();
          setStep("complete");
          return res?.message;
        },
        error: (err) => err?.data?.message,
      },
    );
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Verify Setup</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="max-w-xs mx-auto space-y-4">
                <FieldGroup>
                  <Field>
                    <FormField
                      control={form.control}
                      name="totp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verify the code from the app</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="000000"
                              maxLength={6}
                              required
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
                      {isLoading && <Spinner />}
                      Verify and Enable
                    </Button>
                  </Field>
                </FieldGroup>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Finish2FASetup;
