'use client';

import React from 'react';
import { useCredential } from '@/context/UserContext';

const Page = () => {
  const { credential } = useCredential();
  console.log({ message: 'data adalah', credential });

  return <div>Page</div>;
};
export default Page;
