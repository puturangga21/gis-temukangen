'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RegisterAction } from '@/app/(auth)/lib/action';
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialFormState = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}>
      {pending ? 'Loading...' : 'Create account'}
    </Button>
  );
}

export default function Register() {
  const [state, formAction] = useActionState(RegisterAction, initialFormState);

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className={cn('flex flex-col gap-6')}>
          <Card className='overflow-hidden py-0'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              <form
                className='p-6 md:p-12'
                action={formAction}>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='text-2xl font-bold'>Get Started Today 🚀</h1>
                    <p className='text-balance text-muted-foreground'>
                      Management with Powerful GIS Tools
                    </p>
                  </div>

                  {state?.error !== '' && (
                    <div className='bg-destructive text-white dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 p-3 rounded-lg'>
                      <p className='text-sm text-center'>{state?.error}</p>
                    </div>
                  )}

                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                      id='name'
                      type='text'
                      placeholder='John Doe'
                      name='name'
                      required
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='m@example.com'
                      name='email'
                      required
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='nim'>NIM</Label>
                    <Input
                      id='nim'
                      type='number'
                      name='nim'
                      placeholder='2205551142'
                      required
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      id='password'
                      type='password'
                      name='password'
                      required
                    />
                  </div>
                  <SubmitButton />

                  <div className='text-center text-sm'>
                    Already have an account?{' '}
                    <a
                      href='/login'
                      className='underline underline-offset-4'>
                      Login
                    </a>
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
