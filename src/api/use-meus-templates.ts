import { useState, useEffect, useCallback } from "react";
import type { LovePage } from "../schema/schemas";
import { getPagesByUserId, updatePage } from "./retrospectiva";

interface UseMeusTemplatesReturn {
  pages: LovePage[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  handleUpdate: (pageId: string, data: Partial<LovePage>) => Promise<void>;
  updating: boolean;
}

export function useMeusTemplates(): UseMeusTemplatesReturn {
  const [pages, setPages] = useState<LovePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setPages([]);
        return;
      }
      const user = JSON.parse(storedUser);
      const data = await getPagesByUserId(user.id);
      setPages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar templates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleUpdate = async (pageId: string, data: Partial<LovePage>) => {
    setUpdating(true);
    try {
      const updated = await updatePage(pageId, data);
      setPages((prev) =>
        prev.map((p) => (p.id === pageId ? updated : p))
      );
    } finally {
      setUpdating(false);
    }
  };

  return { pages, loading, error, refetch: fetchPages, handleUpdate, updating };
}