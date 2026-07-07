// ============================================================
// RetrospectiveProvider — com auto-save no localStorage.
// Toda mutação de estado persiste automaticamente na chave
// "heartlink_retrospectiva", sem precisar chamar
// saveToLocalStorage() manualmente.
// ============================================================
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  LIMITS,
  RETROSPECTIVE_INITIAL_STATE,
  WHEEL_COLORS,
  type GalleryItem,
  type RetrospectiveData,
  type SectionType,
  type TimelineItem,
} from "../../../../../schema/retrospectiva";

const RETRO_STORAGE_KEY = "heartlink_retrospectiva";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

interface RetrospectiveContextType {
  data: RetrospectiveData;
  toggleSection: (section: SectionType) => void;
  toggleEfeitoTime: () => void;
  setEfeitoTime: (value: boolean) => void;
  addTimelineItem: (item: Omit<TimelineItem, "id">) => boolean;
  updateTimelineItem: (id: string, item: Partial<TimelineItem>) => void;
  removeTimelineItem: (id: string) => void;
  addWheelItem: (texto: string) => boolean;
  updateWheelItem: (id: string, texto: string) => void;
  removeWheelItem: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => boolean;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  removeGalleryItem: (id: string) => void;
  addEnigmaItem: (texto: string) => boolean;
  updateEnigmaItem: (id: string, texto: string) => void;
  removeEnigmaItem: (id: string) => void;
  toggleEnigmaRevelado: (id: string) => void;
  addStarItem: (texto: string) => boolean;
  updateStarItem: (id: string, texto: string) => void;
  removeStarItem: (id: string) => void;
  toggleStarRevelado: (id: string) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetData: () => void;
  getData: () => RetrospectiveData;
  setOndeSeConheceram: (v: string) => void;
  setMomentoFavorito: (v: string) => void;
  setProximoPasso: (v: string) => void;
}

const RetrospectiveContext = createContext<RetrospectiveContextType | null>(
  null,
);

interface RetrospectiveProviderProps {
  children: ReactNode;
  /** Dados iniciais para pré-popular (modo edição). Opcional. */
  initialData?: RetrospectiveData;
}

export function RetrospectiveProvider({
  children,
  initialData,
}: RetrospectiveProviderProps) {
  // Se veio initialData (modo edição), usa ele.
  // Senão, tenta restaurar do localStorage; se não houver, usa o estado inicial.
  const [data, setData] = useState<RetrospectiveData>(() => {
    if (initialData) return initialData;
    try {
      const saved = localStorage.getItem(RETRO_STORAGE_KEY);
      if (saved) return JSON.parse(saved) as RetrospectiveData;
    } catch {
      // ignora erros de parse
    }
    return RETROSPECTIVE_INITIAL_STATE;
  });

  // ── Auto-save a cada mudança de estado ───────────────────
  useEffect(() => {
    try {
      localStorage.setItem(RETRO_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignora erros de quota
    }
  }, [data]);

  const getData = useCallback(() => data, [data]);

  const toggleSection = useCallback((section: SectionType) => {
    setData((prev) => {
      const selecionadas = prev.secoesSelecionadas.includes(section)
        ? prev.secoesSelecionadas.filter((s) => s !== section)
        : [...prev.secoesSelecionadas, section];
      return { ...prev, secoesSelecionadas: selecionadas };
    });
  }, []);

  const toggleEfeitoTime = useCallback(() => {
    setData((prev) => ({ ...prev, efeitoTime: !prev.efeitoTime }));
  }, []);

  const setEfeitoTime = useCallback((value: boolean) => {
    setData((prev) => ({ ...prev, efeitoTime: value }));
  }, []);

  const addTimelineItem = useCallback(
    (item: Omit<TimelineItem, "id">): boolean => {
      if (data.timeline.length >= LIMITS.timeline) return false;
      setData((prev) => ({
        ...prev,
        timeline: [...prev.timeline, { ...item, id: uid() }],
      }));
      return true;
    },
    [data.timeline.length],
  );

  const updateTimelineItem = useCallback(
    (id: string, item: Partial<TimelineItem>) => {
      setData((prev) => ({
        ...prev,
        timeline: prev.timeline.map((t) =>
          t.id === id ? { ...t, ...item } : t,
        ),
      }));
    },
    [],
  );

  const removeTimelineItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((t) => t.id !== id),
    }));
  }, []);

  const addWheelItem = useCallback(
    (texto: string): boolean => {
      if (data.wheel.length >= LIMITS.wheel) return false;
      const cor = WHEEL_COLORS[data.wheel.length % WHEEL_COLORS.length];
      setData((prev) => ({
        ...prev,
        wheel: [...prev.wheel, { id: uid(), texto, cor }],
      }));
      return true;
    },
    [data.wheel.length],
  );

  const updateWheelItem = useCallback((id: string, texto: string) => {
    setData((prev) => ({
      ...prev,
      wheel: prev.wheel.map((w) => (w.id === id ? { ...w, texto } : w)),
    }));
  }, []);

  const removeWheelItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      wheel: prev.wheel.filter((w) => w.id !== id),
    }));
  }, []);

  const addGalleryItem = useCallback(
    (item: Omit<GalleryItem, "id">): boolean => {
      if (data.gallery.length >= LIMITS.gallery) return false;
      setData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, { ...item, id: uid() }],
      }));
      return true;
    },
    [data.gallery.length],
  );

  const updateGalleryItem = useCallback(
    (id: string, item: Partial<GalleryItem>) => {
      setData((prev) => ({
        ...prev,
        gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...item } : g)),
      }));
    },
    [],
  );

  const removeGalleryItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  }, []);

  const addEnigmaItem = useCallback(
    (texto: string): boolean => {
      if (data.enigma.length >= LIMITS.enigma) return false;
      setData((prev) => ({
        ...prev,
        enigma: [...prev.enigma, { id: uid(), texto, revelado: false }],
      }));
      return true;
    },
    [data.enigma.length],
  );

  const updateEnigmaItem = useCallback((id: string, texto: string) => {
    setData((prev) => ({
      ...prev,
      enigma: prev.enigma.map((e) => (e.id === id ? { ...e, texto } : e)),
    }));
  }, []);

  const removeEnigmaItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      enigma: prev.enigma.filter((e) => e.id !== id),
    }));
  }, []);

  const toggleEnigmaRevelado = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      enigma: prev.enigma.map((e) =>
        e.id === id ? { ...e, revelado: !e.revelado } : e,
      ),
    }));
  }, []);

   const addStarItem = useCallback(
    (texto: string): boolean => {
      if (data.rainStar.length >= LIMITS.rainStar) return false;
      setData((prev) => ({
        ...prev,
        rainStar: [...prev.rainStar, { id: uid(), message: texto, unlocked: false }],
      }));
      return true;
    },
    [data.rainStar.length],
  );

  const updateStarItem = useCallback((id: string, message: string) => {
    setData((prev) => ({
      ...prev,
      rainStar: prev.rainStar.map((e) => (e.id === id ? { ...e, message } : e)),
    }));
  }, []);

  const removeStarItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      rainStar: prev.rainStar.filter((e) => e.id !== id),
    }));
  }, []);

  const toggleStarRevelado = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      rainStar: prev.rainStar.map((e) =>
        e.id === id ? { ...e, unlocked: !e.unlocked } : e,
      ),
    }));
  }, []);

  // Mantidos por compatibilidade — agora o auto-save já cuida de tudo,
  // mas estes métodos continuam funcionando caso sejam chamados externamente.
  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem(RETRO_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignora erros de quota
    }
  }, [data]);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(RETRO_STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch {
      console.error("Erro ao carregar retrospectiva do localStorage");
    }
  }, []);

  const resetData = useCallback(() => {
    setData(RETROSPECTIVE_INITIAL_STATE);
    localStorage.removeItem(RETRO_STORAGE_KEY);
  }, []);

  const setOndeSeConheceram = useCallback((v: string) => {
    setData((prev) => ({ ...prev, ondeSeConheceram: v || undefined }));
  }, []);
  const setMomentoFavorito = useCallback((v: string) => {
    setData((prev) => ({ ...prev, momentoFavorito: v || undefined }));
  }, []);
  const setProximoPasso = useCallback((v: string) => {
    setData((prev) => ({ ...prev, proximoPasso: v || undefined }));
  }, []);

  return (
    <RetrospectiveContext.Provider
      value={{
        data,
        getData,
        toggleSection,
        toggleEfeitoTime,
        setEfeitoTime,
        addTimelineItem,
        updateTimelineItem,
        removeTimelineItem,
        addWheelItem,
        updateWheelItem,
        removeWheelItem,
        addGalleryItem,
        updateGalleryItem,
        removeGalleryItem,
        addEnigmaItem,
        updateEnigmaItem,
        removeEnigmaItem,
        toggleEnigmaRevelado,
        addStarItem,
        updateStarItem,
        removeStarItem,
        toggleStarRevelado,
        saveToLocalStorage,
        loadFromLocalStorage,
        resetData,
        setOndeSeConheceram,
        setMomentoFavorito,
        setProximoPasso,
      }}
    >
      {children}
    </RetrospectiveContext.Provider>
  );
}

export function useRetrospective() {
  const ctx = useContext(RetrospectiveContext);
  if (!ctx)
    throw new Error(
      "useRetrospective deve ser usado dentro de <RetrospectiveProvider>",
    );
  return ctx;
}
