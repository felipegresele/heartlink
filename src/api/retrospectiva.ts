import type { LovePage } from "../schema/schemas";
import { apiGet, apiPost, apiPut, apiDelete } from "./auth/api";

export { apiPost, apiDelete };

const API_URL = "https://lovepage-backend.onrender.com/api";

// Usa apiGet centralizado (já envia token automaticamente)
export async function getPagesByUserId(userId: string): Promise<LovePage[]> {
  return apiGet<LovePage[]>(`/love-pages/user/${userId}`);
}

// Salva retrospectiva com token
export async function saveRetrospective(pageId: string, retrospectiva: object) {
  return apiPost("/love-pages/retrospectiva", { pageId, retrospectiva });
}

// Atualiza página com token
export async function updatePage(
  pageId: string,
  data: Partial<Omit<LovePage, "id" | "slug" | "status" | "createdAt" | "planType">>
): Promise<LovePage> {
  return apiPut(`/love-pages/${pageId}`, data);
}
