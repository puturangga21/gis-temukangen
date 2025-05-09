import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const locations = await prisma.locations.findMany();
    return NextResponse.json({
      message: 'Sukses mengambil lokasi',
      locations: locations,
    });
  } catch (e) {
    console.error('❌ Gagal mengambil lokasi:', e);
    return NextResponse.json(
      { error: 'Gagal mengambil lokasi' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { latitude, longitude, pointX, pointY, location_name, description } =
    await req.json();

  if (
    !latitude ||
    !longitude ||
    !pointX ||
    !pointY ||
    !location_name ||
    !description
  ) {
    return NextResponse.json(
      { error: 'Semua field harus diisi' },
      { status: 400 }
    );
  }

  try {
    const location = await prisma.locations.create({
      data: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        pointX: parseFloat(pointX),
        pointY: parseFloat(pointY),
        location_name,
        description,
      },
    });

    return NextResponse.json(
      { message: 'Lokasi berhasil disimpan', location: location },
      { status: 201 }
    );
  } catch (e) {
    console.error('❌ Gagal menyimpan lokasi:', e);
    return NextResponse.json(
      { error: e, message: 'Gagal menyimpan lokasi' },
      { status: 500 }
    );
  }
}
