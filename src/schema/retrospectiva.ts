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

export interface BirthChartItem {
  id: string;
  textoDeclaracao: string;
  aondeSeConheceram: LocalEnum;
  imagem: string; // base64 ou URL
}

export const LocalEnum = {
  // Brasil
  SAO_PAULO: "São Paulo",
  RIO_DE_JANEIRO: "Rio de Janeiro",
  BELO_HORIZONTE: "Belo Horizonte",
  BRASILIA: "Brasília",
  CURITIBA: "Curitiba",
  PORTO_ALEGRE: "Porto Alegre",
  FLORIANOPOLIS: "Florianópolis",
  SALVADOR: "Salvador",
  FORTALEZA: "Fortaleza",
  RECIFE: "Recife",
  GOIANIA: "Goiânia",
  MANAUS: "Manaus",
  BELEM: "Belém",
  VITORIA: "Vitória",
  CAMPINAS: "Campinas",
  SANTOS: "Santos",
  RIBEIRAO_PRETO: "Ribeirão Preto",
  SAO_JOSE_DOS_CAMPOS: "São José dos Campos",
  SOROCABA: "Sorocaba",
  JOINVILLE: "Joinville",
  BLUMENAU: "Blumenau",
  BALNEARIO_CAMBORIU: "Balneário Camboriú",
  GRAMADO: "Gramado",
  FOZ_DO_IGUACU: "Foz do Iguaçu",

  // Estados Unidos
  NEW_YORK: "New York",
  LOS_ANGELES: "Los Angeles",
  MIAMI: "Miami",
  ORLANDO: "Orlando",
  LAS_VEGAS: "Las Vegas",
  CHICAGO: "Chicago",
  SAN_FRANCISCO: "San Francisco",
  BOSTON: "Boston",

  // Portugal
  LISBOA: "Lisboa",
  PORTO: "Porto",
  FARO: "Faro",

  // Espanha
  MADRID: "Madrid",
  BARCELONA: "Barcelona",
  SEVILHA: "Sevilha",

  // França
  PARIS: "Paris",
  NICE: "Nice",
  MARSELHA: "Marselha",

  // Itália
  ROMA: "Roma",
  MILAO: "Milão",
  VENEZA: "Veneza",
  FLORENCA: "Florença",

  // Reino Unido
  LONDRES: "Londres",
  MANCHESTER: "Manchester",
  EDIMBURGO: "Edimburgo",

  // Alemanha
  BERLIM: "Berlim",
  MUNIQUE: "Munique",
  HAMBURGO: "Hamburgo",

  // Canadá
  TORONTO: "Toronto",
  VANCOUVER: "Vancouver",
  MONTREAL: "Montreal",

  // Japão
  TOQUIO: "Tóquio",
  OSAKA: "Osaka",
  KYOTO: "Kyoto",

  // Coreia do Sul
  SEUL: "Seul",
  BUSAN: "Busan",

  // China
  PEQUIM: "Pequim",
  XANGAI: "Xangai",
  HONG_KONG: "Hong Kong",

  // Austrália
  SYDNEY: "Sydney",
  MELBOURNE: "Melbourne",

  // Argentina
  BUENOS_AIRES: "Buenos Aires",
  CORDOBA: "Córdoba",

  // Chile
  SANTIAGO: "Santiago",

  // México
  CIDADE_DO_MEXICO: "Cidade do México",
  CANCUN: "Cancún",

  // Emirados Árabes Unidos
  DUBAI: "Dubai",
  ABU_DHABI: "Abu Dhabi",

  // Turquia
  ISTAMBUL: "Istambul",

  // Grécia
  ATENAS: "Atenas",

  // Tailândia
  BANGKOK: "Bangkok",

  // Singapura
  SINGAPURA: "Singapura",
} as const;

export type LocalEnum = (typeof LocalEnum)[keyof typeof LocalEnum];
 
export type SectionType = "timeline" | "wheel" | "gallery" | "enigma" | "time" ;
 
export interface RetrospectiveData {
  timeline: TimelineItem[];
  wheel: WheelItem[];
  gallery: GalleryItem[];
  enigma: EnigmaItem[];
  secoesSelecionadas: SectionType[];
  efeitoTime: boolean;
  // Campos opcionais de memórias do casal
  ondeSeConheceram?: string;
  momentoFavorito?: string;
  proximoPasso?: string;
}
 
// Estado inicial vazio
export const RETROSPECTIVE_INITIAL_STATE: RetrospectiveData = {
  timeline: [],
  wheel: [],
  gallery: [],
  enigma: [],
  secoesSelecionadas: [],
  efeitoTime: false,
  ondeSeConheceram: undefined,
  momentoFavorito: undefined,
  proximoPasso: undefined,
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
  efeitoTime: boolean,
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
  ondeSeConheceram?: string;
  momentoFavorito?: string;
  proximoPasso?: string;
}

export function mapBackendRetrospectiva(
  backend: BackendRetrospectiva
): RetrospectiveData {
  return {
    secoesSelecionadas: backend.selectedSections as SectionType[],
    efeitoTime: backend.efeitoTime ?? false,
    timeline: backend.timeline ?? [],
    wheel: backend.wheel ?? [],
    gallery: backend.gallery ?? [],
    enigma: backend.enigma ?? [],
    ondeSeConheceram: backend.ondeSeConheceram,
    momentoFavorito: backend.momentoFavorito,
    proximoPasso: backend.proximoPasso,
  };
}