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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@repo/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";
import { RootState, useAppSelector } from "@/libs/features/store";
import { useVerifyMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Spinner } from "@repo/ui/components/spinner";
import {
  DEFAULT_SUCCESS_MESSAGE,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "@repo/ui/utils/contants";
import { authSchema } from "@repo/ui/validations/authSchema";

const Verify = () => {
  const { token } = useAppSelector((store: RootState) => store.auth);
  const [verify, { isLoading }] = useVerifyMutation();

  const form = useForm<z.infer<typeof authSchema.verify>>({
    resolver: zodResolver(authSchema.verify),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema.verify>) {
    await toast.promise(
      verify({
        otp: Number(data.otp),
        token: String(token),
      })
        .unwrap()
        .then((res) => {
          window.location.href = "/sign-in";
          return res;
        }),
      {
        loading: "Verifying your account...",
        success: (res) => res?.message || DEFAULT_SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  }

  return (
    <section className="flex min-h-svh w-full items-center justify-center">
      <div className="max-w-xs w-full">
        <Card>
          <CardHeader>
            <CardTitle>Enter verification code</CardTitle>
            <CardDescription>
              We sent a 6-digit code to your email.
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
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                              <InputOTP maxLength={6} id="otp" {...field}>
                                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              Enter the 6-digit code sent to your email.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Spinner />}
                        Verify
                      </Button>
                      <FieldDescription className="text-center">
                        Didn&apos;t receive the code?{" "}
                        <a href="/sign-up">Resend</a>
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

export default Verify;
