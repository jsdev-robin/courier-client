"use client";

import React, { useEffect } from "react";
import Heading from "@repo/ui/components/heading";
import Typography from "@repo/ui/components/typography";
import { Fingerprint } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import {
  useFinishPasskeysRegistrationMutation,
  useStartPasskeysRegistrationMutation,
} from "@/libs/features/services/auth/authApi";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from "@repo/ui/utils/contants";
import { toast } from "sonner";
import { startRegistration } from "@simplewebauthn/browser";
import { Spinner } from "@repo/ui/components/spinner";

const PasskeyRegister = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [startPasskeysRegistration, { data, isLoading }] =
    useStartPasskeysRegistrationMutation();
  const [finishPasskeysRegistration] = useFinishPasskeysRegistrationMutation();

  const handleStart = async () => {
    await toast.promise(
      startPasskeysRegistration()
        .unwrap()
        .then((res) => res),
      {
        loading: "Please wait...",
        success: (res) => res?.message || DEFAULT_SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  };

  useEffect(() => {
    if (data?.data) {
      const runRegistration = async () => {
        const registrationOptions = data.data;
        const attestationResponse = await startRegistration({
          optionsJSON: registrationOptions,
        });

        if (attestationResponse) {
          await toast.promise(
            finishPasskeysRegistration({
              credential: attestationResponse,
            }).unwrap(),
            {
              loading: "Completing registration...",
              success: (res) => {
                setStep(4);
                return res?.message || DEFAULT_SUCCESS_MESSAGE;
              },
              error: (err) =>
                err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
            },
          );
        }
      };
      runRegistration();
    }
  }, [data?.data, finishPasskeysRegistration, setStep]);
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <Heading as="h5" className="font-bold">
          Register Your Passkey
        </Heading>
        <Typography textColor="muted">
          Follow your device&apos;s prompts to complete setup
        </Typography>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 mx-auto">
              <Fingerprint className="w-10 h-10 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <CardTitle>Windows 10</CardTitle>
              <CardDescription className="text-center max-w-sm mx-auto">
                Click the button below and follow your device&apos;s
                authentication prompt
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button
              size="lg"
              className="w-full"
              onClick={handleStart}
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              <Fingerprint />
              Register Passkey
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(2)}
              className="w-full"
            >
              Back
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Your device will prompt you to authenticate</p>
              <p>• Use your fingerprint, face, or PIN</p>
              <p>• Your passkey will be securely stored</p>
              <p>• You can use it to sign in instantly</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasskeyRegister;
