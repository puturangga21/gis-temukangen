'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCredential } from '@/context/UserContext';
import { API_URL } from '@/lib/constant';

const ProtectedRoute = (WrapperComponent) => {
  const NewComponent = (props) => {
    const router = useRouter();
    const { setCredential, setLoading } = useCredential();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const authResponse = await axios.get(`${API_URL}/verify`, {
            withCredentials: true,
          });

          console.log(authResponse.data.user);
          setCredential(authResponse.data.user);
          setLoading(false);

          if (authResponse.status !== 200) {
            router.push('/login');
          }
        } catch (e) {
          router.push('/login');
        }
      };

      checkAuth();
    }, [router, setLoading, setCredential]);

    return (
      <div>
        <WrapperComponent {...props} />
      </div>
    );
  };

  return NewComponent;
};
export default ProtectedRoute;
