import type { BackendRetrospectiva, RetrospectiveData } from "./retrospectiva";
import type { User } from "./user";

export interface LovePageData {
  receiverName: string;
  message: string;
  photos: string[];
  relationshipStartDate: string;
  musicId?: string;
  musicTitle?: string;
  senderName: string;
  retrospectiva?: BackendRetrospectiva;
}

export interface LovePage {
  id: string;
  slug: string;
  receiverName: string | null;
  senderName: string | null;
  message: string | null;
  relationshipStartDate: string | null;
  musicId: string | null;
  musicTitle: string | null;
  theme: string | null;
  planType: string | null;
  status: string;
  photos: string[] | null;
  retrospectiva: RetrospectiveData | null; // estrutura complexa, tipada no componente
  createdAt: string;
}
