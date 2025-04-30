'use client';

import * as React from 'react';
import { MapPin } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { HeaderSidebar } from '@/components/header-sidebar';

const navMain = [
  {
    title: 'Map',
    url: '#',
    icon: MapPin,
    isActive: true,
    items: [
      {
        title: 'Overview',
        url: '/',
      },
      {
        title: 'Add Location',
        url: '/add-location',
      },
    ],
  },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      collapsible='icon'
      {...props}>
      <SidebarHeader>
        <HeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
