'use client';

import {
  useSpyPasskeysQuery,
  useUnregisterPasskeyMutation,
} from '@/libs/features/services/auth/authApi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/alert-dialog';
import { Badge } from '@repo/ui/components/badge';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@repo/ui/components/empty';
import Heading from '@repo/ui/components/heading';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import Typography from '@repo/ui/components/typography';
import { cn } from '@repo/ui/lib/utils';
import { DEFAULT_SERVER_ERROR_MESSAGE } from '@repo/ui/utils/contants';
import { format, formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const PasskeyDeviceManager = () => {
  const { data } = useSpyPasskeysQuery();
  const [unregisterPasskey, { isLoading }] = useUnregisterPasskeyMutation();

  const handleUnregisterPasskey = async (id: string) => {
    await toast.promise(unregisterPasskey(id).unwrap(), {
      loading: 'Removing device securely...',
      success: 'Device removed successfully.',
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <section>
      <div className="container max-w-4xl">
        <div className="space-y-4">
          <div className="space-y-4">
            <Heading as="h5" className="font-bold text-balance">
              Registered Devices
            </Heading>
            <Typography textColor="muted" className="text-pretty">
              Manage all devices that can access your account with passkeys
            </Typography>
          </div>
          <ItemGroup className="gap-4">
            {data?.data.passkeys.length ? (
              data?.data.passkeys.map((item, index) => (
                <Item
                  key={index}
                  variant="outline"
                  className="bg-card border-border hover:border-primary cursor-pointer transition-colors group"
                >
                  <ItemMedia
                    variant="image"
                    className="bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
                  >
                    <CheckCircle2 className="text-primary" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="capitalize">
                      {item.formFactor}
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        <CheckCircle2 />
                        Primary
                      </Badge>
                    </ItemTitle>
                    <ItemDescription className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">
                        Last used:{' '}
                        <span className="text-foreground">
                          {formatDistanceToNow(new Date(item.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Registered:{' '}
                        <span className="text-foreground">
                          {format(new Date(item.createdAt), 'MMM d, yyyy')}
                        </span>
                      </span>
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Passkey Device?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove the selected device from your
                            account. You will no longer be able to use this
                            passkey to log in. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleUnregisterPasskey(item._id);
                            }}
                            disabled={isLoading}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </ItemActions>
                </Item>
              ))
            ) : (
              <Empty className="w-full">
                <EmptyHeader>
                  <EmptyTitle>No Devices Registered Yet!</EmptyTitle>
                  <EmptyDescription>
                    It looks like you haven’t added any passkey devices yet.
                    Secure your account by registering your devices. Once added,
                    you can manage or remove them anytime from here.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Link
                    href="/account/dashboard/settings/security/trusted-device/setup?return_to=/settings/security"
                    className={cn(buttonVariants({}))}
                  >
                    Add Passkeys
                  </Link>
                </EmptyContent>
              </Empty>
            )}
          </ItemGroup>
          <Card>
            <CardHeader>
              <CardTitle>Security Tips</CardTitle>
              <CardDescription>Keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Register multiple devices as backup options</p>
                <p>• Remove devices you no longer use or have access to</p>
                <p>• Keep your device&apos;s operating system up to date</p>
                <p>• Never share your device&apos;s biometric authentication</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PasskeyDeviceManager;
