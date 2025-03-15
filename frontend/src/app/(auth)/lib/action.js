'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function LoginAction(_, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await axios.post('http://localhost:3001/login', {
      email,
      password,
    });

    if (res.status === 200) {
      (await cookies()).set('sig_token', res.data.token);
    }
  } catch (e) {
    console.log(e);

    const serverError = e?.response?.data?.error || 'Login failed';
    return { error: serverError };
  }

  return redirect('/');
}

export async function RegisterAction(_, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const nim = parseInt(formData.get('nim'));
  const password = formData.get('password');

  try {
    const res = await axios.post('http://localhost:3001/register', {
      name,
      email,
      nim,
      password,
    });

    console.log(res);
  } catch (e) {
    console.log(e);

    const serverError = e?.response?.data?.error || 'Register failed';
    return { error: serverError };
  }

  return redirect('/login');
}

export async function LogoutAction() {
  (await cookies()).delete('sig_token');

  return redirect('/login');
}
