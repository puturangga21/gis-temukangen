'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';

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
import { Skeleton } from '@/components/ui/skeleton';
import { useCredential } from '@/context/UserContext';
import axios from 'axios';
import { API_URL } from '@/lib/constant';
import { useRouter } from 'next/navigation';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { credential, loading } = useCredential();

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

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

      // console.log(res.data.message);
      router.push('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className='contents w-full'
      onSubmit={handleLogout}>
      <button
        className='contents w-full'
        type='submit'>
        <LogOut size='16' />
        Log out
      </button>
    </form>
  );
}
