'use client';

import { useDisconnectOauthMutation } from '@/libs/features/services/auth/authApi';
import useUser from '@/store/useUser';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@repo/ui/components/item';
import {
  Discord,
  Facebook,
  Github,
  Google,
  XformerlyTwitter,
} from '@repo/ui/icons/index';
import { cn } from '@repo/ui/lib/utils';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { Mail, RectangleEllipsis, UserLock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

const oauthProviders = [
  { name: 'Google', key: 'google', icon: <Google /> },
  { name: 'Github', key: 'github', icon: <Github /> },
  { name: 'Facebook', key: 'facebook', icon: <Facebook /> },
  { name: 'Discord', key: 'discord', icon: <Discord /> },
  { name: 'Twitter', key: 'twitter', icon: <XformerlyTwitter /> },
];

const SignInMethods = () => {
  const user = useUser();
  const [disconnectOauth, { isLoading }] = useDisconnectOauthMutation();

  const handleDisconnect = async (provider: string, email: string) => {
    toast.promise(disconnectOauth({ provider, email }).unwrap(), {
      loading: `Disconnecting ${provider}...`,
      success: () => {
        return (
          `Successfully disconnected ${provider}` || DEFAULT_SUCCESS_MESSAGE
        );
      },
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Sign-in Methods</CardTitle>
            <CardDescription>
              Customize how you access your account. Link your Git profiles and
              set up passkeys for seamless, secure authentication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ItemGroup className="border border-border rounded-xl">
              <Item>
                <ItemMedia variant="icon">
                  <Mail />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Email</ItemTitle>
                  <ItemDescription>{user?.personalInfo.email}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Link
                    href="/account/dashboard/settings/emails"
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                    )}
                  >
                    Manage
                  </Link>
                </ItemActions>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <RectangleEllipsis />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Password</ItemTitle>
                  <ItemDescription>Configured</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Link
                    href="/account/dashboard/settings/security/password-change"
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                    )}
                  >
                    Change password
                  </Link>
                </ItemActions>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <UserLock />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Passkeys</ItemTitle>
                  <ItemDescription>
                    Passwordless sign-in with biometrics or security keys
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Link
                    href="/account/dashboard/settings/security/trusted-device"
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                    )}
                  >
                    Add passkey
                  </Link>
                </ItemActions>
              </Item>
              <ItemSeparator />
              {oauthProviders.map((provider, i) => {
                const account = user?.authentication?.oauth?.find(
                  (p) => p.provider === provider.key,
                );
                return (
                  <React.Fragment key={provider.key}>
                    <Item>
                      <ItemMedia variant="icon">{provider.icon}</ItemMedia>
                      <ItemContent>
                        <ItemTitle>{provider.name}</ItemTitle>
                        <ItemDescription>
                          Sign in with your {provider.name} account
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        {account ? (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleDisconnect(provider.key, account.email)
                            }
                            disabled={isLoading}
                          >
                            Disconnect
                          </Button>
                        ) : (
                          <Link
                            href={`http://localhost:8001/api/v1/auth/seller/connect/${provider.key}`}
                            className={cn(
                              buttonVariants({
                                size: 'sm',
                                variant: 'outline',
                              }),
                            )}
                          >
                            Connect
                          </Link>
                        )}
                      </ItemActions>
                    </Item>
                    {i < oauthProviders.length - 1 && <ItemSeparator />}
                  </React.Fragment>
                );
              })}
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SignInMethods;
