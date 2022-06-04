import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDL_416L35CaIQRnnxBU4jVyUlLqR9aNbo',
  authDomain: 'house-marketplace-app-e82b1.firebaseapp.com',
  projectId: 'house-marketplace-app-e82b1',
  storageBucket: 'house-marketplace-app-e82b1.appspot.com',
  messagingSenderId: '892063876142',
  appId: '1:892063876142:web:a8d7e2712f5e38c1754bbf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
