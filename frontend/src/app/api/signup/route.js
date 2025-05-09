import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
  );
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { name, email, password, nim } = body;

    if (!email || !password || !name || !nim) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        nim: BigInt(nim),
      },
    });

    return NextResponse.json({
      message: 'User created',
      user: serializeBigInt(result),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
