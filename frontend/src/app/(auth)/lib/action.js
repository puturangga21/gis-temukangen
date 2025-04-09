// import axios from 'axios';
// import { redirect, useRouter } from 'next/navigation';
//
// export async function LoginAction(_, formData) {
//   const email = formData.get('email');
//   const password = formData.get('password');
//
//   if (!email || !password) {
//     return { error: 'Semua data wajib di isi!' };
//   }
//
//   try {
//     const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//       email,
//       password,
//     });
//
//     if (res.status === 200) {
//       console.log(res);
//       localStorage.setItem('sig_token', res?.data?.token);
//
//       // return { error: '' };
//     }
//   } catch (e) {
//     return {
//       error: e?.response?.data?.error,
//     };
//   }
//
//   return redirect('/');
// }
//
// export async function RegisterAction(_, formData) {
//   const name = formData.get('name');
//   const email = formData.get('email');
//   const nim = parseInt(formData.get('nim'));
//   const password = formData.get('password');
//
//   if (!name || !email || !nim || !password) {
//     return { error: 'Semua data wajib di isi!' };
//   }
//
//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/register`,
//       {
//         name,
//         email,
//         nim,
//         password,
//       }
//     );
//
//     console.log(res.data);
//   } catch (e) {
//     console.log(e);
//
//     return {
//       error: e?.response?.data?.error,
//     };
//   }
//
//   return redirect('/login');
// }
//
// export async function LogoutAction() {
//   localStorage.removeItem('sig_token');
//   // Cookies.remove('sig_token');
//   return redirect('/login');
// }
