import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCf3C2jCB6bQAYFLlmu6wyeo0p0XuuXZg8',
  authDomain: 'gis-temukangen.firebaseapp.com',
  projectId: 'gis-temukangen',
  storageBucket: 'gis-temukangen.firebasestorage.app',
  messagingSenderId: '854150597397',
  appId: '1:854150597397:web:2065c60d8258d3e4ec771c',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
