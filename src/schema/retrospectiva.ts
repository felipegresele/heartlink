export interface TimelineItem {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string; // base64 ou URL
}
 
export interface WheelItem {
  id: string;
  texto: string;
  cor: string; // cor de fundo do segmento
}
 
export interface GalleryItem {
  id: string;
  imagem: string; // base64 ou URL
  descricao: string;
}
 
export interface EnigmaItem {
  id: string;
  texto: string;   // o que o usuário gosta na outra pessoa
  revelado: boolean; // controle de UI — não persiste
}
 
export type SectionType = "timeline" | "wheel" | "gallery" | "enigma";
 
export interface RetrospectiveData {
  timeline: TimelineItem[];
  wheel: WheelItem[];
  gallery: GalleryItem[];
  enigma: EnigmaItem[];
  secoesSelecionadas: SectionType[];
}
 
// Estado inicial vazio
export const RETROSPECTIVE_INITIAL_STATE: RetrospectiveData = {
  timeline: [],
  wheel: [],
  gallery: [],
  enigma: [],
  secoesSelecionadas: [],
};
 
// Limites máximos por seção
export const LIMITS = {
  timeline: 6,
  wheel: 10,
  gallery: 6,
  enigma: 6,
} as const;
 
// Paleta de cores para os segmentos da roleta
export const WHEEL_COLORS = [
  "#FF6B9D", "#FF8E53", "#FFC857", "#A8E6CF",
  "#88D8B0", "#6EC6FF", "#B39DDB", "#F48FB1",
  "#FFCC80", "#80DEEA",
];

export interface BackendRetrospectiva {
  selectedSections: string[];
  timeline: {
    id: string;
    titulo: string;
    descricao: string;
    imagem: string;
  }[];
  wheel: {
    id: string;
    texto: string;
    cor: string;
  }[];
  gallery: {
    id: string;
    imagem: string;
    descricao: string;
  }[];
  enigma: {
    id: string;
    texto: string;
    revelado: boolean;
  }[];
}

export function mapBackendRetrospectiva(
  backend: BackendRetrospectiva
): RetrospectiveData {
  return {
    secoesSelecionadas: backend.selectedSections as any,
    timeline: backend.timeline ?? [],
    wheel: backend.wheel ?? [],
    gallery: backend.gallery ?? [],
    enigma: backend.enigma ?? [],
  };
}