const API_URL = "https://lovepage-backend.onrender.com/api";
 
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