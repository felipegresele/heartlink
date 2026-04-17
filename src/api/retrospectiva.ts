import type { LovePage, LovePageData } from "../schema/schemas";

const API_URL = "https://lovepage-backend.onrender.com/api";

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || "Erro na requisição");
  }
  return res.json()
}
 
export async function apiPost(path: string, body: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro na requisição");
  }
  console.log(res)
  return res.json();
}
 
export async function apiDelete(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro na requisição");
  }
  console.log(res)
  return res.json();
}
 
// Salva a retrospectiva vinculada a uma página já criada
export async function saveRetrospective(pageId: string, retrospectiva: object) {
  const res = await fetch(`${API_URL}/love-pages/retrospectiva`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId, retrospectiva }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Erro ao salvar retrospectiva");
  }
  console.log(res)
  return res.text();
}

/**
 * Busca todas as páginas de um usuário.
 * Retorna [] se o usuário ainda não criou nenhuma página.
 */
export async function getPagesByUserId(userId: string): Promise<LovePage[]> {
  return apiGet<LovePage[]>(`/love-pages/user/${userId}`);
}
 
/**
 * Atualiza apenas os campos enviados (campos null são ignorados pelo backend).
 */
export async function updatePage(
  pageId: string,
  data: Partial<Omit<LovePage, "id" | "slug" | "status" | "createdAt" | "planType">>
): Promise<LovePage> {
  const res = await fetch(`${API_URL}/love-pages/${pageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || error || "Erro ao atualizar página");
  }
  return res.json();
}