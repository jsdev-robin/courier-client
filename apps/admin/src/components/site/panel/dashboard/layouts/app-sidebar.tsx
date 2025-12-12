'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@repo/ui/components/sidebar';
import { Box, Tags } from 'lucide-react';
import * as React from 'react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

const data = {
  navMain: [
    {
      title: 'Category Setup',
      url: '#',
      icon: Box,
      items: [
        {
          title: 'List',
          url: '/account/dashboard/category/primary/list',
        },
        {
          title: 'Create',
          url: '/account/dashboard/category/primary/create',
        },
        {
          title: 'Secondary',
          url: '/account/dashboard/category/secondary/create',
        },
        {
          title: 'Tertiary',
          url: '/account/dashboard/category/tertiary/create',
        },
        {
          title: 'Attribute',
          url: '/account/dashboard/category/attribute/create',
        },
      ],
    },
    {
      title: 'Brand Setup',
      url: '#',
      icon: Tags,
      items: [
        {
          title: 'Brand List',
          url: '/account/dashboard/brand/list',
        },
        {
          title: 'Brand Create',
          url: '/account/dashboard/brand/create',
        },
      ],
    },
    {
      title: 'Product',
      url: '#',
      icon: Box,
      items: [
        {
          title: 'List',
          url: '/account/dashboard/product/list',
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
        <NavMain items={data.navMain} label="Product management" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
