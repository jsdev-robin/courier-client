"use client";

import { ChevronsUpDown, Lock, LogOut, RadioTower, User } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/sidebar";
import { useRouter } from "next/navigation";
import { useSignoutMutation } from "@/libs/features/services/auth/authApi";
import { toast } from "sonner";
import useUser from "@/store/useUser";
import {
  DEFAULT_SUCCESS_MESSAGE,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "@repo/ui/utils/contants";

export function NavUser() {
  const { isMobile } = useSidebar();
  const [signout, { isLoading }] = useSignoutMutation();
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await toast.promise(signout().unwrap(), {
      loading: "Signing out...",
      success: (res) => {
        window.location.href = `${process.env.NEXT_PUBLIC_DRIVER_URL}/sign-in`;
        return res.message || DEFAULT_SUCCESS_MESSAGE;
      },
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
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
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
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
                  router.push("/account/dashboard/settings/profile")
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
                  router.push("/account/dashboard/settings/security")
                }
              >
                <Lock />
                Security
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push("/account/dashboard/settings/security/sessions")
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
