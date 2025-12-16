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
import { toast } from "sonner";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from "@repo/ui/utils/contants";
import { Spinner } from "@repo/ui/components/spinner";
import { authSchema } from "@repo/ui/validations/authSchema";
import { useStartPasswordResetMutation } from "@/libs/features/services/auth/authApi";

const ForgotPassword = () => {
  const [startPasswordReset, { isLoading }] = useStartPasswordResetMutation();
  const form = useForm<z.infer<typeof authSchema.emailOnly>>({
    resolver: zodResolver(authSchema.emailOnly),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema.emailOnly>) {
    await toast.promise(
      startPasswordReset(data)
        .unwrap()
        .then((res) => res),
      {
        loading: "Please wait, we’re sending a reset link...",
        success: (res) => {
          form.reset();
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
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter your registered email address below and we’ll send you a
              link to reset your password securely.
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
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
                        Send Reset Link
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

export default ForgotPassword;
