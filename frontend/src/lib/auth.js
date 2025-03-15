'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('sig_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
}
