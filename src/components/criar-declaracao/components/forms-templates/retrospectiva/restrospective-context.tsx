// ============================================================
// CONTEXT — Gerenciamento de estado da Retrospectiva
// ============================================================
import {
  createContext,
  useContext,
  useState,
  useCallback,
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

// ── Helpers ──────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ── Tipo do contexto ─────────────────────────────────────────
interface RetrospectiveContextType {
  data: RetrospectiveData;

  // Seções selecionadas
  toggleSection: (section: SectionType) => void;

  // Efeito Time (intro animada)
  toggleEfeitoTime: () => void;
  setEfeitoTime: (value: boolean) => void;

  // Timeline
  addTimelineItem: (item: Omit<TimelineItem, "id">) => boolean;
  updateTimelineItem: (id: string, item: Partial<TimelineItem>) => void;
  removeTimelineItem: (id: string) => void;

  // Wheel
  addWheelItem: (texto: string) => boolean;
  updateWheelItem: (id: string, texto: string) => void;
  removeWheelItem: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, "id">) => boolean;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  removeGalleryItem: (id: string) => void;

  // Enigma
  addEnigmaItem: (texto: string) => boolean;
  updateEnigmaItem: (id: string, texto: string) => void;
  removeEnigmaItem: (id: string) => void;
  toggleEnigmaRevelado: (id: string) => void;

  // Persistência
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetData: () => void;
}

// ── Criação do contexto ───────────────────────────────────────
const RetrospectiveContext = createContext<RetrospectiveContextType | null>(
  null
);

// ── Provider ──────────────────────────────────────────────────
export function RetrospectiveProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RetrospectiveData>(
    RETROSPECTIVE_INITIAL_STATE
  );

  // --- Seções ---
  const toggleSection = useCallback((section: SectionType) => {
    setData((prev) => {
      const selecionadas = prev.secoesSelecionadas.includes(section)
        ? prev.secoesSelecionadas.filter((s) => s !== section)
        : [...prev.secoesSelecionadas, section];
      return { ...prev, secoesSelecionadas: selecionadas };
    });
  }, []);

  // --- Efeito Time ---
  const toggleEfeitoTime = useCallback(() => {
    setData((prev) => ({ ...prev, efeitoTime: !prev.efeitoTime }));
  }, []);

  const setEfeitoTime = useCallback((value: boolean) => {
    setData((prev) => ({ ...prev, efeitoTime: value }));
  }, []);

  // --- Timeline ---
  const addTimelineItem = useCallback(
    (item: Omit<TimelineItem, "id">): boolean => {
      if (data.timeline.length >= LIMITS.timeline) return false;
      setData((prev) => ({
        ...prev,
        timeline: [...prev.timeline, { ...item, id: uid() }],
      }));
      return true;
    },
    [data.timeline.length]
  );

  const updateTimelineItem = useCallback(
    (id: string, item: Partial<TimelineItem>) => {
      setData((prev) => ({
        ...prev,
        timeline: prev.timeline.map((t) =>
          t.id === id ? { ...t, ...item } : t
        ),
      }));
    },
    []
  );

  const removeTimelineItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((t) => t.id !== id),
    }));
  }, []);

  // --- Wheel ---
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
    [data.wheel.length]
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

  // --- Gallery ---
  const addGalleryItem = useCallback(
    (item: Omit<GalleryItem, "id">): boolean => {
      if (data.gallery.length >= LIMITS.gallery) return false;
      setData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, { ...item, id: uid() }],
      }));
      return true;
    },
    [data.gallery.length]
  );

  const updateGalleryItem = useCallback(
    (id: string, item: Partial<GalleryItem>) => {
      setData((prev) => ({
        ...prev,
        gallery: prev.gallery.map((g) =>
          g.id === id ? { ...g, ...item } : g
        ),
      }));
    },
    []
  );

  const removeGalleryItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  }, []);

  // --- Enigma ---
  const addEnigmaItem = useCallback(
    (texto: string): boolean => {
      if (data.enigma.length >= LIMITS.enigma) return false;
      setData((prev) => ({
        ...prev,
        enigma: [...prev.enigma, { id: uid(), texto, revelado: false }],
      }));
      return true;
    },
    [data.enigma.length]
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
        e.id === id ? { ...e, revelado: !e.revelado } : e
      ),
    }));
  }, []);

  // --- Persistência ---
  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem("retrospectiva", JSON.stringify(data));
  }, [data]);

  const loadFromLocalStorage = useCallback(() => {
    const saved = localStorage.getItem("retrospectiva");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        console.error("Erro ao carregar retrospectiva do localStorage");
      }
    }
  }, []);

  const resetData = useCallback(() => {
    setData(RETROSPECTIVE_INITIAL_STATE);
    localStorage.removeItem("retrospectiva");
  }, []);

  return (
    <RetrospectiveContext.Provider
      value={{
        data,
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
        saveToLocalStorage,
        loadFromLocalStorage,
        resetData,
      }}
    >
      {children}
    </RetrospectiveContext.Provider>
  );
}

// ── Hook de acesso ────────────────────────────────────────────
export function useRetrospective() {
  const ctx = useContext(RetrospectiveContext);
  if (!ctx)
    throw new Error(
      "useRetrospective deve ser usado dentro de <RetrospectiveProvider>"
    );
  return ctx;
}