import React from 'react';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Layout = async ({ children }) => {
  const user = await getUser();

  if (user) {
    redirect('/');
  }
  return <main>{children}</main>;
};
export default Layout;
