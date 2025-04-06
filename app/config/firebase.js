import {initializeApp, getApp} from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyD7wz-ZdAUOewUE1FO-vcdY4T-vzyzIrQQ",
  authDomain: "pawnav-4353a.firebaseapp.com",
  projectId: "pawnav-4353a",
  storageBucket: "pawnav-4353a.firebasestorage.app",
  messagingSenderId: "830911669286",
  appId: "1:830911669286:web:3203bcfd08a5f5276332e7",
  measurementId: "G-4FFBGV84Y9"
};



const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { app, auth, getApp, getAuth };

