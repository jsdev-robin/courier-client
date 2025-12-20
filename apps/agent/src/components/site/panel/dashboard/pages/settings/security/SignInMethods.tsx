'use client';

import useUser from '@/store/useUser';
import { buttonVariants } from '@repo/ui/components/button';
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
import { Mail, RectangleEllipsis, UserLock } from 'lucide-react';
import Link from 'next/link';

const oauthProviders = [
  { name: 'Google', key: 'google', icon: <Google /> },
  { name: 'Github', key: 'github', icon: <Github /> },
  { name: 'Facebook', key: 'facebook', icon: <Facebook /> },
  { name: 'Discord', key: 'discord', icon: <Discord /> },
  { name: 'Twitter', key: 'twitter', icon: <XformerlyTwitter /> },
];

const SignInMethods = () => {
  const user = useUser();

  return (
    <section>
      <div className="wrapper">
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
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SignInMethods;
