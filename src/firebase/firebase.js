// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithCredential,
  onAuthStateChanged,
  updatePassword,
  signOut,
  EmailAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
  getDocs,
  query,
  where,
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  initializeFirestore,
  getDoc,
} from 'firebase/firestore';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: 'AIzaSyADKfMUkJSFdTlTbMG_vALbzByk13Sw28A',
  authDomain: 'moneylover-clone-634d1.firebaseapp.com',
  projectId: 'moneylover-clone-634d1',
  storageBucket: 'moneylover-clone-634d1.appspot.com',
  messagingSenderId: '875900993588',
  appId: '1:875900993588:android:6ad96631e9bef70a2eca61',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

GoogleSignin.configure({
  webClientId:
    '875900993588-22qae3bave9nctig8q4f5bvbchns81s9.apps.googleusercontent.com',
});
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithCredential,
  onAuthStateChanged,
  updatePassword,
  signOut,
  collection,
  addDoc,
  setDoc,
  doc,
  EmailAuthProvider,
  GoogleAuthProvider,
  GoogleSignin,
  statusCodes,
  getDocs,
  query,
  where,
  onSnapshot,
  getDoc,
};
