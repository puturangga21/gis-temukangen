'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export function NavUser() {
  const { isMobile } = useSidebar();
  const [credential, setCredential] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredential = async () => {
      const authToken = localStorage.getItem('gis_token');

      if (!authToken) {
        setLoading(false); // Hentikan loading jika tidak ada token
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setCredential(response.data.data.user);
        console.log(response.data.data.user);
      } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredential();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {loading ? (
              <Skeleton className='w-full h-12 rounded-lg' />
            ) : (
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={credential?.avatar}
                    alt={credential?.name}
                  />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {credential?.name}
                  </span>
                  <span className='truncate text-xs'>{credential?.email}</span>
                </div>
                <ChevronsUpDown className='ml-auto size-4' />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg z-[999]'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}>
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={credential?.avatar}
                    alt={credential?.name}
                  />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {credential?.name}
                  </span>
                  <span className='truncate text-xs'>{credential?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <FormLogout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function FormLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    const authToken = localStorage.getItem('gis_token');

    if (!authToken) {
      console.log('Tidak ada token untuk logout.');
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log({ response });

      localStorage.removeItem('gis_token');
      localStorage.removeItem('gis_token_expired');
      router.push('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className='contents w-full'>
      <button
        onClick={handleLogout}
        className='contents w-full'
        type='button'>
        <LogOut size='16' />
        Log out
      </button>
    </form>
  );
}
