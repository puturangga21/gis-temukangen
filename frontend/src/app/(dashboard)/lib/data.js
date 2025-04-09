import axios from 'axios';
import { API_URL } from '@/lib/constant';

export async function fetchLocation() {
  const res = await axios.get(`${API_URL}/locations`);
  return res.data ?? [];
}
