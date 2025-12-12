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
import { Field, FieldGroup, FieldSet } from "@repo/ui/components/field";
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
import { Checkbox } from "@repo/ui/components/checkbox";
import Link from "next/link";
import { Spinner } from "@repo/ui/components/spinner";
import { authSchema } from "@repo/ui/validations/authSchema";
import { useSigninMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from "@repo/ui/utils/contants";
import PasskeySignIn from "./particles/PasskeySignIn";

const SignIn = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const form = useForm<z.infer<typeof authSchema.signin>>({
    resolver: zodResolver(authSchema.signin),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "Passw0rd!",
      remember: false,
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema.signin>) {
    await toast.promise(
      signin(data)
        .unwrap()
        .then((res) => res),
      {
        loading: "Signing in...",
        success: (res) => {
          if (res.data.enable2fa) {
            window.location.href = "/sessions/verify-2fa/app";
          } else {
            window.location.href = "/account/dashboard/overview";
          }
          return res?.message || DEFAULT_SUCCESS_MESSAGE;
        },
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="container max-w-md flex justify-center">
        <div className="flex flex-col gap-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Securely access your account using Google or Passkey
                authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-7 w-full">
              <PasskeySignIn />
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
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center">
                          <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-3">
                                <FormControl>
                                  <Checkbox
                                    id="remember"
                                    checked={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel htmlFor="remember">
                                  Remember me
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          <Link
                            href="/forgot-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                      </Field>
                      <Field>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading && <Spinner />}
                          Sing in
                        </Button>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
