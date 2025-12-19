'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@repo/ui/components/sidebar';
import { Box, Users } from 'lucide-react';
import * as React from 'react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

const data = {
  navMain: [
    {
      title: 'Parcel',
      url: '#',
      icon: Box,
      items: [
        {
          title: 'List',
          url: '/account/dashboard/parcel/list',
        },
      ],
    },
    {
      title: 'Agents',
      url: '#',
      icon: Users,
      items: [
        {
          title: 'List',
          url: '/account/dashboard/agent/list',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
