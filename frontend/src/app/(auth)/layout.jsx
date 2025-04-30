'use client';

import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  // const router = useRouter();
  // const cookies = Cookie.get('accessToken');
  //
  // useEffect(() => {
  //   if (cookies) {
  //     router.push('/');
  //   }
  // }, []);

  return <main>{children}</main>;
};
export default Layout;
