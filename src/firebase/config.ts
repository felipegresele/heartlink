import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAMADQBTaUTubxMO8ctoF-By4au5NZMbEM",
  authDomain: "heartlink-13ba6.firebaseapp.com",
  projectId: "heartlink-13ba6",
  storageBucket: "heartlink-13ba6.firebasestorage.app",
  messagingSenderId: "171939022604",
  appId: "1:171939022604:web:57d70c42efa754dc22ab29",
  measurementId: "G-NZFGN2Q98M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;