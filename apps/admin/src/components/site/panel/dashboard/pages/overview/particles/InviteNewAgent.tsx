'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAgentInvitenMutation } from '@/libs/features/services/auth/authApi';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Spinner } from '@repo/ui/components/spinner';
import { toast } from 'sonner';

const isEmail = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

const InviteNewAgent = () => {
  const [agentInviten, { isLoading }] = useAgentInvitenMutation();
  const form = useForm<z.infer<typeof isEmail>>({
    resolver: zodResolver(isEmail),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof isEmail>) {
    await toast.promise(
      agentInviten(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Inviting...',
        success: (res) => {
          form.reset();
          return res?.message;
        },
        error: (err) => err?.data?.message,
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new agent</CardTitle>
        <CardDescription>
          Add a new delivery agent by entering their email address below. The
          agent will be invited to join the system and manage assigned parcels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter agent's email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading}>
                {isLoading && <Spinner />}
                Create a new agent
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InviteNewAgent;
