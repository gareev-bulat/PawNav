import {initializeApp, getApp, getApps} from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyD7wz-ZdAUOewUE1FO-vcdY4T-vzyzIrQQ",
  authDomain: "pawnav-4353a.firebaseapp.com",
  projectId: "pawnav-4353a",
  storageBucket: "pawnav-4353a.firebasestorage.app",
  messagingSenderId: "830911669286",
  appId: "1:830911669286:web:3203bcfd08a5f5276332e7",
  measurementId: "G-4FFBGV84Y9"
};



const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getApps().length ? getAuth(): initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

const storage = getStorage(app);



export { app, auth, getApp, getAuth, db, storage };

