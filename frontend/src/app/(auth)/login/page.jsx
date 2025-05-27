'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError('Semua data wajib di isi!');
      return null;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      // console.log({ response });

      localStorage.setItem('gis_token', response.data.meta.token);
      localStorage.setItem(
        'gis_token_expired',
        (Date.now() / 1000 + response.data.meta['token-expired']).toString()
      );

      router.push('/');
    } catch (e) {
      setError(e?.response?.data?.meta?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className={cn('flex flex-col gap-6')}>
          <Card className='overflow-hidden py-0'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              <form
                className='p-6 md:p-12'
                onSubmit={handleSubmit}>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='text-2xl font-bold'>Welcome Back 👋</h1>
                    <p className='text-balance text-muted-foreground'>
                      Location Management at Your Fingertips
                    </p>
                  </div>

                  {error && (
                    <div className='bg-destructive text-white dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 p-3 rounded-lg'>
                      <p className='text-sm text-center'>{error}</p>
                    </div>
                  )}

                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='m@example.com'
                      name='email'
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      id='password'
                      type='password'
                      name='password'
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                  </Button>

                  <div className='text-center text-sm'>
                    Don&apos;t have an account?{' '}
                    <Link
                      href='/register'
                      className='underline underline-offset-4'>
                      Register
                    </Link>
                  </div>
                </div>
              </form>
              <div className='relative hidden bg-muted md:block'>
                <img
                  src='/img1.jpg'
                  alt='Image'
                  className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
                />
              </div>
            </CardContent>
          </Card>
          <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
            By clicking continue, you agree to our{' '}
            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
