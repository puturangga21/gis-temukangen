import axios from 'axios';
import { API_URL } from '@/lib/constant';

export async function fetchLocation() {
  const res = await axios.get(`${API_URL}/locations`);
  return res.data ?? [];
}

export async function fetchRuasJalan() {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/ruasjalan`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data.ruasjalan ?? [];
    // return response ?? [];
  } catch (error) {}
}

export async function fetchRegion() {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/mregion`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response ?? [];
  } catch (error) {}
}

export async function fetchKecamatan({ kabupatenId }) {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/kecamatan/${kabupatenId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response ?? [];
  } catch (error) {}
}

export async function fetchDesa({ kecamatanId }) {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/desa/${kecamatanId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response ?? [];
  } catch (error) {}
}

export async function fetchExisting() {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/meksisting`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response ?? [];
  } catch (error) {}
}

export async function fetchKondisi() {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/mkondisi`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response ?? [];
  } catch (error) {}
}

export async function fetchJenisJalan() {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/mjenisjalan`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response ?? [];
  } catch (error) {}
}

export async function fetchKecamatanByDesaId({ desaId }) {
  try {
    const authToken = localStorage.getItem('gis_token');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/kecamatanbydesaid/${desaId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response ?? [];
  } catch (error) {}
}
