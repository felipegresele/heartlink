import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

// Cadastrar novo usuário
export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Atualizar perfil do usuário
    await updateProfile(user, {
      displayName: displayName
    });
    
    // Salvar dados do usuário no Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName,
      createdAt: new Date()
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    return { user, userData };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fazer login
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fazer logout
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Login com Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Verificar se o usuário já existe no Firestore
    const existingUserData = await getUserData(user.uid);
    
    if (!existingUserData) {
      // Salvar dados do usuário no Firestore se não existir
      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'Usuário',
        createdAt: new Date()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      return { user, userData };
    }
    
    return { user, userData: existingUserData };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Obter dados do usuário do Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error: any) {
    console.error('Erro ao obter dados do usuário:', error);
    return null;
  }
};