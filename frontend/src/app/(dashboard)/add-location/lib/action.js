// // 'use server';
//
// import axios from 'axios';
//
// export async function addLocation(_, formData) {
//   const latitude = formData.get('latitude');
//   const longitude = formData.get('longitude');
//   const pointX = formData.get('pointX');
//   const pointY = formData.get('pointY');
//   const locationName = formData.get('location-name');
//   const description = formData.get('description');
//
//   // const userToken = (await cookies()).get('sig_token')?.value;
//
//   try {
//     const res = await axios.post(
//       'http://localhost:3001/locations',
//       {
//         latitude,
//         longitude,
//         pointX,
//         pointY,
//         location_name: locationName,
//         description,
//       }
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//
//     console.log(res);
//
//     // revalidatePath('/add-location');
//     return { error: '' };
//   } catch (e) {
//     // console.log(e?.response?.data);
//
//     const serverError = e?.response?.data?.error || 'Add location failed';
//
//     return { error: serverError };
//   }
// }
