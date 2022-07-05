import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCUgVIEW022xtLk4vIr9Q-PPSOKCv6WK-o',
  authDomain: 'studentsdata-k.firebaseapp.com',
  databaseURL:
    'https://studentsdata-k-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'studentsdata-k',
  storageBucket: 'studentsdata-k.appspot.com',
  messagingSenderId: '611375236918',
  appId: '1:611375236918:web:baf55ddf85a8f234339597',
  measurementId: 'G-C6EFKY9LE3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
