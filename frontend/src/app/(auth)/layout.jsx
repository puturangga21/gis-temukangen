'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('gis_token');

    if (authToken) {
      router.push('/');
    }
  }, [router]);

  return <main>{children}</main>;
};
export default Layout;
