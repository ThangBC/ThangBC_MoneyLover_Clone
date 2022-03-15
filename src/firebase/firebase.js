// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//-------------ANDROID
// const firebaseConfig = {
//   apiKey: 'AIzaSyADKfMUkJSFdTlTbMG_vALbzByk13Sw28A',
//   authDomain: 'moneylover-clone-634d1.firebaseapp.com',
//   projectId: 'moneylover-clone-634d1',
//   storageBucket: 'moneylover-clone-634d1.appspot.com',
//   messagingSenderId: '875900993588',
//   appId: '1:875900993588:android:af14277da89024922eca61',
//   measurementId: 'G-40NC975J0Z',
// };
//------------------WEBAPP
const firebaseConfig = {
  apiKey: 'AIzaSyCrI0xZfhtwA2yunVMgJ7rM_9k9x4AelR0',
  authDomain: 'moneylover-clone-634d1.firebaseapp.com',
  projectId: 'moneylover-clone-634d1',
  storageBucket: 'moneylover-clone-634d1.appspot.com',
  messagingSenderId: '875900993588',
  appId: '1:875900993588:web:2887971b25ebddc92eca61',
  measurementId: 'G-Z4MR5G3EZW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  setDoc,
  doc,
};
