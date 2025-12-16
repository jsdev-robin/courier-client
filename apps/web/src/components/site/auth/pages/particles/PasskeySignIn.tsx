"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/button";
import { Fingerprint } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
  useFinishPasskeysAuthenticationMutation,
  useStartPasskeysAuthenticationMutation,
} from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import { startAuthentication } from "@simplewebauthn/browser";
import { Spinner } from "@repo/ui/components/spinner";
import { authSchema } from "@repo/ui/validations/authSchema";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from "@repo/ui/utils/contants";
import { Field, FieldGroup, FieldSet } from "@repo/ui/components/field";

const PasskeySignIn = () => {
  const [startPasskeysAuthentication, { data, isLoading }] =
    useStartPasskeysAuthenticationMutation();
  const [finishPasskeysAuthentication] =
    useFinishPasskeysAuthenticationMutation();

  const form = useForm<z.infer<typeof authSchema.emailOnly>>({
    resolver: zodResolver(authSchema.emailOnly),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema.emailOnly>) {
    await toast.promise(
      startPasskeysAuthentication(data)
        .unwrap()
        .then((res) => res),
      {
        loading: "Checking your email… Please wait a moment.",
        success: (res) => res?.message || DEFAULT_SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  }

  useEffect(() => {
    if (data?.data) {
      const runAuthencation = async () => {
        const { options, email } = data.data;
        const attestationResponse = await startAuthentication({
          optionsJSON: options,
        });

        if (attestationResponse) {
          await toast.promise(
            finishPasskeysAuthentication({
              credential: attestationResponse,
              email: email,
            }).unwrap(),
            {
              loading: "Completing passkey authentication… Almost done!",
              success: (res) => {
                window.location.href = "/account/dashboard/overview";
                return res?.message || DEFAULT_SUCCESS_MESSAGE;
              },
              error: (err) =>
                err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
            },
          );
        }
      };
      runAuthencation();
    }
  }, [data?.data, finishPasskeysAuthentication]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <Fingerprint />
          Sign in with Passkey
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Secure Passkey Sign-In</DialogTitle>
          <DialogDescription>
            Sign in quickly and safely using a passkey. No passwords are
            required—just your secure device authentication. Passkeys provide
            stronger security and a faster login experience.
          </DialogDescription>
        </DialogHeader>
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Spinner />}
                    Continue with Passkey
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PasskeySignIn;
