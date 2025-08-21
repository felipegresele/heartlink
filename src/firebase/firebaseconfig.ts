import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 Copie esses dados do seu console Firebase > Configurações do projeto
// apiKey: "SUA_API_KEY",
//   authDomain: "SEU_DOMINIO.firebaseapp.com",
//   projectId: "SEU_PROJECT_ID",
//   storageBucket: "SEU_BUCKET.appspot.com",
//   messagingSenderId: "SEU_ID",
//   appId: "SEU_APP_ID",

const firebaseConfig = {
  apiKey: "AIzaSyAMADQBTaUTubxMO8ctoF-By4au5NZMbEM",
  authDomain: "heartlink-13ba6.firebaseapp.com",
  projectId: "heartlink-13ba6",
  storageBucket: "heartlink-13ba6.appspot.com",
  messagingSenderId: "171939022604",
  appId: "1:171939022604:web:57d70c42efa754dc22ab29",
  measurementId: "G-NZFGN2Q98M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);