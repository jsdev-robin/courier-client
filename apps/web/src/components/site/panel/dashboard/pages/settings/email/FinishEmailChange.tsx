'use client';

import { useFinishEmailChangeMutation } from '@/libs/features/services/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Field, FieldGroup, FieldSet } from '@repo/ui/components/field';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Spinner } from '@repo/ui/components/spinner';
import { cn } from '@repo/ui/lib/utils';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { authSchema } from '@repo/ui/validations/authSchema';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FinishEmailChange = ({ token }: { token: string }) => {
  const [finishEmailChange, { isLoading }] = useFinishEmailChangeMutation();
  const form = useForm<z.infer<typeof authSchema.finishEmailChange>>({
    resolver: zodResolver(authSchema.finishEmailChange),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema.finishEmailChange>) {
    await toast.promise(
      finishEmailChange({
        code: data.code,
        token: token,
      })
        .unwrap()
        .then((res) => res),
      {
        loading: 'Updating your email...',
        success: (res) => {
          form.reset();
          window.location.href = '/account/dashboard/settings/emails';
          return res?.message || DEFAULT_SUCCESS_MESSAGE;
        },
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  }

  return (
    <section>
      <div className="container max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 min-h-svh items-center justify-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Change Email</CardTitle>
                  <CardDescription>
                    You are about to change your account email. For security
                    reasons, we need to verify that you have access to your
                    current email address.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldSet>
                    <FieldGroup>
                      <Field>
                        <FormField
                          control={form.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OTP</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="OTP"
                                  type="text"
                                  placeholder="Enter OTP"
                                  required
                                />
                              </FormControl>
                              <FormMessage />
                              <FormDescription>
                                Enter the one-time code we sent to your old
                                email. Keep this code private. If you can’t
                                access your old email, contact our support team
                                for help.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4">
                  <Link
                    href="/account/dashboard/settings/emails"
                    className={cn(buttonVariants({ variant: 'destructive' }))}
                  >
                    Cancel
                  </Link>
                  <Button disabled={isLoading}>
                    {isLoading && <Spinner />}Change Email
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default FinishEmailChange;
