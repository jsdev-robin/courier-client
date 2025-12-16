'use client';

import { useSignoutMutation } from '@/libs/features/services/auth/authApi';
import useUser from '@/store/useUser';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { Lock, LogOut, RadioTower, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import MainLogo from '../../../../ui/main-logo';

const Header = () => {
  const [signout, { isLoading }] = useSignoutMutation();
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await toast.promise(signout().unwrap(), {
      loading: 'Signing out...',
      success: (res) => {
        window.location.href = `${process.env.NEXT_PUBLIC_DRIVER_URL}/sign-in`;
        return res.message || DEFAULT_SUCCESS_MESSAGE;
      },
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <header className="border-b border-border py-3">
      <div className="container">
        <div className="flex items-center justify-between">
          <MainLogo />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.personalInfo?.avatar?.url}
                  alt={`${user?.personalInfo.displayName}'s photo`}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.personalInfo.displayName.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.personalInfo?.avatar?.url}
                      alt={`${user?.personalInfo.displayName}'s photo`}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.personalInfo.displayName.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.personalInfo.displayName}
                    </span>
                    <span className="truncate text-xs">
                      {user?.personalInfo.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    router.push('/account/dashboard/settings/profile')
                  }
                >
                  <User />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    router.push('/account/dashboard/settings/security')
                  }
                >
                  <Lock />
                  Security
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push('/account/dashboard/settings/security/sessions')
                  }
                >
                  <RadioTower />
                  Session
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
