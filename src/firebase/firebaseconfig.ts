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

const fireBaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_BUCKET.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SEU_APP_ID",
}

const app = initializeApp(fireBaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);