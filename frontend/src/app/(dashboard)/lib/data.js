import axios from 'axios';

export async function fetchLocation() {
  const res = await axios.get('http://localhost:3001/locations');
  return res.data ?? [];
}
