'use client';

import { useStartEmailChangeMutation } from '@/libs/features/services/auth/authApi';
import useUser from '@/store/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@repo/ui/components/field';
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
import EmailSecurityHighlights from './particles/EmailSecurityHighlights';

const StartEmailChange = () => {
  const [startEmailChange, { isLoading }] = useStartEmailChangeMutation();
  const user = useUser();
  const form = useForm<z.infer<typeof authSchema.startEmailChange>>({
    resolver: zodResolver(authSchema.startEmailChange),
    mode: 'onChange',
    defaultValues: {
      newEmail: '',
      confirmEmail: '',
      password: 'Passw0rd!',
    },
  });

  async function onSubmit(data: z.infer<typeof authSchema.startEmailChange>) {
    await toast.promise(
      startEmailChange(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Sending verification email...',
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
      <div className="container">
        <div className="space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/account/dashboard/settings/security">
                    Security
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Change email</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Email Address</CardTitle>
                      <CardDescription>
                        Update your email address to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FieldSet>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="currentEmail">
                              Current Email
                            </FieldLabel>
                            <Input
                              id="currentEmail"
                              type="email"
                              value={user?.personalInfo.email}
                              readOnly
                            />
                            <FieldDescription>
                              This is your currently registered email address
                            </FieldDescription>
                          </Field>
                          <Field>
                            <FormField
                              control={form.control}
                              name="newEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>New Email Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  <FormDescription>
                                    Enter the new email address you want to use
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </Field>
                          <Field>
                            <FormField
                              control={form.control}
                              name="confirmEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm New Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  <FormDescription>
                                    Re-enter your new email to confirm
                                  </FormDescription>
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
                                  <FormLabel>Current Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  <FormDescription>
                                    Verify your identity by entering your
                                    current password
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </Field>
                        </FieldGroup>
                      </FieldSet>
                    </CardContent>
                    <CardFooter className="gap-4">
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isLoading}
                      >
                        {isLoading && <Spinner />}
                        Update Email Address
                      </Button>
                      <Link
                        href="/account/dashboard/settings"
                        className={cn(
                          buttonVariants({ variant: 'destructive' }),
                        )}
                      >
                        Cancel
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
                <div className="lg:col-span-1">
                  <EmailSecurityHighlights />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default StartEmailChange;
