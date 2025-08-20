import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

export interface TemplateData {
  id?: string;
  userId: string;
  templateType: 'netflix' | 'spotify' | 'instagram';
  title: string;
  description: string;
  backgroundImage: string;
  backgroundSettings: {
    size: string;
    position: string;
  };
  episodes: Array<{
    title: string;
    image: string;
    imageSettings: {
      size: string;
      position: string;
    };
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Salvar template
export const saveTemplate = async (userId: string, templateData: Omit<TemplateData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
  try {
    const templateRef = doc(collection(db, 'templates'));
    const now = Timestamp.now();
    
    const template: TemplateData = {
      ...templateData,
      userId,
      createdAt: now,
      updatedAt: now
    };
    
    await setDoc(templateRef, template);
    return { id: templateRef.id, ...template };
  } catch (error: any) {
    throw new Error('Erro ao salvar template: ' + error.message);
  }
};

// Atualizar template existente
export const updateTemplate = async (templateId: string, templateData: Partial<TemplateData>) => {
  try {
    const templateRef = doc(db, 'templates', templateId);
    const updatedData = {
      ...templateData,
      updatedAt: Timestamp.now()
    };
    
    await setDoc(templateRef, updatedData, { merge: true });
    return updatedData;
  } catch (error: any) {
    throw new Error('Erro ao atualizar template: ' + error.message);
  }
};

// Obter templates do usuário
export const getUserTemplates = async (userId: string): Promise<TemplateData[]> => {
  try {
    const templatesQuery = query(
      collection(db, 'templates'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(templatesQuery);
    const templates: TemplateData[] = [];
    
    querySnapshot.forEach((doc) => {
      templates.push({ id: doc.id, ...doc.data() } as TemplateData);
    });
    
    return templates;
  } catch (error: any) {
    console.error('Erro ao obter templates:', error);
    return [];
  }
};

// Obter template específico
export const getTemplate = async (templateId: string): Promise<TemplateData | null> => {
  try {
    const templateDoc = await getDoc(doc(db, 'templates', templateId));
    if (templateDoc.exists()) {
      return { id: templateDoc.id, ...templateDoc.data() } as TemplateData;
    }
    return null;
  } catch (error: any) {
    console.error('Erro ao obter template:', error);
    return null;
  }
};

// Deletar template
export const deleteTemplate = async (templateId: string) => {
  try {
    await deleteDoc(doc(db, 'templates', templateId));
  } catch (error: any) {
    throw new Error('Erro ao deletar template: ' + error.message);
  }
};