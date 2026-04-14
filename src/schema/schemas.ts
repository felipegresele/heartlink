import type { BackendRetrospectiva } from "./retrospectiva";
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
 