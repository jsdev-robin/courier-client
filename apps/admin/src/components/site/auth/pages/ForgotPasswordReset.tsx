"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@repo/ui/components/field";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { useFinishPasswordResetMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from "@repo/ui/utils/contants";
import { Spinner } from "@repo/ui/components/spinner";
import { authSchema } from "@repo/ui/validations/authSchema";

interface ForgotPasswordResetProps {
  token: string;
}

const ForgotPasswordReset: React.FC<ForgotPasswordResetProps> = ({ token }) => {
  const [finishPasswordReset, { isLoading }] = useFinishPasswordResetMutation();

  const form = useForm<z.infer<typeof authSchema.finishPasswordReset>>({
    resolver: zodResolver(authSchema.finishPasswordReset),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(
    data: z.infer<typeof authSchema.finishPasswordReset>,
  ) {
    await toast.promise(
      finishPasswordReset({ ...data, token: token })
        .unwrap()
        .then((res) => res),
      {
        loading: "Updating your password...",
        success: (res) => {
          window.location.href = "/sign-in";
          return res?.message || DEFAULT_SUCCESS_MESSAGE;
        },
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  }
  return (
    <section>
      <div className="container max-w-md w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
            <CardDescription>
              Choose a strong, secure password to protect your account. Enter
              your new password below and confirm it to complete the reset
              process.
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
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm new password</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Spinner />}
                        Reset Password
                      </Button>
                    </Field>
                    <Field>
                      <FieldDescription className="text-center">
                        Remembered your password? <a href="/sign-in">Sign up</a>
                      </FieldDescription>
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

export default ForgotPasswordReset;
